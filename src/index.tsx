import * as Mixer from '@mixer/cdk-std';
import { h, render } from 'preact';
import { HtmlStringControl } from './prefabs/html/html';

import { PreactStage } from './alchemy/preact/index';
import { Button as ButtonControl } from './prefabs/button/button';
import { DefaultScene } from './prefabs/default-scene/scene';
import { Joystick as JoystickControl } from './prefabs/joystick/joystick';
import { Label as LabelControl } from './prefabs/label/label';
import { Screen as ScreenControl } from './prefabs/screen/screen';
import { TextBox as TextboxControl } from './prefabs/textbox/textbox';
import { Image as ImageControl } from './prefabs/image/image';
import { StatDisplay as StatDisplayControl } from './prefabs/stat-display/stat-display';

// Import our custom CSS.
require('./style.scss');

// The registry contains a list of all your custom scenes and buttons. You
// should pass them in here so that we're aware of them!
const registry = new Mixer.Registry().register(
  HtmlStringControl,
  ButtonControl,
  JoystickControl,
  DefaultScene,
  LabelControl,
  ScreenControl,
  TextboxControl,
  ImageControl,
  StatDisplayControl
);

// Do the thing!
render(<PreactStage registry={registry} />, document.querySelector('#app'));
