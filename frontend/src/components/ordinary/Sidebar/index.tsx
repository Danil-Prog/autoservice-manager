import styles from './Sidebar.module.scss';
import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import React from "react";
import {ICarStore} from "~/core/stores/Car.store";
import {AnimatePresence, motion} from "framer-motion";
import {IconDoubleArrow} from "~/components/icons/IconDoubleArrow";
import {IconArrow} from "~/components/icons/IconArrow";
import CarItem from "~/components/simple/ListItem/CarItem";

interface ISidebarProps {
    carStore: ICarStore;
}

const Sidebar: React.FC<ISidebarProps> = ({ carStore }) => {

    const { receiveListCars, cars, receiveCurrentCar, createCar, currentCar } = carStore;
    const [car, setCar] = React.useState({
        licencePlate: '',
        stamp: '',
        model: '',
        year: '',
        bodyNumber: '',
        oil: '',
        odometer: null
    })
    const [isShowSidebar, setIsShowSidebar] = React.useState(true);
    const [isShowFrom, setIsShowFrom] = React.useState(false);
    const itemRef = React.useRef(null);
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

    const sidebarVariants = {
        open: { opacity: 1, width: '400px' },
        closed: { opacity: 0, width: '0' },
    };

    const [selectedItem, setSelectedItem] = React.useState(null);
    const handleSelect = (item) => {
        setSelectedItem(item);
        receiveCurrentCar(item.id)
    };

  return (
      <div style={{overflow: 'hidden', backgroundColor: '#fff'}}>
          <div
            onClick={() => setIsShowSidebar(!isShowSidebar)}
            className={styles.arrow}
            style={{transform: isShowSidebar ? 'rotate(180deg)' : 'rotate(0deg)',}}
          >
              <IconArrow />
          </div>
          <AnimatePresence>
              <motion.div className={styles.container}
                          initial="closed"
                          animate={isShowSidebar ? 'open' : 'closed'}
                          variants={sidebarVariants}
                          transition={{duration: 0.5}}
                          style={{height:'100%'}}
              >
                  {isShowSidebar ?
                      <motion.div
                          animate={isShowSidebar ? 'open' : 'closed'}
                          variants={sidebarVariants}
                          transition={{
                              duration: 0.01,
                              ease: 'easeInOut',
                          }}
                      >
                          <div className={styles.search}>
                              <select className={styles.searchSelect}>
                                  <option>Номер машины</option>
                                  <option>Номер телефона</option>
                                  <option>Фио</option>
                              </select>
                              <input className={styles.searchInput} type="text" placeholder={'Поиск...'}/>
                          </div>
                          <button
                              onClick={() => setIsShowFrom(!isShowFrom)}
                              className={styles.addCar}
                          >
                              Добавить машину +
                          </button>
                          {isShowFrom ?
                              <form
                                  onSubmit={handleSubmit}
                                  className={styles.createCarForm}
                              >
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


                          {/*{cars?.map((car, index) => (*/}
                          {/*    <div ref={itemRef} key={index} className={styles.carItem} onClick={handleSelect}>*/}
                          {/*        <p style={{flex: 1, paddingLeft: 5}}>{car.licencePlate}</p>*/}
                          {/*        <p>{car.stamp}</p>*/}
                          {/*        <p>{car.model}</p>*/}
                          {/*        <p style={{paddingRight: 5}}>{car.year}</p>*/}
                          {/*    </div>*/}
                          {/*))}*/}
                          {cars?.map((car, index) => (
                              <CarItem
                                  key={index}
                                  item={car}
                                  isSelected={selectedItem === car}
                                  onSelect={handleSelect}
                              />
                          ))}
                      </motion.div>
                      : null}
                  <div style={{backgroundColor: '#fff'}}>
                  </div>
              </motion.div>
          </AnimatePresence>
      </div>
  )
}

export default inject('carStore')(observer(Sidebar));