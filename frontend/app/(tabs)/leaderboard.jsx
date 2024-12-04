import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const leaderboard = () => {
  return (
    <View style={styles.container}>
      <Text>Leaderboard</Text>
    </View>
  );
};

export default leaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
