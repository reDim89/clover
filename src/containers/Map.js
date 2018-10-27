import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
} from 'react-native';

import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 55.75222;
const LONGITUDE = 37.61556;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const SAMPLE_REGION = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const Map = () => (
  <MapView
    style={{ height: '100%', width: '100%' }}
    initialRegion={SAMPLE_REGION}
  />
);

export default Map;
