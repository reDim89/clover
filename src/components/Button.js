import React from 'react';
import { PropTypes } from 'prop-types';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

// У компонента нет states, поэтому используется pure functional component

const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.buttonStyle}
    >
      <Text style={styles.textStyle}>
        {props.buttonText}
      </Text>
    </TouchableOpacity>
  );
};

// В явном виде прописаны типы пропсов, их дефолтные значения и обязательность

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
};

Button.defaultProps = {
  buttonText: 'Click to login',
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 6,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Button;
