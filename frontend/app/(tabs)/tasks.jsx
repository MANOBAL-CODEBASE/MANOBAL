import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import mainservice from '../services/mainService'; // Adjust the path as needed
import { useFocusEffect } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton'; // Ensure the path is correct

const Tasks = () => {
  const [nextTask, setNextTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompleting, setIsCompleting] = useState(false);

  // Function to fetch next task
  const fetchNextTask = async () => {
    setIsLoading(true);
    try {
      const task = await mainservice.getNextTask();
      setNextTask(task);
      setError(null);
    } catch (err) {
      setError('Failed to fetch task');
    }
    setIsLoading(false);
  };

  // Function to complete task
  const completeTask = async () => {

    setIsCompleting(true);
    try {
      await mainservice.completeTask();
      Alert.alert('Success', 'Task marked as completed!');
      fetchNextTask();
    } catch (err) {
      Alert.alert('Error', 'Failed to complete the task.');
    }
    setIsCompleting(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchNextTask();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Next Task</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : nextTask ? (
        <View style={styles.taskCard}>
          <Text style={styles.taskTitle}>{nextTask.title}</Text>
          <Text style={styles.taskDescription}>{nextTask.description}</Text>
          <CustomButton
            title="Complete Your Next Task"
            handlePress={completeTask}
            containerStyles={styles.button}
          />
        </View>
      ) : (
        <Text style={styles.noTaskText}>No pending tasks available.</Text>
      )}
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  taskCard: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  taskDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  noTaskText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});
