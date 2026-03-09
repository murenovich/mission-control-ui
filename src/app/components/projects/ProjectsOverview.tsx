import { ProjectsOverviewScreen } from '../../../lib/screens/ProjectsOverviewScreen';
import {
  DEMO_PROJECTS,
  DEMO_PROJECT_WORKSPACES,
} from '../../../lib/screens/projects/projectModels';

export function ProjectsOverview() {
  return (
    <ProjectsOverviewScreen
      defaultProjects={DEMO_PROJECTS}
      workspaces={DEMO_PROJECT_WORKSPACES}
    />
  );
}
