import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { FilterConfigurationPage } from './FilterConfigurationPage';
import { FakeApp } from '../../../test-utils';
import { AuraAppState } from '../../../store';

describe('<SelectedAppsGrid>', () => {
  const mockStore = configureMockStore<AuraAppState, any>();
  test('errorState', () => {
    const store = mockStore({
      app: {
        items: [FakeApp(), FakeApp()],
        loading: false,
        error: true,
        fetched: true
      }
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <FilterConfigurationPage />
      </Provider>
    );

    expect(getByTestId('filter-configuration-form')).toBeDefined();
    expect(getByTestId('errorState')).toBeDefined();
  });

  test('fetched apps', () => {
    const store = mockStore({
      app: {
        items: [FakeApp(), FakeApp(), FakeApp()],
        loading: false,
        error: false,
        fetched: true
      }
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <FilterConfigurationPage />
      </Provider>
    );

    expect(getByTestId('filter-configuration-form')).toBeDefined();
    expect(getByTestId('selected-app-grid')).toBeDefined();
  });
});
