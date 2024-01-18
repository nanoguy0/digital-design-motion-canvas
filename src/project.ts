import {makeProject} from '@motion-canvas/core';

import intro from './scenes/intro?scene';
import numbersystem from './scenes/numbersystem?scene';
import oldintro from './scenes/oldintro?scene';
import videoInProgress from './scenes/videoInProgress?scene';
import slidetransition from './scenes/slidetransition?scene';
export default makeProject({
  scenes: [videoInProgress, slidetransition],
});
