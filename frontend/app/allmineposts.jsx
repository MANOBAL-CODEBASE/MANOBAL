import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import mainService from './services/mainService';
import { MaterialIcons } from '@expo/vector-icons'; // For the + icon
import { useRouter } from 'expo-router';

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    setLoading(true);
    try {
      const posts = await mainService.fetchMyPosts();
      setMyPosts(posts.posts);
    } catch (error) {
      console.error('Error fetching my posts:', error);
      Alert.alert('Error', 'Failed to fetch your posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = (postId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await mainService.deletePost(postId);
              Alert.alert('Success', 'Post deleted successfully.');
              setMyPosts(myPosts.filter((post) => post._id !== postId));
            } catch (error) {
              console.error('Error deleting post:', error);
              Alert.alert(
                'Error',
                'Failed to delete the post. Please try again.'
              );
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeletePost(item._id)}
      >
        <View style={styles.iconWrapper}>
          <MaterialIcons
            name="delete"
            size={20}
            color="white"
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  const handleAddPost = () => {
    router.push('/createpost');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Posts</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
          <MaterialIcons name="add" size={25} color="white" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={myPosts}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 35,
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
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#0056D2',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    padding: 5, // Adjust the padding to create space around the icon
    borderRadius: 20, // Makes the button circular
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconWrapper: {
    width: 30, // Set width for the circular wrapper
    height: 30, // Set height for the circular wrapper
    borderRadius: 15, // Ensures it’s perfectly round
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MyPosts;
