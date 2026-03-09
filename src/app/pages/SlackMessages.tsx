import {
  DEMO_SLACK_CHANNELS,
  DEMO_SLACK_DIRECT_MESSAGES,
  DEMO_SLACK_MESSAGES,
  SlackMessagesScreen,
} from '../../lib/screens/SlackMessagesScreen';

export default function SlackMessages() {
  return (
    <SlackMessagesScreen
      channels={DEMO_SLACK_CHANNELS}
      directMessages={DEMO_SLACK_DIRECT_MESSAGES}
      messages={DEMO_SLACK_MESSAGES}
    />
  );
}
