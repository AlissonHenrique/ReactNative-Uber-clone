import React from 'react';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
export default function Search() {
  return (
    <GooglePlacesAutocomplete
      placeholfer="para onde?"
      onPress={() => { }}
      query={{
        key= 'AIzaSyBDnXaV3pogx6FedRx238u_Ddb3SCgDnQ8',
        language: 'pt',
      }}
      textInputProps={{
        autoCapitalize: "none",
        autoCorrect: false

      }}

    />
  );

}
