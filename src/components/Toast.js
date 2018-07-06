// Вьюха для показа нотификаций

import React from 'react';
import {
  StyleSheet,
  Text,
  Animated,
} from 'react-native';

import PropTypes from 'prop-types';

const Toast = (props) => {
  return (
    <Animated.View
      style={[styles.animatedToastView,
              {
                opacity: props.animateOpacityValue,
                top: (props.position === 'top') ? '1%' : '80%',
                backgroundColor: props.backgroundColor,
              },
            ]}
    >
      <Text
        numberOfLines={1}
        style={[styles.toastText,
                {
                  color: props.textColor,
                },
              ]}
      >
        {props.toastMessage}
      </Text>
    </Animated.View>
  );
};

Toast.propTypes = {
  animateOpacityValue: PropTypes.number,
  position: PropTypes.oneOf(['top', 'bottom']),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  toastMessage: PropTypes.string.isRequired,
};

Toast.defaultProps = {
  backgroundColor: '#666666',
  textColor: '#fff',
  animateOpacityValue: 0,
  position: 'top',
};

const styles = StyleSheet.create({
  animatedToastView: {
    marginHorizontal: 30,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 25,
    zIndex: 9999,
    left: 0,
    right: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {
    fontSize: 15,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});

export default Toast;
