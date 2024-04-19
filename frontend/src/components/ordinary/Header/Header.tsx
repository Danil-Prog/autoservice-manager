import React from 'react';
import styles from './Header.module.scss';
import { IconLogout } from '../../icons/IconLogout';
import { inject } from 'mobx-react';
import AuthStore from '../../../core/stores/Auth.store';
import { observer } from 'mobx-react-lite';
import ThemeToggle from '~/components/simple/ThemeToggle';
import { IconUser } from '~/components/icons/IconUser';
import ProfileMenu from '~/components/simple/ProfileMenu';
import {Link} from "react-router-dom";

interface IHeaderProps {
  authStore?: AuthStore;
}

const Header: React.FC<IHeaderProps> = ({ authStore }) => {
  const handleClickLogout = async () => {
    await localStorage.removeItem('token');
    await authStore?.setAuth(false);
  };

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