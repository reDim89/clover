import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import Marker from '../components/Marker';

class MarkerContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      markerDetails: {},
    };
  }

  // id передается при создании маркера на карте
  // получаем детали маркера по id
  componentWillMount() {
    const { id } = this.props;
    fetch('https://clover-moscow.herokuapp.com/bar_details/'
               + `${id}`)
      .then(response => response.json())
      .then(json => this.setState({ isLoaded: true, markerDetails: json }))
      .catch(err => console.log(id, err));
  }

  render() {
    const { isLoaded, markerDetails } = this.state;
    // Проверяем, что асинхронный запрос завершился
    if (!isLoaded) {
      return <ActivityIndicator />;
    }
    return (
      <Marker {...markerDetails} />
    );
  }
}

export default MarkerContainer;
