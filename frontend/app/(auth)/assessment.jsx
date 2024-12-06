// import { StyleSheet, Text, View } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import authService from '../services/authServices';

// const Assessment = () => {
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const retrievedToken = await authService.getToken();
//         setToken(retrievedToken);
//       } catch (error) {
//         console.error('Error fetching token:', error);
//       }
//     };

//     fetchToken();
//   }, []); // Run only once when the component mounts

//   return (
//     <View style={styles.center}>
//       <Text>Assessment</Text>
//       <Text>{token ? token : 'No token found'}</Text>
//     </View>
//   );
// };

// export default Assessment;

// const styles = StyleSheet.create({
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   ScrollView,
//   Button,
// } from 'react-native';

// const AssessmentScreen = () => {
//   const questions = [
//     {
//       id: 1,
//       question: 'How do you usually handle stress?',
//       options: [
//         'I stay calm',
//         'I get anxious',
//         'I seek help',
//         'I try to distract myself',
//       ],
//     },
//     {
//       id: 2,
//       question: 'How do you feel about public speaking?',
//       options: [
//         'I enjoy it',
//         'I feel nervous',
//         'I avoid it',
//         "I'm okay with it",
//       ],
//     },
//     {
//       id: 3,
//       question: 'When faced with challenges, I tend to:',
//       options: [
//         'Stay positive',
//         'Give up',
//         'Look for solutions',
//         'Wait for it to pass',
//       ],
//     },
//     {
//       id: 4,
//       question: 'How would you rate your time management skills?',
//       options: ['Excellent', 'Good', 'Average', 'Poor'],
//     },
//     // Add more questions as needed
//   ];

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});

//   // Handle answer selection
//   const handleAnswerSelect = (questionId, answer) => {
//     setSelectedAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: answer,
//     }));
//   };

//   // Go to the next question
//   const nextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   // Go to the previous question
//   const previousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   // Submit the assessment
//   const handleSubmit = () => {
//     alert('Assessment Submitted!');
//     console.log('User answers:', selectedAnswers);
//   };

//   // Render the current question and options
//   const renderCurrentQuestion = () => {
//     const currentQuestion = questions[currentQuestionIndex];
//     return (
//       <View style={styles.questionContainer}>
//         <Text style={styles.questionText}>{currentQuestion.question}</Text>
//         {currentQuestion.options.map((option, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[
//               styles.optionButton,
//               selectedAnswers[currentQuestion.id] === option &&
//                 styles.selectedOption,
//             ]}
//             onPress={() => handleAnswerSelect(currentQuestion.id, option)}
//           >
//             <Text style={styles.optionText}>{option}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     );
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.username}>Hi, Prince Kumar!</Text>
//         <Text style={styles.assessmentTitle}>
//           Complete Your Personality Assessment
//         </Text>
//       </View>

//       {/* Current Question */}
//       {renderCurrentQuestion()}

//       {/* Navigation Buttons */}
//       <View style={styles.buttonContainer}>
//         {currentQuestionIndex > 0 && (
//           <TouchableOpacity style={styles.navButton} onPress={previousQuestion}>
//             <Text style={styles.navButtonText}>Previous</Text>
//           </TouchableOpacity>
//         )}

//         {currentQuestionIndex < questions.length - 1 ? (
//           <TouchableOpacity style={styles.navButton} onPress={nextQuestion}>
//             <Text style={styles.navButtonText}>Next</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//             <Text
//               handlePress={() => router.push('/plan')}
//               style={styles.submitButtonText}
//             >
//               Submit
//             </Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 40,
//     backgroundColor: '#f9f9f9',
//   },
//   header: {
//     marginBottom: 30,
//     alignItems: 'center',
//   },
//   username: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   assessmentTitle: {
//     fontSize: 18,
//     color: '#555',
//     marginTop: 10,
//   },
//   questionContainer: {
//     backgroundColor: '#fff',
//     padding: 10,
//     marginBottom: 15,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   questionText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   optionButton: {
//     padding: 12,
//     marginVertical: 5,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#007bff',
//   },
//   selectedOption: {
//     backgroundColor: '#007bff',
//   },
//   optionText: {
//     fontSize: 16,
//     color: '#333',
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   navButton: {
//     backgroundColor: '#007bff',
//     padding: 12,
//     borderRadius: 5,
//     width: '48%',
//     alignItems: 'center',
//   },
//   navButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   submitButton: {
//     backgroundColor: '#28a745',
//     padding: 12,
//     borderRadius: 5,
//     width: '50%',
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default AssessmentScreen;

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AssessmentPage = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigation = useNavigation();

  const questions = [
    {
      id: 1,
      question: "How do you usually handle stress?",
      options: ["I stay calm", "I get anxious", "I seek help", "I try to distract myself"],
    },
    {
      id: 2,
      question: "How do you feel about public speaking?",
      options: ["I enjoy it", "I feel nervous", "I avoid it", "I'm okay with it"],
    },
    {
      id: 3,
      question: "When faced with challenges, I tend to:",
      options: ["Stay positive", "Give up", "Look for solutions", "Wait for it to pass"],
    },
    {
      id: 4,
      question: "How would you rate your time management skills?",
      options: ["Excellent", "Good", "Average", "Poor"],
    },
    // Add more questions here
  ];

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const isAllAnswered = () => {
    return questions.every((item) => selectedAnswers[item.id]);
  };

  const handleSubmit = () => {
    if (isAllAnswered()) {
      // Navigate to '/plan' screen
      navigation.navigate('plan');
    } else {
      Alert.alert(
        'Incomplete',
        'Please answer all the questions before submitting.'
      );
    }
  };

  const renderQuestion = ({ item }) => {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{item.question}</Text>
        {item.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswers[item.id] === option && styles.selectedOption,
            ]}
            onPress={() => handleAnswerSelect(item.id, option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.username}>Hi, Prince!</Text>
        <Text style={styles.assessmentTitle}>Complete Your Assessment</Text>
      </View>

      {/* Question Slider */}
      <View style={styles.questionContainerBox}>

      <FlatList
        data={[questions[currentQuestionIndex]]} // Only show the current question
        renderItem={renderQuestion}
        keyExtractor={(item) => item.id.toString()}
        // horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.questionSlider}
        />
        </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    marginBottom: 20,
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
    justifyContent:'center',
    
    alignItems: 'center',
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 6,
    width: 320, // Adjust the width for the slider effect
    alignItems: 'center',
    // flexDirection:'row'
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  questionContainerBox:{
    flex: 1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'plum',

  },
  optionButton: {
    padding: 12,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    width: '100%',
  },
  selectedOption: {
    backgroundColor: '#007bff',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 40,
    marginBottom: 120
  },
  navButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: 120,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007bff',
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
    backgroundColor: '#b0c4de', // Lighter color when disabled
  },
});

export default AssessmentPage;
