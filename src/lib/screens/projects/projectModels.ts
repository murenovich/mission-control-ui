export type ProjectStatus = 'Planning' | 'In Progress' | 'In Review' | 'Completed';

export type ProjectPriority = 'Low' | 'Medium' | 'High';

export type ProjectsViewMode = 'table' | 'board' | 'timeline';

export interface ProjectWorkspace {
  id: string;
  name: string;
  icon: string;
}

export interface ProjectRecord {
  id: string;
  title: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  assignee: string;
  dueDate: string;
  tags: string[];
  progress: number;
  description: string;
  notionUrl?: string;
}

export type ProjectFormValues = Omit<ProjectRecord, 'id'>;

export const PROJECT_STATUS_OPTIONS: ProjectStatus[] = [
  'Planning',
  'In Progress',
  'In Review',
  'Completed',
];

export const PROJECT_PRIORITY_OPTIONS: ProjectPriority[] = ['Low', 'Medium', 'High'];

export const DEMO_PROJECT_WORKSPACES: ProjectWorkspace[] = [
  { id: '1', name: 'Personal Hub', icon: '🏠' },
  { id: '2', name: 'Work Projects', icon: '💼' },
  { id: '3', name: 'Side Hustles', icon: '🚀' },
];

export const DEMO_PROJECTS: ProjectRecord[] = [
  {
    id: '1',
    title: 'Dashboard Redesign',
    status: 'In Progress',
    priority: 'High',
    assignee: 'John Doe',
    dueDate: '2026-03-15',
    tags: ['Design', 'UI/UX'],
    progress: 65,
    description: 'Complete redesign of the admin dashboard',
    notionUrl: '',
  },
  {
    id: '2',
    title: 'API Integration',
    status: 'Planning',
    priority: 'Medium',
    assignee: 'Jane Smith',
    dueDate: '2026-03-20',
    tags: ['Development', 'Backend'],
    progress: 20,
    description: 'Integrate third-party APIs for data sync',
    notionUrl: '',
  },
  {
    id: '3',
    title: 'User Testing',
    status: 'Completed',
    priority: 'Low',
    assignee: 'Mike Johnson',
    dueDate: '2026-03-10',
    tags: ['Research', 'UX'],
    progress: 100,
    description: 'Conduct user testing sessions',
    notionUrl: '',
  },
  {
    id: '4',
    title: 'Mobile App Launch',
    status: 'In Review',
    priority: 'High',
    assignee: 'Sarah Wilson',
    dueDate: '2026-03-25',
    tags: ['Mobile', 'Launch'],
    progress: 85,
    description: 'Final review before app store submission',
    notionUrl: '',
  },
  {
    id: '5',
    title: 'Marketing Campaign',
    status: 'Planning',
    priority: 'Medium',
    assignee: 'Tom Brown',
    dueDate: '2026-04-01',
    tags: ['Marketing', 'Content'],
    progress: 15,
    description: 'Q2 marketing campaign planning',
    notionUrl: '',
  },
];
