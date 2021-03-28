import React from 'react';
import { Provider } from 'react-redux';

import AppRouter from 'router';
import getStore from 'store';
import { ToastMessages } from 'store-components';

const store = getStore();

const AppBody = () => {
    return (
        <Provider store={store}>
            <AppRouter />
            <ToastMessages />
        </Provider>
    );
};

export default AppBody;
