import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const tasks = () => {
  return (
    <View style={styles.container}>
      <Text>Tasks</Text>
    </View>
  );
};

export default tasks;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
