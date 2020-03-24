import React from 'react';
import { useSelector } from 'react-redux';
import { AppCard } from './AppCard';
import { getAppsSelector } from '../../../../selectors';
import { AppGridLayout, AppGridHeader, Grid } from './SelectedAppsGrid.styled';
import { App } from '../../../../types';

export const SelectedAppsGrid = () => {
  const apps = useSelector(getAppsSelector);
  return (
    <AppGridLayout>
      <AppGridHeader>Selected Apps</AppGridHeader>
      <Grid>
        {apps.map((app, index) => (
          <AppCard key={index} app={app} />
        ))}
      </Grid>
    </AppGridLayout>
  );
};
