import { put, retry, takeEvery } from 'redux-saga/effects';

import { BaseAction } from '../types';

export default function factoryWatchAction(
  actionType: string,
  dataGetter: (...args: any) => any
  // apiCall: Function
) {
  return function* watchFetch() {
    yield takeEvery(actionType, function* (action: BaseAction) {
      try {
        const successActionType = actionType.replace('REQUEST_', 'SUCCESS_');
        // TODO:
        // 조건부 retry 가 가능한지 (403 일 때만 가능한지) 확인할 것
        const data = yield dataGetter(action.payload);
        yield put({
          type: successActionType,
          requestParams: action.payload,
          payload: data,
          meta: {
            timestamp: new Date().getTime(),
          },
        });
        return;

      } catch (e) {
        const errorActionType = actionType.replace('REQUEST_', 'FAILURE_');
        yield put({
          type: errorActionType,
          requestParams: action.payload,
          payload: e,
          meta: {
            timestamp: new Date().getTime(),
            message: errorActionType,
          },
        });
      }
    });
  };
}
