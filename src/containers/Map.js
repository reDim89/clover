import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import { connect } from 'react-redux';

import fetchMarkers from '../redux/actions/fetchMarkersActions';

import MarkerContainer from './MarkerContainer';
import Button from '../components/Button';

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
    Geolocation.getCurrentPosition(
      ((position) => {
        this.setState({
          LATITUDE: position.coords.latitude,
          LONGITUDE: position.coords.longitude,
        });
        // Получаем ближайшие маркеры
        const ll = `${this.state.LATITUDE},${this.state.LONGITUDE}`;
        this.props.fetchMarkers(ll);
      }),
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }

  renderMarkers() {
    const { markers } = this.props;
    console.log(markers);
    if (this.state.showMarkers) {
      return markers.map((marker, index) => (
        <Marker
          key={index}
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
    };
    return null;
  }

  render() {
    const { LATITUDE, LONGITUDE } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
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
        <Button
          onPress={() => this.setState({ showMarkers: true })}
          buttonText="Show me bars"
          style={{ position: 'absolute', bottom: 50 }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  markers: state.fetchMarkersReducer.markers,
  auth: state.authReducer.auth,
});

const mapDispatchToProps = dispatch => ({
  fetchMarkers: ll => dispatch(fetchMarkers(ll)),
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
