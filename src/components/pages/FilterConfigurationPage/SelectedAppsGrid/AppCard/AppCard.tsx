import React from 'react';
import { App } from '../../../../../types';

export type AppCardProps = {
  app: App;
};

export const AppCard = ({ app }: AppCardProps) => <div>{app.name}</div>;
