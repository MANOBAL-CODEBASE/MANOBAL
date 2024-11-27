import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Assessment = () => {
  return (
    <View style={styles.center}>
      <Text>Assessment</Text>
    </View>
  );
};

export default Assessment;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
