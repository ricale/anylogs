import { combineReducers } from 'redux';

import writings from './writings/reducer';

const rootReducer = combineReducers({
    writings,
});

export default rootReducer;
