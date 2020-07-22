import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MESSAGE_TYPES } from '../constants';
import styles from 'styles/Message.module.css';

export default function Message({ message }) {
  const { type, text } = message;

  const isBotMessage = type === MESSAGE_TYPES.bot;

  return (
    <div
      className={classnames(styles.message, {
        [styles.botMessage]: isBotMessage,
        [styles.userMessage]: type === MESSAGE_TYPES.user,
      })}
    >
      <p>
        <strong>{isBotMessage ? 'DartBot' : 'You'}</strong>
      </p>
      <p>{text}</p>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string,
  }).isRequired,
};
