import _ from 'lodash';

const mergeModifiers = (modifier1, modifier2) => {
  let newModifier = {};

  for (const key in modifier1) {
    if (key === 'location') {
      newModifier.location = 'whole';
    } else if (key === 'attributes') {
      newModifier.attributes = { ...modifier1.attributes }
    } else if (key === 'price') {
      newModifier.price = modifier1.price + modifier2.price;
    } else {
      newModifier[key] = modifier1[key];
    }
  }

  return newModifier;
}

export const getModifierWholeList = (modifiers = []) => {
  const modifierNames = _.uniq(modifiers.map(modifier => modifier.name));

  const wholeModifierList = modifierNames.reduce((wholeList, modifierName) => {
    const foundModifiers = modifiers.filter(modifier => modifier.name === modifierName);
    if (foundModifiers.length === 2) {
      if (_.isEqualWith(foundModifiers[0], foundModifiers[1], (val1, val2, key) => {
        if (key === 'location') {
          return true;
        }
      })) {
        const mergedModifier = mergeModifiers(foundModifiers[0], foundModifiers[1]);
        return wholeList.concat(mergedModifier);
      }
    }
    return wholeList;
  }, []);

  return wholeModifierList;
}

// Utility function for ModifiersMenu.
export const getModifiersList = (modifiers = [], location) => {
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

const adjustModifier = (modifierIn) => {
  const modifier = _.cloneDeep(modifierIn);
  if (modifier.status === 'excluded') {
    delete modifier.price;
  } else if (modifier.attributes.extra > 0) {
    if (modifier.status === 'included') {
      modifier.price = modifier.price * modifier.attributes.extra;
    } else {
      modifier.price = modifier.price + (modifier.price * modifier.attributes.extra);
    }
  } else if (modifier.attributes.lite) {
    if (modifier.status === 'included') {
      delete modifier.price;
    }
  }
  return modifier;
}

// Utility function for OrderReceipt.
export const getFormattedModifiers = (modifiers = [], includeWhole = false) => {
  const formattedModifiers = [];
  let wholeList = [], wholeNames = [];
  let halfList = [];
  const filteredModifiers = modifiers.filter(modifier => !includedModifiersFilter(modifier));

  if (includeWhole) {
    wholeList = getModifierWholeList(filteredModifiers);
    wholeNames = wholeList.map(modifier => modifier.name);
    wholeList.forEach(modifier => {
      formattedModifiers.push({
        modifier: adjustModifier(modifier),
        name: getFormattedName(modifier)
      });
    });
  }

  halfList = filteredModifiers.filter(
    modifier => modifier.location === 'h1' && !inWholeList(wholeNames, modifier)
  );
  halfList.forEach(modifier => {
    if (modifier.status === 'excluded') {
      delete modifier.price;
    }
    formattedModifiers.push({
      modifier: adjustModifier(modifier),
      name: getFormattedName(modifier, 'h1')
    });
  });

  halfList = filteredModifiers.filter(
    modifier => modifier.location === 'h2' && !inWholeList(wholeNames, modifier)
  );
  halfList.forEach(modifier => {
    if (modifier.status === 'excluded') {
      delete modifier.price;
    }
    formattedModifiers.push({
      modifier: adjustModifier(modifier),
      name: getFormattedName(modifier, 'h2')
    });
  });

  return formattedModifiers;
}