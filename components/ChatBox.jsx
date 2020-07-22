import { useState } from 'react';
import { MESSAGE_TYPES } from '../constants';
import styles from 'styles/ChatBox.module.css';
import Message from 'components/Message';

export default function ChatBox() {
  const defaultMessage = {
    type: MESSAGE_TYPES.bot,
    text:
      'Go ahead, ask me something about DART times! For example, "When are the next trains at Bray?"',
  };

  const [messages, setMessages] = useState([defaultMessage]);

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <Message message={message} key={index} />
        ))}
      </div>
      <textarea
        placeholder="Your message here..."
        className={styles.textInput}
      ></textarea>
    </div>
  );
}
