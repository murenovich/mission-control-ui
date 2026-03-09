export type ShellSection =
  | 'home'
  | 'health'
  | 'projects'
  | 'systems'
  | 'messages'
  | 'newsfeed'
  | 'components';

const PATH_PREFIX_TO_SECTION: Array<[prefix: string, section: ShellSection]> = [
  ['/health', 'health'],
  ['/projects', 'projects'],
  ['/systems', 'systems'],
  ['/messages', 'messages'],
  ['/newsfeed', 'newsfeed'],
  ['/components', 'components'],
];

const PATH_TO_PAGE: Array<[matcher: (pathname: string) => boolean, page: string]> = [
  [(pathname) => pathname === '/' || pathname === '/dashboard', 'dashboard'],
  [(pathname) => pathname === '/analytics', 'analytics'],
  [(pathname) => pathname === '/goals', 'goals'],
  [(pathname) => pathname === '/calendar', 'calendar'],
  [(pathname) => pathname === '/tasks', 'tasks'],
  [(pathname) => pathname.startsWith('/mind'), 'mind'],
  [(pathname) => pathname === '/newsfeed', 'newsfeed'],
  [(pathname) => pathname.startsWith('/projects/overview'), 'projects-overview'],
  [(pathname) => pathname.startsWith('/projects/active'), 'projects-active'],
  [(pathname) => pathname.startsWith('/projects/archived'), 'projects-archived'],
  [(pathname) => pathname.startsWith('/projects/all-tasks'), 'projects-all-tasks'],
  [(pathname) => pathname.startsWith('/projects/my-tasks'), 'projects-my-tasks'],
  [(pathname) => pathname.startsWith('/systems/overview'), 'systems-overview'],
  [(pathname) => pathname.startsWith('/systems/network-status'), 'systems-network'],
  [(pathname) => pathname.startsWith('/systems/services-status'), 'systems-services'],
  [(pathname) => pathname.startsWith('/systems/alerts-logs'), 'systems-alerts'],
  [(pathname) => pathname.startsWith('/systems/troubleshooting'), 'systems-troubleshooting'],
  [(pathname) => pathname.startsWith('/systems/network-diagram'), 'systems-diagram'],
  [(pathname) => pathname === '/settings', 'settings'],
  [(pathname) => pathname.startsWith('/health/overview'), 'health-overview'],
  [(pathname) => pathname.startsWith('/health/nutrition'), 'health-nutrition'],
  [(pathname) => pathname.startsWith('/health/sleep'), 'health-sleep'],
  [(pathname) => pathname.startsWith('/health/vitals'), 'health-vitals'],
  [(pathname) => pathname.startsWith('/health/mental'), 'health-mental'],
  [(pathname) => pathname === '/messages', 'messages-overview'],
  [(pathname) => pathname.startsWith('/messages/discord'), 'messages-discord'],
  [(pathname) => pathname.startsWith('/messages/telegram'), 'messages-telegram'],
  [(pathname) => pathname.startsWith('/messages/slack'), 'messages-slack'],
  [(pathname) => pathname.startsWith('/newsfeed/sources'), 'newsfeed-sources'],
  [(pathname) => pathname.startsWith('/newsfeed/saved'), 'newsfeed-bookmarks'],
  [(pathname) => pathname.startsWith('/newsfeed/trending'), 'newsfeed-trending'],
  [(pathname) => pathname.startsWith('/newsfeed/categories'), 'newsfeed-categories'],
  [(pathname) => pathname === '/components', 'components-overview'],
  [(pathname) => pathname.startsWith('/components/buttons'), 'components-buttons'],
  [(pathname) => pathname.startsWith('/components/cards'), 'components-cards'],
  [(pathname) => pathname.startsWith('/components/forms'), 'components-forms'],
  [(pathname) => pathname.startsWith('/components/modals'), 'components-modals'],
  [(pathname) => pathname.startsWith('/components/feedback'), 'components-feedback'],
  [(pathname) => pathname.startsWith('/components/charts'), 'components-charts'],
  [(pathname) => pathname.startsWith('/components/layout'), 'components-layout'],
  [(pathname) => pathname.startsWith('/components/theme'), 'components-theme'],
];

const DEFAULT_PAGE_BY_SECTION: Record<ShellSection, string> = {
  home: 'dashboard',
  health: 'health-overview',
  projects: 'projects-overview',
  systems: 'systems-overview',
  messages: 'messages-overview',
  newsfeed: 'newsfeed',
  components: 'components-overview',
};

export function getActiveSectionFromPath(pathname: string): ShellSection {
  const match = PATH_PREFIX_TO_SECTION.find(([prefix]) => pathname.startsWith(prefix));
  return match?.[1] ?? 'home';
}

export function matchCurrentPageFromPath(pathname: string): string | null {
  const match = PATH_TO_PAGE.find(([matcher]) => matcher(pathname));
  return match?.[1] ?? null;
}

export function getCurrentPageFromPath(pathname: string): string {
  return matchCurrentPageFromPath(pathname) ?? getDefaultCurrentPage(getActiveSectionFromPath(pathname));
}

export function getDefaultCurrentPage(section: ShellSection): string {
  return DEFAULT_PAGE_BY_SECTION[section];
}
