import styles from './Sidebar.module.scss';
import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import React from "react";
import {ICarStore} from "~/core/stores/Car.store";

interface ISidebarProps {
    carStore: ICarStore;
}

const Sidebar: React.FC<ISidebarProps> = ({ carStore }) => {

    const { receiveListCars, cars, receiveCurrentCar, createCar } = carStore;
    const [car, setCar] = React.useState({
        licencePlate: '',
        stamp: '',
        model: '',
        year: '',
        bodyNumber: '',
        oil: '',
        odometer: null
    })
    const [isShowFrom, setIsShowFrom] = React.useState(false);

    React.useEffect(() => {
        receiveListCars()
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar(prevCar => ({
            ...prevCar,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(car);
        createCar(car)

        setIsShowFrom(false)

        setCar({
            licencePlate: '',
            stamp: '',
            model: '',
            year: '',
            bodyNumber: '',
            oil: '',
            odometer: null
        });
    };

  return (
      <div className={styles.container}>
          <div className={styles.search}>
              <select className={styles.searchSelect}>
                  <option>Номер машины</option>
                  <option>Номер телефона</option>
                  <option>Фио</option>
              </select>
              <input style={styles.searchInput} type="text"/>
              <button onClick={() => setIsShowFrom(!isShowFrom)}>Добавить машину +</button>
              {isShowFrom ?
              <form onSubmit={handleSubmit} className={styles.createCarForm}>
                  <label>
                      <p>Номер машины:</p>
                      <input
                          type="text"
                          name="licencePlate"
                          value={car.licencePlate}
                          onChange={handleChange}
                      />
                  </label>
                  <label>
                      <p>Марка:</p>
                      <input
                          type="text"
                          name="stamp"
                          value={car.stamp}
                          onChange={handleChange}
                      />
                  </label>
                  <label>
                      <p>Модель:</p>
                      <input
                          type="text"
                          name="model"
                          value={car.model}
                          onChange={handleChange}
                      />
                  </label>
                  <label>
                      <p>VIN:</p>
                      <input
                          type="text"
                          name="bodyNumber"
                          value={car.bodyNumber}
                          onChange={handleChange}
                      />
                  </label>
                  <label>
                      <p>Год:</p>
                      <input
                          type="text"
                          name="year"
                          value={car.year}
                          onChange={handleChange}
                      />
                  </label>
                  <label>
                      <p>Масло:</p>
                      <input
                          type="text"
                          name="oil"
                          value={car.oil}
                          onChange={handleChange}
                      />
                  </label>
                  <label>
                      <p>Пробег:</p>
                      <input
                          type="text"
                          name="odometer"
                          value={car.odometer ?? ''}
                          onChange={handleChange}
                      />
                  </label>
                  <button type="submit">Submit</button>
              </form>
              : null}
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