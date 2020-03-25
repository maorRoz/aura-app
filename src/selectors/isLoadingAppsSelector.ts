import { AuraAppState } from '../store';

export const isLoadingAppsSelector = (state: AuraAppState): boolean =>
  Boolean(state.app.loading);
