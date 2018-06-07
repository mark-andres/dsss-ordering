
export const orderItemFromMenu = (menuItem, quantity) => {
  return {
    ...menuItem,
    quantity
  };
}