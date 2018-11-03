import React, { Component } from 'react';
import {
  Dimensions,
//  View,
//  Text,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import { connect } from 'react-redux';

import fetchMarkers from '../redux/actions/fetchMarkersActions';

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

const SAMPLE_PIN = {
  latitude: 55.730149,
  longitude: 37.567605,
};

class Map extends Component {
  constructor() {
    super();
    this.state = {
      markers: [],
    };
  }

  componentDidMount() {
    this.props.fetchMarkers();
  }

  renderMarkers() {
    return this.props.markers.map(marker => (
      <Marker
        coordinate={{
          latitude: marker.venue.location.lat,
          longitude: marker.venue.location.lng,
        }}
        title={marker.venue.name}
      />
    ));
  }

  render() {
    return (
      <MapView
        style={{ height: '100%', width: '100%' }}
        initialRegion={SAMPLE_REGION}
      >
        <Marker
          coordinate={SAMPLE_PIN}
          title="Luch"
          description="Posh bar with a long bar stand"
        />
        {this.renderMarkers()}
      </MapView>
    );
  }
}

const mapStateToProps = state => ({
  markers: state.fetchMarkersReducer.markers,
});

const mapDispatchToProps = dispatch => ({
  fetchMarkers: () => dispatch(fetchMarkers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
