import React from 'react';
import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import {IClientStore} from "~/core/stores/Client.store";
import styles from './HomePage.module.scss'
import ClientCard from "~/components/ordinary/ClientCard/ClientCard";
import ClientCardInfo from "~/components/ordinary/ClientCardInfo/ClientCardInfo";

interface IHomePage {
  clientStore: IClientStore;
}

const HomePage: React.FC<IHomePage> = ({ clientStore }) => {
  const { currentClient } = clientStore

  React.useEffect(() => {}, [currentClient])
  React.useEffect(() => {}, [])
  console.log(JSON.stringify(clientStore.currentClient));

  return (
    <div className={styles.container}>
      <ClientCard />
      <ClientCardInfo />
    </div>
  );
};

export default inject('clientStore')(observer(HomePage));