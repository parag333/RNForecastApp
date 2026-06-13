import { useEffect, useState, useRef } from 'react';
import { RealTimeChatPageProps } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const WS_URL = 'ws://localhost:8080';

const RealTimeChatPage: React.FC<RealTimeChatPageProps> = ({ navigation }) => {
  const [messages, setMessages] = useState<string[] | null>([]);
  const [inputText, setInputText] = useState<string>('');
  const [status, setStatus] = useState<string>('disconnected');
  const ws = useRef<WebSocket | null>(null);
  

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);
    ws.current.onopen = () => {
      setStatus('Open');
      console.log('Connected to server');
    };
    ws.current.onmessage = e => {
      try {
        const payload = JSON.parse(e.data);
        setMessages(prev => [...(prev ?? ''), `Server: ${payload.data}`]);
      } catch (error) {
        setMessages(prev => [...(prev ?? ''), `Server: ${e.data}`]);
      }
    };

    ws.current.onclose = e => {
      setStatus('disconnected');
      setTimeout(() => {

      }, 3000);

      if (e) {
        console.log('connection closed = ', e.code, e.reason);
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const onSendMessage = () => {
    if (inputText.trim() && ws.current && status === 'Open') {
      ws.current.send(inputText);
      setMessages(prev => [...prev!, `You: ${inputText}`]);
      setInputText('');
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.statusText}>
        Connection status: <Text style={styles.bold}>{status}</Text>
      </Text>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.messageItem}>{item}</Text>
        )}
      />
      <View>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
        />
        <Button
          title="Send"
          onPress={onSendMessage}
          disabled={status !== 'Open'}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 16,
  },
  statusText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    marginVertical: 15,
  },
  messageItem: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    marginVertical: 4,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f9f9fb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: '#1a1a1a',
    height: 50,
  },
});

export default RealTimeChatPage;
