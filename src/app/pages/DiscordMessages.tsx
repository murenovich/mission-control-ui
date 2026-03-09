import {
  DEMO_DISCORD_CHANNELS,
  DEMO_DISCORD_MESSAGES,
  DiscordMessagesScreen,
} from '../../lib/screens/DiscordMessagesScreen';

export default function DiscordMessages() {
  return <DiscordMessagesScreen channels={DEMO_DISCORD_CHANNELS} messages={DEMO_DISCORD_MESSAGES} />;
}
