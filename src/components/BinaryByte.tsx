import { Layout, Rect, Txt, computed, initial, signal } from "@motion-canvas/2d";
import { SimpleSignal, createRef, all, tween, createSignal, map, sequence, Vector2 } from "@motion-canvas/core";
import { Node, NodeProps } from "@motion-canvas/2d";
import { BinaryBit } from "./BinaryBit";

export interface BinaryByteProps extends NodeProps {
    initial?: number;
}

export class BinaryByte extends Node {


    
    @computed()
    public value() {
        return this.layoutRef().children().reduce((acc, child) => {
            return (acc << 1) | ((child as BinaryBit).state() == "1" ? 1 : 0);
        }, 0)
    }

    private currentHighlight = new Array(8).fill(false);
    private readonly valueRef = createRef<Rect>();
    private readonly layoutRef = createRef<Layout>();
    public constructor(props?: BinaryByteProps) {
        super({ ...props, });

        this.add(
            <Layout gap={12} layout>
                <Layout layout ref={this.layoutRef} gap={12}>
                    <BinaryBit offset={7}/>
                    <BinaryBit offset={6}/>
                    <BinaryBit offset={5}/>
                    <BinaryBit offset={4}/>
                    <BinaryBit offset={3}/>
                    <BinaryBit offset={2}/>
                    <BinaryBit offset={1}/>
                    <BinaryBit offset={0}/>
                </Layout>
                <Rect clip layout height={0} width={0} ref={this.valueRef}>
                    <Txt fill="white" alignSelf={"center"} fontFamily={"JetBrains Mono"} text={() => ` = ${this.value()}`} />
                </Rect>
            </Layout>
        )
        
        // if (props?.initial) this.set(0, props.initial, false);
    }

    public *revealBase(duration: number) {
        yield* this.layoutRef().children().map((child: BinaryBit) => child.revealBase(duration))
    }

    public *hideBase(duration: number) {
        yield* this.layoutRef().children().map((child: BinaryBit) => child.hideBase(duration))
    }

    public *revealValue(duration: number) {
        yield* all(this.valueRef().height(null, duration), this.valueRef().width(200, duration))
    }

    public *hideValue(duration: number) {
        yield* all(this.valueRef().height(0, duration), this.valueRef().width(0, duration))
    }

    public *highlight(duration: number, bits: number[]) {
        for (let bit of bits) {
            this.currentHighlight[bit] = true;
            let child = this.layoutRef().children()[bit] as BinaryBit;
            const currentHeight = child.position.y();
            yield tween(duration, value => child.position.y(map(currentHeight, currentHeight - 25, value)))
        }
        
        yield* this.updateHighlight(duration);
    }

    protected *updateHighlight(duration: number) {

        for (let i = 0; i < 8; i++) {
            let child = this.layoutRef().children()[i] as BinaryBit;
            if (this.currentHighlight[i]) {
                if (child.opacity() == 1) continue;
                yield tween(duration, value => child.opacity(map(child.opacity(), 1, value)))
            } else {
                if (child.opacity() == 0.2) continue;
                yield tween(duration, value => child.opacity(map(child.opacity(), 0.2, value)))
            }
        }
    }

    public *unHighlight(duration: number, bits: number[]) {
        for (let bit of bits) {
            this.currentHighlight[bit] = false;
            let child = this.layoutRef().children()[bit] as BinaryBit;
            const currentHeight = child.position.y();
            yield tween(duration, value => child.position.y(map(currentHeight, currentHeight + 25, value)))
        }

        if (this.currentHighlight.every(v => !v)) {
            for (let i of this.layoutRef().children()) yield tween(duration, value => i.opacity(map(i.opacity(), 1, value)));
            return
        }
        yield* this.updateHighlight(duration);
    }

    public *set(duration: number, value: number, ripple: boolean = true) {
        let offset = 7;
        let animations = []
        for (let _bit of this.layoutRef().children()) {
            let bit = _bit as BinaryBit;
            animations.push(bit.set(duration, ((value >> offset) & 1) == 1, ripple));
            offset--;
        }

        yield* all(...animations);
    }

}