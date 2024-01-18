import { Txt, makeScene2D, Rect, Layout } from '@motion-canvas/2d';
import { createRef, tween, waitFor, map, easeInBounce, easeInCubic, easeOutCubic, join, Vector2, waitUntil, sequence, slideTransition, Direction, Origin, makeRef } from '@motion-canvas/core';
import { Switch } from '../components/Switch';
import { BinaryBit } from '../components/BinaryBit';
import { BinaryByte } from '../components/BinaryByte';


export default makeScene2D(function* (view) {
    const titleRef = createRef<Layout>();
    const hundredRef = createRef<Rect>();
    const hundredContainerRef = createRef<Layout>();
    const binaryByteContainerRef = createRef<Rect>();
    const binaryByteRef = createRef<BinaryByte>();
    view.add(
        <Layout layout direction={"column"} gap={32} ref={titleRef}>
            <Layout layout direction={"row"} gap={5}>
                <Txt layout text={"Digital Design in "} fontSize={75} fill={"#FEFFEC"} fontFamily={"JetBrains Mono"} />
                <Layout layout ref={hundredContainerRef} justifyContent={"center"} alignContent={"center"} minWidth={230}>
                    <Rect clip layout ref={hundredRef} justifyContent={"center"} textAlign={"center"} marginLeft={15}>
                        <Txt layout fontSize={75} width={"100%"} fill={"#FEFFEC"} fontFamily={"JetBrains Mono"} justifyContent={"center"}>100</Txt>
                    </Rect>
                    <Rect clip layout width={0} ref={binaryByteContainerRef} marginLeft={15} justifyContent={"center"}>
                        <BinaryByte scale={0.75} ref={binaryByteRef} />
                    </Rect>
                </Layout>

                <Txt layout text={"seconds"} fontSize={75} fill={"#FEFFEC"} fontFamily={"JetBrains Mono"} />
            </Layout>
            <Txt text={"@benjamin.bartrim"} fontSize={35} fill={"lightseagreen"} fontFamily={"JetBrains Mono"} />
        </Layout>
    )



    yield* slideTransition(Direction.Left, 1);
    yield* waitFor(0.2);

    yield* hundredRef().height(0, 0.5, easeInCubic);
    hundredRef().remove();
    yield* binaryByteContainerRef().width(500, 0.5, easeInCubic);
    yield* waitFor(0.2);
    binaryByteContainerRef().clip(null)
    yield binaryByteRef().set(1, 100)

    const binaryByteRef2 = createRef<BinaryByte>();

    view.add(
        <Txt stroke="gray" lineWidth={0.5} text={"This is a placeholder animation. Check back for updates!"} ref={binaryByteRef2} fontSize={46} fill={"darkred"} fontFamily={"JetBrains Mono"} opacity={0} y={250}  />
    )
    yield* binaryByteRef2().opacity(1, 0.5, easeInCubic);
    // yield view.position(view.position().addY(-250), 1);
    // yield* titleRef().opacity(0, 1, easeInCubic);
    yield* waitFor(5);

});
