import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    marginTop: 20,
    backgroundColor: '#673149',
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '800',
  },
});

export default Header;
