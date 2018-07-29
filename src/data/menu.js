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

const HAWAIAN_PIZZA_PRICES = {
  [PIZZA_SIZE.SMALL]: 13,
  [PIZZA_SIZE.MEDIUM]: 15,
  [PIZZA_SIZE.LARGE]: 17,
  [PIZZA_SIZE.EXTRA_LARGE]: 19,
  [PIZZA_SIZE.SICILIAN]: 21
}

const BLANCO_PIZZA_PRICES = {
  [PIZZA_SIZE.SMALL]: 12,
  [PIZZA_SIZE.MEDIUM]: 14,
  [PIZZA_SIZE.LARGE]: 16,
  [PIZZA_SIZE.EXTRA_LARGE]: 18,
  [PIZZA_SIZE.SICILIAN]: 20
};

const SPECIALTY_PIZZA_TOPPING_PRICES = {
  [PIZZA_SIZE.SMALL]: 2,
  [PIZZA_SIZE.MEDIUM]: 2,
  [PIZZA_SIZE.LARGE]: 2.50,
  [PIZZA_SIZE.EXTRA_LARGE]: 2.50,
  [PIZZA_SIZE.SICILIAN]: 2.50
};

export const SALAD_QUALIFIERS = [{
  name: 'EXTRA',
  internalName: 'extra',
  receiptCaption: 'EXTRA',
  id: 'extra',
}, {
  name: 'LITE',
  internalName: 'lite',
  receiptCaption: 'LITE',
  id: 'lite',
}, {
  name: 'SIDE',
  internalName: 'side',
  receiptCaption: 'SD ',
  id: 'side',
}, {
  name: 'Prepare',
  id: 'prepare',
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

export const PIZZA_QUALIFIERS = [{
  name: 'EXTRA',
  internalName: 'extra',
  receiptCaption: 'EXTRA',
  id: 'extra',
}, {
  name: 'LITE',
  internalName: 'lite',
  receiptCaption: 'LITE',
  id: 'lite',
}, {
  name: 'SIDE',
  internalName: 'side',
  receiptCaption: 'SD ',
  id: 'side',
}, {
  name: 'Half 1',
  internalName: 'h1',
  receiptCaption: 'H1-',
  id: 'h1',
}, {
  name: 'Half 2',
  internalName: 'h2',
  receiptCaption: 'H2-',
  id: 'h2',
}, {
  name: 'Whole',
  internalName: 'whole',
  receiptCaption: '',
  id: 'whole',
}, {
  name: 'Prepare',
  id: 'prepare',
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

export const MENU_TYPE = {
  MODIFIERS_MENU: 'MODIFIERS_MENU',
  ITEMS_MENU: 'ITEMS_MENU',
  CHOICES_MENU: 'CHOICES_MENU',
  SIZES_MENU: 'SIZES_MENU'
}

export const SUBS_MODIFIERS = {
  name: 'Subs Modifiers',
  caption: 'Subs and Calzones Modifiers',
  type: MENU_TYPE.MODIFIERS_MENU,
  key: uuid(),
  qualifiers: PIZZA_QUALIFIERS,
  items: [{
    name: 'Pepperoni',
    price: 0.50,
  }, {
    name: 'Beef Sausage',
    price: 0.50,
  }, {
    name: 'Canadian Bacon',
    price: 0.50
  }, {
    name: 'Italian Sausage',
    price: 1.00
  }, {
    name: 'Anchovies',
    price: 1.00
  }, {
    name: 'Meatballs',
    price: 1.00
  }, {
    name: 'Grilled Chicken',
    price: 1.00
  }, {
    name: 'Ham',
    price: 1.00
  }, {
    name: 'Salami',
    price: 1.00
  }, {
    name: 'Steak',
    price: 1.00
  }, {
    name: 'Bell Peppers',
    price: 0.50
  }, {
    name: 'Mushrooms',
    price: 0.50
  }, {
    name: 'Onions',
    price: 0.50
  }, {
    name: 'Black Olives',
    price: 0.50
  }, {
    name: 'Jalapeños',
    price: 0.50
  }, {
    name: 'Eggplant',
    price: 1.00
  }, {
    name: 'Garlic',
    price: 1.00
  }, {
    name: 'Spinach',
    price: 1.00
  }, {
    name: 'Tomatoes',
    price: 1.00
  }, {
    name: 'Artichokes',
    price: 1.00
  }, {
    name: 'Green Olives',
    price: 1.00
  }, {
    name: 'Basil',
    price: 1.00
  }, {
    name: 'Pepperonchini',
    price: 1.00
  }, {
    name: 'Pineapple',
    price: 1.00
  }, {
    name: 'Provolone',
    price: 1.00
  }, {
    name: 'Pizza Sauce',
    price: 0.50
  }, {
    name: 'Olive Oil',
    price: 1.00
  }, {
    name: 'Ricotta',
    price: 1.00
  }, {
    name: 'Pizza Cheese',
    price: 0.50
  }, {
    name: 'Feta Cheese',
    price: 1.00
  }, {
    name: 'Lettuce',
    price: 0.50
  }, {
    name: 'Italian',
    price: 0.50
  }, {
    name: 'Breaded Chicken Fillet',
    price: 1.00
  }]
};

export const SALADS_MODIFIERS = {
  name: 'Salads Modifiers',
  caption: 'Salads Modifiers',
  type: MENU_TYPE.MODIFIERS_MENU,
  key: uuid(),
  qualifiers: SALAD_QUALIFIERS,
  items: [{
    name: 'Tomatoes',
    price: 0.50,
  }, {
    name: 'Pepperoni',
    price: 0.50,
  }, {
    name: 'Ham',
    price: 0.50,
  }, {
    name: 'Provolone',
    price: 0.50,
  }, {
    name: 'Salami',
    price: 1.00,
  }, {
    name: 'Green Peppers',
    price: 0.50,
  }, {
    name: 'Onions',
    price: 0.50,
  }, {
    name: 'Black Olives',
    price: 0.50,
  }, {
    name: 'Mozzarella',
    price: 0.50,
  }, {
    name: 'Chicken',
    price: 1.00,
  }, {
    name: 'Lettuce',
    price: 0.50,
  }, {
    name: 'Feta Cheese',
    price: 1.00,
  }, {
    name: 'Croutons',
    price: 0.50,
  }, {
    name: 'Pepperoncini',
    price: 1.00,
  }, {
    name: 'Parmesan',
    price: 0.50,
  }, {
    name: 'Greek Olives',
    price: 1.00,
  }, {
    name: 'Mushroom',
    price: 0.50,
  }, {
    name: 'Artichokes',
    price: 1.00
  }]
};

export const PIZZA_MODIFIERS = {
  name: 'Pizza Modifiers',
  caption: 'Pizza Modifiers',
  type: MENU_TYPE.MODIFIERS_MENU,
  key: uuid(),
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
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: 'Meatballs',
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: 'Grilled Chicken',
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: 'Kalamata Olives',
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: 'Ricotta Cheese',
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: '__blank__',
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
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: 'Garlic',
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: 'Spinach',
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: 'Tomatoes',
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: 'Artichokes',
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: 'Green Olives',
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: 'Basil',
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: 'Pepperonchini',
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: 'Pineapple',
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: 'Topping Cheese',
    price: 1.50
  }, {
    name: 'Pizza Sauce',
    price: 1.50
  }, {
    name: 'Olive Oil',
  }, {
    name: 'White Sauce',
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: 'Pizza Cheese',
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }, {
    name: 'Feta Cheese',
    priceMatrix: SPECIALTY_PIZZA_TOPPING_PRICES,
  }]
};

export const SLICES_MODIFIERS = {
  name: 'Slices Modifiers',
  caption: 'Slices Modifiers',
  type: MENU_TYPE.MODIFIERS_MENU,
  key: uuid(),
  qualifiers: PIZZA_QUALIFIERS,
  items: [{
    name: 'Pepperoni',
    price: 0.50,
  }, {
    name: 'Beef Sausage',
    price: 0.50,
  }, {
    name: 'Canadian Bacon',
    price: 0.50
  }, {
    name: 'Italian Sausage',
    price: 0.50
  }, {
    name: 'Anchovies',
    price: 0.50
  }, {
    name: 'Meatballs',
    price: 0.75
  }, {
    name: '__blank__',
  }, {
    name: '__blank__',
  }, {
    name: '__blank__',
  }, {
    name: '__blank__',
  }, {
    name: 'Bell Peppers',
    price: 0.50
  }, {
    name: 'Mushrooms',
    price: 0.50
  }, {
    name: 'Onions',
    price: 0.50
  }, {
    name: 'Black Olives',
    price: 0.50
  }, {
    name: 'Jalapeños',
    price: 0.50
  }, {
    name: '__blank__'
  }, {
    name: 'Garlic',
    price: 0.75
  }, {
    name: 'Spinach',
    price: 0.75
  }, {
    name: 'Tomatoes',
    price: 0.75
  }, {
    name: 'Artichokes',
    price: 0.75
  }, {
    name: 'Green Olives',
    price: 0.75
  }, {
    name: 'Basil',
    price: 0.50
  }, {
    name: 'Pepperonchini',
    price: 0.50
  }, {
    name: 'Pineapple',
    price: 0.50
  }, {
    name: '__blank__',
  }, {
    name: 'Pizza Sauce',
    price: 0.50
  }, {
    name: 'Olive Oil',
    price: 0.50
  }, {
    name: '__blank__',
  }, {
    name: 'Pizza Cheese',
    price: 0.50
  }, {
    name: 'Feta Cheese',
    price: 2.50
  }]
};

export const PIZZA_GLOBAL_QUALIFIERS = [{
  name: 'Half / Half'
}];

export const ENTREE_MODIFIERS = {
  name: 'Modifiers',
  caption: 'Pizza',
  type: MENU_TYPE.MODIFIERS_MENU,
  key: uuid(),
  qualifiers: PIZZA_QUALIFIERS,
  items: [{
    name: 'Breaded Chicken Fillet',
    price: 2.00,
  }, {
    name: 'Eggplant',
    price: 2.00,
  }, {
    name: 'Marinara',
    price: 0.50,
  }, {
    name: 'Meatballs',
    price: 2.00,
  }, {
    name: 'Mozzarella',
    price: 0.50,
  }, {
    name: 'Ricotta',
    price: 1.00,
  }, {
    name: 'Sausage',
    price: 2.00,
  }, {
    name: 'Meat Sauce',
    price: 2.00,
  }, {
    name: 'Spaghetti',
  }, {
    name: 'Penne',
  }, {
    name: 'Spinach',
    price: 2.00,
  }, {
    name: 'Garlic',
    price: 0.50,
  }]
};

export const ENTREE_SALAD_CHOICEMENU = {
  prompt: 'Please Select Salad',
  type: MENU_TYPE.CHOICES_MENU,
  items: [
    {
      name: 'Salad w Ranch',
      add: 'Garlic Bread',
    },
    {
      name: 'Salad w Blue Chz',
      add: 'Garlic Bread',
    },
    {
      name: 'Salad w Vin',
      add: 'Garlic Bread',
    },
    {
      name: 'Salad w 1000 Isle',
      add: 'Garlic Bread',
    },
    {
      name: 'Salad w Caesar',
      add: 'Garlic Bread',
    },
    {
      name: 'Salad w NO Dress',
      add: 'Garlic Bread',
    },
    {
      name: 'NO Salad',
      add: 'Garlic Bread',
    },
    {
      name: 'NO Salad Xtra Brd',
    },
    {
      name: 'Salad w Italian',
      add: 'Garlic Bread',
    },
  ]
};

export const DRESSINGS_CHOICEMENU = {
  prompt: 'Please Select Dressings',
  type: MENU_TYPE.CHOICES_MENU,
  items: [
    {
      name: 'Ranch',
    },
    {
      name: 'Bleu Cheese',
    },
    {
      name: 'Italian',
    },
    {
      name: '1000 Island',
    },
    {
      name: 'Vinaigrette',
    },
    {
      name: 'Caesar',
    },
    {
      name: 'No Dressing',
    },
    {
      name: 'Mix Dressing',
    },
  ]
};

const SIDE_DRESSING_CHOICEMENU = {
  prompt: 'Please Select Side',
  type: MENU_TYPE.CHOICES_MENU,
  items: [
    {
      name: 'Ranch',
    },
    {
      name: 'Blue Cheese',
    },
    {
      name: 'Italian',
    },
    {
      name: '1000 Island',
    },
    {
      name: 'Vinaigrette',
    },
    {
      name: 'Caesar',
    },
    {
      name: 'Garlic Butter',
    },
    {
      name: 'Marinara',
    },
    {
      name: 'Hot Sauce',
    },
  ]
}

export const WINGSAUCE_CHOICEMENU = {
  prompt: 'Please choose wingsauce',
  type: MENU_TYPE.CHOICES_MENU,
  items: [
    {
      name: 'Hot',
    },
    {
      name: 'Garlic Parmesan',
    },
    {
      name: 'Dry',
    },
    {
      name: 'Hot Sauce on Side',
    },
    {
      name: 'GP on Side',
    },
    {
      name: '5 Hot / 5 Garlic',
    },
    {
      name: 'GP and Hot mixed',
    },
  ]
};

export const TOASTED_UNTOASTED_CHOICEMENU = {
  prompt: 'Please select TOASTED or UNTOASTED',
  type: MENU_TYPE.CHOICES_MENU,
  items: [
    {
      name: 'Toasted',
    },
    {
      name: 'Untoasted',
    },
  ]
};

export const DIP_CHOICEMENU = {
  prompt: 'Please Select Dip',
  type: MENU_TYPE.CHOICES_MENU,
  items: [
    {
      name: 'Marinara',
    },
    {
      name: 'Ketchup',
    },
    {
      name: 'Ranch',
    },
    {
      name: 'Marinara and Ranch',
      price: 1.00,
    },
    {
      name: 'No DIP',
    },
  ]
};

export const DIP2_CHOICEMENU = {
  prompt: 'Please choose dip',
  type: MENU_TYPE.CHOICES_MENU,
  items: [
    {
      name: 'Ranch',
    },
    {
      name: 'Bleu Cheese',
    },
    {
      name: 'Ranch and BC',
      price: 1.00,
    },
    {
      name: 'No DIP',
    },
  ]
};

export const TWOLITER_CHOICEMENU = {
  prompt: 'Please Select 2LT',
  type: MENU_TYPE.CHOICES_MENU,
  items: [{
    name: 'Pepsi'
  }, {
    name: 'DietPepsi'
  }, {
    name: 'Sierra Mist'
  }, {
    name: 'MUG Root Beer'
  }, {
    name: 'Orange Crush'
  }, {
    name: 'Mountain Dew'
  }]
};

export const MENU = {
  [CATEGORY.PIZZA]: {
    name: CATEGORY.PIZZA,
    caption: 'Pizza',
    key: uuid(),
    type: MENU_TYPE.ITEMS_MENU,
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
      includes: [
        'Pizza Sauce',
        'Pizza Cheese',
      ],
    }, {
      name: 'Deluxe Pizza',
      conciseName: 'Deluxe',
      key: uuid(),
      priceMatrix: SPECIALTY_PIZZA_PRICES,
      includes: [
        'Pizza Sauce',
        'Pizza Cheese',
        'Pepperoni',
        'Beef Sausage',
        'Canadian Bacon',
        'Bell Peppers',
        'Mushrooms',
        'Onions',
        'Black Olives',
      ],
    }, {
      name: 'Spinach Tomato & Garlic',
      conciseName: 'STG',
      key: uuid(),
      priceMatrix: SPECIALTY_PIZZA_PRICES,
      includes: [
        'Pizza Sauce',
        'Pizza Cheese',
        'Olive Oil',
        'Spinach',
        'Tomatoes',
        'Garlic',
      ],
    }, {
      name: 'Veggie Lovers',
      conciseName: 'Veggie',
      key: uuid(),
      priceMatrix: SPECIALTY_PIZZA_PRICES,
      includes: [
        'Pizza Sauce',
        'Pizza Cheese',
        'Bell Peppers',
        'Mushrooms',
        'Onions',
        'Black Olives',
      ],
    }, {
      name: 'Meat Lovers',
      conciseName: 'Meat',
      key: uuid(),
      priceMatrix: SPECIALTY_PIZZA_PRICES,
      includes: [
        'Pizza Sauce',
        'Pizza Cheese',
        'Italian Sausage',
        'Pepperoni',
        'Beef Sausage',
        'Canadian Bacon',
      ],
    }, {
      name: 'Hawaiian',
      conciseName: 'Hawaiian',
      key: uuid(),
      priceMatrix: HAWAIAN_PIZZA_PRICES,
      includes: [
        'Pizza Sauce',
        'Pizza Cheese',
        'Canadian Bacon',
        'Pineapple',
      ],
    }, {
      name: 'Blanco Pie',
      conciseName: 'Blanco',
      key: uuid(),
      priceMatrix: BLANCO_PIZZA_PRICES,
      includes: [
        'Pizza Cheese',
        'White Sauce',
      ],
    }, {
      name: 'Margherita',
      conciseName: 'Margherita',
      key: uuid(),
      priceMatrix: SPECIALTY_PIZZA_PRICES,
      includes: [
        'Garlic',
        'Tomatoes',
        'Basil',
        'Olive Oil',
        'Pizza Cheese'
      ],
    }]
  },
  [CATEGORY.SALADS]: {
    name: 'Salads',
    caption: 'Salads',
    type: MENU_TYPE.ITEMS_MENU,
    key: uuid(),
    modifiers: SALADS_MODIFIERS,
    image: 'salad.jpeg',
    row: 1,
    column: 2,
    items: [{
      name: 'Side Salad',
      key: uuid(),
      price: 3.00,
      includes: [
        'Tomatoes',
        'Pepperoni',
        'Mozzarella',
        'Lettuce',
        'Parmesan',
      ],
      choices: [
        DRESSINGS_CHOICEMENU
      ]
    }, {
      name: 'Side Greek Salad',
      key: uuid(),
      price: 3.75,
      includes: [
        'Tomatoes',
        'Onions',
        'Lettuce',
        'Feta Cheese',
        'Croutons',
        'Pepperoncini',
        'Parmesan',
        'Greek Olives',
      ],
      choices: [
        DRESSINGS_CHOICEMENU
      ]
    }, {
      name: 'Side Caesar Salad',
      key: uuid(),
      price: 3.75,
      includes: [
        'Tomatoes',
        'Onions',
        'Mozzarella',
        'Lettuce',
        'Croutons',
        'Pepperoncini',
        'Parmesan',
      ],
      choices: [
        DRESSINGS_CHOICEMENU
      ]
    }, {
      name: 'Half Order Cold Antipasto',
      key: uuid(),
      price: 5.00,
      includes: [
        'Tomatoes',
        'Pepperoni',
        'Ham',
        'Salami',
        'Green Peppers',
        'Onions',
        'Black Olives',
        'Mozzarella',
        'Lettuce',
        'Parmesan',
      ],
      choices: [
        DRESSINGS_CHOICEMENU
      ]
    }, {
      name: 'Dinner Salad',
      key: uuid(),
      price: 5.00,
      includes: [
        'Tomatoes',
        'Pepperoni',
        'Salami',
        'Black Olives',
        'Mozzarella',
        'Lettuce',
        'Parmesan',
      ],
      choices: [
        DRESSINGS_CHOICEMENU
      ]
    }, {
      name: 'Caesar Salad',
      key: uuid(),
      price: 7.00,
      includes: [
        'Tomatoes',
        'Onions',
        'Mozzarella',
        'Lettuce',
        'Croutons',
        'Pepperoncini',
        'Parmesan',
      ],
      choices: [
        DRESSINGS_CHOICEMENU
      ]
    }, {
      name: 'Greek Salad',
      key: uuid(),
      price: 7.00,
      choices: [
        DRESSINGS_CHOICEMENU
      ]
    }, {
      name: 'Cold Antipasto Salad',
      key: uuid(),
      price: 10.00,
      includes: [
        'Tomatoes',
        'Pepperoni',
        'Ham',
        'Salami',
        'Green Peppers',
        'Onions',
        'Black Olives',
        'Mozzarella',
        'Lettuce',
        'Parmesan',
      ],
      choices: [
        DRESSINGS_CHOICEMENU
      ]
    }, {
      name: 'Small Salad Tray for 10',
      key: uuid(),
      price: 20.00,
      choices: [
        DRESSINGS_CHOICEMENU
      ]
    }, {
      name: 'Large Salad Tray for 20',
      key: uuid(),
      price: 35.00,
      choices: [
        DRESSINGS_CHOICEMENU
      ]
    }, {
      name: 'Small Greek Tray for 10',
      key: uuid(),
      price: 35.00,
      choices: [
        DRESSINGS_CHOICEMENU
      ]
    }, {
      name: 'Large Greek Tray for 20',
      key: uuid(),
      price: 55.00,
      choices: [
        DRESSINGS_CHOICEMENU
      ]
    }]
  },
  [CATEGORY.APPETIZERS]: {
    name: 'Appetizers',
    caption: 'Appetizers',
    type: MENU_TYPE.ITEMS_MENU,
    key: uuid(),
    image: 'appetizers.jpeg',
    row: 1,
    column: 3,
    items: [{
      name: 'Chicken Wings',
      key: uuid(),
      price: 9.00,
      choices: [
        WINGSAUCE_CHOICEMENU,
        DIP2_CHOICEMENU
      ]
    }, {
      name: 'Chicken Tenders',
      key: uuid(),
      price: 8.00,
      choices: [
        DIP_CHOICEMENU
      ]
    }, {
      name: 'Fried Calamari',
      key: uuid(),
      price: 8.00,
      choices: [
        DIP_CHOICEMENU
      ]
    }, {
      name: 'Fried Mushrooms',
      key: uuid(),
      price: 7.00,
      choices: [
        DIP_CHOICEMENU
      ]
    }, {
      name: 'Cheese Sticks',
      key: uuid(),
      price: 7.00,
      choices: [
        DIP_CHOICEMENU
      ]
    }, {
      name: 'Garlic Bread',
      key: uuid(),
      price: 3.00,
      choices: [
        DIP_CHOICEMENU
      ]
    }, {
      name: 'Garlic Cheese Bread',
      key: uuid(),
      price: 4.00,
      choices: [
        DIP_CHOICEMENU
      ]
    }]
  },
  [CATEGORY.SIDES]: {
    name: 'Sides and Sauces',
    caption: 'Sides',
    type: MENU_TYPE.ITEMS_MENU,
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
      price: 0.50,
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
      choices: [
        SIDE_DRESSING_CHOICEMENU
      ]
    }, {
      name: '4oz Dressing',
      key: uuid(),
      price: 1.00,
      choices: [
        SIDE_DRESSING_CHOICEMENU
      ]
    }, {
      name: 'Misc Food',
      key: uuid(),
      pricePrompt: true,
    }, {
      name: 'Out of Area Fee',
      key: uuid(),
      pricePrompt: true,
    }, {
      name: 'Dinnerware',
      key: uuid(),
      pricePrompt: true,
    }]
  },
  [CATEGORY.BEVERAGES]: {
    name: 'Beverages',
    caption: 'Beverages',
    type: MENU_TYPE.ITEMS_MENU,
    key: uuid(),
    image: 'beverages.jpeg',
    row: 1,
    column: 5,
    items: [{
      name: '2-Liters',
      key: uuid(),
      price: 3.00,
      choices: [
        TWOLITER_CHOICEMENU
      ]
    }, {
      name: 'Fountain Drink',
      key: uuid(),
      price: 2.00,
    },{
      name: 'Bottled Water',
      key: uuid(),
      price: 1.50,
    }],
  },
  [CATEGORY.SLICES]: {
    name: 'Slices',
    caption: 'Slice',
    type: MENU_TYPE.ITEMS_MENU,
    modifiers: SLICES_MODIFIERS,
    key: uuid(),
    image: 'slice.png',
    row: 2,
    column: 1,
    items: [{
      name: 'Cheese Slice',
      key: uuid(),
      price: 3.00,
      includes: [
        'Pizza Sauce',
        'Pizza Cheese',
      ]
    }, {
      name: 'Pepperoni Slice',
      key: uuid(),
      price: 3.50,
      includes: [
        'Pizza Sauce',
        'Pizza Cheese',
        'Pepperoni'
      ]
    }, {
      name: 'Beef Sausage Slice',
      key: uuid(),
      price: 3.50,
      includes: [
        'Pizza Sauce',
        'Pizza Cheese',
        'Beef Sausage',
      ]
    }, {
      name: 'Supreme Slice',
      key: uuid(),
      price: 4.00,
      includes: [
        'Pizza Sauce',
        'Pizza Cheese',
        'Pepperoni',
        'Beef Sausage',
        'Canadian Bacon',
        'Bell Peppers',
        'Mushrooms',
        'Onions',
        'Black Olives',
      ],
    }, {
      name: 'Meatlovers Slice',
      key: uuid(),
      price: 4.00,
      includes: [
        'Pizza Sauce',
        'Pizza Cheese',
        'Italian Sausage',
        'Pepperoni',
        'Beef Sausage',
        'Canadian Bacon',
      ],
    }, {
      name: 'Hawaiian Slice',
      key: uuid(),
      price: 4.00,
      includes: [
        'Pizza Sauce',
        'Pizza Cheese',
        'Canadian Bacon',
        'Pineapple',
      ]
    }, {
      name: 'Veggie Slice',
      key: uuid(),
      price: 4.00,
      includes: [
        'Pizza Sauce',
        'Pizza Cheese',
        'Bell Peppers',
        'Mushrooms',
        'Onions',
        'Black Olives',
      ],
    }]
  },
  [CATEGORY.SUBS]: {
    name: 'Subs and Calzones',
    caption: 'Subs',
    type: MENU_TYPE.ITEMS_MENU,
    key: uuid(),
    modifiers: SUBS_MODIFIERS,
    image: 'subs.png',
    row: 2,
    column: 2,
    items: [{
      name: 'Calzone',
      key: uuid(),
      price: 9.00,
      includes: [
        'Canadian Bacon',
        'Ricotta',
        'Pizza Cheese'
      ]
    }, {
      name: 'Stromboli',
      key: uuid(),
      price: 9.00,
      includes: [
        'Pepperoni',
        'Italian Sausage',
        'Bell Peppers',
        'Pizza Cheese',
      ]
    }, {
      name: 'Meatball Sub',
      key: uuid(),
      price: 8.00,
      includes: [
        'Meatballs',
        'Pizza Sauce',
        'Pizza Cheese',
      ]
    }, {
      name: 'Italian Sub',
      key: uuid(),
      price: 8.00,
      includes: [
        'Ham',
        'Salami',
        'Tomatoes',
        'Provolone',
        'Lettuce',
      ],
      choices: [
        TOASTED_UNTOASTED_CHOICEMENU
      ]
    }, {
      name: 'Italian Sausage Sub',
      key: uuid(),
      price: 8.00,
      includes: [
        'Italian Sausage',
        'Bell Peppers',
        'Onions',
        'Pizza Sauce',
        'Pizza Cheese',
      ],
    }, {
      name: 'Philly Cheese Steak',
      key: uuid(),
      price: 9.00,
      includes: [
        'Steak',
        'Bell Peppers',
        'Mushrooms',
        'Onions',
        'Pizza Cheese',
      ]
    }, {
      name: 'Chicken Parm Sub',
      key: uuid(),
      price: 9.00,
      includes: [
        'Pizza Sauce',
        'Pizza Cheese',
      ]
    }, {
      name: 'Eggplant Parm Sub',
      key: uuid(),
      price: 9.00,
      includes: [
        'Eggplant',
        'Pizza Sauce',
        'Pizza Cheese',
      ]
    }, {
      name: 'Grilled Chicken Sub',
      key: uuid(),
      price: 9.00,
      includes: [
        'Grilled Chicken',
        'Tomatoes',
        'Provolone',
        'Lettuce'
      ]
    }]
  },
  [CATEGORY.PASTA]: {
    name: 'Entrees',
    caption: 'Pasta',
    type: MENU_TYPE.ITEMS_MENU,
    modifiers: ENTREE_MODIFIERS,
    key: uuid(),
    image: 'pasta.jpeg',
    row: 2,
    column: 3,
    items: [{
      name: 'Spaghetti w Meatballs',
      key: uuid(),
      price: 9.00,
      includes: [
        'Marinara',
        'Meatballs',
        'Spaghetti',
      ],
      choices: [
        ENTREE_SALAD_CHOICEMENU
      ]
    }, {
      name: 'Spaghetti w Sausage',
      key: uuid(),
      price: 9.00,
      includes: [
        'Marinara',
        'Sausage',
        'Spaghetti',
      ],
      choices: [
        ENTREE_SALAD_CHOICEMENU
      ]
    }, {
      name: 'Spaghetti w Meat Sauce',
      key: uuid(),
      price: 9.00,
      includes: [
        'Meat Sauce',
        'Spaghetti',
      ],
      choices: [
        ENTREE_SALAD_CHOICEMENU
      ]
    }, {
      name: 'Spaghetti w Sauce',
      key: uuid(),
      price: 9.00,
      includes: [
        'Marinara',
        'Spaghetti',
      ],
      choices: [
        ENTREE_SALAD_CHOICEMENU
      ]
    }, {
      name: 'Cheese Ravioli',
      key: uuid(),
      price: 8.50,
      includes: [
        'Marinara',
        'Mozzarella',
      ],
      choices: [
        ENTREE_SALAD_CHOICEMENU
      ]
    }, {
      name: 'Chicken Parmesan',
      key: uuid(),
      price: 12.50,
      includes: [
        'Breaded Chicken Fillet',
        'Marinara',
        'Mozzarella',
        'Spaghetti',
      ],
      choices: [
        ENTREE_SALAD_CHOICEMENU
      ]
    }, {
      name: 'Eggplant Parmesan',
      key: uuid(),
      price: 12.50,
      includes: [
        'Eggplant',
        'Marinara',
        'Mozzarella',
        'Spaghetti',
      ],
      choices: [
        ENTREE_SALAD_CHOICEMENU
      ]
    }, {
      name: 'Baked Ziti',
      key: uuid(),
      price: 9.00,
      includes: [
        'Marinara',
        'Mozzarella',
        'Ricotta',
        'Penne',
      ],
      choices: [
        ENTREE_SALAD_CHOICEMENU
      ]
    }, {
      name: 'Lasagna',
      key: uuid(),
      price: 10.00,
      includes: [
        'Marinara',
        'Mozzarella',
      ],
      choices: [
        ENTREE_SALAD_CHOICEMENU
      ]
    }]
  },
  [CATEGORY.DESSERTS]: {
    name: 'Desserts',
    caption: 'Desserts',
    type: MENU_TYPE.ITEMS_MENU,
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