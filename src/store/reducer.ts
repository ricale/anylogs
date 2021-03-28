import { combineReducers } from 'redux';

import status from './status/reducer';
import writings from './writings/reducer';

const rootReducer = combineReducers({
    status,
    writings,
});

export default rootReducer;
