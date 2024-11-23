import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.buttonContainer,
        containerStyles,
        isLoading && styles.disabledButton,
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.buttonText, textStyles]}>{title}</Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={styles.loader}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#f1bd0e',
    borderRadius: 10,
    minHeight: 62,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#212f3d',
    fontFamily: 'Roboto',
    fontSize: 18,
  },
  loader: {
    marginLeft: 8,
  },
});

export default CustomButton;
