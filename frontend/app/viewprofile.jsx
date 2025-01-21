import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import mainService from './services/mainService'; // Assuming you have a service to handle data fetching and updating

const ViewProfile = () => {
  // Initial user profile state
  const [user, setUser] = useState({
    name: '',
    email: '',
    gender: '',
    age: '',
  });

  // State to handle input changes
  const [editableUser, setEditableUser] = useState(user);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await mainService.getUser(); // Fetch user data from service
        console.log(data); // Inspect the fetched data to ensure age is included
        const fetchedData = {
          ...data,
          age: data.age ? String(data.age) : '', // Convert age to string if present
        };
        setUser(fetchedData);
        setEditableUser(fetchedData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (name, value) => {
    setEditableUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = async () => {
    if (
      isNaN(editableUser.age) ||
      editableUser.age <= 0 ||
      !Number.isInteger(Number(editableUser.age))
    ) {
      Alert.alert('Error', 'Please enter a valid integer for age.');
      return;
    }

    try {
      await mainService.updateUserProfile(editableUser);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={editableUser.name}
          onChangeText={(text) => handleInputChange('name', text)}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={editableUser.email}
          onChangeText={(text) => handleInputChange('email', text)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Gender:</Text>
        <TextInput
          style={styles.input}
          value={editableUser.gender}
          onChangeText={(text) => handleInputChange('gender', text)}
          placeholder="Enter your gender"
        />
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          value={editableUser.age}
          onChangeText={(text) => handleInputChange('age', text)}
          placeholder="Enter your age"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    marginTop:30
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ViewProfile;
