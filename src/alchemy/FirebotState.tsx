import { EventEmitter } from 'eventemitter3';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface ISidebarConfig {
    settings: {
        enabled: boolean
    },
    streamer: {
        username: string,
        userId: number,
        channelId: number
    }
}

export interface IMixPlayWorld {
    sidebar: ISidebarConfig
}

export interface IFirebotState {
    /**
     * Whether or not grid controls should be shown
     */
    gridControls: boolean;
}

const initialFirebotState: IFirebotState = {
    gridControls: true
}

export function updateFirebotState(newState: IFirebotState) {
    state.next(newState);
}

export const world = new BehaviorSubject<IMixPlayWorld>(null);
export const state = new BehaviorSubject<IFirebotState>(initialFirebotState);
