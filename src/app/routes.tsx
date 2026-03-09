import { createBrowserRouter, Navigate } from 'react-router';
import { Layout } from './Layout';
import { DashboardWidgets } from './components/DashboardWidgets';
import { Analytics } from './components/Analytics';
import { Goals } from './components/Goals';
import { Calendar } from './components/Calendar';
import { Tasks } from './components/Tasks';
import { Settings } from './components/Settings';
import { HealthOverview } from './components/health/HealthOverview';
import { Nutrition } from './components/health/Nutrition';
import { Sleep } from './components/health/Sleep';
import { Vitals } from './components/health/Vitals';
import { MentalHealth } from './components/health/MentalHealth';
import { Mind } from './components/life/Mind';
import { ProjectsOverview } from './components/projects/ProjectsOverview';
import { ActiveProjects } from './components/projects/ActiveProjects';
import { ArchivedProjects } from './components/projects/ArchivedProjects';
import { AllTasks } from './components/projects/AllTasks';
import { MyTasks } from './components/projects/MyTasks';
import { SystemOverview } from './components/systems/SystemOverview';
import { NetworkStatus } from './components/systems/NetworkStatus';
import { ServicesStatus } from './components/systems/ServicesStatus';
import { AlertsLogs } from './components/systems/AlertsLogs';
import { Troubleshooting } from './components/systems/Troubleshooting';
import { NetworkDiagram } from './components/systems/NetworkDiagram';
import Messages from './pages/Messages';
import DiscordMessages from './pages/DiscordMessages';
import TelegramMessages from './pages/TelegramMessages';
import SlackMessages from './pages/SlackMessages';
import Newsfeed from './pages/Newsfeed';
import FeedSources from './pages/newsfeed/FeedSources';
import SavedArticles from './pages/newsfeed/SavedArticles';
import Trending from './pages/newsfeed/Trending';
import Categories from './pages/newsfeed/Categories';
import ComponentLibrary from './pages/components/ComponentLibrary';
import ButtonsPage from './pages/components/ButtonsPage';
import CardsPage from './pages/components/CardsPage';
import AllComponents from './pages/components/AllComponents';
import FormsPage from './pages/components/FormsPage';
import ModalsPage from './pages/components/ModalsPage';
import FeedbackPage from './pages/components/FeedbackPage';
import ChartsPage from './pages/components/ChartsPage';
import LayoutPage from './pages/components/LayoutPage';
import ThemePage from './pages/components/ThemePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardWidgets />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'goals',
        element: <Goals />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'tasks',
        element: <Tasks />,
      },
      {
        path: 'projects',
        children: [
          {
            index: true,
            element: <Navigate to="/projects/overview" replace />,
          },
          {
            path: 'overview',
            element: <ProjectsOverview />,
          },
          {
            path: 'active',
            element: <ActiveProjects />,
          },
          {
            path: 'archived',
            element: <ArchivedProjects />,
          },
          {
            path: 'all-tasks',
            element: <AllTasks />,
          },
          {
            path: 'my-tasks',
            element: <MyTasks />,
          },
        ],
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'health',
        children: [
          {
            index: true,
            element: <Navigate to="/health/overview" replace />,
          },
          {
            path: 'overview',
            element: <HealthOverview />,
          },
          {
            path: 'nutrition',
            element: <Nutrition />,
          },
          {
            path: 'sleep',
            element: <Sleep />,
          },
          {
            path: 'vitals',
            element: <Vitals />,
          },
          {
            path: 'mental',
            element: <MentalHealth />,
          },
        ],
      },
      {
        path: 'mind',
        children: [
          {
            index: true,
            element: <Navigate to="/mind/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <Mind />,
          },
          {
            path: 'learning',
            element: <Mind />,
          },
          {
            path: 'reading',
            element: <Mind />,
          },
          {
            path: 'skills',
            element: <Mind />,
          },
          {
            path: 'ideas',
            element: <Mind />,
          },
          {
            path: 'focus',
            element: <Mind />,
          },
        ],
      },
      {
        path: 'systems',
        children: [
          {
            index: true,
            element: <Navigate to="/systems/overview" replace />,
          },
          {
            path: 'overview',
            element: <SystemOverview />,
          },
          {
            path: 'network-status',
            element: <NetworkStatus />,
          },
          {
            path: 'services-status',
            element: <ServicesStatus />,
          },
          {
            path: 'alerts-logs',
            element: <AlertsLogs />,
          },
          {
            path: 'troubleshooting',
            element: <Troubleshooting />,
          },
          {
            path: 'network-diagram',
            element: <NetworkDiagram />,
          },
        ],
      },
      {
        path: 'messages',
        children: [
          {
            index: true,
            element: <Messages />,
          },
          {
            path: 'discord',
            element: <DiscordMessages />,
          },
          {
            path: 'telegram',
            element: <TelegramMessages />,
          },
          {
            path: 'slack',
            element: <SlackMessages />,
          },
        ],
      },
      {
        path: 'newsfeed',
        children: [
          {
            index: true,
            element: <Newsfeed />,
          },
          {
            path: 'sources',
            element: <FeedSources />,
          },
          {
            path: 'saved',
            element: <SavedArticles />,
          },
          {
            path: 'trending',
            element: <Trending />,
          },
          {
            path: 'categories',
            element: <Categories />,
          },
        ],
      },
      {
        path: 'components',
        children: [
          {
            index: true,
            element: <ComponentLibrary />,
          },
          {
            path: 'buttons',
            element: <ButtonsPage />,
          },
          {
            path: 'cards',
            element: <CardsPage />,
          },
          {
            path: 'all',
            element: <AllComponents />,
          },
          {
            path: 'forms',
            element: <FormsPage />,
          },
          {
            path: 'modals',
            element: <ModalsPage />,
          },
          {
            path: 'feedback',
            element: <FeedbackPage />,
          },
          {
            path: 'charts',
            element: <ChartsPage />,
          },
          {
            path: 'layout',
            element: <LayoutPage />,
          },
          {
            path: 'theme',
            element: <ThemePage />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);