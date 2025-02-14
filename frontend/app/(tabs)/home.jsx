import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg'; // Keeping the progress circle intact
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // For user avatar
import CustomButton from '../../components/CustomButton';
import { router, useFocusEffect } from 'expo-router';
import mainService from '../services/mainService';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import authService from '../services/authServices';

const Dashboard = () => {
  const strokeDasharray = 2 * Math.PI * 40; // Circle circumference
  const [user, setUser] = useState({});
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState([5, 5, 5, 5, 5, 5]);
  const [modalVisible, setModalVisible] = useState(false);

  const getUser = async () => {
    try {
      const user = await mainService.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const checkLoggedIn = async () =>{
    const res =  await authService.getToken();
    if(!res){
      router.push('/')
    }
  }

  const getScore = async () => {
    try {
      const scores = await mainService.getScore();
      const values = Object.values(scores);
      setScore(values);
      const sum = values.reduce((acc, value) => acc + value, 0);
      setProgress(sum * 4);
    } catch (error) {
      console.error('Error fetching score:', error);
    }
  };

  const getDate = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const date = new Date();

    const day = days[date.getDay()];
    const dd = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];

    return `${day}, ${dd} ${month}`;
  };

  const handleLogout = async () => {
    await authService.logout();
    router.push('/');
    setModalVisible(false);
  };

  const handleViewProfile =  () => {
    // Navigate to profile page
    
    router.push('/viewprofile');
    setModalVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      checkLoggedIn(); // Check login whenever the screen comes into focus
      getUser();
      getScore();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.smallTitle}>
          Hi, <Text style={styles.boldName}>{user.name}</Text>
        </Text>
        <Text style={styles.date}>{getDate()}</Text>

        {/* Avatar with Options */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {/* User Icon (Default avatar) */}
          <MaterialCommunityIcons
            name="account-circle"
            size={30}
            color="black"
            style={styles.avatarIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Modal for Profile and Logout Options */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContainer}>
            <Pressable style={styles.modalOption} onPress={handleViewProfile}>
              <Text style={styles.modalText}>View Profile</Text>
            </Pressable>
            <Pressable style={styles.modalOption} onPress={handleLogout}>
              <Text style={styles.modalText}>Logout</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>Overall Performance</Text>

        <Svg width="100" height="100" style={styles.progressCircle}>
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke="#d3d3d3"
            strokeWidth="10"
            fill="none"
          />
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke="#007BFF"
            strokeWidth="10"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={
              strokeDasharray - (progress / 100) * strokeDasharray
            }
            strokeLinecap="round"
          />
        </Svg>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>

      <View style={styles.barChart}>
        <Text style={[styles.progressTitle, styles.mb3]}>
          Individual Performance
        </Text>
        <LineChart
          data={{
            labels: [
              'Openness',
              'Conscientiousness',
              'Extraversion',
              'Agreeableness',
              'Neuroticism',
            ],
            datasets: [{ data: score }],
          }}
          width={Dimensions.get('window').width - 35}
          height={285}
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#f7f7f7',
            backgroundGradientFrom: '#e8f5e9',
            backgroundGradientTo: '#e8f5e9',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Green shades
            labelColor: (opacity = 1) => `rgba(60, 60, 60, ${opacity})`,
            style: { borderRadius: 5 },
            propsForDots: { r: '6', strokeWidth: '2', stroke: '#66bb6a' },
          }}
          bezier
          style={styles.chartStyle}
          verticalLabelRotation={-60}
          xLabelsOffset={30}
        />
      </View>

      <CustomButton
        title="Give Assessment Again"
        handlePress={() => router.push('/assessment')}
      />

      <CustomButton
        title="Complete Yout Next Task"
        handlePress={() => router.push('/tasks')}
        containerStyles={styles.mt8}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mt8:{
    marginTop:8,
    backgroundColor:'#4bad52'
  },
  boldName: {
    fontSize: 35,
    fontFamily: 'System',
    color: '#0056D2',
    fontWeight: 'bold',
  },
  mb3: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 22,
  },
  smallTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: '#555',
  },
  avatarIcon: {
    marginLeft: 10,
  },
  progressSection: {
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 28,
    color: '#333',
  },
  progressCircle: {
    marginTop: 5,
  },
  progressText: {
    position: 'absolute',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    top: 95,
    left: 167,
  },
  chartStyle: {
    marginBottom: 16,
    borderRadius: 16,
  },
  barChart: {
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },

  /* Styling for modal to make it classy */
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalOption: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500', // Gives it a refined look
  },
});

export default Dashboard;
