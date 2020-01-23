import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey='AIzaSyBDnXaV3pogx6FedRx238u_Ddb3SCgDnQ8'
    strokeWidth={3}
    strokeColor="#222"
  />
);

export default Directions;