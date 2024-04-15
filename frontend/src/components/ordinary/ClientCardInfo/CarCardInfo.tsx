import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import React from "react";
import {ICarStore} from "~/core/stores/Car.store";
import styles from "./CarCardInfo.module.scss";

interface ICarCardInfo {
    carStore: ICarStore;
}

const CarCardInfo: React.FC<ICarCardInfo> = ({ carStore }) => {
    const { currentCar } = carStore
    React.useEffect(() => {

    }, [currentCar])

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

export default inject('carStore')(observer(CarCardInfo));