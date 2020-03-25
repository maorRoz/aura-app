import { AuraAppState } from '../store';

export const isLoadingAppsFailedSelector = (state: AuraAppState): boolean =>
  Boolean(state.app.error);
