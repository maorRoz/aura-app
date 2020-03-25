import React from 'react';
import { useSelector } from 'react-redux';
import { AppCard } from './AppCard';
import { getAppsSelector } from '../../../../selectors';
import { AppGridHeader, Grid } from './SelectedAppsGrid.styled';

const EmptyState = () => (
  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
    No matching apps have been found :(
  </div>
);

export const SelectedAppsGrid = () => {
  const apps = useSelector(getAppsSelector);

  return (
    <div>
      <AppGridHeader>Selected Apps</AppGridHeader>
      <Grid>
        {apps.length === 0 ? (
          <EmptyState />
        ) : (
          apps.map((app, index) => <AppCard key={index} app={app} />)
        )}
      </Grid>
    </div>
  );
};
