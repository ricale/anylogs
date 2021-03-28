import { BaseAction } from '../types';
import { StatusState } from './types';

const WHITELIST = {

}

const initialState: StatusState = {
}

export default function statusReducer(
    state = initialState,
    action: BaseAction
): StatusState {
    if(action.type.match(/^FAILURE_/)) {
        return {
            ...state,
            message: {
                type: 'failure',
                content: action.meta.message || '',
                timestamp: action.meta.timestamp,
            }
        }
    }
    return state;
}
