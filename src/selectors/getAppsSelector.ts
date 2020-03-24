import { AuraAppState } from '../store';
import { App } from '../types';

export const getAppsSelector = (state: AuraAppState): App[] => state.app.items;
