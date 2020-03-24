import React from 'react';
import { useSelector } from 'react-redux';
import { AppCard } from './AppCard';
import { getAppsSelector } from '../../../../selectors';

export const SelectedAppsGrid = () => {
  const apps = useSelector(getAppsSelector);
  return (
    <div>
      <div>Selected Apps</div>
      <div>
        {apps.map((app, index) => (
          <AppCard key={index} app={app} />
        ))}
      </div>
    </div>
  );
};
