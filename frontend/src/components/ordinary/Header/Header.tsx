import React from 'react';
import styles from './Header.module.scss';
import { inject } from 'mobx-react';
import AuthStore from '~/core/stores/Auth.store';
import { observer } from 'mobx-react-lite';
import ProfileMenu from '~/components/simple/ProfileMenu';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import ModalAddCar from '~/components/smart/ModalAddCar/ModalAddCar';

interface IHeaderProps {
  authStore?: AuthStore;
}

const Header: React.FC<IHeaderProps> = () => {
  // const handleClickLogout = async () => {
  //   await localStorage.removeItem('token');
  //   await authStore?.setAuth(false);
  // };
  const location = useLocation();
  const isSpecificPath = location.pathname === '/car-main';

  return (
    <>
      <div className={styles.container}>
        <Link to={'/'} className={styles.logo}>
          <div className={styles.firstLetters}>TD</div>
          <div className={styles.mainLetters}>Drive</div>
        </Link>
        <div className={styles.rightMenu}>
          <Link to={'/calendar'} className={styles.button}>
            <Button variant="contained" color={'inherit'}>
              Календарь
            </Button>
          </Link>
          <Link to={'/car-main'} className={styles.button}>
            <Button variant="contained" color={'inherit'}>
              Клиенты
            </Button>
          </Link>
          {isSpecificPath ? <ModalAddCar title={'Добавить клиента'} /> : null}
          <ProfileMenu />
        </div>
      </div>
    </>
  );
};

export default inject('authStore')(observer(Header));
