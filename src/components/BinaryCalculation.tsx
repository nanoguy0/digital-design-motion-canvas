import { Latex, Layout, Line, Rect, Txt, colorSignal, computed, initial, signal } from "@motion-canvas/2d";
import { SimpleSignal, createRef, all, tween, createSignal, map, ColorSignal, Color, easeInCubic, easeInBounce, easeInElastic, easeInCirc, easeInOutExpo, waitFor } from "@motion-canvas/core";
import { Node, NodeProps } from "@motion-canvas/2d";
import { BinaryByte } from "./BinaryByte";

export interface BinaryCalculationProps extends NodeProps {
    offset?: number;
}

export class BinaryCalculation extends Node {


    public readonly valueA = createRef<BinaryByte>();
    public readonly valueB = createRef<BinaryByte>();
    protected readonly lineRef = createRef<Line>();
    
    protected readonly container = createRef<Layout>();
    protected readonly containerA = createRef<Layout>();
    protected readonly containerB = createRef<Layout>();

    protected readonly carry = createSignal([false, false, false, false, false, false]);

    public constructor(props?: BinaryCalculationProps) {
        super({ ...props, });

        this.add(
            <Layout layout direction={"column"} gap={48} ref={this.container}>
                <Layout clip layout gap={58} marginBottom={-45} marginLeft={10} height={null}>
                    <Txt fill={"#FEFFEC"} fontFamily={"Monospace"} fontSize={25} text={"1"} opacity={() => this.carry()[6] ? 1 : 0}/>
                    <Txt fill={"#FEFFEC"} fontFamily={"Monospace"} fontSize={25} text={"1"} opacity={() => this.carry()[5] ? 1 : 0}/>
                    <Txt fill={"#FEFFEC"} fontFamily={"Monospace"} fontSize={25} text={"1"} opacity={() => this.carry()[4] ? 1 : 0}/>
                    <Txt fill={"#FEFFEC"} fontFamily={"Monospace"} fontSize={25} text={"1"} opacity={() => this.carry()[3] ? 1 : 0}/>
                    <Txt fill={"#FEFFEC"} fontFamily={"Monospace"} fontSize={25} text={"1"} opacity={() => this.carry()[2] ? 1 : 0}/>
                    <Txt fill={"#FEFFEC"} fontFamily={"Monospace"} fontSize={25} text={"1"} opacity={() => this.carry()[1] ? 1 : 0}/>
                    <Txt fill={"#FEFFEC"} fontFamily={"Monospace"} fontSize={25} text={"1"} opacity={() => this.carry()[0] ? 1 : 0}/>
                </Layout>
                <Layout clip width={0} ref={this.containerA}>
                    <BinaryByte ref={this.valueA} />
                </Layout>
                <Layout clip width={0} ref={this.containerB}>
                    <BinaryByte ref={this.valueB} />
                </Layout>
                <Line layout size={"100%"} opacity={1} lineWidth={6} endOffset={590} stroke={"#FEFFEC"} points={() => [[0,0], [570,0]]} ref={this.lineRef} />
            </Layout>
        )

    }

    public *setCarry(position: number) {
        yield this.carry()[position] = true; // yield to force re-render
    }

    public *clearCarry(position: number) {
        yield this.carry()[position] = false; // yield to force re-render
    }

    public *reveal(duration: number) {
        yield* all(this.containerA().width(null, duration/1.5, easeInOutExpo), this.containerB().width(null, duration/1.5, easeInOutExpo), this.lineRef().endOffset(0, duration, easeInOutExpo))
        // yield* waitFor(1)
        // yield* all(this.valueA().revealValue(duration/2), this.valueB().revealValue(duration/2))
    }
    

}