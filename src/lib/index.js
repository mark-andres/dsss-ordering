
export const orderItemFromMenu = (menuItem, quantity) => {
  return {
    ...menuItem,
    quantity
  };
}

export const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}