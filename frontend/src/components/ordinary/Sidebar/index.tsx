import styles from './Sidebar.module.scss';
import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import React from "react";
import {ICarStore} from "~/core/stores/Car.store";
import {AnimatePresence, motion} from "framer-motion";
import {IconArrow} from "~/components/icons/IconArrow";
import CarItem from "~/components/simple/CarItem/CarItem";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select, Skeleton,
    TextField,
} from "@mui/material";

interface ISidebarProps {
    carStore: ICarStore;
}

const Sidebar: React.FC<ISidebarProps> = ({ carStore }) => {

    const { receiveListCars, cars, receiveCurrentCar, createCar, currentCar, isLoading, isLoadingSidebar } = carStore;
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
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [age, setAge] = React.useState('');

    React.useEffect(() => {
        receiveListCars()
    }, [isLoadingSidebar])

    React.useEffect(() => {
    }, [isLoading])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar(prevCar => ({
            ...prevCar,
            [name]: value,
        }));
    };

    const handleSelect = (item) => {
        receiveCurrentCar(item.id)
        setSelectedItem(item);
    };

    const sidebarVariants = {
        open: { opacity: 1, width: '400px' },
        closed: { opacity: 0, width: '0' },
    };

  return (
      <div style={{overflow: 'hidden', backgroundColor: '#fff'}}>
          <div
            onClick={() => setIsShowSidebar(!isShowSidebar)}
            className={styles.arrow}
            style={{transform: isShowSidebar ? 'rotate(180deg)' : 'rotate(0deg)'}}
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
                          style={{overflow: 'scroll'}}
                      >
                          <div className={styles.search}>
                              <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                                  <InputLabel id="demo-simple-select-standard-label">Поиск по...</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="demo-simple-select-standard"
                                      value={age}
                                      onChange={handleChange}
                                      label="Поиск по"
                                  >
                                      <MenuItem value="">
                                          <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={10}>Номер машины</MenuItem>
                                      <MenuItem value={20}>Номер телефона</MenuItem>
                                      <MenuItem value={30}>Фио</MenuItem>
                                  </Select>
                              </FormControl>
                              <TextField id="standard-basic" label="Поиск" variant="standard"/>
                          </div>
                          {isLoading ?
                              <>
                                  <Skeleton animation="wave" variant="rounded" height={60} style={{margin: 5, flex: 1}}/>
                                  <Skeleton animation="wave" variant="rounded" height={60} style={{margin: 5, flex: 1}}/>
                                  <Skeleton animation="wave" variant="rounded" height={60} style={{margin: 5, flex: 1}}/>
                                  <Skeleton animation="wave" variant="rounded" height={60} style={{margin: 5, flex: 1}}/>
                              </>
                              : cars?.map((car, index) => (
                                  <div key={index}>
                                      <CarItem
                                          item={car}
                                          isSelected={selectedItem === car}
                                          onSelect={handleSelect}
                                      />
                                  </div>
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