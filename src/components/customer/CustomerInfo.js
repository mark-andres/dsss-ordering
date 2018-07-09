import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { normalize } from 'react-phone-input-auto-format';
import { connect } from 'react-redux';

import SearchPhone from './SearchPhone';

const StyledCustomerInfo = styled.div`
  background-color: #8FAECF;
  height: 100vh;
  width: 100vw;
`;

const Header = styled.h1`
  background-color: darkblue;
  color: white;
  font-weight: bold;
  width: 100%;
  text-align: center;
  height: 7vh;
  padding-top: 1vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
  height: 93vh;
`;

const MapDiv = styled.div`
  height: 100%;
  background-color: white;
`;

const Fieldset = styled.fieldset`
  font-weight: bold;
  font-size: 1rem;
  padding: 1vw;
  margin: 1vw;
`;

const PhoneInput = styled.input`
  font-size: 1rem;
  width: 11vw;
  margin-right: 1vw;
`;

const AddressInput = styled.input`
  font-size: 1rem;
  width: 33vw;
`;

const Label = styled.label`
  font-weight: normal;
  margin-right: 0.5vw;
`;

const Legend = styled.legend`
  margin-left: 1vw;
`;

const CustomerForm = styled.form`

`;

class CustomerInfo extends React.Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.directionsDisplay = null;
    this.directionsService = null;
    this.DirectionsRenderer = null;
    this.geocoder = null;
    
  }
  state = {
    placeFormatted: '',
    placeId: '',
    placeLocation: '',
    storeAddress: '9719 Mills Rd, Houston, Tx 77070, USA',
  };

  static extractSearchName = searchName => {
    if (searchName.length > 0 && searchName.charAt(0).match(/[a-z]/i)) {
      return searchName.substr(0, searchName.indexOf(','));
    }
    return '';
  };

  /*
 * Create an address from the AUTOCOMPLETE place.
 * Create an address object, extracting information from the autocomplete place object.
 */
  static getAddressComponents = (place, addressNames) => {
    const address = {
      id: null,
      customer: null,
      streetNumber: "",
      street: "",
      neighborhood: "",
      location: "",
      locationId: null,
      city: "",
      county: "",
      state: "",
      country: "",
      zip: "",
      unit: "",
      str: "",
      type: null,
      comment: "",
      miles: 0
    };
    let components;

    address.phones = new Array(3);

    for (let i = 0; i < address.phones.length; i++) {
      address.phones[i] = {
        phone: null,
        phoneId: null,
        phoneTypeId: null,
      };
    }

    address.str = place.formatted_address;

    components = place.address_components;
    if (components) {
      for (let i = 0; i < components.length; i++) {
        let type = components[i].types[0];
        switch (type) {
          case "street_number":
            address.streetNumber = components[i].long_name;
            break;
          case "route":
            address.street = components[i].short_name;
            break;
          case "neighborhood":
            address.neighborhood = components[i].long_name;
            address.location = address.neighborhood;
            address.type = "1";
            break;
          case "locality":
            address.city = components[i].long_name;
            break;
          case "administrative_area_level_2":
            address.county = components[i].long_name;
            break
          case "administrative_area_level_1":
            address.state = components[i].short_name;
            break;
          case "country":
            address.country = components[i].long_name;
            break;
          case "postal_code":
            address.zip = components[i].long_name;
            break;
          default:
            break;
        }
      }
    }

    if (address.location === '') {
      const name = _.property('name')(addressNames.find(
        nameObj => nameObj.street_address === `${address.streetNumber} ${address.street}`)
      );
      address.location = name || '';
      if (address.location !== '') {
        address.type = "2";
        address.updateAddress = true;
      }
    }

    // add the zip code to the query string to insure query returns accurate results
    let asplit = address.str.split(',');
    if (asplit.length && asplit.pop().trim() === 'United States') {
      address.str = address.str.replace(', United States', ' ' + address.zip + ', USA');
    }

    return address;
  };

  static lookupAddress = address => {
    console.log('address:', address);
  }

  getRouteToAddress = (address, place) => {
    let request = {
      destination: address.str,
      origin: this.state.storeAddress,
      travelMode: window.google.maps.DirectionsTravelMode.DRIVING
    };

    this.directionsService.route(request, (response, status) => {
      switch (status) {
        case window.google.maps.DirectionsStatus.OK:
          this.directionsDisplay.setDirections(response);
          address.miles = response.routes[0].legs.reduce((total, leg) => total + leg.distance.value, 0) / 1609.0;
          console.log('route result', address);
          break;

        case window.google.maps.DirectionsStatus.NOT_FOUND:
        case window.google.maps.DirectionsStatus.ZERO_RESULTS:
        case window.google.maps.DirectionsStatus.INVALID_REQUEST:
        case window.google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED:
        case window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT:
        case window.google.maps.DirectionsStatus.REQUEST_DENIED:
        case window.google.maps.DirectionsStatus.UNKNOWN_ERROR:
        default:
          console.error('Route status: ' + status);
      }
    });

    // bring the selected place in view on the map
    this.map.fitBounds(place.geometry.viewport);
  }

  handleAddressEntry = place => {
    let location = place.geometry.location;
    const { addressNames } = this.props;

    this.setState({
      placeFormatted: place.formatted_address,
      placeId: place.place_id,
      placeLocation: location.toString(),
    });

    /*
     * Invoke the geocoder to get more information about the address.
     */
    this.geocoder.geocode({ address: this.state.placeFormatted }, (result, status) => {
      let address;
      if (status === window.google.maps.GeocoderStatus.OK) {
        place = result[0];

        // Examine result to see if this address could be invalid
        if (place.geometry.location_type !== 'ROOFTOP') {
          console.warn('WARNING: This may be an invalid address! Please check the street number with the customer.');
        }

        address = CustomerInfo.getAddressComponents(place, addressNames);
        if (address.location === '') {
          address.location = CustomerInfo.extractSearchName(document.getElementById('searchAddress').value);
        }
        this.getRouteToAddress(address, place);
        CustomerInfo.lookupAddress(address);
      } else {
        console.error('Geocoder failed with status ' + result.status);
      }
    });
  }

  initMap = () => {
    const swLatLng = new window.google.maps.LatLng(29.901972370105305, -95.6411361694336);
    const neLatLng = new window.google.maps.LatLng(30.03224435196566, -95.49694061279297);
    const biasBounds = new window.google.maps.LatLngBounds(swLatLng, neLatLng);
    const options = {
      types: [],
      componentRestrictions: { country: 'us' },
      bounds: biasBounds
    };
    this.geocoder = new window.google.maps.Geocoder();

    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 29.9583341, lng: -95.5646142 },
      zoom: 15,
      mapTypeId: 'roadmap',
    });

    this.directionsService = new window.google.maps.DirectionsService();
    this.directionsDisplay = new window.google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(this.map);

    let autoComplete = new window.google.maps.places.Autocomplete(document.getElementById('searchAddress'), options);

    autoComplete.addListener('place_changed', () => {
      this.handleAddressEntry(autoComplete.getPlace());
    });
  }

  componentDidMount() {
    this.initMap();
  }

  onSearchPhoneChange = (phoneNumber) => {
    const phone = normalize(phoneNumber);
    if (phone.length >= 10) {
      console.log(`Searching for phone #: ${phone}.`);
    }
  }

  render() {
    return (
      <StyledCustomerInfo>
        <Header>Customer Information</Header>
        <Grid>
          <CustomerForm>
            <Fieldset>
              <Legend>Search</Legend>
              <Label>Phone:</Label>
              <SearchPhone id='searchPhone' onChange={this.onSearchPhoneChange} inputComponent={PhoneInput} />
              <Label>Search Address:</Label>
              <AddressInput id='searchAddress' type='text' />
            </Fieldset>
            <Fieldset>
              <p>{this.state.placeFormatted}</p>
            </Fieldset>
          </CustomerForm>
          <MapDiv id='map' />
        </Grid>
      </StyledCustomerInfo>
    );
  }
}

const mapStateToProps = state => ({
  addressNames: state.supportInfo.addressNames
});

export default connect(mapStateToProps)(CustomerInfo);