import styles from './Sidebar.module.scss';
import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import React from "react";
import {ICarStore} from "~/core/stores/Car.store";
import {AnimatePresence, motion} from "framer-motion";
import {IconDoubleArrow} from "~/components/icons/IconDoubleArrow";
import {IconArrow} from "~/components/icons/IconArrow";
import CarItem from "~/components/simple/CarItem/CarItem";
import {
    Backdrop,
    Box,
    Button,
    Fade,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography
} from "@mui/material";
import ModalAddCar from "~/components/smart/ModalAddCar/ModalAddCar";

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




    const sidebarVariants = {
        open: { opacity: 1, width: '400px' },
        closed: { opacity: 0, width: '0' },
    };

    const [selectedItem, setSelectedItem] = React.useState(null);
    const handleSelect = (item) => {
        setSelectedItem(item);
        receiveCurrentCar(item.id)
    };
    const [age, setAge] = React.useState('');


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
                              <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                                  <InputLabel id="demo-simple-select-standard-label">Поиск по...</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="demo-simple-select-standard"
                                      value={age}
                                      onChange={handleChange}
                                      label="Age"

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
                          <div className={styles.addCar}>
                          </div>
                          {cars?.map((car, index) => (
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