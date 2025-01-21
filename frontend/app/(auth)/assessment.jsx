import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import mainService from '../services/mainService';
import { router } from 'expo-router';

const AssessmentPage = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState({});
  const navigation = useNavigation();

  const getQuestions = async () => {
    try {
      const response = await mainService.getQuestions(); // Fetch questions asynchronously
      setQuestions(response);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const getUser = async () => {
    try {
      const user = await mainService.getUser(); // Fetch user
      setUser(user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex - 1);
    }
  };

  const isAllAnswered = () => {
    return questions.every((item) => selectedAnswers[item.id]);
  };

  const handleSubmit = async () => {
    if (isAllAnswered()) {
      const formattedAnswers = questions.map((question) => ({
        id: question.id,
        _id: question._id,
        answer: selectedAnswers[question.id],
      }));

      try {
        await mainService.assessment(formattedAnswers);
        router.push('/home'); // Assuming you navigate to 'home' after submitting
      } catch (error) {
        Alert.alert('Error', 'There was an issue submitting your answers.');
      }
    } else {
      Alert.alert(
        'Incomplete',
        'Please answer all the questions before submitting.'
      );
    }
  };

  useEffect(() => {
    getQuestions();
    getUser();
  }, []);

  const renderQuestion = ({ item }) => {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{item.question}</Text>
        {[1, 2, 3, 4, 5].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedAnswers[item.id] === option && styles.selectedOption,
            ]}
            onPress={() => handleAnswerSelect(item.id, option)}
          >
            <Text
              style={[
                styles.optionText,
                selectedAnswers[item.id] === option && styles.selectedOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading questions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>Hi, <Text style={styles.boldName}>{user.name}</Text></Text>
        <Text style={styles.assessmentTitle}>Complete Your Assessment</Text>
      </View>

      <View style={styles.questionContainerBox}>
        <FlatList
          data={[questions[currentQuestionIndex]]} // Only show the current question
          renderItem={renderQuestion}
          keyExtractor={(item) => item?.id?.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.questionSlider}
        />
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <Text style={styles.navButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, isAllAnswered() && styles.disabledButton]}
          onPress={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          <Text style={styles.navButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, !isAllAnswered() && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!isAllAnswered()}
      >
        <Text style={styles.submitButtonText}>Submit Assessment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boldName: {
    fontSize: 35,
    fontFamily: 'System',
    color: '#0056D2',
    fontWeight: 900,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    marginTop: 15,
    marginBottom: 5,
    alignItems: 'center',
  },
  username: {
    marginTop: 23,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  assessmentTitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
  questionSlider: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 6,
    width: 350,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  questionContainerBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    padding: 12,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0056D2',
    width: '80%',
  },
  selectedOption: {
    backgroundColor: '#0056D2', // Background color of selected option
  },
  selectedOptionText: {
    color: 'white',
    fontWeight:700 // White text color when selected
  },
  optionText: {
    fontSize: 16,
    color: '#000', // Default color
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 120,
  },
  navButton: {
    backgroundColor: '#0056D2',
    padding: 5,
    paddingBottom: 9,
    borderRadius: 5,
    width: 60,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 900,
  },
  submitButton: {
    backgroundColor: '#0056D2',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#b0c4de',
  },
});

export default AssessmentPage;
