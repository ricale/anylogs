import { Writing } from 'models';

import factoryWatchAction from '../_utils/factoryWatchAction';
import { actionTypes as t } from './actions';

export const watchGetWritings = factoryWatchAction(
    t.REQUEST_GET_WRITINGS,
    Writing.get
);

export const watchGetWriting = factoryWatchAction(
    t.REQUEST_GET_WRITING,
    Writing.find
);

export const watchCreateWriting = factoryWatchAction(
    t.REQUEST_CREATE_WRITING,
    Writing.create
);
