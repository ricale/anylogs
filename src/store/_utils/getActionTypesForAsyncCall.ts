const getActionTypesForAsyncCall = (actionTypes: string[]) => 
  actionTypes.reduce((
    acc: { [key: string]: string },
    key: string
  ) => {
    ['REQUEST', 'SUCCESS', 'FAILURE'].forEach(prefix => {
      const typeName = `${prefix}_${key}`;
      acc[typeName] = typeName;
    });
    return acc;
  }, {});

export default getActionTypesForAsyncCall;
