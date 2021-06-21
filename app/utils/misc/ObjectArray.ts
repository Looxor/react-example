const orderBy = (objects, orderByKey, desc = false) => {
  if (typeof orderByKey === 'function') {
    return objects.sort(orderByKey);
  } else if (desc) {
    return objects.sort((b, a) =>
      a[orderByKey] < b[orderByKey]
        ? -1
        : a[orderByKey] > b[orderByKey]
        ? 1
        : 0,
    );
  } else {
    return objects.sort((a, b) =>
      a[orderByKey] < b[orderByKey]
        ? -1
        : a[orderByKey] > b[orderByKey]
        ? 1
        : 0,
    );
  }
};

export {orderBy};
