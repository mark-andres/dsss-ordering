import React from 'react';
import PhoneInput from 'react-phone-input-auto-format';

const SearchPhone = ({onChange, inputComponent, placeholder}) => {
    return (
        <PhoneInput onChange={onChange} inputComponent={inputComponent} placeholder={placeholder}/>
    );
}

export default SearchPhone;