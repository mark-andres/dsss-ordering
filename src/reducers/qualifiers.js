import types from '../actions/types';

const defaultQualifiers = {
  extra: false,
  lite: false,
  side: false,
  h1: false,
  h2: false,
  whole: false,
  prepare: [],
  flags: {}
};

const initQualifiers = (qualifierMenu) => {
  const obj = { };
  qualifierMenu.forEach(qualifier => {
    if (qualifier.name === 'Prepare') {
      obj.prepare = [...qualifier.items];
    } else {
      obj[qualifier.internalName] = false;
    }
  });
  obj.flags = {};
  return obj;
};

const setExtra = (qualifiers, status) => {
  qualifiers.extra = status;
  if (qualifiers.extra) {
    qualifiers.lite = false;
  }
  return { ...qualifiers };
}

const setLite = (qualifiers, status) => {
  qualifiers.lite = status;
  if (qualifiers.lite) {
    qualifiers.extra = false;
  }
  return { ...qualifiers };
}

const setSide = (qualifiers, status) => {
  qualifiers.side = status;
  return { ...qualifiers };
}

const setH1 = (qualifiers, status) => {
  qualifiers.h1 = status;
  if (qualifiers.h1) {
    qualifiers.h2 = qualifiers.whole = false;
  }
  return { ...qualifiers };
}

const setH2 = (qualifiers, status) => {
  qualifiers.h2 = status;
  if (qualifiers.h2) {
    qualifiers.h1 = qualifiers.whole = false;
  }
  return { ...qualifiers };
}

const setWhole = (qualifiers, status) => {
  qualifiers.whole = status;
  if (qualifiers.whole) {
    qualifiers.h1 = qualifiers.h2 = false;
  }
  return { ...qualifiers };
}

const setQualifier = (qualifiers, qualifierName, status) => {
  switch (qualifierName) {
    case 'extra':
      return setExtra(qualifiers, status);
    case 'lite':
      return setExtra(qualifiers, status);
    case 'side':
      return setExtra(qualifiers, status);
    case 'h1':
      return setExtra(qualifiers, status);
    case 'h2':
      return setExtra(qualifiers, status);
    case 'whole':
      return setExtra(qualifiers, status);
    default:
      return qualifiers;
  }
};

const qualifiersReducer = (qualifiers = defaultQualifiers, action) => {
  switch (action.type) {
    case types.INIT_QUALIFIERS:
      return initQualifiers(action.qualifierMenu);

    case types.SET_EXTRA:
      return setExtra(qualifiers, action.status);

    case types.SET_LITE:
      return setLite(qualifiers, action.status);

    case types.SET_SIDE:
      return setSide(qualifiers, action.status);

    case types.SET_H1:
      return setH1(qualifiers, action.status);

    case types.SET_H2:
      return setH2(qualifiers, action.status);

    case types.SET_WHOLE:
      return setWhole(qualifiers, action.status);

    case types.SET_QUALIFIER:
      return setQualifier(qualifiers, action.qualifier, action.status);

    default:
      return qualifiers;
  }
};

export default qualifiersReducer;