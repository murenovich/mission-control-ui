import {
  DEMO_HEALTH_ACHIEVEMENTS,
  DEMO_HEALTH_OVERVIEW_STATS,
  DEMO_HEALTH_SCORE,
  DEMO_QUICK_HEALTH_STATS,
  DEMO_TODAY_SUMMARY,
  DEMO_VITALS_SNAPSHOT,
  DEMO_WEEKLY_ACTIVITY,
  HealthOverviewScreen,
} from '../../../lib/screens/HealthOverviewScreen';

export function HealthOverview() {
  return (
    <HealthOverviewScreen
      stats={DEMO_HEALTH_OVERVIEW_STATS}
      healthScore={DEMO_HEALTH_SCORE}
      weeklyActivity={DEMO_WEEKLY_ACTIVITY}
      vitalsSnapshot={DEMO_VITALS_SNAPSHOT}
      quickStats={DEMO_QUICK_HEALTH_STATS}
      achievements={DEMO_HEALTH_ACHIEVEMENTS}
      todaySummary={DEMO_TODAY_SUMMARY}
    />
  );
}
