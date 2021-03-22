import {
    WritingsState,
    WritingsAction,
} from './types';
import { actionTypes as t } from './actions';

const initialState: WritingsState = {
    list: {} as WritingsState['list'],
};

export default function writingsReducer(
    state = initialState,
    action: WritingsAction,
): WritingsState {
    switch (action.type) {
        case t.FAILURE_GET_WRITINGS: return state;
        case t.SUCCESS_GET_WRITINGS: 
            return {
                ...state,
                list: action.payload,
            };

        case t.FAILURE_CREATE_WRITING:
            return {
                ...state,
                created: {
                    success: false,
                    message: action.payload.message,
                    timestamp: action.meta.timestamp,
                }
            }
        case t.SUCCESS_CREATE_WRITING: 
            return {
                ...state,
                created: {
                    success: true,
                    timestamp: action.meta.timestamp,
                }
            };
        default:
            return state;
    }
}
