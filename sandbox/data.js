class Category {
    constructor({
        name,
        description,
        items
    } = {}) {
        this.name = name || '';
        this.description = description || '';
        this.items = items || [];
    }
}

const categories = [{
    name: 'Pizzas',
    items: [
        'cheese', 'deluxe', 'spinach tomato & garlic', 'veggie lovers', 'meat lovers',
        'hawaiian', 'blanco pie'
    ]
}, {
    name: 'Appetizers',
    items: [
        'fried cheese', 'chicken tenders', 'calamari', 'fried mushrooms', 'chicken wings'
    ]
}, {
    name: 'Salads',
    items: [
        'side salad', 'dinner salad', 'greek salad', 'caesar salad', 'chicken caesar salad',
        'cold antipasto'
    ]
}];

const items = [
    { name: 'cheese', subItems: ['cheese'] },
    { name: 'deluxe', subItems: [
        { name: 'cheese', quantity: 2 }, 
        'pepperoni', 'mushrooms', 'onions', 'black olives',
        'green pepper', 'canadian bacon', 'beef sausage'
    ]},
    { name: 'spinach tomato & garlic', subItems: [
        'olive oil', 'spinach', 'tomatoes', 'garlic', 'cheese'
    ]},
    { name: 'veggie lovers', subItems: [
        { name: 'cheese', quantity: 2}, 'onions', 'mushrooms', 
        'black olives', 'green pepper', 'beef sausage'
    ]},
    { name: 'meat lovers', subItems: [
        { name: 'cheese', quantity: 2}, 'pepperoni', 'canadian bacon', 
        'beef sausage', 'italian sausage'
    ]}
]

class Order {
    constructor({
        orderNo,
        totalPrice,
        discountPrice,
        isDiscounted,
        items
    } = {}) {
        this.orderNo = orderNo || null;
        this.totalPrice = totalPrice || 0;
        this.discountPrice = discountPrice || 0;
        this.isDiscounted = isDiscounted || false;
        this.items = items || [];
    }
}

const SMALL_SIZE = 'Small';
const MEDIUM_SIZE = 'Medium';
const LARGE_SIZE = 'Large';
const EXTRA_LARGE_SIZE = 'X-Large';
const SICILIAN_SIZE = 'Sicilian';

const standardSubItemPriceMatrix = {
    [SMALL_SIZE]: 1.50,
    [MEDIUM_SIZE]: 1.50,
    [LARGE_SIZE]: 1.50,
    [EXTRA_LARGE_SIZE]: 1.50,
    [SICILIAN_SIZE]: 1.50
}

const premiumSubItemPriceMatrix = {
    [SMALL_SIZE]: 2.50,
    [MEDIUM_SIZE]: 2.50,
    [LARGE_SIZE]: 2.50,
    [EXTRA_LARGE_SIZE]: 2.50,
    [SICILIAN_SIZE]: 2.50
}

const basePizzaPriceMatrix = {
    [SMALL_SIZE]: 10.00,
    [MEDIUM_SIZE]: 12.00,
    [LARGE_SIZE]: 14.00,
    [EXTRA_LARGE_SIZE]: 16.00,
    [SICILIAN_SIZE]: 18.00
}

class Item {
    constructor({
        itemId,
        name,
        size,
        comment,
        quantity,
        priceMatrix,
        isDiscounted,
        discountPrice,
        totalPrice,
        subItems
    } = {}) {
        this.itemId = itemId || null;
        this.name = name || '';
        this.size = size || LARGE_SIZE;
        this.comment = comment || '';
        this.quantity = quantity || 0;
        this.priceMatrix = priceMatrix || {};
        this.isDiscounted = isDiscounted || false;
        this.discountPrice = discountPrice || 0;
        this.totalPrice = totalPrice || 0;
        this.subItems = subItems || [];
    }
}

class SubItem {
    constructor({
        subItemId,
        name,
        quantity,
        priceMatrix,
        priceIncluded
    } = {}) {
        this.subItemId = subItemId || null;
        this.name = name || '';
        this.quantity = quantity || 0;
        this.priceMatrix = priceMatrix || {};
        this.priceIncluded = priceIncluded || false;
    }
}

const pizzaSubItems = [{
        subItemId: 0,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'cheese'
    },
    {
        subItemId: 1,
        priceMatrix: standardSubItemPriceMatrix,
        name: 'pepperoni'
    },
    {
        subItemId: 2,
        priceMatrix: standardSubItemPriceMatrix,
        name: 'bell peppers'
    },
    {
        subItemId: 3,
        priceMatrix: standardSubItemPriceMatrix,
        name: 'mushrooms'
    },
    {
        subItemId: 5,
        priceMatrix: standardSubItemPriceMatrix,
        name: 'onions'
    },
    {
        subItemId: 6,
        priceMatrix: standardSubItemPriceMatrix,
        name: 'beef sausage'
    },
    {
        subItemId: 7,
        priceMatrix: standardSubItemPriceMatrix,
        name: 'black olives'
    },
    {
        subItemId: 8,
        priceMatrix: standardSubItemPriceMatrix,
        name: 'canadian bacon'
    },
    {
        subItemId: 9,
        priceMatrix: standardSubItemPriceMatrix,
        name: 'jalapeños'
    },
    {
        subItemId: 10,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'italian sausage'
    },
    {
        subItemId: 11,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'anchovies'
    },
    {
        subItemId: 12,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'meatball'
    },
    {
        subItemId: 13,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'grilled chicken'
    },
    {
        subItemId: 14,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'ham'
    },
    {
        subItemId: 15,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'eggplant'
    },
    {
        subItemId: 16,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'garlic'
    },
    {
        subItemId: 17,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'spinach'
    },
    {
        subItemId: 18,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'tomatoes'
    },
    {
        subItemId: 19,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'white sauce'
    },
    {
        subItemId: 20,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'artichoke'
    },
    {
        subItemId: 21,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'green olives'
    },
    {
        subItemId: 22,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'feta'
    },
    {
        subItemId: 23,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'basil'
    },
    {
        subItemId: 24,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'pepperchinis'
    },
    {
        subItemId: 25,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'pineapple'
    },
    {
        subItemId: 26,
        priceMatrix: premiumSubItemPriceMatrix,
        name: 'olive oil'
    }
];