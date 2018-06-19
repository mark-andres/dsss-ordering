import { List, Map, OrderedSet } from 'immutable';

export const getModifierWholeList = (modifiers) => {
  const modifierList = modifiers.reduce((list, modifier) => {
    return list.set(Map.of(modifier));
  }, new List());
  
  const modifierNameSet = modifiers.reduce((nameSet, modifier) => {
    return nameSet.set(modifier.name);
  }, new OrderedSet());

  const wholeModifierList = modifierNameSet.reduce((wholeList, modifierName) => {
    const foundModifiers = modifierList.find(modifier => modifier.name === modifierName);
    if (foundModifiers.size === 2) {
      if (foundModifiers.get(0).delete('location').equals(foundModifiers.get(1).delete('location'))) {
        return wholeList.push(foundModifiers.get(0).mergeWith((val1, val2, key) => {
          if (key === 'location') {
            return 'whole';
          } else if (key === price) {
            return val1 + val2;
          } else {
            return val1;
          }
        }, foundModifiers.get(1)));
      }
    }
    return wholeList;
  }, []);

  return wholeModifierList;
}

// Utility function for ModifiersMenu.
export const getModifiersList = (modifiers, location) => {
  if (location === 'whole') {
    return getModifierWholeList(modifiers);
  } else {
    return modifiers.filter(modifier => modifier.location === location);
  }
}

const includedModifiersFilter = modifier => {
  const { status, attributes } = modifier;
  const { extra, lite, side } = attributes;

  return status === 'included' && extra === 0 && !lite && !side;
}

const getFormattedName = (modifier, part = 'whole') => {
  const { name, status, attributes } = modifier;
  const { extra, lite, side } = attributes;
  let location = '';
  let attribute = '';
  let statusStr = '';

  if (part !== 'whole') {
    location = part.toUpperCase() + '-';
  }

  if (extra) {
    let digitStr = extra.toString();
    if (digitStr === '1') {
      digitStr = '';
    }
    attribute = `${digitStr}X-`;
  } else if (lite) {
    attribute = 'LITE-';
  } else if (side) {
    attribute = 'SD-';
  }

  if (status === 'excluded') {
    statusStr = 'NO ';
  }

  return `${location}${statusStr}${attribute}${name}`;
}

const inWholeList = (wholeList, modifier) => wholeList.includes(modifier.name);

// Utility function for OrderReceipt.
export const getFormattedModifiers = (modifiers, includeWhole = false) => {
  const formattedModifiers = [];
  let wholeList = [], wholeNames = [];
  let halfList = [];
  const filteredModifiers = modifiers.filter(modifier => !includedModifiersFilter(modifier));
  
  if (includeWhole) {
    wholeList = getModifierWholeList(filteredModifiers);
    wholeNames = wholeList.map(modifier => modifier.name);
    wholeList.forEach(modifier => formattedModifiers.push(getFormattedName(modifier)));
  }

  halfList = filteredModifiers.filter(
    modifier => modifier.location === 'h1' && !inWholeList(wholeNames, modifier)
  );  
  halfList.forEach(modifier => formattedModifiers.push(getFormattedName(modifier)));

  halfList = filteredModifiers.filter(
    modifier => modifier.location === 'h2' && !inWholeList(wholeNames, modifier)
  );  
  halfList.forEach(modifier => formattedModifiers.push(getFormattedName(modifier)));

  return formattedModifiers;
}