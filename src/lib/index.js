export const orderItemFromMenu = (menuItem, quantity) => {
  return {
    ...menuItem,
    quantity
  };
};

export const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const determineItemWidth = noOfItems => {
  const sizeThreshold = 12;
  const width = noOfItems <= sizeThreshold ? '29%' : '23%';
  return width;
};
