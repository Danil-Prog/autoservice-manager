import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from '~/pages/HomePage';
import PrivateRoute from '~/routes/PrivateRoute';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Toaster } from 'react-hot-toast';
import { Colors } from '~/core/constants/Colors';
import { inject } from 'mobx-react';
import SettingsPage from '~/pages/SettingsPage';
import StaticElementsWithSidebar from 'src/components/ordinary/StaticElementsWithSidebar';
import StaticElements from '~/components/ordinary/StaticElements';
import AuthStore from '~/core/stores/Auth.store';
import ThemeStore from '~/core/stores/Theme.store';

interface IAppProps {
  authStore?: AuthStore;
  themeStore?: ThemeStore;
}

const App: React.FC<IAppProps> = observer(({ authStore, themeStore }) => {
  React.useEffect(() => {
    // Установите тему по умолчанию при загрузке приложения
    if (localStorage.getItem('theme')?.length) {
      document.body.dataset['theme'] = localStorage.getItem('theme') || 'light';
    } else {
      document.body.dataset['theme'] = themeStore?.isDarkMode ? 'dark' : 'light';
    }
  }, [themeStore?.isDarkMode]);

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      authStore?.setAuth(true);
    } else {
      authStore?.setAuth(false);
    }
  }, [authStore, authStore?.isAuthenticated]);

  return (
    <div className="App">
      <Toaster
        toastOptions={{
          success: {
            iconTheme: {
              primary: Colors.success,
              secondary: Colors.text_light
            },
            style: {
              color: Colors.text_light,
              background: Colors.background
            },
            position: 'bottom-right'
          },
          error: {
            style: {
              color: Colors.text_light,
              background: Colors.background
            },
            position: 'bottom-right'
          }
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<StaticElementsWithSidebar />}>
            <Route
              path={'/'}
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path={'/'} element={<StaticElements />}>
            <Route
              path={'/settings'}
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path={'/login'} element={<AuthPage />} />
          <Route path={'*'} element={<Navigate to={'/'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
});

export default inject('authStore', 'themeStore')(App);
