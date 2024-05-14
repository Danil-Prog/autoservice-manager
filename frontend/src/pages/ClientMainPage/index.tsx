import React from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { IClientStore } from '~/core/stores/Client.store';
import styles from './ClientMainPage.module.scss';
import ClientCard from '~/components/ordinary/ClientCard/ClientCard';
import ClientCardInfo from '~/components/ordinary/ClientCardInfo/ClientCardInfo';
import EmptyItem from '~/components/simple/EmptyItem/EmptyItem';

interface IHomePage {
  clientStore?: IClientStore;
}

const ClientMainPage: React.FC<IHomePage> = ({ clientStore }) => {
  const { currentClient } = clientStore!;

  React.useEffect(() => {}, [currentClient]);
  React.useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      {currentClient ? (
        <>
          <ClientCard />
          <ClientCardInfo />
        </>
      ) : (
        <EmptyItem />
      )}
    </div>
  );
};

export default inject('clientStore')(observer(ClientMainPage));
