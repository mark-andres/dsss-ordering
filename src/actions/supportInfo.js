import types from './types';

export const loadAddressNames = () => dispatch => {
  fetch('/dsssv1-services/getAddressNames.php', {
    method: 'GET',
    credentials: 'include',
  })
    .then(resp => resp.json())
    .then(addressNames => {
      return dispatch({
        type: types.LOAD_ADDRESS_NAMES,
        addressNames
      });
    })
    .catch(err => console.log(err));
};

export const loadPhoneTypes = () => dispatch => {
  fetch('/dsssv1-services/getPhoneTypes.php', {
    method: 'GET',
    credentials: 'include',
  })
    .then(resp => resp.json())
    .then(phoneTypes => {
      return dispatch({
        type: types.LOAD_PHONE_TYPES,
        phoneTypes
      });
    })
    .catch(err => console.log(err));
};

export const loadLocationTypes = () => dispatch => {
  fetch('/dsssv1-services/getLocTypes.php', {
    method: 'GET',
    credentials: 'include',
  })
    .then(resp => resp.json())
    .then(locationTypes => {
      return dispatch({
        type: types.LOAD_LOCATION_TYPES,
        locationTypes
      });
    })
    .catch(err => console.log(err));
};

export const loadDrivers = () => dispatch => {
  fetch('/dsssv1-services/getStaff.php', {
    method: 'GET',
    credentials: 'include',
  })
    .then(resp => resp.json())
    .then(staff => {
      return dispatch({
        type: types.LOAD_DRIVERS,
        staff
      });
    })
    .catch(err => console.log(err));
};