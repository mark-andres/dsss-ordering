import types from './types';

export const setNextChoice = chosenItem => ({
  type: types.SET_NEXT_CHOICE,
  chosenItem
});

export const cancelChoices = () => ({
  type: types.CANCEL_CHOICES
});