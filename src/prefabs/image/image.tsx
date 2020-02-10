import * as Mixer from '@mixer/cdk-std';
import { h } from 'preact';
import { PreactControl } from '../../alchemy/preact';
import { blockRule } from '../../alchemy/Style';

import './image.scss';

function sanitizeCSS(styles: string) {
  let newStyles = styles;
  if (!newStyles) {
    return;
  }
  const index = newStyles.indexOf(';');
  if (index >= 0) {
    newStyles = newStyles.substr(0, index);
  }
  return newStyles;
}

/**
 * Image is an extended Firebot control
 */
@Mixer.Control({ kind: 'image' })
export class Image extends PreactControl {
  /**
   * The url to an image.
   */
  @Mixer.Input() public imageUrl: string;

  /**
   * The border radius the image.
   */
  @Mixer.Input() public borderRadius: string;

  /**
   * A tooltip for the image.
   */
  @Mixer.Input() public tooltip: string;

  public render() {
    const { controlID } = this.props;
    return (
      <div key={`control-${controlID}`} class="mixer-image-container" name={`control-${controlID}`}>
        {this.renderCustomStyleBlock()}
        <div class="mixer-image" title={this.tooltip || ''} data-tippy-arrow></div>
      </div>
    );
  }

  private renderCustomStyleBlock = () => {
    const { controlID } = this.props;
    return (
      <style>
        {// Custom styles for the image
        blockRule(controlID, '.mixer-image', {
          backgroundImage: this.imageUrl
            ? `url('https://images.mixerusercontent.com/x/${this.imageUrl}')`
            : null,
          borderRadius: sanitizeCSS(this.borderRadius),
        })}
      </style>
    );
  };
}
