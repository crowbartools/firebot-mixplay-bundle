import { Component, h } from 'preact';

import { classes } from '../alchemy/Style';

import * as Firebot from "../alchemy/FirebotState";

import "./sidebar.scss";

export class Sidebar extends Component<{ theme: string }, { 
    sidebar: Firebot.ISidebarConfig, 
    firebotState: Firebot.IFirebotState, 
    tippy: any
}> {

    private streamerAvatarUrl = null;

    public componentWillMount() {

        Firebot.world.subscribe(world => {
            if(world && world.sidebar) {
                this.setState({
                    ...this.state,
                    sidebar: world.sidebar
                });
                this.updateStreamerAvatarUrl();
            }
        });

        Firebot.state.subscribe(state => {
            if(state) {
                this.setState({
                    ...this.state,
                    firebotState: state
                });
            }
        });        
    }


    public componentDidMount() {
        this.refresh();
    }

    public componentDidUpdate() {
        this.refresh();
    }

    public componentWillUnmount() {
    }

    public refresh() {
    }

    public toggleGridControls() {
        let currentState = Firebot.state.getValue();
        Firebot.updateFirebotState({
            ...currentState,
            gridControls: !currentState.gridControls
        })
    }

    public updateStreamerAvatarUrl() {
        this.streamerAvatarUrl = `https://mixer.com/api/v1/users/${this.state.sidebar.streamer.userId}/avatar?w=50&h=50`;
    }

    public render() {
        return (
            <div className={'firebot-sidebar ' + this.props.theme}>
                <div data-tippy-content="Toggle Grid Controls" data-tippy-placement="left" data-tippy-distance="20" class={classes({ "sidebar-btn": true, unselected: !this.state.firebotState.gridControls})} onClick={this.toggleGridControls}>
                    <i class={classes({ fas: true, "fa-game-board-alt": true })}></i>
                </div>
                <div style="margin-top: 10px;" >{this.streamerAvatarUrl && <img src={this.streamerAvatarUrl} style="width: 25px;height: 25px;border-radius: 25px;"></img>}</div>
            </div>
        )
    }
}