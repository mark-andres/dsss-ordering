export const CATEGORY = {
    PIZZA: 'Pizza',
    SALADS: 'Salads',
    APPETIZERS: 'Appetizers',
    SIDES: 'Sides',
    BEVERAGES: 'Beverages',
    SLICES: 'Slice',
    SUBS: 'Subs',
    PASTA: 'Pasta',
    DESSERTS: 'Desserts'
};

export const PIZZA_SIZE = {
  SMALL: 'Small',
  MEDIUM: 'Medium',
  LARGE: 'Large',
  EXTRA_LARGE: 'Extra Large',
  SICILIAN: 'Sicilian'
};

const categories = [
  {
    category: 'Pizza',
    isActive: true,
    row: 1,
    column: 1
  },
  {
    category: 'Salads',
    isActive: false,
    row: 1,
    column: 2
  },
  {
    category: 'Appetizers',
    isActive: false,
    row: 1,
    column: 3
  },
  {
    category: 'Sides',
    isActive: false,
    row: 1,
    column: 4
  },
  {
    category: 'Beverages',
    isActive: false,
    row: 1,
    column: 5
  },
  {
    category: 'Slice',
    isActive: false,
    row: 2,
    column: 1
  },
  {
    category: 'Subs',
    isActive: false,
    row: 2,
    column: 2
  },
  {
    category: 'Pasta',
    isActive: false,
    row: 2,
    column: 3
  },
  {
    category: 'Desserts',
    isActive: false,
    row: 2,
    column: 4
  },
  {
    category: 'Beer & Wine',
    isActive: false,
    row: 2,
    column: 5
  }
];

export default categories;