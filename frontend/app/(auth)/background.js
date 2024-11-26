import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // takes up the full screen height
    justifyContent: 'center', // vertically center content
    alignItems: 'center', // horizontally center content
    backgroundColor: 'lightgrey', // set the background color here
  },
  text: {
    fontSize: 20,
  },
});

export default App;