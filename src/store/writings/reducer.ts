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
        case t.REQUEST_GET_WRITINGS: return state;
        case t.FAILURE_GET_WRITINGS: return state;
        case t.SUCCESS_GET_WRITINGS: 
            return {
                ...state,
                list: action.payload,
            };

        case t.REQUEST_CREATE_WRITING: return state;
        case t.FAILURE_CREATE_WRITING: return state;
        case t.SUCCESS_CREATE_WRITING: 
            return {
                ...state,
                detail: action.payload,
            };
        default:
            return state;
    }
}
