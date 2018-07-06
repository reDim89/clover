import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

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

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    return (
      <MapView
        style={styles.map}
        initialRegion={SAMPLE_REGION}
      >
        <Marker
          coordinate={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Profile')}
        >
          <Text style={{ color: '#fff' }}>Go to profile</Text>
        </TouchableOpacity>
      </MapView>
    )};
};

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    flex: 1,
    maxHeight: 40,
    backgroundColor: '#1155DD',
    borderRadius: 20,
  },
});

export default Map;
