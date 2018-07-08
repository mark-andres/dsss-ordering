import types from './types';
import { loadAddressNames, loadLocationTypes, loadPhoneTypes, loadDrivers } from './supportInfo';

export const loginUser = (username, password, callback) => dispatch => {
  const timezone = (new Date().getTimezoneOffset() / 60).toFixed(0);

  fetch('/dsssv1-services/servicesLogin.php', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: `username=${username}&pwd=${password}&timezone=${timezone}`
  })
    .then(res => res.json())
    .then(userInfo => {
      dispatch({
        type: types.LOGIN_USER,
        userInfo
      });
      if (callback) {
        callback(!userInfo.error);
      }
      if (!userInfo.error) {
        dispatch(loadAddressNames());
        dispatch(loadLocationTypes());
        dispatch(loadPhoneTypes());
        dispatch(loadDrivers());
      }
    })
    .catch(err => console.error(err));
};

export const logoutUser = () => dispatch => {
  fetch('/dsssv1-services/logout.php')
    .then(res => res.json())
    .then(() => dispatch({
      type: types.LOGOUT_USER
    }))
    .catch(err => console.log(err));
}