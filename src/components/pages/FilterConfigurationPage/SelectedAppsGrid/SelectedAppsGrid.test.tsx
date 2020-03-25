import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { SelectedAppsGrid } from './SelectedAppsGrid';
import { FakeApp } from '../../../../test-utils';
import { AuraAppState } from '../../../../store';

describe('<SelectedAppsGrid>', () => {
  const mockStore = configureMockStore<AuraAppState, any>();
  test('emptyState', () => {
    const store = mockStore({ app: { items: [] } });

    const { getByTestId } = render(
      <Provider store={store}>
        <SelectedAppsGrid />
      </Provider>
    );

    expect(getByTestId('emptyState')).toBeDefined();
  });

  test('fetched apps', () => {
    const store = mockStore({
      app: { items: [FakeApp(), FakeApp(), FakeApp()] }
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <SelectedAppsGrid />
      </Provider>
    );

    expect(getByTestId('card-app-0')).toBeDefined();
    expect(getByTestId('card-app-1')).toBeDefined();
    expect(getByTestId('card-app-2')).toBeDefined();
  });
});
