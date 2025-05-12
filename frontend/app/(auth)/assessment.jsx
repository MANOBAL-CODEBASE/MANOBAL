import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList, 
  Alert,
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import mainService from '../services/mainService';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const RATING_OPTIONS = [
  { value: 1, label: 'Strongly Disagree', emoji: '😞', color: '#FF6B6B' },
  { value: 2, label: 'Disagree', emoji: '😕', color: '#FFA07A' },
  { value: 3, label: 'Neutral', emoji: '😐', color: '#FFD93D' },
  { value: 4, label: 'Agree', emoji: '🙂', color: '#98D8AA' },
  { value: 5, label: 'Strongly Agree', emoji: '😊', color: '#4CAF50' },
];

const AssessmentPage = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState({});
  const [fadeAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));
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

  const animateTransition = (direction) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: direction === 'next' ? -width : width,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentQuestionIndex((prev) => 
        direction === 'next' ? prev + 1 : prev - 1
      );
      slideAnim.setValue(direction === 'next' ? width : -width);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      animateTransition('next');
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      animateTransition('prev');
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: answer,
    }));
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
      <Animated.View 
        style={[
          styles.questionContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <Text style={styles.questionText}>{item.question}</Text>
        <View style={styles.optionsContainer}>
          {RATING_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                selectedAnswers[item.id] === option.value && {
                  backgroundColor: option.color,
                  borderColor: option.color,
                },
              ]}
              onPress={() => handleAnswerSelect(item.id, option.value)}
            >
              <Text style={styles.optionEmoji}>{option.emoji}</Text>
              <Text
                style={[
                  styles.optionText,
                  selectedAnswers[item.id] === option.value && styles.selectedOptionText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  };

  if (questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading questions...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={['#f0f4ff', '#ffffff']}
        style={styles.container}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.username}>
              Hi, <Text style={styles.boldName}>{user.name}</Text>
            </Text>
            <Text style={styles.assessmentTitle}>Complete Your Assessment</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                Question {currentQuestionIndex + 1} of {questions.length}
              </Text>
            </View>
          </View>

          <View style={styles.questionContainerBox}>
            <FlatList
              data={[questions[currentQuestionIndex]]}
              renderItem={renderQuestion}
              keyExtractor={(item) => item?.id?.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.questionSlider}
            />
          </View>

          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={[
                styles.navButton,
                currentQuestionIndex === 0 && styles.disabledButton,
              ]}
              onPress={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.navButton,
                currentQuestionIndex === questions.length - 1 && styles.disabledButton,
              ]}
              onPress={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              <Text style={styles.navButtonText}>Next</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              !isAllAnswered() && styles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={!isAllAnswered()}
          >
            <Text style={styles.submitButtonText}>Submit Assessment</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  header: {
    marginTop: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  username: {
    marginTop: 23,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  boldName: {
    fontSize: 35,
    fontFamily: 'System',
    color: '#0056D2',
    fontWeight: '900',
  },
  assessmentTitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
  progressContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0056D2',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: width - 40,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 32,
  },
  questionContainerBox: {
    minHeight: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    width: '100%',
    marginTop: 10,
  },
  optionButton: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  optionEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#0056D2',
    padding: 14,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#0056D2',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#b0c4de',
    opacity: 0.7,
  },
});

export default AssessmentPage;
