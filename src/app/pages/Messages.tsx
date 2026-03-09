import {
  DEMO_MESSAGE_PLATFORMS,
  MessagesScreen,
} from '../../lib/screens/MessagesScreen';

export default function Messages() {
  return <MessagesScreen platforms={DEMO_MESSAGE_PLATFORMS} />;
}
