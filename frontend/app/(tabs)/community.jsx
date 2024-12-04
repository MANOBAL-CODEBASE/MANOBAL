import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const community = () => {
  return (
    <View style={styles.container}>
      <Text>Community</Text>
    </View>
  );
};

export default community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
