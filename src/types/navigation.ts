import type { ActivityType } from './activity';

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  ActivityLogging: { activityType?: ActivityType } | undefined;
  History: undefined;
};
