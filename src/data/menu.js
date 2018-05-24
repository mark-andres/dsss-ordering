import uuid from 'uuid/v1';

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

export const CHEESE_PIZZA_PRICES = {
  [PIZZA_SIZE.SMALL]: 10,
  [PIZZA_SIZE.MEDIUM]: 12,
  [PIZZA_SIZE.LARGE]: 14,
  [PIZZA_SIZE.EXTRA_LARGE]: 16,
  [PIZZA_SIZE.SICILIAN]: 18
};

export const SPECIALTY_PIZZA_PRICES = {
  [PIZZA_SIZE.SMALL]: 16,
  [PIZZA_SIZE.MEDIUM]: 18,
  [PIZZA_SIZE.LARGE]: 20,
  [PIZZA_SIZE.EXTRA_LARGE]: 22,
  [PIZZA_SIZE.SICILIAN]: 24
};

export const PIZZA_QUALIFIERS = [{
  name: 'EXTRA',
  receiptCaption: 'EXTRA',
  exclusionSet: 'HowMuch',
  action: ['toggle', 'prefix', 'update-quantity'],
  quantity: 1,
  quantityType: 'ADD'
}, {
  name: 'LITE',
  receiptCaption: 'LITE',
  action: ['toggle', 'prefix'],
  exclusionSet: 'HowMuch',
}, {
  name: 'SIDE',
  receiptCaption: 'SD ',
  action: ['toggle', 'prefix', 'add-quantity'],
}, {
  name: 'Half 1',
  receiptCaption: 'H1-',
  exclusionSet: 'WhichPart',
  action: 'toggle;filter',
}, {
  name: 'Half 2',
  receiptCaption: 'H2-',
  exclusionSet: 'WhichPart',
}, {
  name: 'Whole',
  receiptCaption: '',
  exclusionSet: 'WhichPart',
  quantity: 0.5,
  quantityType: 'MULTIPLY',
}, {
  name: 'Prepare',
  exclusionSet: 'CheckMenu',
  items: [
    'Add Oregano after cooked',
    'Well Done',
    'Extra Crispy',
    'Undercooked',
    'Do Not Cut',
    'Dbl cut',
    'Cut in Squares'
  ]
}];

export const PIZZA_MODIFIERS = {
  qualifiers: PIZZA_QUALIFIERS,
  items: [{
    name: 'Pepperoni',
    price: 1.50,
  }, {
    name: 'Beef Sausage',
    price: 1.50,
  }, {
    name: 'Canadian Bacon',
    price: 1.50
  }, {
    name: 'Italian Sausage',
    price: 1.50
  }, {
    name: 'Anchovies',
    price: 1.50
  }, {
    name: 'Meatballs',
    price: 1.50
  }, {
    name: 'Grilled Chicken',
    price: 1.50
  }, {
    name: 'Kalamata Olives',
    price: 2.50
  }, {
    name: 'Ricotta Cheese',
    price: 2.50
  }, {
    name: 'Bell Peppers',
    price: 1.50
  }, {
    name: 'Mushrooms',
    price: 1.50
  }, {
    name: 'Onions',
    price: 1.50
  }, {
    name: 'Black Olives',
    price: 1.50
  }, {
    name: 'Jalapeños',
    price: 1.50
  }, {
    name: 'Eggplant',
    price: 1.50
  }, {
    name: 'Garlic',
    price: 1.50
  }, {
    name: 'Spinach',
    price: 1.50
  }, {
    name: 'Tomatoes',
    price: 1.50
  }, {
    name: 'Artichokes',
    price: 1.50
  }, {
    name: 'Green Olives',
    price: 1.50
  }, {
    name: 'Basil',
    price: 1.50
  }, {
    name: 'Pepperonchini',
    price: 1.50
  }, {
    name: 'Pineapple',
    price: 1.50
  }, {
    name: 'Topping Cheese',
    price: 1.50
  }, {
    name: 'Pizza Sauce',
    price: 1.50
  }, {
    name: 'Olive Oil',
    price: 1.50
  }, {
    name: 'White Sauce',
    price: 1.50
  }, {
    name: 'Pizza Cheese',
    price: 1.50
  }, {
    name: 'Feta Cheese',
    price: 2.50
  }]
};

export const PIZZA_GLOBAL_QUALIFIERS = [{
  name: 'Half/Half'
}];


// Modifiers together with qualifiers represent all possible subitems.
// There are qualifier sets and qualifier actions (prepare).
// Qualfier sets are single choices (either whole , half1, or half2 - either excluded, extra, or lite).
// Qualifiers apply to modifiers as siblings and a subitem is the combination of a qualifier and modifier.
// Certain combinations of qualifier and modifier are prohibited: h1 and h2 cannot qualify cheese or sauce.
// Menu subitems are not present in an order item's subitems.
// Menu subitems are automatically included in the item's price.
// Modifiers exist at the menu (or submenu) level, whereas subitems exist at the menu item level.

export const MENU = {
  [CATEGORY.PIZZA]: {
    name: CATEGORY.PIZZA,
    caption: 'Pizza',
    key: uuid(),
    modifiers: PIZZA_MODIFIERS,
    qualifiers: PIZZA_GLOBAL_QUALIFIERS,
    sizes: PIZZA_SIZE,
    image: 'pizza.jpeg',
    row: 1,
    column: 1,
    items: [{
      name: 'Cheese Pizza',
      conciseName: 'Cheese',
      key: uuid(),
      priceMatrix: CHEESE_PIZZA_PRICES,
    }, {
      name: 'Deluxe Pizza',
      conciseName: 'Deluxe',
      key: uuid(),
      priceMatrix: SPECIALTY_PIZZA_PRICES,
    }, {
      name: 'Spinach Tomato & Garlic',
      conciseName: 'SPG',
      key: uuid(),
      priceMatrix: SPECIALTY_PIZZA_PRICES,
    }, {
      name: 'Veggie Lovers',
      conciseName: 'Veggie',
      key: uuid(),
      priceMatrix: SPECIALTY_PIZZA_PRICES,
    }, {
      name: 'Meat Lovers',
      conciseName: 'Meat',
      key: uuid(),
      priceMatrix: SPECIALTY_PIZZA_PRICES,
    }, {
      name: 'Hawaiian',
      conciseName: 'Hawaiian',
      key: uuid(),
      priceMatrix: SPECIALTY_PIZZA_PRICES,
    }, {
      name: 'Blanco Pie',
      conciseName: 'Blanco',
      key: uuid(),
      priceMatrix: SPECIALTY_PIZZA_PRICES,
    }]
  },
  [CATEGORY.SALADS]: {
    name: 'Salads',
    caption: 'Salads',
    key: uuid(),
    image: 'salad.jpeg',
    row: 1,
    column: 2,
    items: [{
      name: 'Side Salad',
      key: uuid(),
      price: 3.00,
    }, {
      name: 'Side Greek Salad',
      key: uuid(),
      price: 3.50,
    }, {
      name: 'Side Caesar Salad',
      key: uuid(),
      price: 3.50,
    }, {
      name: 'Half Order Cold Antipasto',
      key: uuid(),
      price: 5.00,
    }, {
      name: 'Dinner Salad',
      key: uuid(),
      price: 5.00,
    }, {
      name: 'Caesar Salad',
      key: uuid(),
      price: 7.00,
    }, {
      name: 'Greek Salad',
      key: uuid(),
      price: 7.00,
    }, {
      name: 'Cold Antipasto Salad',
      key: uuid(),
      price: 10.00,
    }, {
      name: 'Small Salad Tray for 10',
      key: uuid(),
      price: 10.00,
    }, {
      name: 'Large Salad Tray for 20',
      key: uuid(),
      price: 10.00,
    }, {
      name: 'Small Greek Tray for 10',
      key: uuid(),
      price: 10.00,
    }, {
      name: 'Large Greek Tray for 20',
      key: uuid(),
      price: 10.00,
    }]
  },
  [CATEGORY.APPETIZERS]: {
    name: 'Appetizers',
    caption: 'Appetizers',
    key: uuid(),
    image: 'appetizers.jpeg',
    row: 1,
    column: 3,
    items: [{
      name: 'Chicken Wings',
      key: uuid(),
      price: 9.00,
    }, {
      name: 'Chicken Tenders',
      key: uuid(),
      price: 8.00,
    }, {
      name: 'Fried Calamari',
      key: uuid(),
      price: 8.00,
    }, {
      name: 'Fried Mushrooms',
      key: uuid(),
      price: 7.00,
    }, {
      name: 'Cheese Sticks',
      key: uuid(),
      price: 7.00,
    }, {
      name: 'Garlic Bread',
      key: uuid(),
      price: 3.00,
    }, {
      name: 'Garlic Cheese Bread',
      key: uuid(),
      price: 4.00,
    }]
  },
  [CATEGORY.SIDES]: {
    name: 'Sides and Sauces',
    caption: 'Sides',
    key: uuid(),
    image: 'sides.jpeg',
    row: 1,
    column: 4,
    items: [{
      name: 'Side Meatballs',
      key: uuid(),
      price: 5.00,
    }, {
      name: 'Kids Spagetti',
      key: uuid(),
      price: 5.00,
    }, {
      name: '1 Meatball',
      key: uuid(),
      price: 1.00,
    }, {
      name: 'Side Anchovies',
      key: uuid(),
      price: 1.00,
    }, {
      name: 'Side Jalapeños',
      key: uuid(),
      price: 1.00,
    }, {
      name: 'Side Pepperoncini',
      key: uuid(),
      price: 1.00,
    }, {
      name: '2oz Dressing',
      key: uuid(),
      price: 0.50,
    }, {
      name: '4oz Dressing',
      key: uuid(),
      price: 1.00,
    }, {
      name: 'Misc Food',
      key: uuid(),
      price: 1.00,
    }, {
      name: 'Out of Area Fee',
      key: uuid(),
      price: 3.00,
    }, {
      name: 'Dinnerware',
      key: uuid(),
    }]
  },
  [CATEGORY.BEVERAGES]: {
    name: 'Beverages',
    caption: 'Beverages',
    key: uuid(),
    image: 'beverages.jpeg',
    row: 1,
    column: 5,
    items: [{
      name: '2-Liters',
      key: uuid(),
      price: 3.00,
    }, {
      name: 'Bottled Water',
      key: uuid(),
      price: 1.50,
    }]
  },
  [CATEGORY.SLICES]: {
    name: 'Slices',
    caption: 'Slice',
    key: uuid(),
    image: 'slice.png',
    row: 2,
    column: 1,
    items: [{
      name: 'Cheese Slice',
      key: uuid(),
      price: 2.50,
    }, {
      name: 'Pepperoni Slice',
      key: uuid(),
      price: 3.00,
    }, {
      name: 'Beef Sausage Slice',
      key: uuid(),
      price: 3.00,
    }, {
      name: 'Supreme Slice',
      key: uuid(),
      price: 4.50,
    }, {
      name: 'Meatlovers Slice',
      key: uuid(),
      price: 4.50,
    }, {
      name: 'Hawaiian Slice',
      key: uuid(),
      price: 4.50,
    }, {
      name: 'Veggie Slice',
      key: uuid(),
      price: 4.50,
    }]
  },
  [CATEGORY.SUBS]: {
    name: 'Subs and Calzones',
    caption: 'Subs',
    key: uuid(),
    image: 'subs.png',
    row: 2,
    column: 2,
    items: [{
      name: 'Calzone',
      key: uuid(),
      price: 9.00,
    }, {
      name: 'Stromboli',
      key: uuid(),
      price: 9.00,
    }, {
      name: 'Meatball Sub',
      key: uuid(),
      price: 8.00,
    }, {
      name: 'Italian Sub',
      key: uuid(),
      price: 8.00,
    }, {
      name: 'Italian Sausage Sub',
      key: uuid(),
      price: 8.00,
    }, {
      name: 'Philly Cheese Steak',
      key: uuid(),
      price: 9.00,
    }, {
      name: 'Chicken Parm Sub',
      key: uuid(),
      price: 9.00,
    }, {
      name: 'Eggplant Parm Sub',
      key: uuid(),
      price: 9.00,
    }, {
      name: 'Grilled Chicken Sub',
      key: uuid(),
      price: 9.00,
    }]
  },
  [CATEGORY.PASTA]: {
    name: 'Entrees',
    caption: 'Pasta',
    key: uuid(),
    image: 'pasta.jpeg',
    row: 2,
    column: 3,
    items: [{
      name: 'Spaghetti w Meatballs',
      key: uuid(),
      price: 10.00,
    }, {
      name: 'Spaghetti w Sausage',
      key: uuid(),
      price: 10.00,
    }, {
      name: 'Spaghetti w Meat Sauce',
      key: uuid(),
      price: 9.00,
    }, {
      name: 'Spaghetti w Sauce',
      key: uuid(),
      price: 9.00,
    }, {
      name: 'Cheese Ravioli',
      key: uuid(),
      price: 8.50,
    }, {
      name: 'Chicken Parmesan',
      key: uuid(),
      price: 12.50,
    }, {
      name: 'Eggplant Parmesan',
      key: uuid(),
      price: 12.50,
    }, {
      name: 'Baked Ziti',
      key: uuid(),
      price: 9.00,
    }, {
      name: 'Lasagna',
      key: uuid(),
      price: 10.00,
    }]
  },
  [CATEGORY.DESSERTS]: {
    name: 'Desserts',
    caption: 'Desserts',
    key: uuid(),
    image: 'cannoli.jpeg',
    row: 2,
    column: 4,
    items: [{
      name: 'Cheesecake',
      key: uuid(),
      price: 3.00,
    }, {
      name: 'Strawberry Cheesecake',
      key: uuid(),
      price: 3.00,
    }, {
      name: 'Cannoli',
      key: uuid(),
      price: 3.00,
    }, {
      name: 'Mini Cannoli',
      key: uuid(),
      price: 1.50,
    }]
  },
};

export const getTopMenu = () => {
  const topMenu = [];
  for (const subMenuName in MENU) {
    topMenu.push(MENU[subMenuName]);
  }
  return topMenu;
}