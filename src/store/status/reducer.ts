import { BaseAction } from '../types';

import { actionTypes as writingActionTypes } from '../writings/actions';

import { StatusMessage, StatusState } from './types';

type Passlist = Record<
    string,
    Omit<StatusMessage, 'timestamp'>
>
const PASSLIST: Passlist = {
    [writingActionTypes.SUCCESS_CREATE_WRITING]: {
        type: 'success',
        content: 'success create writing',
    },
};

const initialState: StatusState = {
};

export default function statusReducer(
    state = initialState,
    action: BaseAction
): StatusState {
    if(Object.keys(PASSLIST).includes(action.type)) {
        return {
            ...state,
            message: {
                ...PASSLIST[action.type],
                timestamp: action.meta.timestamp,
            },
        };
    }

    if(action.type.match(/^FAILURE_/)) {
        return {
            ...state,
            message: {
                type: 'failure',
                content: action.meta.message || '',
                timestamp: action.meta.timestamp,
            },
        };
    }

    return state;
}
