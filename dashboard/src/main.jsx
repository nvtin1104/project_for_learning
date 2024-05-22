/* eslint-disable import/no-extraneous-dependencies */
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import store from './redux/store';
import { UserProvider } from './context/user.context';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          <Suspense>
            <App />
          </Suspense>
        </BrowserRouter>
      </UserProvider>
    </Provider>
  </HelmetProvider>
);
