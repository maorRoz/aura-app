import { createSelector } from 'reselect';
import { AuraAppState } from '../store';

export const isFetchedAppsSelector = createSelector(
  (state: AuraAppState): AuraAppState['app'] => state.app,
  (app: AuraAppState['app']): boolean => Boolean(!app.loading && app.fetched)
);
