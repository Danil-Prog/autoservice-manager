import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import AuthStore from '~/core/stores/Auth.store';
import { Provider } from 'mobx-react';
import ThemeStore from '~/core/stores/Theme.store';
import './styles/index.scss';
import './styles/variables.scss';
import ClientStore from "~/core/stores/Client.store";

// Создаем новые экземпляры
const authStore = new AuthStore();
const themeStore = new ThemeStore();
const clientStore = new ClientStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider
      authStore={authStore}
      themeStore={themeStore}
      clientStore={clientStore}
  >
    <App />
  </Provider>
);
