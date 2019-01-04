import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';

import { connect } from 'react-redux';

import fetchMarkers from '../redux/actions/fetchMarkersActions';

import MarkerContainer from './MarkerContainer';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0511;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends Component {
  constructor() {
    super();
    this.state = {
      markers: [],
      LATITUDE: 0,
      LONGITUDE: 0,
    };
  }

  // После первого рендера компонента определяем геолокацию и записываем в стейт
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ((position) => {
        this.setState({
          LATITUDE: position.coords.latitude,
          LONGITUDE: position.coords.longitude,
        });
        // Получаем ближайшие маркеры
        const ll = `${this.state.LATITUDE},${this.state.LONGITUDE}`;
        this.props.fetchMarkers(ll);
      }),
      error => console.log(error.message),
    );
  }

  renderMarkers() {
    const { markers } = this.props;
    return markers.map(marker => (
      <Marker
        key={marker.id}
        coordinate={{
          latitude: marker.lat,
          longitude: marker.lng,
        }}
        title={marker.name}
        pinColor="#94DCD4"
      >
        <Callout tooltip {...marker}>
          <MarkerContainer {...marker} />
        </Callout>
      </Marker>
    ));
  }

  render() {
    const { LATITUDE, LONGITUDE } = this.state;
    return (
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showsUserLocation
      >
        {this.renderMarkers()}
      </MapView>
    );
  }
}

const mapStateToProps = state => ({
  markers: state.fetchMarkersReducer.markers,
});

const mapDispatchToProps = dispatch => ({
  fetchMarkers: ll => dispatch(fetchMarkers(ll)),
});

const styles = StyleSheet.create({
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
