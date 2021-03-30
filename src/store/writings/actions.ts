import {
    actionsCreator,
    getActionTypesForAsyncCall,
  } from '../_utils';
  
  export const actionTypes = getActionTypesForAsyncCall([
    'GET_WRITINGS',
    'GET_WRITING',
    'CREATE_WRITING',
    'UPDATE_WRITING',
    'DELETE_WRITING',
  ]);
  
  export default actionsCreator(actionTypes);
  