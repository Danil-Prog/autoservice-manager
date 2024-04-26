import React from 'react';
import { observer } from 'mobx-react-lite';

import styles from './AuthPage.module.scss';
import { Navigate } from 'react-router-dom';
import Loader from '~/components/ui/Loader';
import CookiesModal from '~/components/ui/CookiesModal';
import AuthStore from '~/core/stores/Auth.store';
import { inject } from 'mobx-react';
import { Button, TextField } from '@mui/material';

interface IAuthPage {
  authStore?: AuthStore;
}

const AuthPage: React.FC<IAuthPage> = ({ authStore }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const initialCookie = !localStorage.getItem('access_cookie');
  const [isModalCookie, setIsModalCookie] = React.useState(initialCookie);

  const signIn = async (username: string, password: string) => {
    try {
      await authStore?.login(username, password);
    } catch (error) {
      console.log('error----->', error);
    }
  };
  const handleChangeUsername = (value: string) => {
    setUsername(value);
  };
  const handleChangePassword = (value: string) => {
    setPassword(value);
  };

  if (authStore?.isAuthenticated || localStorage.getItem('token')) {
    return <Navigate to={'/'} replace />;
  }

  if (authStore?.isLoading) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  }

  const handleClickCookie = () => {
    localStorage.setItem('access_cookie', String(true));
    setIsModalCookie(false);
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
        <TextField
          id="outlined-basic"
          label="Логин"
          variant="standard"
          onChange={() => handleChangeUsername}
          name={'username'}
          autoComplete="username"
        />
        <TextField
          id="outlined-basic"
          label="Пароль"
          variant="standard"
          onChange={() => handleChangePassword}
          name={'password'}
          type={'password'}
          autoComplete="password"
        />
        <Button
          variant="contained"
          color="success"
          type={'submit'}
          onClick={() => signIn(username, password)}>
          Вход
        </Button>
      </form>
      {isModalCookie ? (
        <CookiesModal isModalCookie={isModalCookie} setIsModalCookie={handleClickCookie} />
      ) : null}
    </div>
  );
};

export default inject('authStore')(observer(AuthPage));
