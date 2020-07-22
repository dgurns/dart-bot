import { useRef, useState, useEffect } from 'react';
import { MESSAGE_TYPES } from '../constants';
import Bot from 'services/Bot';
import styles from 'styles/ChatBox.module.css';
import Message from 'components/Message';

export default function ChatBox() {
  const messagesRef = useRef();

  const defaultMessage = {
    type: MESSAGE_TYPES.bot,
    text:
      'Go ahead, ask me something about DART times! For example, "When are the next trains at Bray?"',
  };
  const [messages, setMessages] = useState([defaultMessage]);
  const [enteredText, setEnteredText] = useState('');

  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage.type === MESSAGE_TYPES.user) {
      Bot.respondToUserMessage(latestMessage.text).then((response) =>
        setMessages([...messages, { type: MESSAGE_TYPES.bot, text: response }])
      );
    }
  }, [messages]);

  useEffect(() => {
    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, messagesRef]);

  const onKeyDown = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    event.preventDefault();

    if (enteredText) {
      setEnteredText('');
      setMessages([
        ...messages,
        { type: MESSAGE_TYPES.user, text: enteredText },
      ]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.messages} ref={messagesRef}>
        {messages.map((message, index) => (
          <Message message={message} key={index} />
        ))}
      </div>
      <textarea
        placeholder="Your message here..."
        value={enteredText}
        onChange={(event) => setEnteredText(event.target.value)}
        onKeyDown={onKeyDown}
        className={styles.textInput}
      ></textarea>
    </div>
  );
}
