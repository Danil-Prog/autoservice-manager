import React from 'react';
import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import {ICarStore} from "~/core/stores/Car.store";
import styles from './HomePage.module.scss'
import ClientCard from "~/components/ordinary/ClientCard/CarCard";
import ClientCardInfo from "~/components/ordinary/ClientCardInfo/CarCardInfo";
import EmptyItem from "~/components/simple/EmptyItem/EmptyItem";

interface IHomePage {
  carStore: ICarStore;
}

const HomePage: React.FC<IHomePage> = ({ carStore }) => {
  const { currentCar } = carStore

  React.useEffect(() => {}, [currentCar])
  React.useEffect(() => {}, [])
  console.log(JSON.stringify(carStore.currentCar));

  return (
    <div className={styles.container}>
         {currentCar ?
            <>
                <ClientCard />
                <ClientCardInfo />
            </>
         : <EmptyItem />}
    </div>
  );
};

export default inject('carStore')(observer(HomePage));