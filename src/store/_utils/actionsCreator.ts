import { convertUnderscoreToCamelCase } from 'utils';

import { BaseAction } from '../types';

const baseActionCreator = <T extends BaseAction>(actionType: string) =>
  (data?: any): T => ({
    type: actionType,
    payload: data,
    meta: {
      timestamp: new Date().getTime(),
    },
  } as T);

const actionsCreator = (actionTypes: {[key: string]: string}) => {
  return Object.keys(actionTypes)
    .filter(key => !key.match(/^(SUCCESS|FAILURE)/))
    .reduce((acc, key: string) => {
      acc[convertUnderscoreToCamelCase(key)] = baseActionCreator(key);
      return acc;
    }, {} as { [key: string]: ReturnType<typeof baseActionCreator> });
};

export default actionsCreator;
