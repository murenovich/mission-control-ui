import type { ElementType } from 'react';
import { useMemo, useState } from 'react';
import { MessageSquare, Search, Users } from 'lucide-react';
import { Link } from 'react-router';
import { useTheme } from '../../app/contexts/ThemeContext';

export interface MessagePlatform {
  id: string;
  name: string;
  icon?: ElementType;
  color: string;
  unread: number;
  lastMessage: string;
  lastTime: string;
  channels: number;
  members: number;
}

export interface MessagesScreenProps {
  title?: string;
  description?: string;
  platforms?: MessagePlatform[];
  searchPlaceholder?: string;
  basePath?: string;
}

export const DEMO_MESSAGE_PLATFORMS: MessagePlatform[] = [
  {
    id: 'discord',
    name: 'Discord',
    icon: MessageSquare,
    color: 'from-purple-500 to-purple-600',
    unread: 3,
    lastMessage: "Alex: Hey team! Don't forget about the standup...",
    lastTime: '2m ago',
    channels: 12,
    members: 47,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: MessageSquare,
    color: 'from-cyan-500 to-cyan-600',
    unread: 0,
    lastMessage: 'Maria: The project deadline has been extended',
    lastTime: '15m ago',
    channels: 8,
    members: 32,
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: MessageSquare,
    color: 'from-orange-500 to-orange-600',
    unread: 2,
    lastMessage: 'John: Can you review the PR when you have time?',
    lastTime: '1h ago',
    channels: 15,
    members: 64,
  },
];

export function MessagesScreen({
  title = 'Messages',
  description = 'Manage your conversations across platforms',
  platforms = DEMO_MESSAGE_PLATFORMS,
  searchPlaceholder = 'Search conversations...',
  basePath = '/messages',
}: MessagesScreenProps) {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlatforms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return platforms;
    }

    return platforms.filter((platform) =>
      platform.name.toLowerCase().includes(query) ||
      platform.lastMessage.toLowerCase().includes(query),
    );
  }, [platforms, searchQuery]);

  const totalUnread = filteredPlatforms.reduce((sum, platform) => sum + platform.unread, 0);
  const totalChannels = filteredPlatforms.reduce((sum, platform) => sum + platform.channels, 0);
  const totalMembers = filteredPlatforms.reduce((sum, platform) => sum + platform.members, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{title}</h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{description}</p>
        </div>

        <div className="relative w-72">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border smooth-transition text-sm ${
              isDarkMode
                ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-purple-400/50'
                : 'bg-white/50 border-black/10 text-black/90 placeholder-black/40 focus:border-purple-400/50'
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlatforms.map((platform) => {
          const Icon = platform.icon ?? MessageSquare;

          return (
            <Link key={platform.id} to={`${basePath}/${platform.id}`} className="block">
              <div
                className={`glass-card p-6 rounded-xl border smooth-transition cursor-pointer ${
                  isDarkMode
                    ? 'border-white/10 hover:border-purple-400/30 hover:bg-white/5'
                    : 'border-black/10 hover:border-purple-400/30 hover:bg-white/80'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${platform.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {platform.unread > 0 && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                      {platform.unread} new
                    </span>
                  )}
                </div>

                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                  {platform.name}
                </h3>

                <div className={`mb-4 pb-4 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                  <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'} line-clamp-2`}>
                    {platform.lastMessage}
                  </p>
                  <span className={`text-xs mt-1 inline-block ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                    {platform.lastTime}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className={`w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                      {platform.channels} channels
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className={`w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                      {platform.members} members
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`glass-card p-6 rounded-xl border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Total Unread</span>
            <MessageSquare className="w-5 h-5 text-purple-400" />
          </div>
          <div className={`text-3xl font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {totalUnread}
          </div>
        </div>

        <div className={`glass-card p-6 rounded-xl border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Active Channels</span>
            <MessageSquare className="w-5 h-5 text-cyan-400" />
          </div>
          <div className={`text-3xl font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {totalChannels}
          </div>
        </div>

        <div className={`glass-card p-6 rounded-xl border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Total Members</span>
            <Users className="w-5 h-5 text-orange-400" />
          </div>
          <div className={`text-3xl font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            {totalMembers}
          </div>
        </div>
      </div>
    </div>
  );
}
