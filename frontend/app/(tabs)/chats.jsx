import React, { useState, useRef } from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import images from '../../constants/images.js';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [wordMeaning, setWordMeaning] = useState(null);
  const scrollViewRef = useRef();

  const checkGrammar = async (text) => {
    // Simulated grammar check - Replace with actual API call
    return {
      corrected: text,
      suggestions: [],
    };
  };

  const getWordMeaning = async (word) => {
    setIsLoading(true);
    try {
      // Simulated API call - Replace with actual dictionary API
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      setWordMeaning(data[0]);
    } catch (error) {
      console.error('Error fetching word meaning:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    // Check grammar before sending
    const grammarCheck = await checkGrammar(message);
    
    const newMessage = {
      id: Date.now(),
      text: grammarCheck.corrected,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      originalText: message,
      suggestions: grammarCheck.suggestions,
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleWordPress = (word) => {
    setSelectedWord(word);
    getWordMeaning(word);
  };

  const renderMessage = (msg) => {
    const words = msg.text.split(' ');
    
    return (
      <View
        key={msg.id}
        className={`p-3 rounded-lg max-w-[80%] mb-2 ${
          msg.sender === 'user' ? 'bg-blue-500 self-end' : 'bg-gray-200 self-start'
        }`}
      >
        <Text
          className={`text-base ${
            msg.sender === 'user' ? 'text-white' : 'text-gray-800'
          }`}
        >
          {words.map((word, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleWordPress(word)}
              className="mr-1"
            >
              <Text
                className={`${
                  msg.sender === 'user' ? 'text-white' : 'text-gray-800'
                }`}
              >
                {word}
              </Text>
            </TouchableOpacity>
          ))}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
          }`}
        >
          {msg.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <Text className="text-2xl font-JakartaBold">Chat</Text>
          <TouchableOpacity className="p-2">
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 p-4"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {messages.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <Image
                source={images.message}
                alt="message"
                className="w-full h-40"
                resizeMode="contain"
              />
              <Text className="text-3xl font-JakartaBold mt-3">
                No Messages Yet
              </Text>
              <Text className="text-base mt-2 text-center px-7">
                Start a conversation with your friends and family
              </Text>
            </View>
          ) : (
            messages.map(renderMessage)
          )}
        </ScrollView>

        {/* Word Meaning Popup */}
        {selectedWord && wordMeaning && (
          <View className="absolute bottom-24 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-JakartaBold">{selectedWord}</Text>
              <TouchableOpacity onPress={() => setSelectedWord(null)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            {isLoading ? (
              <ActivityIndicator size="small" color="#0056D2" />
            ) : (
              <View>
                <Text className="text-gray-600 mb-1">
                  {wordMeaning.phonetic}
                </Text>
                <Text className="text-gray-800">
                  {wordMeaning.meanings[0]?.definitions[0]?.definition}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Input Area */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="p-4 border-t border-gray-200"
        >
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity
              onPress={handleSend}
              className="bg-blue-500 w-12 h-12 rounded-full justify-center items-center"
            >
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
