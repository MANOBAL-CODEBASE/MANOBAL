import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import authService from '../services/authServices';

const Assessment = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const retrievedToken = await authService.getToken();
        setToken(retrievedToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []); // Run only once when the component mounts

  return (
    <View style={styles.center}>
      <Text>Assessment</Text>
      <Text>{token ? token : 'No token found'}</Text>
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
