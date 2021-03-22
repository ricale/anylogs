import { Writing } from 'models';

import factoryWatchAction from '../_utils/factoryWatchAction';
import { actionTypes as t } from './actions';

async function getWritings() {
    return await Writing.get();
}

async function createWriting(payload: any) {
    return await Writing.create(payload);
}

export const watchGetWritings = factoryWatchAction(
    t.REQUEST_GET_WRITINGS,
    getWritings
);

export const watchCreateWriting = factoryWatchAction(
    t.REQUEST_CREATE_WRITING,
    createWriting
);
