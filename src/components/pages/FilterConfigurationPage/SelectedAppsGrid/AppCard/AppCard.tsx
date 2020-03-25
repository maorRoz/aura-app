import React, { useState } from 'react';
import { Card, AppName, AppPublisher, AppRating } from './AppCard.styled';
import { App } from '../../../../../types';

export type AppCardProps = {
  app: App;
  testId?: string;
};

export const AppCard = ({ app, testId }: AppCardProps) => {
  const [inspected, setInspected] = useState(false);
  return (
    <Card
      inspected={inspected}
      onClick={() => {
        setInspected(true);
      }}
      data-testid={`card-${testId}`}
    >
      <AppName>{app.name}</AppName>
      {inspected && (
        <>
          <AppPublisher>{app.publisher}</AppPublisher>
          <AppRating value={app.rating} readOnly precision={0.5} />
          <div style={{ overflow: 'auto', flex: 1, marginBottom: '8px' }}>
            <div dangerouslySetInnerHTML={{ __html: app.description }} />
          </div>
        </>
      )}
      <div style={{ overflow: 'hidden', flex: '1' }}>
        <img src={app.icon} style={{ maxHeight: '100%' }} alt="" />
      </div>
    </Card>
  );
};
