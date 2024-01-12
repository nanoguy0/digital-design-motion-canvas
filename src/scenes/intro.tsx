import { Txt, makeScene2D, Rect, Layout } from '@motion-canvas/2d';
import { createRef, tween, waitFor, map, easeInBounce, easeInCubic, easeOutCubic, join, Vector2, waitUntil, sequence, slideTransition, Direction, Origin, makeRef } from '@motion-canvas/core';
import { Switch } from '../components/Switch';
import { BinaryBit } from '../components/BinaryBit';
import { BinaryByte } from '../components/BinaryByte';


export default makeScene2D(function* (view) {
    const switchRef = createRef<Switch>();

    view.add(
        <Switch ref={switchRef} initialState={true} scale={0} />
    )

    yield* waitUntil("show_switch");   
    yield* switchRef().scale(1, 1);

    yield* waitUntil("turn_off_switch")
    yield* switchRef().toggle(1);

    yield* waitUntil("turn_on_switch");
    yield* switchRef().toggle(1);

    yield* waitUntil("morph_into_bit");

    const binaryBitRef = createRef<BinaryBit>();
    view.add(
        <BinaryBit ref={binaryBitRef} scale={0} />
    )
    yield* switchRef().scale(0, 0.25, easeOutCubic)
    switchRef().remove();
    yield* binaryBitRef().scale(2.5, 0.75, easeInCubic)

    yield* waitUntil("toggle_bit");
    yield* binaryBitRef().toggle(1);
    yield* waitUntil("toggle_bit_2");
    yield* binaryBitRef().toggle(1);

    yield* waitUntil("transition_to_author");

    yield* binaryBitRef().opacity(0, 0.5, easeInCubic);
    binaryBitRef().remove();

    const hundredRef = createRef<Rect>();
    const hundredContainerRef = createRef<Layout>();
    const binaryByteContainerRef = createRef<Rect>();
    const binaryByteRef = createRef<BinaryByte>();
    view.add(
        <Layout layout direction={"column"} gap={32} >
            <Layout layout direction={"row"} gap={5}>
                <Txt layout text={"Digital Design in "} fontSize={75} fill={"#FEFFEC"} fontFamily={"JetBrains Mono"} />
                <Layout  layout ref={hundredContainerRef} justifyContent={"center"} alignContent={"center"} minWidth={230}>
                    <Rect clip layout ref={hundredRef}  justifyContent={"center"} textAlign={"center"} marginLeft={15}>
                        <Txt layout fontSize={75} width={"100%"} fill={"#FEFFEC"} fontFamily={"JetBrains Mono"} justifyContent={"center"}>100</Txt>
                    </Rect>
                    <Rect clip layout width={0} ref={binaryByteContainerRef} marginLeft={15} justifyContent={"center"}>
                        <BinaryByte scale={0.75} ref={binaryByteRef}/>
                    </Rect>
                </Layout>
                
                <Txt layout text={"seconds"} fontSize={75} fill={"#FEFFEC"} fontFamily={"JetBrains Mono"} />
            </Layout>
            <Txt text={"@benjamin.bartrim"} fontSize={35} fill={"lightseagreen"} fontFamily={"JetBrains Mono"}/>
        </Layout>
    )



    yield* slideTransition(Direction.Left, 1);
    yield* waitFor(1);

    yield* hundredRef().height(0, 0.5, easeInCubic);
    hundredRef().remove();
    yield* binaryByteContainerRef().width(500, 0.5, easeInCubic);
    yield* waitFor(1);
    binaryByteContainerRef().clip(null)
    yield* binaryByteRef().set(1, 100)
    
    yield* waitUntil("end");

});
