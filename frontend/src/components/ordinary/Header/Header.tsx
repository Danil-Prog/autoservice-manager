import React from 'react';
import styles from './Header.module.scss';
import { inject } from 'mobx-react';
import AuthStore from '../../../core/stores/Auth.store';
import { observer } from 'mobx-react-lite';
import ProfileMenu from '~/components/simple/ProfileMenu';
import { Link } from 'react-router-dom';

interface IHeaderProps {
  authStore?: AuthStore;
}

const Header: React.FC<IHeaderProps> = () => {
  // const handleClickLogout = async () => {
  //   await localStorage.removeItem('token');
  //   await authStore?.setAuth(false);
  // };

  return (
    <>
      <div className={styles.container}>
        <Link to={'/'} className={styles.logo}>
          <div className={styles.firstLetters}>TD</div>
          <div className={styles.mainLetters}>Drive</div>
        </Link>
        <div className={styles.rightMenu}>
          <ProfileMenu />
        </div>
      </div>
    </>
  );
};

export default inject('authStore')(observer(Header));
