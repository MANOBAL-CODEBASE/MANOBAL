import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import mainservice from '../services/mainService'; // Adjust the path as needed

const Tasks = () => {
  const [nextTask, setNextTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch next task
    const fetchNextTask = async () => {
      try {
        const response = await mainservice.getNextTask(); // API call from mainservice
        setNextTask(response.data); // Assuming the response is in `data`
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch task');
        setIsLoading(false);
      }
    };

    fetchNextTask();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task's Section</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <View style={styles.box}>
            <Text style={styles.boxHeading}>Your Next Task</Text>
            <Text>{nextTask ? nextTask : 'No task available'}</Text> {/* Display Next Task */}
          </View>

          <View style={styles.box}>
            <Text style={styles.boxHeading}>Your Previous Task</Text>
            {/* You can add more content for Previous Task here */}
          </View>
        </>
      )}
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  box: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
    borderRadius: 8,
  },
  boxHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
