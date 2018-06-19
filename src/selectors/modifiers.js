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

export const getModifierLists = (modifiers, includeWhole = false) => {
  const modifierLists = {};

  if (!includeWhole) {
    modifierLists.whole = getModifierWholeList(modifiers);
  }

  modifierLists.h1 = modifiers.filter(modifier => modifier.location === 'h1');
  modifierLists.h2 = modifiers.filter(modifier => modifier.location === 'h2');

  return modifierLists;
}

const includedModifiersFilter = modifier => {
  const { status, attributes } = modifier;
  const { extra, lite, side } = attributes;

  return status === 'included' && extra === 0 && !lite && !side;
}

const getFormattedName = (modifier, part = 'whole') => {
  
}

export const getFormattedModifiers = (modifiers, includeWhole = false) => {
  const formattedModifiers = [];
  let wholeList = [], wholeNames = [];
  const filteredModifiers = modifiers.filter(modifier => !includedModifiersFilter(modifier));
  
  if (includeWhole) {
    wholeList = getModifierWholeList(filteredModifiers);
    wholeNames = wholeList.map(modifier => modifier.name);
  }
}