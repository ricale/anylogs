import { Reducer, CombinedState } from "redux";

import { StatusState } from './status/types';
import { WritingsState } from './writings/types';

export interface RootState {
    status: StatusState
    writings: WritingsState
}

export type BaseAction = {
    type: string
    requestParams?: any
    payload?: any
    meta: {
        timestamp: number
        message?: string
    }
}

export type RootReducer = Reducer<CombinedState<RootState>, BaseAction>

export * from './status/types';
export * from './writings/types';
