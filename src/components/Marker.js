import React from 'react';
import {
  View, Text, Image, StyleSheet, Linking,
} from 'react-native';

function prettyPrice(price) {
  switch (price) {
    case 1:
      return '$';
    case 2:
      return '$$';
    case 3:
      return '$$$';
    default:
      return price;
  }
}

const Marker = (props) => {
  const {
    name, url, photo, price, description
  } = props;
  return (
    <View style={styles.markerContainer}>
      <View style={styles.markerBubble}>
        <Text style={styles.markerTitle}>
          {name}
        </Text>
        <Text style={styles.markerText}>
          {cutDescription(description)}
        </Text>
        <Text style={styles.markerPrice}>
          {prettyPrice(price)}
        </Text>
        <Text
          onPress={() => Linking.openURL(url)}
          style={styles.markerLink}
        >
          {url}
        </Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: photo }}
        />
      </View>
      <View style={styles.markerArrow} />
    </View>
  );
};

const cutDescription = (description) => {
  if (description.substring(0, 70) === description) {
    return description;
  }
  return `${description.substring(0, 70)}...`;
};

const styles = StyleSheet.create({
  markerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 240,
    height: 210,
  },
  markerBubble: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#94DCD4',
    borderRadius: 10,
    width: '100%',
    height: '100%',
    padding: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 10.0,
  },
  markerArrow: {
    width: 0,
    height: 0,
    marginLeft: 115,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 20,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#94DCD4',
  },
  markerTitle: {
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 28,
  },
  markerText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'left',
    lineHeight: 16,
  },
  markerLink: {
    fontSize: 14,
    color: '#0000EE',
    textAlign: 'left',
    lineHeight: 16,
    textDecorationLine: 'underline',
  },
  markerPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
    lineHeight: 16,
  },
  markerPictureContainer: {

  },
});

export default Marker;
