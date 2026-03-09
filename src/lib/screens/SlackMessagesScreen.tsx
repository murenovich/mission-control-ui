import { useState, type KeyboardEvent } from 'react';
import { MessageSquare, Search, Send, Hash, Star, ChevronLeft, Smile, Paperclip, AtSign, Code, Bold, Italic } from 'lucide-react';
import { Link } from 'react-router';
import { useTheme } from '../../app/contexts/ThemeContext';

export interface SlackChannel {
  id: string;
  name: string;
  unread: number;
  type: 'channel';
  starred: boolean;
}

export interface SlackDirectMessage {
  id: string;
  name: string;
  unread: number;
  online: boolean;
  avatar: string;
  color: string;
}

export interface SlackReaction {
  emoji: string;
  count: number;
}

export interface SlackMessage {
  id: number;
  user: string;
  avatar: string;
  color: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
  reactions: SlackReaction[];
}

export interface SlackMessagesScreenProps {
  title?: string;
  statusLabel?: string;
  channels?: SlackChannel[];
  directMessages?: SlackDirectMessage[];
  messages?: SlackMessage[];
  defaultSelectedChannel?: string;
  defaultDraft?: string;
  channelDescription?: string;
  backPath?: string;
  backLabel?: string;
  onSendMessage?: (message: string, targetId: string) => void;
}

export const DEMO_SLACK_CHANNELS: SlackChannel[] = [
  { id: 'engineering', name: 'engineering', unread: 2, type: 'channel', starred: true },
  { id: 'general', name: 'general', unread: 0, type: 'channel', starred: false },
  { id: 'design', name: 'design', unread: 1, type: 'channel', starred: true },
  { id: 'product', name: 'product', unread: 0, type: 'channel', starred: false },
  { id: 'random', name: 'random', unread: 0, type: 'channel', starred: false },
];

export const DEMO_SLACK_DIRECT_MESSAGES: SlackDirectMessage[] = [
  { id: 'john-doe', name: 'John Doe', unread: 1, online: true, avatar: 'JD', color: 'from-orange-500 to-orange-600' },
  { id: 'jane-smith', name: 'Jane Smith', unread: 0, online: true, avatar: 'JS', color: 'from-purple-500 to-purple-600' },
  { id: 'mike-wilson', name: 'Mike Wilson', unread: 0, online: false, avatar: 'MW', color: 'from-cyan-500 to-cyan-600' },
];

export const DEMO_SLACK_MESSAGES: SlackMessage[] = [
  { id: 1, user: 'John Doe', avatar: 'JD', color: 'from-orange-500 to-orange-600', message: "Hey team! Can you review the PR when you have time? It's pretty straightforward.", timestamp: '10:45 AM', isOwn: false, reactions: [{ emoji: '👍', count: 3 }, { emoji: '✅', count: 1 }] },
  { id: 2, user: 'Sarah Chen', avatar: 'SC', color: 'from-purple-500 to-purple-600', message: 'Already on it! Looks good so far.', timestamp: '10:47 AM', isOwn: false, reactions: [] },
  { id: 3, user: 'You', avatar: 'ME', color: 'from-green-500 to-green-600', message: "I'll take a look this afternoon. What's the main change?", timestamp: '10:50 AM', isOwn: true, reactions: [] },
  { id: 4, user: 'John Doe', avatar: 'JD', color: 'from-orange-500 to-orange-600', message: "It's a refactor of the authentication module. Simplified the token handling logic.", timestamp: '10:52 AM', isOwn: false, reactions: [{ emoji: '🚀', count: 2 }] },
  { id: 5, user: 'Mike Wilson', avatar: 'MW', color: 'from-cyan-500 to-cyan-600', message: 'Nice! That was getting messy. Thanks for cleaning it up.', timestamp: '10:55 AM', isOwn: false, reactions: [{ emoji: '💯', count: 1 }] },
];

export function SlackMessagesScreen({
  title = 'Slack Workspace',
  statusLabel = '64 online',
  channels = DEMO_SLACK_CHANNELS,
  directMessages = DEMO_SLACK_DIRECT_MESSAGES,
  messages = DEMO_SLACK_MESSAGES,
  defaultSelectedChannel = 'engineering',
  defaultDraft = '',
  channelDescription = 'Team collaboration and code reviews',
  backPath = '/messages',
  backLabel = 'Back to Messages',
  onSendMessage,
}: SlackMessagesScreenProps) {
  const { isDarkMode } = useTheme();
  const [selectedChannel, setSelectedChannel] = useState(defaultSelectedChannel);
  const [message, setMessage] = useState(defaultDraft);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChannels = channels.filter((channel) => channel.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredDirectMessages = directMessages.filter((dm) => dm.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const selectedLabel =
    channels.find((channel) => channel.id === selectedChannel)?.name ??
    directMessages.find((dm) => dm.id === selectedChannel)?.name ??
    'engineering';

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
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600">
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
              placeholder="Search..."
              className={`w-full pl-8 pr-3 py-1.5 rounded-lg border smooth-transition text-xs ${isDarkMode ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-orange-400/50' : 'bg-white/50 border-black/10 text-black/90 placeholder-black/40 focus:border-orange-400/50'}`}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <div className={`text-xs font-semibold px-2 py-1 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>CHANNELS</div>
          {filteredChannels.map((channel) => (
            <button key={channel.id} onClick={() => setSelectedChannel(channel.id)} className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg smooth-transition text-left ${selectedChannel === channel.id ? isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600' : isDarkMode ? 'text-white/60 hover:bg-white/5 hover:text-white/90' : 'text-black/60 hover:bg-black/5 hover:text-black/90'}`}>
              <div className="flex items-center gap-2">
                {channel.starred && <Star className="w-3 h-3 fill-current" />}
                <Hash className="w-4 h-4" />
                <span className="text-sm">{channel.name}</span>
              </div>
              {channel.unread > 0 && <span className="px-1.5 py-0.5 rounded-full text-xs bg-orange-500 text-white">{channel.unread}</span>}
            </button>
          ))}

          <div className={`text-xs font-semibold px-2 py-1 mt-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>DIRECT MESSAGES</div>
          {filteredDirectMessages.map((dm) => (
            <button key={dm.id} onClick={() => setSelectedChannel(dm.id)} className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg smooth-transition text-left ${selectedChannel === dm.id ? isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600' : isDarkMode ? 'text-white/60 hover:bg-white/5 hover:text-white/90' : 'text-black/60 hover:bg-black/5 hover:text-black/90'}`}>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className={`w-6 h-6 rounded flex items-center justify-center bg-gradient-to-br ${dm.color} text-white text-xs font-semibold`}>{dm.avatar}</div>
                  {dm.online && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-current" />}
                </div>
                <span className="text-sm">{dm.name}</span>
              </div>
              {dm.unread > 0 && <span className="px-1.5 py-0.5 rounded-full text-xs bg-orange-500 text-white">{dm.unread}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className={`p-4 border-b flex items-center justify-between ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className="flex items-center gap-3">
            <Hash className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
            <div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{selectedLabel}</h3>
              <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{channelDescription}</p>
            </div>
          </div>
          <button className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}><Star className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''} group`}>
              <div className={`w-10 h-10 rounded flex items-center justify-center bg-gradient-to-br ${msg.color} text-white text-xs font-semibold flex-shrink-0`}>{msg.avatar}</div>
              <div className={`flex-1 ${msg.isOwn ? 'flex flex-col items-end' : ''}`}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`font-semibold text-sm ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{msg.user}</span>
                  <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{msg.timestamp}</span>
                </div>
                <div className={`max-w-2xl ${isDarkMode ? 'text-white/80' : 'text-black/80'} text-sm`}>{msg.message}</div>
                {msg.reactions.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {msg.reactions.map((reaction, idx) => (
                      <button key={idx} className={`px-2 py-0.5 rounded-full text-xs smooth-transition ${isDarkMode ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-black/5 hover:bg-black/10 border border-black/10'}`}>
                        {reaction.emoji} {reaction.count}
                      </button>
                    ))}
                    <button className={`px-2 py-0.5 rounded-full text-xs smooth-transition opacity-0 group-hover:opacity-100 ${isDarkMode ? 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/60' : 'bg-black/5 hover:bg-black/10 border border-black/10 text-black/60'}`}>
                      <Smile className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={`p-4 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className={`rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/50 border-black/10'}`}>
            <div className={`flex items-center gap-1 px-3 py-2 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
              <button className={`p-1.5 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}><Bold className={`w-3.5 h-3.5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
              <button className={`p-1.5 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}><Italic className={`w-3.5 h-3.5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
              <button className={`p-1.5 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}><Code className={`w-3.5 h-3.5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
              <div className={`w-px h-4 mx-1 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
              <button className={`p-1.5 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}><AtSign className={`w-3.5 h-3.5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
              <button className={`p-1.5 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}><Smile className={`w-3.5 h-3.5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
              <button className={`p-1.5 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}><Paperclip className={`w-3.5 h-3.5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
            </div>
            <div className="flex items-center gap-2 px-3 py-3">
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                  if (event.key === 'Enter') handleSendMessage();
                }}
                placeholder={`Message #${selectedLabel}`}
                className={`flex-1 bg-transparent border-none outline-none text-sm ${isDarkMode ? 'text-white/90 placeholder-white/40' : 'text-black/90 placeholder-black/40'}`}
              />
              <button onClick={handleSendMessage} disabled={!message.trim()} className={`p-2 rounded-lg smooth-transition ${message.trim() ? 'bg-orange-500 hover:bg-orange-600 text-white' : isDarkMode ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/40'}`}>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
