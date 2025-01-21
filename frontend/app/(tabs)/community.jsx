import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For the + icon
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { router } from 'expo-router';
import mainService from '../services/mainService';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const posts = await mainService.fetchPosts();
      setPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.author}>Author Email : {item.author}</Text>

    </View>
  );

  const handleAddPost = () => {
    router.push('/createpost');
  };

  const handleViewAllPosts = () => {
    // Navigate to the screen where all posts are listed, if different from this one
    router.push('/allmineposts');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Community Forum</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={handleViewAllPosts}
          >
            <Text style={styles.viewAllText}>View Mine</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
            <MaterialIcons name="add" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  author:{
    marginTop:15,
  },
  container: {
    flex: 1,
    padding: 15,
    marginTop: 35,
    backgroundColor: '#e8f5e9',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#0056D2',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#0056D2',
    borderRadius: 20,
    marginRight: 10,
  },
  viewAllText: {
    color: 'white',
    fontSize: 16,
  },
  post: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 10,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 9,
    color: '#333',
  },
  content: {
    fontSize: 18,
    color: '#555',
  },
});

export default Community;
