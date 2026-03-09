import './styles.css';

export { LifeOsProvider } from './LifeOsProvider';
export { MissionControlShell } from './MissionControlShell';

export { ThemeProvider, useTheme } from '../app/contexts/ThemeContext';
export { SidebarProvider, useSidebar } from '../app/contexts/SidebarContext';

export { Header } from '../app/components/Header';
export { IconNavBar } from '../app/components/IconNavBar';
export { RightSidebar } from '../app/components/RightSidebar';
export { Sidebar } from '../app/components/Sidebar';

export { Analytics } from '../app/components/Analytics';
export { Calendar } from '../app/components/Calendar';
export { DashboardWidgets } from '../app/components/DashboardWidgets';
export { Goals } from '../app/components/Goals';
export { Settings } from '../app/components/Settings';
export { Tasks } from '../app/components/Tasks';

export { MentalHealth } from '../app/components/health/MentalHealth';
export { Nutrition } from '../app/components/health/Nutrition';
export { Sleep } from '../app/components/health/Sleep';
export { Vitals } from '../app/components/health/Vitals';
export { Workouts } from '../app/components/health/Workouts';

export { Mind } from '../app/components/life/Mind';

export { ActiveProjects } from '../app/components/projects/ActiveProjects';
export { AllTasks } from '../app/components/projects/AllTasks';
export { ArchivedProjects } from '../app/components/projects/ArchivedProjects';
export { BoardView } from '../app/components/projects/BoardView';
export { MyTasks } from '../app/components/projects/MyTasks';
export { ProjectModal } from '../app/components/projects/ProjectModal';
export { TableView } from '../app/components/projects/TableView';
export { TimelineView } from '../app/components/projects/TimelineView';

export { AlertsLogs } from '../app/components/systems/AlertsLogs';
export { NetworkDiagram } from '../app/components/systems/NetworkDiagram';
export { NetworkStatus } from '../app/components/systems/NetworkStatus';
export { ServicesStatus } from '../app/components/systems/ServicesStatus';
export { SystemOverview } from '../app/components/systems/SystemOverview';
export { Troubleshooting } from '../app/components/systems/Troubleshooting';

export { AreaChart } from '../app/components/charts/AreaChart';
export { BarChart } from '../app/components/charts/BarChart';
export { DonutChart } from '../app/components/charts/DonutChart';
export { Heatmap } from '../app/components/charts/Heatmap';
export { LineChart } from '../app/components/charts/LineChart';
export { RadialProgress } from '../app/components/charts/RadialProgress';
export { StackedBarChart } from '../app/components/charts/StackedBarChart';

export { ImageWithFallback } from '../app/components/figma/ImageWithFallback';

export {
  DEMO_HEALTH_ACHIEVEMENTS,
  DEMO_HEALTH_OVERVIEW_STATS,
  DEMO_HEALTH_SCORE,
  DEMO_QUICK_HEALTH_STATS,
  DEMO_TODAY_SUMMARY,
  DEMO_VITALS_SNAPSHOT,
  DEMO_WEEKLY_ACTIVITY,
  HealthOverviewScreen,
  HealthOverviewScreen as HealthOverview,
  type HealthAchievement,
  type HealthOverviewScore,
  type HealthOverviewScreenProps,
  type HealthOverviewStat,
  type HealthScoreCategory,
  type QuickHealthStat,
  type SummaryMetric,
  type VitalSnapshot,
  type WeeklyActivityPoint,
} from './screens/HealthOverviewScreen';

export {
  ProjectsOverviewScreen,
  ProjectsOverviewScreen as ProjectsOverview,
  type ProjectsOverviewScreenProps,
} from './screens/ProjectsOverviewScreen';
export {
  DEMO_PROJECTS,
  DEMO_PROJECT_WORKSPACES,
  PROJECT_PRIORITY_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  type ProjectFormValues,
  type ProjectPriority,
  type ProjectRecord,
  type ProjectsViewMode,
  type ProjectStatus,
  type ProjectWorkspace,
} from './screens/projects/projectModels';

export {
  DEMO_MESSAGE_PLATFORMS,
  MessagesScreen,
  type MessagePlatform,
  type MessagesScreenProps,
} from './screens/MessagesScreen';
export {
  DEMO_DISCORD_CHANNELS,
  DEMO_DISCORD_MESSAGES,
  DiscordMessagesScreen,
  type DiscordChannel,
  type DiscordMessage,
  type DiscordMessagesScreenProps,
} from './screens/DiscordMessagesScreen';
export {
  DEMO_SLACK_CHANNELS,
  DEMO_SLACK_DIRECT_MESSAGES,
  DEMO_SLACK_MESSAGES,
  SlackMessagesScreen,
  type SlackChannel,
  type SlackDirectMessage,
  type SlackMessage,
  type SlackMessagesScreenProps,
  type SlackReaction,
} from './screens/SlackMessagesScreen';
export {
  DEMO_TELEGRAM_CHATS,
  DEMO_TELEGRAM_MESSAGES,
  TelegramMessagesScreen,
  type TelegramChat,
  type TelegramMessage,
  type TelegramMessagesScreenProps,
} from './screens/TelegramMessagesScreen';

export {
  DEMO_NEWSFEED_ARTICLES,
  NewsfeedScreen,
  type NewsfeedArticle,
  type NewsfeedScreenProps,
  type NewsfeedViewMode,
} from './screens/NewsfeedScreen';
export {
  DEMO_FEED_SOURCES,
  DEMO_FEED_SOURCE_CATEGORIES,
  FeedSourcesScreen,
  type FeedSourceFormValues,
  type FeedSourceRecord,
  type FeedSourcesScreenProps,
} from './screens/FeedSourcesScreen';
export {
  DEMO_SAVED_ARTICLES,
  SavedArticlesScreen,
  type SavedArticle,
  type SavedArticlesScreenProps,
} from './screens/SavedArticlesScreen';
export {
  DEMO_TRENDING_ARTICLES,
  TrendingScreen,
  type TrendingArticleRecord,
  type TrendingScreenProps,
  type TrendingTimeFilter,
} from './screens/TrendingScreen';
export {
  CategoriesScreen,
  DEMO_CATEGORY_COLOR_OPTIONS,
  DEMO_NEWS_CATEGORIES,
  type CategoriesScreenProps,
  type CategoryColorOption,
  type CategoryFormValues,
  type NewsCategoryRecord,
} from './screens/CategoriesScreen';

export { default as AllComponentsScreen } from '../app/pages/components/AllComponents';
export { default as ButtonsPageScreen } from '../app/pages/components/ButtonsPage';
export { default as CardsPageScreen } from '../app/pages/components/CardsPage';
export { default as ChartsPageScreen } from '../app/pages/components/ChartsPage';
export { default as ComponentLibraryScreen } from '../app/pages/components/ComponentLibrary';
export { default as FeedbackPageScreen } from '../app/pages/components/FeedbackPage';
export { default as FormsPageScreen } from '../app/pages/components/FormsPage';
export { default as LayoutPageScreen } from '../app/pages/components/LayoutPage';
export { default as ModalsPageScreen } from '../app/pages/components/ModalsPage';
export { default as ThemePageScreen } from '../app/pages/components/ThemePage';
