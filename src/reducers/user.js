import types from '../actions/types';

const userDefault = {
  loggedIn: false
};

const userReducer = (state = userDefault, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      if (action.userInfo.error) {
        return {
          ...userDefault,
          error: action.userInfo.error
        };
      } else {
        return {
          ...action.userInfo,
          loggedIn: true
        }
      }

    case types.LOGOUT_USER:
      return userDefault;

    default:
      return state;
  }
};

export default userReducer;