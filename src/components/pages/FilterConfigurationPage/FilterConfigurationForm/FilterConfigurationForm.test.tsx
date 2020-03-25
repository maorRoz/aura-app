import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { FilterConfigurationForm } from './FilterConfigurationForm';
import { AuraAppState } from '../../../../store';
import { Fakes } from '../../../../test-utils/Fakes';

describe('<SelectedAppsGrid>', () => {
  const mockStore = configureMockStore<AuraAppState, any>();
  test('loadingState', () => {
    const store = mockStore({
      app: {
        items: [],
        loading: true,
        error: false,
        fetched: true
      }
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <FilterConfigurationForm />
      </Provider>
    );

    expect(getByTestId('submitApps-loading')).toBeDefined();
  });

  test('not submitted yet', () => {
    const store = mockStore({
      app: {
        items: [],
        loading: false,
        error: Fakes.boolean(),
        fetched: Fakes.boolean()
      }
    });

    const { queryByTestId } = render(
      <Provider store={store}>
        <FilterConfigurationForm />
      </Provider>
    );

    expect(queryByTestId('submitApps-loading')).toBeNull();
  });
});
