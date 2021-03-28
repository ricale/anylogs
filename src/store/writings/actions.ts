import {
    actionsCreator,
    getActionTypesForAsyncCall,
  } from '../_utils';
  
  export const actionTypes = getActionTypesForAsyncCall([
    'GET_WRITINGS',
    'CREATE_WRITING',
    'UPDATE_WRITING',
    'DELETE_WRITING',
  ]);
  
  export default actionsCreator(actionTypes);
  