import { createStore, Store, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';
import { rootSaga } from './root.saga';
import { sagaMiddleware } from './middlewares';

export type AuraAppState = ReturnType<typeof rootReducer>;

const configureStore = (): Store<AuraAppState, any> => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = configureStore();
