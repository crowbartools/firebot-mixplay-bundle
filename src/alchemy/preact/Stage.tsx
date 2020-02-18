import * as Mixer from '@mixer/cdk-std';
import { Component, h } from 'preact';

import { MScene, State } from '../State';
import { ResourceHolder } from './Helpers';
import { ReadyOverlayComponent } from './ReadyOverlay';
import { PreactScene } from './Scene';
import * as Firebot from '../FirebotState';
import { Sidebar } from '../../sidebar/sidebar'

/**
 * PreactStage is the bootstrap component for the interactive integration.
 * You may swap this out or customize it if you want, but it shouldn't
 * generally be necessary.
 */
export class PreactStage extends Component<
  { registry: Mixer.Registry },
  { scene: MScene; isReady: boolean; world: any, theme: string }
> {
  private interactive: State;

  public componentWillMount() {
    const i = (this.interactive = new State(this.props.registry));

    i.participant.on('update', ev => this.updateScene(i.participant.group.sceneID));
    i.participant.on('groupUpdate', ev => this.updateScene(ev.sceneID));
    i.world.subscribe(world => {
      Firebot.world.next(world);
      this.setState({ ...this.state, world });
      this.forceUpdate();
    });
    i.isReady.subscribe(isReady => this.setState({ ...this.state, isReady }));

    this.getElixrTheme();
  }

  private getElixrTheme() {
    let globalObj: any = global;
    if(globalObj.chrome && globalObj.chrome.runtime && globalObj.chrome.runtime.sendMessage) {
        globalObj.chrome.runtime.sendMessage("mmfbdcekojokeeonagpnlpoklelkcjon", { query: "getElixrTheme"}, (response) => {
            if(response && response.theme) {
                this.setState({
                    ...this.state,
                    theme: response.theme
                });
            }
        });
    } else if(globalObj.browser && globalObj.browser.runtime && globalObj.browser.runtime.sendMessage) {
        globalObj.browser.runtime.sendMessage("mixrelixr@gmail.com", { query: "getElixrTheme"})
            .then(response => {
                    if(response && response.theme) {
                        this.setState({
                            ...this.state,
                            theme: response.theme
                        });
                    }
                }, 
                () => {}
            );
    }
}

  public render() {
    if (!this.interactive || !this.state.isReady) {
      return <ReadyOverlayComponent config={this.state.world.readyOverlay} />;
    }
    if (!this.state.scene) {
      return;
    }

    const platform = Mixer.display.getSettings().platform;

    return (
      <div>
        
        {this.state.world && this.state.world.sidebar && this.state.world.sidebar.settings.enabled &&
          <Sidebar theme={this.state.theme}></Sidebar>}
        <div class={`stage platform-${platform}`}>{this.getSceneComponent(this.state.scene)}</div>
      </div>
    );
  }

  /**
   * Updates the displayed scene to match the ID.
   */
  protected updateScene(id: string) {
    if (!this.state.scene || this.state.scene.props.sceneID !== id) {
      this.setState({ ...this.state, scene: this.interactive.scenes[id] });
    }
  }

  /**
   * Returns the renderable component for the scene.
   */
  protected getSceneComponent(scene: MScene) {
    const ctor = scene.descriptor().ctor as any;
    return <ResourceHolder resource={scene} component={ctor}/>;
  }
}
