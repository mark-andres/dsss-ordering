import types from './types';

export const initQualifiers = qualifierMenu => ({
  type: types.INIT_QUALIFIERS,
  qualifierMenu
});

export const setExtra = status => ({
  type: types.SET_EXTRA,
  status
});

export const setLite = status => ({
  type: types.SET_LITE,
  status
});

export const setSide = status => ({
  type: types.SET_SIDE,
  status
});

export const setH1 = status => ({
  type: types.SET_H1,
  status
});

export const setH2 = status => ({
  type: types.SET_H2,
  status
});

export const setWhole = status => ({
  type: types.SET_WHOLE,
  status
});

export const setQualifier = (qualifier, status) => ({
  type: types.SET_QUALIFIER,
  qualifier,
  status
});