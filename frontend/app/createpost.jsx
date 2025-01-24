import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import mainService from './services/mainService'; // Assuming your backend logic is in here
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = async () => {
    try {
      if (!title || !content) {
        Alert.alert('Error', 'Please fill in both the title and content');
        return;
      }

      const newPost = { title, content };

      console.log('Creating new post:', newPost);
      const res = await mainService.createPost(newPost);
      console.log('API Response:', res);
      if (res) {
        router.push('/community');
      } else {
        Alert.alert('Error', 'Failed to create Post.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create Post.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a New Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter post title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter post content"
        value={content}
        onChangeText={setContent}
        multiline={true}
        numberOfLines={10}
      />

      <CustomButton
        title="Create Post"
        handlePress={() => handleCreatePost()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  textArea: {
    height: 100,
  },
});

export default CreatePost;
