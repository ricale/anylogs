import { all } from 'redux-saga/effects';

import * as writingsWatchers from './writings/saga';

function watchAll(...args: any[]) {
    return all(
        args.reduce((acc: any[], watchers) =>
            acc.concat(
                Object.keys(watchers).map(key => watchers[key]())
            ),
            []
        )
    );
}

export default function* rootSaga() {
    yield watchAll(
        writingsWatchers
    );
}
