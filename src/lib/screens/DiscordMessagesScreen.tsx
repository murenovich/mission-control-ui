import { useState, type KeyboardEvent } from 'react';
import {
  MessageSquare,
  Search,
  Send,
  Hash,
  Users,
  Pin,
  Settings,
  ChevronLeft,
  Smile,
  Paperclip,
  Image,
} from 'lucide-react';
import { Link } from 'react-router';
import { useTheme } from '../../app/contexts/ThemeContext';

export interface DiscordChannel {
  id: string;
  name: string;
  unread: number;
  type: 'text';
}

export interface DiscordMessage {
  id: number;
  user: string;
  avatar: string;
  color: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
}

export interface DiscordMessagesScreenProps {
  title?: string;
  statusLabel?: string;
  channels?: DiscordChannel[];
  messages?: DiscordMessage[];
  defaultSelectedChannel?: string;
  defaultDraft?: string;
  channelDescription?: string;
  backPath?: string;
  backLabel?: string;
  currentUserName?: string;
  currentUserStatus?: string;
  onSendMessage?: (message: string, channelId: string) => void;
}

export const DEMO_DISCORD_CHANNELS: DiscordChannel[] = [
  { id: 'general', name: 'general', unread: 3, type: 'text' },
  { id: 'announcements', name: 'announcements', unread: 0, type: 'text' },
  { id: 'dev-team', name: 'dev-team', unread: 2, type: 'text' },
  { id: 'design', name: 'design', unread: 0, type: 'text' },
  { id: 'random', name: 'random', unread: 1, type: 'text' },
  { id: 'tech-support', name: 'tech-support', unread: 0, type: 'text' },
];

export const DEMO_DISCORD_MESSAGES: DiscordMessage[] = [
  { id: 1, user: 'Alex Chen', avatar: 'AC', color: 'from-purple-500 to-purple-600', message: "Hey team! Don't forget about the standup meeting at 10 AM today.", timestamp: '9:45 AM', isOwn: false },
  { id: 2, user: 'Sarah Johnson', avatar: 'SJ', color: 'from-cyan-500 to-cyan-600', message: "Thanks for the reminder! I'll be there.", timestamp: '9:47 AM', isOwn: false },
  { id: 3, user: 'You', avatar: 'ME', color: 'from-orange-500 to-orange-600', message: 'Same here. Do we have an agenda?', timestamp: '9:48 AM', isOwn: true },
  { id: 4, user: 'Alex Chen', avatar: 'AC', color: 'from-purple-500 to-purple-600', message: "Yes! I'll share it in a minute. We'll cover the Q1 roadmap and sprint planning.", timestamp: '9:49 AM', isOwn: false },
  { id: 5, user: 'Mike Wilson', avatar: 'MW', color: 'from-green-500 to-green-600', message: 'Perfect timing! I have some updates on the API integration.', timestamp: '9:50 AM', isOwn: false },
];

export function DiscordMessagesScreen({
  title = 'Discord',
  statusLabel = '47 online',
  channels = DEMO_DISCORD_CHANNELS,
  messages = DEMO_DISCORD_MESSAGES,
  defaultSelectedChannel = 'general',
  defaultDraft = '',
  channelDescription = 'Team collaboration and updates',
  backPath = '/messages',
  backLabel = 'Back to Messages',
  currentUserName = 'Your Name',
  currentUserStatus = 'Online',
  onSendMessage,
}: DiscordMessagesScreenProps) {
  const { isDarkMode } = useTheme();
  const [selectedChannel, setSelectedChannel] = useState(defaultSelectedChannel);
  const [message, setMessage] = useState(defaultDraft);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const selectedChannelName = channels.find((channel) => channel.id === selectedChannel)?.name ?? channels[0]?.name ?? 'general';

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage?.(message, selectedChannel);
    setMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-200px)]">
      <div className={`w-64 border-r flex flex-col ${isDarkMode ? 'border-white/10 bg-black/20' : 'border-black/10 bg-white/50'}`}>
        <div className={`p-4 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <Link to={backPath} className="flex items-center gap-2 mb-4 group">
            <ChevronLeft className={`w-4 h-4 ${isDarkMode ? 'text-white/60 group-hover:text-white/90' : 'text-black/60 group-hover:text-black/90'}`} />
            <span className={`text-sm ${isDarkMode ? 'text-white/60 group-hover:text-white/90' : 'text-black/60 group-hover:text-black/90'}`}>{backLabel}</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className={`text-sm font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{title}</h2>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{statusLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-3 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className="relative">
            <Search className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search channels..."
              className={`w-full pl-8 pr-3 py-1.5 rounded-lg border smooth-transition text-xs ${isDarkMode ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-purple-400/50' : 'bg-white/50 border-black/10 text-black/90 placeholder-black/40 focus:border-purple-400/50'}`}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <div className={`text-xs font-semibold px-2 py-1 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>TEXT CHANNELS</div>
          {filteredChannels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setSelectedChannel(channel.id)}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg smooth-transition text-left ${selectedChannel === channel.id ? isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600' : isDarkMode ? 'text-white/60 hover:bg-white/5 hover:text-white/90' : 'text-black/60 hover:bg-black/5 hover:text-black/90'}`}
            >
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4" />
                <span className="text-sm">{channel.name}</span>
              </div>
              {channel.unread > 0 && <span className="px-1.5 py-0.5 rounded-full text-xs bg-purple-500 text-white">{channel.unread}</span>}
            </button>
          ))}
        </div>

        <div className={`p-3 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white text-xs font-semibold">ME</div>
            <div className="flex-1">
              <div className={`text-xs font-medium ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{currentUserName}</div>
              <div className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{currentUserStatus}</div>
            </div>
            <button className={`p-1.5 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}>
              <Settings className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className={`p-4 border-b flex items-center justify-between ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className="flex items-center gap-3">
            <Hash className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
            <div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{selectedChannelName}</h3>
              <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{channelDescription}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}><Pin className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
            <button className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}><Users className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${msg.color} text-white text-xs font-semibold flex-shrink-0`}>{msg.avatar}</div>
              <div className={`flex-1 ${msg.isOwn ? 'flex flex-col items-end' : ''}`}>
                <div className="flex items-baseline gap-2">
                  <span className={`font-semibold text-sm ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{msg.user}</span>
                  <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{msg.timestamp}</span>
                </div>
                <div className={`mt-1 px-4 py-2 rounded-lg max-w-xl ${msg.isOwn ? 'bg-purple-500/20 text-purple-400' : isDarkMode ? 'bg-white/5 text-white/80' : 'bg-black/5 text-black/80'}`}>{msg.message}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={`p-4 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className={`flex items-center gap-2 p-3 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/50 border-black/10'}`}>
            <button className={`p-1.5 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}><Paperclip className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
            <button className={`p-1.5 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}><Image className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') handleSendMessage();
              }}
              placeholder={`Message #${selectedChannelName}`}
              className={`flex-1 bg-transparent border-none outline-none text-sm ${isDarkMode ? 'text-white/90 placeholder-white/40' : 'text-black/90 placeholder-black/40'}`}
            />
            <button className={`p-1.5 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}><Smile className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
            <button onClick={handleSendMessage} className="px-4 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium smooth-transition">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
