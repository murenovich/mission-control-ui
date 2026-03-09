import { useState, type KeyboardEvent } from 'react';
import { MessageSquare, Search, Send, ChevronLeft, Smile, Paperclip, Phone, Video, MoreVertical } from 'lucide-react';
import { Link } from 'react-router';
import { useTheme } from '../../app/contexts/ThemeContext';

export interface TelegramChat {
  id: string;
  name: string;
  unread: number;
  lastMessage: string;
  time: string;
  avatar: string;
  color: string;
}

export interface TelegramMessage {
  id: number;
  user: string;
  avatar: string;
  color: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
}

export interface TelegramMessagesScreenProps {
  title?: string;
  statusLabel?: string;
  chats?: TelegramChat[];
  messages?: TelegramMessage[];
  defaultSelectedChat?: string;
  memberSummary?: string;
  backPath?: string;
  backLabel?: string;
  onSendMessage?: (message: string, chatId: string) => void;
}

export const DEMO_TELEGRAM_CHATS: TelegramChat[] = [
  { id: 'project-alpha', name: 'Project Alpha Team', unread: 0, lastMessage: 'Maria: The deadline has been extended', time: '15m ago', avatar: 'PA', color: 'from-cyan-500 to-cyan-600' },
  { id: 'design-team', name: 'Design Team', unread: 2, lastMessage: 'Sara: New mockups ready for review', time: '1h ago', avatar: 'DT', color: 'from-purple-500 to-purple-600' },
  { id: 'client-updates', name: 'Client Updates', unread: 0, lastMessage: "You: I'll send the report by EOD", time: '3h ago', avatar: 'CU', color: 'from-orange-500 to-orange-600' },
  { id: 'dev-notifications', name: 'Dev Notifications', unread: 1, lastMessage: 'Bot: Build #234 completed successfully', time: '5h ago', avatar: 'DN', color: 'from-green-500 to-green-600' },
];

export const DEMO_TELEGRAM_MESSAGES: TelegramMessage[] = [
  { id: 1, user: 'Maria Rodriguez', avatar: 'MR', color: 'from-cyan-500 to-cyan-600', message: 'Good news everyone! The client just confirmed that the project deadline has been extended by 2 weeks.', timestamp: '2:15 PM', isOwn: false },
  { id: 2, user: 'James Lee', avatar: 'JL', color: 'from-purple-500 to-purple-600', message: "That's great! This gives us more time to polish the UI.", timestamp: '2:17 PM', isOwn: false },
  { id: 3, user: 'You', avatar: 'ME', color: 'from-orange-500 to-orange-600', message: 'Perfect timing. I can add those extra features we discussed.', timestamp: '2:18 PM', isOwn: true },
  { id: 4, user: 'Maria Rodriguez', avatar: 'MR', color: 'from-cyan-500 to-cyan-600', message: "Exactly! Let's schedule a planning meeting tomorrow to redistribute the tasks.", timestamp: '2:20 PM', isOwn: false },
];

export function TelegramMessagesScreen({
  title = 'Telegram',
  statusLabel = 'Online',
  chats = DEMO_TELEGRAM_CHATS,
  messages = DEMO_TELEGRAM_MESSAGES,
  defaultSelectedChat = 'project-alpha',
  memberSummary = '32 members, 24 online',
  backPath = '/messages',
  backLabel = 'Back to Messages',
  onSendMessage,
}: TelegramMessagesScreenProps) {
  const { isDarkMode } = useTheme();
  const [selectedChat, setSelectedChat] = useState(defaultSelectedChat);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter((chat) =>
    `${chat.name} ${chat.lastMessage}`.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const selectedChatItem = chats.find((chat) => chat.id === selectedChat) ?? chats[0];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage?.(message, selectedChat);
    setMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-200px)]">
      <div className={`w-80 border-r flex flex-col ${isDarkMode ? 'border-white/10 bg-black/20' : 'border-black/10 bg-white/50'}`}>
        <div className={`p-4 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <Link to={backPath} className="flex items-center gap-2 mb-4 group">
            <ChevronLeft className={`w-4 h-4 ${isDarkMode ? 'text-white/60 group-hover:text-white/90' : 'text-black/60 group-hover:text-black/90'}`} />
            <span className={`text-sm ${isDarkMode ? 'text-white/60 group-hover:text-white/90' : 'text-black/60 group-hover:text-black/90'}`}>{backLabel}</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-cyan-500 to-cyan-600">
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
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search chats..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border smooth-transition text-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-cyan-400/50' : 'bg-white/50 border-black/10 text-black/90 placeholder-black/40 focus:border-cyan-400/50'}`}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <button key={chat.id} onClick={() => setSelectedChat(chat.id)} className={`w-full p-3 border-b smooth-transition text-left ${selectedChat === chat.id ? 'bg-cyan-500/10 border-cyan-400/20' : isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-black/5 hover:bg-black/5'}`}>
              <div className="flex gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${chat.color} text-white font-semibold flex-shrink-0`}>{chat.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className={`font-medium text-sm truncate ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{chat.name}</h4>
                    <span className={`text-xs flex-shrink-0 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm truncate ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{chat.lastMessage}</p>
                    {chat.unread > 0 && <span className="px-2 py-0.5 rounded-full text-xs bg-cyan-500 text-white flex-shrink-0">{chat.unread}</span>}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className={`p-4 border-b flex items-center justify-between ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${selectedChatItem?.color ?? 'from-cyan-500 to-cyan-600'} text-white font-semibold`}>{selectedChatItem?.avatar ?? 'TG'}</div>
            <div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{selectedChatItem?.name ?? 'Telegram'}</h3>
              <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{memberSummary}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}><Phone className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
            <button className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}><Video className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
            <button className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}><MoreVertical className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${msg.color} text-white text-xs font-semibold flex-shrink-0`}>{msg.avatar}</div>
              <div className={`flex-1 max-w-xl ${msg.isOwn ? 'flex flex-col items-end' : ''}`}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`font-semibold text-sm ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{msg.user}</span>
                  <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{msg.timestamp}</span>
                </div>
                <div className={`px-4 py-2.5 rounded-2xl ${msg.isOwn ? 'bg-cyan-500 text-white' : isDarkMode ? 'bg-white/10 text-white/90' : 'bg-black/5 text-black/90'}`}>{msg.message}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={`p-4 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/50 border-black/10'}`}>
            <button className={`p-1.5 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}><Paperclip className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') handleSendMessage();
              }}
              placeholder="Type a message..."
              className={`flex-1 bg-transparent border-none outline-none text-sm ${isDarkMode ? 'text-white/90 placeholder-white/40' : 'text-black/90 placeholder-black/40'}`}
            />
            <button className={`p-1.5 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}><Smile className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} /></button>
            <button onClick={handleSendMessage} disabled={!message.trim()} className={`p-2 rounded-lg smooth-transition ${message.trim() ? 'bg-cyan-500 hover:bg-cyan-600 text-white' : isDarkMode ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/40'}`}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
