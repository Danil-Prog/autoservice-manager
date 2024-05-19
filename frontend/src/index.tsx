import ReactDOM from 'react-dom/client';
import App from '~/App';
import AuthStore from '~/core/stores/Auth.store';
import { Provider } from 'mobx-react';
import ThemeStore from '~/core/stores/Theme.store';
import './styles/index.scss';
import './styles/variables.scss';
import ClientStore from '~/core/stores/Client.store';
import JobStore from '~/core/stores/Job.store';
import MainStore from '~/core/stores/Main.store';

// Создаем новые экземпляры
const authStore = new AuthStore();
const themeStore = new ThemeStore();
const clientStore = new ClientStore();
const jobStore = new JobStore();
const mainStore = new MainStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider
    authStore={authStore}
    themeStore={themeStore}
    clientStore={clientStore}
    jobStore={jobStore}
    mainStore={mainStore}>
    <App />
  </Provider>
);
