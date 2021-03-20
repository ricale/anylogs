import Model from 'models';

import factoryWatchAction from '../_utils/factoryWatchAction';
import { actionTypes as t } from './actions';

async function getWritings() {
    return await Model.getWritings();
}

async function createWriting(data: any) {
    return await Model.saveWriting(data);
}

export const watchGetWritings = factoryWatchAction(
    t.REQUEST_GET_WRITINGS,
    getWritings
);

export const watchCreateWriting = factoryWatchAction(
    t.REQUEST_CREATE_WRITING,
    createWriting
);
