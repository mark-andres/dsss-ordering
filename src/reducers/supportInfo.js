import types from '../actions/types';

const defaultSupportInfo = {
  addressNames: [],
  phoneTypes: [],
  locationTypes: [],
  drivers: []
};

const supportInfoReducer = (state = defaultSupportInfo, action) => {
  switch (action.type) {
    case types.LOAD_ADDRESS_NAMES:
      return { 
        ...state,
        addressNames: [...action.addressNames]
      };

    case types.LOAD_LOCATION_TYPES:
      return {
        ...state,
        locationTypes: [...action.locationTypes]
      };

    case types.LOAD_PHONE_TYPES:
      return {
        ...state,
        phoneTypes: [...action.phoneTypes]
      };

    case types.LOAD_DRIVERS:
      return {
        ...state,
        drivers: action.staff.reduce((drivers, staffMember) => {
          if (staffMember.role_name === 'driver' || staffMember.role_name === 'manager') {
            const { staff_id, lastname, firstname, nickname } = staffMember;
            return drivers.concat({
              driverId: staff_id, 
              lastname, 
              firstname,
              nickname, 
              routes: [],
              currentRoute: null
            });
          } else {
            return drivers;
          }
        }, [])
      };

    default:
      return state;
  }
}

export default supportInfoReducer;