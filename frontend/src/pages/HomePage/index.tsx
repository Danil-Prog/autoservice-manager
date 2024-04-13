import $api from '~/core/services/http';
import { AuthResponse } from '~/core/models/response/AuthResponse';
import { ROUTE_PREFIX } from '~/core/config/api.config';
import React from 'react';
import { toast } from 'react-hot-toast';
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

  const handleClick = async () => {
    try {
      await $api.get<AuthResponse>(`${ROUTE_PREFIX}/user/test`);
    } catch (e: any) {
      toast.error(`${e?.response?.data?.message}`);
    }
  };

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