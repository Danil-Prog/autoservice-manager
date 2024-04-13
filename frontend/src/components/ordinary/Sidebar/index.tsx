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
          <div className={styles.search}>
              <select className={styles.searchSelect}>
                  <option>Номер машины</option>
                  <option>Номер телефона</option>
                  <option>Фио</option>
              </select>
              <input style={styles.searchInput} type="text"/>
          </div>
          {clients?.map((client, index) => (
              <div key={index} className={styles.clientItem}>
                  <p style={{flex: 1, paddingLeft: 5}}>{client.reg}</p>
                  <p>{client.brand}</p>
                  <p>{client.model}</p>
                  <p style={{paddingRight: 5}}>{client.name}</p>
              </div>
          ))}
      </div>
  )
}

export default inject('clientStore')(observer(Sidebar));