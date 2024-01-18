import { Txt, makeScene2D, Rect, Layout, SVG, Img, View2D } from '@motion-canvas/2d';
import { createRef, tween, waitFor, map, easeInBounce, easeInCubic, easeOutCubic, join, Vector2, waitUntil, sequence, slideTransition, Direction, Origin, makeRef, loadImage, getImageData, beginSlide, Player, useScene, useContext, useThread, useContextAfter, useTransition, createSignal } from '@motion-canvas/core';


export default makeScene2D(function* (view) {
    yield* beginSlide("test");

    const key = createSignal("a");
    document.addEventListener("keydown", (e) => {
        console.log(e.key);
        key(e.key);
    });
    view.add(
        <Txt text={key} fill={"white"} fontSize={200} fontFamily={"JetBrains Mono"}/>
    )

    yield* slideTransition(Direction.Left, 0.5);
    yield* beginSlide("test2");

});
