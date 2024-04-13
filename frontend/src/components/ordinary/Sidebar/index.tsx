import styles from './Sidebar.module.scss';
import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import React from "react";
import {IClientStore} from "~/core/stores/Client.store";

interface ISidebarProps {
    clientStore: IClientStore;
}

const Sidebar: React.FC<ISidebarProps> = ({ clientStore }) => {

    const { receiveListClients, clients } = clientStore;
    React.useEffect(() => {
        receiveListClients()
    }, [])

  return (
      <div className={styles.container}>
          {clients?.map((client, index) => (
              <div key={index}>{client.name}</div>
          ))}
      </div>
  )
}

export default inject('clientStore')(observer(Sidebar));