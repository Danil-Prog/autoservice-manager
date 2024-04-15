import styles from './Sidebar.module.scss';
import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import React from "react";
import {ICarStore} from "~/core/stores/Car.store";
interface ISidebarProps {
    carStore: ICarStore;
}

const Sidebar: React.FC<ISidebarProps> = ({ carStore }) => {

    const { receiveListCars, cars, receiveCurrentCar } = carStore;

    React.useEffect(() => {
        receiveListCars()
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
          {cars?.map((car, index) => (
              <div key={index} className={styles.carItem} onClick={() => receiveCurrentCar(car.id)}>
                  <p style={{flex: 1, paddingLeft: 5}}>{car.reg}</p>
                  <p>{car.brand}</p>
                  <p>{car.model}</p>
                  <p style={{paddingRight: 5}}>{car.name}</p>
              </div>
          ))}
      </div>
  )
}

export default inject('carStore')(observer(Sidebar));