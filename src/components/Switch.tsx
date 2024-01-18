import {
    Circle,
    Node,
    NodeProps,
    Rect,
    Txt,
    colorSignal,
    initial,
    signal,
  } from '@motion-canvas/2d';
  import {
    Color,
    ColorSignal,
    PossibleColor,
    SignalValue,
    SimpleSignal,
    all,
    chain,
    createRef,
    createSignal,
    easeInOutCubic,
    sequence,
    tween,
    waitFor,
  } from '@motion-canvas/core';
  
  export interface SwitchProps extends NodeProps {
    initialState?: SignalValue<boolean>;
    accent?: SignalValue<PossibleColor>;
  }
  
  export class Switch extends Node {
    @initial(false)
    @signal()
    public declare readonly initialState: SimpleSignal<boolean, this>;
  
    @initial('#68ABDF')
    @colorSignal()
    public declare readonly accent: ColorSignal<this>;
  
    private isOn: boolean;
    private readonly indicatorPosition = createSignal(0);
    private readonly offColor = new Color('#343434');
    private readonly indicator = createRef<Circle>();
    private readonly container = createRef<Rect>();
  
    public constructor(props?: SwitchProps) {
      super({
        ...props,
      });
  
      this.isOn = this.initialState();
      this.indicatorPosition(this.isOn ? 50 : -50);
  
      this.add(
        <Rect
          ref={this.container}
          fill={this.isOn ? this.accent() : this.offColor}
          size={[200, 100]}
          radius={100}
        >
          <Circle
            x={() => this.indicatorPosition()}
            ref={this.indicator}
            size={[80, 80]}
            fill="#ffffff"
          />
        </Rect>,
      );
    }
  
    public *toggle(duration: number) {
      yield* all(
        tween(duration, value => {
          const oldColor = this.isOn ? this.accent() : this.offColor;
          const newColor = this.isOn ? this.offColor : this.accent();
  
          this.container().fill(
            Color.lerp(oldColor, newColor, easeInOutCubic(value)),
          );
        }),
  
        tween(duration, value => {
          const currentPos = this.indicator().position();
  
          this.indicatorPosition(
            easeInOutCubic(value, currentPos.x, this.isOn ? -50 : 50),
          );
        }),
      );
      this.isOn = !this.isOn;
    }

    public *showWierd(duration: number) {
      const questionMark = createRef<Txt>();
      this.add(<Txt text={"?"} rotation={25} fill={"white"} fontSize={75} x={50} y={-50} opacity={0} ref={questionMark}/>)

      yield* chain(
        // move to the center and color orange
        all(
          tween(duration, value => {  
            this.container().fill(
              Color.lerp(this.isOn ? this.accent() : this.offColor, "orange", easeInOutCubic(value)),
            );
          }),
    
          tween(duration, value => {
            const currentPos = this.indicator().position();
    
            this.indicatorPosition(
              easeInOutCubic(value, currentPos.x, 0),
            );
          }),
        ),
        waitFor(0.5),
        // animate a question mark appearing
        all(
          questionMark().opacity(1, 0.5),
          questionMark().position({x: 100, y: -75}, 0.5, easeInOutCubic),
        ),
        // animate a question mark disappearing and the switch returning to normal
        waitFor(1),
        all(
          questionMark().opacity(0, 0.5),
          tween(duration, value => {  
            this.container().fill(
              Color.lerp("orange", this.isOn ? this.accent() : this.offColor, easeInOutCubic(value)),
            );
          }),
    
          tween(duration, value => {
            const currentPos = this.indicator().position();
    
            this.indicatorPosition(
              easeInOutCubic(value, currentPos.x, this.isOn ? 50 : -50),
            )
          }),
        ),
      );

      questionMark().remove();
    }
  }