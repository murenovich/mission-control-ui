import {
  DEMO_TELEGRAM_CHATS,
  DEMO_TELEGRAM_MESSAGES,
  TelegramMessagesScreen,
} from '../../lib/screens/TelegramMessagesScreen';

export default function TelegramMessages() {
  return <TelegramMessagesScreen chats={DEMO_TELEGRAM_CHATS} messages={DEMO_TELEGRAM_MESSAGES} />;
}
