import { Txt, makeScene2D, Rect, Layout } from '@motion-canvas/2d';
import { createRef, tween, waitFor, map, easeInBounce, easeInCubic, easeOutCubic, join, Vector2, waitUntil, sequence, slideTransition, Direction, Origin, makeRef } from '@motion-canvas/core';
import { Switch } from '../components/Switch';
import { BinaryBit } from '../components/BinaryBit';
import { BinaryByte } from '../components/BinaryByte';


export default makeScene2D(function* (view) {
 
    view.add(<Rect opacity={0}></Rect>);
    yield* slideTransition(Direction.Left, 1);
    yield* waitFor(0.5);
});
