export const createTypes = typePrefix => ({
  INITIAL: `${typePrefix}_INITIAL`,
  DOING: `${typePrefix}_DO`,
  SUCCESS: `${typePrefix}_SUCCESS`,
  FAILED: `${typePrefix}_FAILED`,
});

export const createAction = (type, args) => ({
  ...args,
  type,
});

export const transformNetworkError = error => {
  if (!error.response) {
    return {
      status: 404,
      statusText: error.message,
    };
  }
  return {
    status: error.response.status,
    statusText: error.response.statusText,
  };
};
