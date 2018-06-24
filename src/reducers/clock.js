import types from '../actions/types';

const clockReducer = (state = {}, action) => {
  if (action.type === types.SET_TIME) {
    return {
      time: action.time
    };
  } else {
    return state;
  }
}

export default clockReducer;