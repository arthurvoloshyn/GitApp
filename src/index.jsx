import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { HelmetProvider } from 'react-helmet-async';

import { showAlert } from 'actions';
import { store, persistor } from 'store/index';

import Loader from 'components/Loader';
import Reload from 'components/Reload';

import App from './App';
import { register } from './serviceWorker';

const loading = <Loader size={100} block />;
const alertSettings = { id: 'sw-update', icon: 'bolt', timeout: 0 };

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={loading} persistor={persistor}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

/* istanbul ignore next */
register({
  onUpdate: () => {
    store.dispatch(showAlert(<Reload />, alertSettings));
  },
});
