import {Circle, Rect, Txt, makeScene2D, View2D} from '@motion-canvas/2d';
import {createRef, tween, waitFor, map, easeInBounce, easeInCubic, easeOutCubic, join, Vector2, slideTransition, Direction, waitUntil} from '@motion-canvas/core';
import { BinaryBit } from '../components/BinaryBit';
import { Switch } from '../components/Switch';
import { BinaryByte } from '../components/BinaryByte';
import { BinaryCalculation } from '../components/BinaryCalculation';

export default makeScene2D(function* (view) {
  // yield* demoSwitch(view);
  // yield* demoBinaryBit(view);
  // view.children()[0].remove();
  // yield slideTransition(Direction.Left, 1);
  // yield* demoBinaryByte(view);
  // yield* demoBinaryCalculation(view);
});

function* demoSwitch(view: View2D) {
  const switchRef = createRef<Switch>();
  view.add(
    <>
      <Switch ref={switchRef} initialState={false}/>
    </>
  )  
  
  yield* switchRef().toggle(1);
  yield* switchRef().toggle(1);

  return switchRef;
}

function* demoBinaryBit(view: View2D) {
  const binaryBitRef = createRef<BinaryBit>();

  view.add(
    <>
      <BinaryBit ref={binaryBitRef}/>
    </>
  )

  yield* binaryBitRef().toggle(1);
  yield* binaryBitRef().toggle(1);
  yield* waitFor(1)
}

function* demoBinaryByte(view: View2D) {
  const binaryByteRef = createRef<BinaryByte>();

  view.add(
    <>
      <BinaryByte ref={binaryByteRef}/>
    </>
  )
  
  yield* binaryByteRef().set(1, 0x5);
  yield* waitFor(1)
  yield* binaryByteRef().highlight(0.25, [0,1,4,5])
  yield* waitFor(1)
  yield* binaryByteRef().unHighlight(0.25, [0,5])
  yield* waitFor(1)

  yield* binaryByteRef().unHighlight(0.25, [1,4])
  
  yield* waitUntil("show_value")
  yield* binaryByteRef().revealValue(0.4);
  yield* waitFor(1)
  // for (let i = 0; i < 256; i++) {
  //   yield* binaryByteRef().set(0.1, i, false );
  //   yield* waitFor(0.08)
  // }
  yield* binaryByteRef().revealBase(0.4);
  yield* waitFor(1)
  yield* binaryByteRef().hideBase(0.4);
  yield* waitFor(1)
  yield* binaryByteRef().hideValue(0.4);
  yield* waitFor(1)
}

function *demoBinaryCalculation(view: View2D) {
  const binaryCalculationRef = createRef<BinaryCalculation>();
  view.add(
    <>
      <BinaryCalculation ref={binaryCalculationRef}/>
    </>
  )
  yield* waitFor(1) 
  yield* binaryCalculationRef().reveal(1);
  yield* waitFor(1)
}