import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable'; // Import Animatable

// Utility to format timestamps
const formatTimestamp = (date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Dot dancing animation component
const DotDancing = () => (
  <View style={styles.dotContainer}>
    {[0, 1, 2].map((dot) => (
      <Animatable.View
        key={dot}
        animation={{
          0: { opacity: 0.3 },
          0.5: { opacity: 1 },
          1: { opacity: 0.3 },
        }}
        iterationCount="infinite"
        delay={dot * 200} // Stagger the animation
        style={styles.dot}
      />
    ))}
  </View>
);

const GenAIscreen = () => {
  const [messages, setMessages] = useState([]);
  const [textboxInput, setTextboxInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessageId, setLoadingMessageId] = useState(null); // Track loading state for a specific message

  const sendMessage = async () => {
    const input = textboxInput.trim();
    if (!input) return;
    setLoading(true);

    const timestamp = new Date();
    const userMessageId = Date.now().toString();
    const botMessageId = (Date.now() + 1).toString();

    // Add the user's message and a placeholder bot message to the chat immediately
    setMessages((prevMessages) => [
      {
        id: botMessageId,
        text: '', // Placeholder for bot response
        isUser: false,
        timestamp: null, // Placeholder has no timestamp initially
      },
      {
        id: userMessageId,
        text: input,
        isUser: true,
        timestamp: formatTimestamp(timestamp),
      },
      ...prevMessages,
    ]);
    setTextboxInput('');
    setLoadingMessageId(botMessageId); // Set the loading state for this specific bot message

    try {
      const response = await axios.post('http://10.0.2.2:3000/', { ques: input });
      const reply = response.data;

      // Update the placeholder bot message with the actual response and timestamp
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === botMessageId
            ? {
                ...message,
                text: reply,
                timestamp: formatTimestamp(new Date()),
              }
            : message
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
      // Update the placeholder bot message with an error message
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === botMessageId
            ? {
                ...message,
                text: 'Error: Failed to send message',
                timestamp: formatTimestamp(new Date()),
              }
            : message
        )
      );
    } finally {
      setLoading(false);
      setLoadingMessageId(null); // Clear loading state
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessageContainer : styles.botMessageContainer,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.isUser ? styles.userMessage : styles.botMessage,
        ]}
      >
        {loadingMessageId === item.id && !item.text ? ( // Show dot dancing animation for the placeholder bot message
          <DotDancing />
        ) : (
          <Text
            style={[
              styles.messageText,
              { color: item.isUser ? '#fff' : '#000' },
            ]}
          >
            {item.text}
          </Text>
        )}
      </View>
      {item.timestamp && ( // Only show the timestamp if it exists
        <Text
          style={[
            styles.timestampText,
            { textAlign: item.isUser ? 'right' : 'left' },
          ]}
        >
          {item.timestamp}
        </Text>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.chatContainer}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={textboxInput}
          onChangeText={setTextboxInput}
          placeholder="Type your message..."
          placeholderTextColor="gray"
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={loading || !textboxInput.trim()}
        >
          <Text style={styles.sendButtonText}>{loading ? '...' : 'Send'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '75%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    backgroundColor: '#007bff',
  },
  botMessage: {
    backgroundColor: '#cccccc',
  },
  messageText: {
    fontSize: 16,
  },
  timestampText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'black',
    marginHorizontal: 3,
  },
});

export default GenAIscreen;