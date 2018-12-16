import React, { Component } from 'react';
import {
  Dimensions,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

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

  // После первого рендера компонента отправляем экшн получения маркеров
  // и сохранения их в стейт приложения (т.е. в стор)
  componentDidMount() {
    this.props.fetchMarkers();
    navigator.geolocation.getCurrentPosition(
      ((position) => {
        this.setState({
          LATITUDE: position.coords.latitude,
          LONGITUDE: position.coords.longitude,
        });
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
      />
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
  fetchMarkers: () => dispatch(fetchMarkers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
