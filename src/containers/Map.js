import React, { Component } from 'react';
import {
  Dimensions,
  Text,
} from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';

import { connect } from 'react-redux';

import fetchMarkers from '../redux/actions/fetchMarkersActions';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0411;
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
        coordinate={{
          latitude: marker.lat,
          longitude: marker.lng,
        }}
        title={marker.name}
      >
        <Callout>
          <Text>
            {marker.name}
          </Text>
          <Text>
            {marker.address}
          </Text>
        </Callout>
      </Marker>
    ));
  }

  render() {
    const { LATITUDE, LONGITUDE } = this.state;
    return (
      <MapView
        style={{ height: '100%', width: '100%' }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Map);
