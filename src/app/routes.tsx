import type { ComponentType } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router';
import { Layout } from './Layout';

function lazyDefault(importer: () => Promise<{ default: ComponentType }>) {
  return async () => {
    const module = await importer();

    return { Component: module.default };
  };
}

function lazyNamed<TModule extends Record<string, unknown>, TKey extends keyof TModule & string>(
  importer: () => Promise<TModule>,
  exportName: TKey,
) {
  return async () => {
    const module = await importer();

    return {
      Component: module[exportName] as ComponentType,
    };
  };
}

const childRoutes: RouteObject[] = [
  {
    index: true,
    lazy: lazyNamed(() => import('./components/DashboardWidgets'), 'DashboardWidgets'),
  },
  {
    path: 'analytics',
    lazy: lazyNamed(() => import('./components/Analytics'), 'Analytics'),
  },
  {
    path: 'goals',
    lazy: lazyNamed(() => import('./components/Goals'), 'Goals'),
  },
  {
    path: 'calendar',
    lazy: lazyNamed(() => import('./components/Calendar'), 'Calendar'),
  },
  {
    path: 'tasks',
    lazy: lazyNamed(() => import('./components/Tasks'), 'Tasks'),
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
        lazy: lazyNamed(() => import('./components/projects/ProjectsOverview'), 'ProjectsOverview'),
      },
      {
        path: 'active',
        lazy: lazyNamed(() => import('./components/projects/ActiveProjects'), 'ActiveProjects'),
      },
      {
        path: 'archived',
        lazy: lazyNamed(() => import('./components/projects/ArchivedProjects'), 'ArchivedProjects'),
      },
      {
        path: 'all-tasks',
        lazy: lazyNamed(() => import('./components/projects/AllTasks'), 'AllTasks'),
      },
      {
        path: 'my-tasks',
        lazy: lazyNamed(() => import('./components/projects/MyTasks'), 'MyTasks'),
      },
    ],
  },
  {
    path: 'settings',
    lazy: lazyNamed(() => import('./components/Settings'), 'Settings'),
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
        lazy: lazyNamed(() => import('./components/health/HealthOverview'), 'HealthOverview'),
      },
      {
        path: 'nutrition',
        lazy: lazyNamed(() => import('./components/health/Nutrition'), 'Nutrition'),
      },
      {
        path: 'sleep',
        lazy: lazyNamed(() => import('./components/health/Sleep'), 'Sleep'),
      },
      {
        path: 'vitals',
        lazy: lazyNamed(() => import('./components/health/Vitals'), 'Vitals'),
      },
      {
        path: 'mental',
        lazy: lazyNamed(() => import('./components/health/MentalHealth'), 'MentalHealth'),
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
        lazy: lazyNamed(() => import('./components/life/Mind'), 'Mind'),
      },
      {
        path: 'learning',
        lazy: lazyNamed(() => import('./components/life/Mind'), 'Mind'),
      },
      {
        path: 'reading',
        lazy: lazyNamed(() => import('./components/life/Mind'), 'Mind'),
      },
      {
        path: 'skills',
        lazy: lazyNamed(() => import('./components/life/Mind'), 'Mind'),
      },
      {
        path: 'ideas',
        lazy: lazyNamed(() => import('./components/life/Mind'), 'Mind'),
      },
      {
        path: 'focus',
        lazy: lazyNamed(() => import('./components/life/Mind'), 'Mind'),
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
        lazy: lazyNamed(() => import('./components/systems/SystemOverview'), 'SystemOverview'),
      },
      {
        path: 'network-status',
        lazy: lazyNamed(() => import('./components/systems/NetworkStatus'), 'NetworkStatus'),
      },
      {
        path: 'services-status',
        lazy: lazyNamed(() => import('./components/systems/ServicesStatus'), 'ServicesStatus'),
      },
      {
        path: 'alerts-logs',
        lazy: lazyNamed(() => import('./components/systems/AlertsLogs'), 'AlertsLogs'),
      },
      {
        path: 'troubleshooting',
        lazy: lazyNamed(() => import('./components/systems/Troubleshooting'), 'Troubleshooting'),
      },
      {
        path: 'network-diagram',
        lazy: lazyNamed(() => import('./components/systems/NetworkDiagram'), 'NetworkDiagram'),
      },
    ],
  },
  {
    path: 'messages',
    children: [
      {
        index: true,
        lazy: lazyDefault(() => import('./pages/Messages')),
      },
      {
        path: 'discord',
        lazy: lazyDefault(() => import('./pages/DiscordMessages')),
      },
      {
        path: 'telegram',
        lazy: lazyDefault(() => import('./pages/TelegramMessages')),
      },
      {
        path: 'slack',
        lazy: lazyDefault(() => import('./pages/SlackMessages')),
      },
    ],
  },
  {
    path: 'newsfeed',
    children: [
      {
        index: true,
        lazy: lazyDefault(() => import('./pages/Newsfeed')),
      },
      {
        path: 'sources',
        lazy: lazyDefault(() => import('./pages/newsfeed/FeedSources')),
      },
      {
        path: 'saved',
        lazy: lazyDefault(() => import('./pages/newsfeed/SavedArticles')),
      },
      {
        path: 'trending',
        lazy: lazyDefault(() => import('./pages/newsfeed/Trending')),
      },
      {
        path: 'categories',
        lazy: lazyDefault(() => import('./pages/newsfeed/Categories')),
      },
    ],
  },
  {
    path: 'components',
    children: [
      {
        index: true,
        lazy: lazyDefault(() => import('./pages/components/ComponentLibrary')),
      },
      {
        path: 'buttons',
        lazy: lazyDefault(() => import('./pages/components/ButtonsPage')),
      },
      {
        path: 'cards',
        lazy: lazyDefault(() => import('./pages/components/CardsPage')),
      },
      {
        path: 'all',
        lazy: lazyDefault(() => import('./pages/components/AllComponents')),
      },
      {
        path: 'forms',
        lazy: lazyDefault(() => import('./pages/components/FormsPage')),
      },
      {
        path: 'modals',
        lazy: lazyDefault(() => import('./pages/components/ModalsPage')),
      },
      {
        path: 'feedback',
        lazy: lazyDefault(() => import('./pages/components/FeedbackPage')),
      },
      {
        path: 'charts',
        lazy: lazyDefault(() => import('./pages/components/ChartsPage')),
      },
      {
        path: 'layout',
        lazy: lazyDefault(() => import('./pages/components/LayoutPage')),
      },
      {
        path: 'theme',
        lazy: lazyDefault(() => import('./pages/components/ThemePage')),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: childRoutes,
  },
]);
