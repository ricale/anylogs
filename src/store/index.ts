import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { RootState } from './types';
import rootSaga from './saga';
import rootReducer from './reducer';

export * from './actions';
export * from './types';

export default function getStore(
    preloadedState: Partial<RootState> = {},
    middlewares: any[] = []
) {
    const composeEnhancers = (
        process.env.NODE_ENV !== 'production' ?
            ((global as any).window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) :
            compose
    );

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(
            applyMiddleware(
                sagaMiddleware,
                ...middlewares
            )
        )
    )
    
    sagaMiddleware.run(rootSaga);

    return store;
}
