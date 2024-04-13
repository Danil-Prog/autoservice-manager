import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import React from "react";
import {IClientStore} from "~/core/stores/Client.store";
import styles from "./ClientCard.module.scss";
import EmptyItem from "~/components/simple/EmptyItem/EmptyItem";

interface IClientCard {
    clientStore: IClientStore;
}

const ClientCard: React.FC<IClientCard> = ({ clientStore }) => {
    const { currentClient } = clientStore
    React.useEffect(() => {}, [currentClient])
    return (
        <div className={styles.container}>
            {currentClient ?
                <div className={styles.clientInfo}>
                    <p className={styles.clientInfoItem}>{currentClient.lastname}</p>
                    <p className={styles.clientInfoItem}>{currentClient.midname}</p>
                    <p className={styles.clientInfoItem}>{currentClient.reg}</p>
                    <p className={styles.clientInfoItem}>{currentClient.brand}</p>
                    <p className={styles.clientInfoItem}>{currentClient.model}</p>
                    <p className={styles.clientInfoItem}>{currentClient.year}</p>
                    <p className={styles.clientInfoItem}>{currentClient.vin}</p>
                    <p className={styles.clientInfoItem}>{currentClient.color}</p>
                    <p className={styles.clientInfoItem}>{currentClient.descriptionCar}</p>
                </div>
            : <EmptyItem /> }
        </div>
    )
}

export default inject('clientStore')(observer(ClientCard));