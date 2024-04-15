import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import React from "react";
import {ICarStore} from "~/core/stores/Car.store";
import styles from "./CarCard.module.scss";
import EmptyItem from "~/components/simple/EmptyItem/EmptyItem";

interface ICarCard {
    carStore: ICarStore;
}

const CarCard: React.FC<ICarCard> = ({ carStore }) => {
    const { currentCar } = carStore
    React.useEffect(() => {}, [currentCar])
    return (
        <div className={styles.container}>
            {currentCar ?
                <div className={styles.carInfo}>
                    <p className={styles.carInfoItem}>{currentCar.lastname}</p>
                    <p className={styles.carInfoItem}>{currentCar.midname}</p>
                    <p className={styles.carInfoItem}>{currentCar.reg}</p>
                    <p className={styles.carInfoItem}>{currentCar.brand}</p>
                    <p className={styles.carInfoItem}>{currentCar.model}</p>
                    <p className={styles.carInfoItem}>{currentCar.year}</p>
                    <p className={styles.carInfoItem}>{currentCar.vin}</p>
                    <p className={styles.carInfoItem}>{currentCar.color}</p>
                    <p className={styles.carInfoItem}>{currentCar.descriptionCar}</p>
                </div>
            : <EmptyItem /> }
        </div>
    )
}

export default inject('carStore')(observer(CarCard));