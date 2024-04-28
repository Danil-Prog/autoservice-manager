import React from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { ICarStore } from '~/core/stores/Car.store';
import styles from './CarMainPage.module.scss';
import ClientCard from '~/components/ordinary/ClientCard/CarCard';
import ClientCardInfo from '~/components/ordinary/ClientCardInfo/CarCardInfo';
import EmptyItem from '~/components/simple/EmptyItem/EmptyItem';

interface IHomePage {
  carStore?: ICarStore;
}

const CarMainPage: React.FC<IHomePage> = ({ carStore }) => {
  const { currentCar } = carStore!;

  React.useEffect(() => {}, [currentCar]);
  React.useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      {currentCar ? (
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

export default inject('carStore')(observer(CarMainPage));
