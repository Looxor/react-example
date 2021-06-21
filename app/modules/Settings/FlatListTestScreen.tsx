import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-bidirectional-infinite-scroll";

const MessageBubble: React.FC<{item: Message}> = ({item}) => {
  if (item.isMyMessage) {
    return (
      <View
        key={`${item.id}`}
        style={[styles.messageBubble, styles.myMessageBubble]}>
        <Text style={styles.myMessageText}>{item.text}</Text>
      </View>
    );
  }

  return (
    <View key={`${item.id}`} style={styles.messageBubble}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );
};

const testMessages = [
  'Hey, where were you yesterday? I was trying to call you',
  'Yeah dude!! Had a really bad night. I was really hungover',
  'lol, thats so typical you. Who did you go out with?',
  'Dont even ask me about it, I am never going drink with Uthred again. That dude is a beast',
  'hahahaha, I can totally imagine!!',
  'Ciao :)',
];

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Generate unique key for message component of FlatList.
const generateUniqueKey = () => `_${Math.random().toString(36).substr(2, 9)}`;

type Message = {
  id: string;
  text: string;
  isMyMessage: boolean;
};

const queryMoreMessages: (n: number) => Promise<Array<Message>> = n => {
  return new Promise(resolve => {
    const newMessages: Array<Message> = [];

    for (let i = 0; i < n; i++) {
      const messageText = testMessages[getRandomInt(0, testMessages.length)];
      newMessages.push({
        id: generateUniqueKey(),
        text: messageText,
        isMyMessage: Boolean(getRandomInt(0, 2)), // Randomly assign true or false.
      });
    }

    // Lets resolve after 500 ms, to simulate network latency.
    setTimeout(() => {
      resolve(newMessages);
    }, 500);
  });
};

const FlatListTestScreen = props => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const componentDidMount = () => {
    const initChat = async () => {
      const initialMessages = await queryMoreMessages(50);
      if (!initialMessages) return;

      setMessages(initialMessages);
    };

    initChat();
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {};

  React.useEffect(componentDidMount, []);

  const loadMoreOlderMessages = async () => {
    const newMessages = await queryMoreMessages(10);
    setMessages(m => {
      return m.concat(newMessages);
    });
  };

  const loadMoreRecentMessages = async () => {
    const newMessages = await queryMoreMessages(10);
    setMessages(m => {
      return newMessages.concat(m);
    });
  };

  if (!messages.length) {
    return null;
  }

  return (
    <FlatList
      data={messages}
      inverted
      onEndReached={loadMoreOlderMessages}
      onStartReached={loadMoreRecentMessages}
      renderItem={MessageBubble}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#BEBEBE',
    borderBottomWidth: 1,
  },
  headerTitle: {fontSize: 20, fontWeight: 'bold'},
  safeArea: {
    flex: 1,
  },
  sendMessageButton: {
    width: '100%',
    padding: 20,
    backgroundColor: '#FF4500',
    alignItems: 'center',
  },
  sendButtonTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  messageBubble: {
    maxWidth: 300,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#F1F0F0',
  },
  myMessageBubble: {
    alignSelf: 'flex-end',
    // borderColor: '#989898',
    // borderWidth: 1,
    backgroundColor: '#3784FF',
  },
  messageText: {
    fontSize: 15,
  },
  myMessageText: {
    color: 'white',
    fontSize: 15,
  },
});

FlatListTestScreen.navigationOptions = ({navigation}) => ({
  title: 'FlatList Test',
});

export default FlatListTestScreen;
