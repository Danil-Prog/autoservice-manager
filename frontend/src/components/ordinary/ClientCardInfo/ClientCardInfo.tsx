import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import React from "react";
import {IClientStore} from "~/core/stores/Client.store";
import styles from "./ClientCardInfo.module.scss";

interface IClientCardInfo {
    clientStore: IClientStore;
}

const ClientCardInfo: React.FC<IClientCardInfo> = ({ clientStore }) => {
    const { currentClient } = clientStore
    React.useEffect(() => {}, [currentClient])
    console.log("ClientCardInfo");
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button>Новое посещение</button>
            </div>
            <div className={styles.content}>

            </div>
        </div>
    )
}

export default inject('clientStore')(observer(ClientCardInfo));