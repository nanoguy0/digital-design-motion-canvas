import { Layout, Rect, Txt, makeScene2D, } from "@motion-canvas/2d";
import { Direction, Vector2, all, beginSlide, chain, createRef, easeInBack, easeInCubic, easeInExpo, easeOutBack, easeOutCubic, easeOutExpo, makeRef, sequence, slideTransition, waitFor, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    yield* beginSlide("start");
    const containerRef = createRef<Layout>();

    view.add(
        <Layout layout direction={"row"} gap={32} ref={containerRef} alignItems={"center"} grow={2}>
            {
                [...Array(10)].map((_, i) => {
                    return <Rect fill={"#4f4f4f"} radius={10} height={0} clip>
                        <Txt fill={"white"} fontFamily={"JetBrains Mono"} text={((i + 1) % 10).toString()} margin={15} marginBottom={10} shrink={2} />
                    </Rect>
                })
            }
        </Layout>
    );

    const getContainerChildren = () => containerRef().childrenAs<Rect>();

    // Show numbers
    yield* sequence(
        0.25 / 3,
        ...getContainerChildren().map(i => i.height(null, 0.5, easeOutBack))
    );

    yield* waitUntil("remove 2-9");


    yield* all(
        ...getContainerChildren()
            .slice(1, 9)
            .map(e => e.width(0, 0.5)),
        containerRef().gap(4, 0.5)
    );

    yield* waitUntil("highlight numbers");
    yield* sequence(0.25 / 2, getContainerChildren()[0].ripple(), getContainerChildren()[9].ripple());

    yield* waitUntil("try equate");
    const oneRef = createRef<Rect>();
    const zeroRef = createRef<Rect>();

    let knownCurrentHeight = getContainerChildren()[0].height();
    let knownCurrentWidth = getContainerChildren()[0].width();
    view.add(
        <>
            <Rect layout fill={"#4f4f4f"} ref={oneRef} grow={4} radius={10} height={knownCurrentHeight} width={knownCurrentWidth}>
                <Txt fill={"white"} fontFamily={"JetBrains Mono"} text={"1"} margin={15} marginBottom={10} />
            </Rect>
            <Rect layout fill={"#4f4f4f"} ref={zeroRef} radius={10} height={knownCurrentHeight} width={knownCurrentWidth}>
                <Txt fill={"white"} fontFamily={"JetBrains Mono"} text={"0"} margin={15} marginBottom={10} />
            </Rect>
        </>

    );

    oneRef().absolutePosition(getContainerChildren()[0].absolutePosition());
    zeroRef().absolutePosition(getContainerChildren()[9].absolutePosition());
    containerRef().remove();

    yield* all(
        zeroRef().position(
            new Vector2(-250, -100),
            0.75,
            easeOutCubic,
            Vector2.lerp
        ),
        zeroRef().scale(1.5, 0.5),
        oneRef().position(
            new Vector2(-250, 100),
            0.85,
            easeOutCubic,
            Vector2.lerp
        ),
        oneRef().scale(1.5, 0.5),
    );

    yield* waitUntil("reveal values");
    
    const columns: Layout[] = [];

    view.add(
        <>
            <Layout layout direction={"column"} width={0} ref={makeRef(columns,0)} gap={130} grow={2} clip>
                <Txt fill={"white"} fontFamily={"JetBrains Mono"} text={"="} fontSize={75} />
                <Txt fill={"white"} fontFamily={"JetBrains Mono"} text={"="} fontSize={75}  />
            </Layout>
            <Layout layout direction={"column"} width={0} ref={makeRef(columns,1)} gap={130} clip>
                <Txt fill={"white"} fontFamily={"JetBrains Mono"} text={"0"} fontSize={75}  />
                <Txt fill={"white"} fontFamily={"JetBrains Mono"} text={"1"} fontSize={75}  />
            </Layout>
        </>
    )
    
    columns[0].absolutePosition(zeroRef().absolutePosition().addX(200).addY(100));
    columns[1].absolutePosition(zeroRef().absolutePosition().addX(400).addY(100));

    yield* chain(columns[0].width(null, 0.5), columns[1].width(null, 0.5));


    yield* waitFor(1);
})