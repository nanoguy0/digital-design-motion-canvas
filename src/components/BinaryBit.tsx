import { Latex, Layout, Rect, Txt, colorSignal, computed, initial, signal } from "@motion-canvas/2d";
import { SimpleSignal, createRef, all, tween, createSignal, map, ColorSignal, Color } from "@motion-canvas/core";
import { Node, NodeProps } from "@motion-canvas/2d";

export interface BinaryBitProps extends NodeProps {
    offset?: number;
}

export class BinaryBit extends Node {


    public readonly state = createSignal("0");
    private readonly value = createRef<Txt>();
    private readonly container = createRef<Rect>();
    private readonly baseIndicator = createRef<Latex>();


    public constructor(props?: BinaryBitProps) {
        super({ ...props, });

        this.add(
            <Layout layout direction={"column"} >
                <Latex gap={12} clip tex={`\\color{white} 2^${props.offset || 0}`} height={0} marginBottom={null} alignSelf={"center"} size={25} ref={this.baseIndicator}/>
                <Rect
                    layout
                    fill={"#4f4f4f"}
                    width={60}
                    height={75}
                    radius={15}
                    justifyContent={"center"}
                    alignItems={"center"}

                    ref={this.container}
                >
                    <Txt
                        marginTop={8}
                        fontSize={50}
                        fill={"#ffffff"}
                        fontFamily={'JetBrains Mono'}
                        text={this.state}
                        ref={this.value}
                    />
                </Rect>
            </Layout>
        )

    }

    public *revealBase(duration: number) {
        yield* all(this.baseIndicator().height(null, duration), this.baseIndicator().margin.bottom (12, duration))
    }

    public *hideBase(duration: number) {
        yield* all(this.baseIndicator().height(0, duration), this.baseIndicator().margin.bottom (null, duration))
    }

    public *toggle(duration: number, ripple: boolean = true) {
        this.state(this.state() == "0" ? "1" : "0");
        if (ripple) yield this.container().ripple(duration);
        yield* tween(duration, value => {

            this.state() == "1" ?
                this.container().fill(Color.lerp("#4f4f4f", "#68ABDF", value))
                :
                this.container().fill(Color.lerp("#68ABDF", "#4f4f4f", value))
        })
        
    }

    public *set(duration: number, value: boolean, ripple: boolean = true) {
        // check if value is different from current state
        if (value == (this.state() == "1")) {
            return;
        }

        // set state
        yield* this.toggle(duration, ripple);
    }
}