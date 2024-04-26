import styles from './Sidebar.module.scss';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ICarStore } from '~/core/stores/Car.store';
import { AnimatePresence, motion } from 'framer-motion';
import { IconArrow } from '~/components/icons/IconArrow';
import CarItem from '~/components/simple/CarItem/CarItem';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  TextField
} from '@mui/material';
import EastIcon from '@mui/icons-material/East';

interface ISidebarProps {
  carStore?: ICarStore;
}

const Sidebar: React.FC<ISidebarProps> = ({ carStore }) => {
  const {
    receiveListCars,
    cars,
    receiveCurrentCar,
    isLoading,
    isLoadingSidebar,
    isLoadingSearchCar,
    searchCar
  } = carStore!;
  const [isShowSidebar, setIsShowSidebar] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState<TCar | null>(null);
  const [searchField, setSearchField] = React.useState('LICENCE_PLATE');
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    receiveListCars();
  }, [isLoadingSidebar]);

  React.useEffect(() => {}, [isLoading, isLoadingSearchCar]);

  const handleSelect = (item: TCar) => {
    receiveCurrentCar(item.id);
    setSelectedItem(item);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchCar(searchField, searchValue);
  };

  const sidebarVariants = {
    open: { opacity: 1, width: '400px' },
    closed: { opacity: 0, width: '0' }
  };

  return (
    <div style={{ overflow: 'hidden', backgroundColor: '#fff' }}>
      <div
        onClick={() => setIsShowSidebar(!isShowSidebar)}
        className={styles.arrow}
        style={{ transform: isShowSidebar ? 'rotate(180deg)' : 'rotate(0deg)' }}>
        <IconArrow />
      </div>
      <AnimatePresence>
        <motion.div
          initial="closed"
          animate={isShowSidebar ? 'open' : 'closed'}
          variants={sidebarVariants}
          transition={{ duration: 0.5 }}
          style={{ height: '100%' }}>
          {isShowSidebar ? (
            <motion.div
              animate={isShowSidebar ? 'open' : 'closed'}
              variants={sidebarVariants}
              transition={{
                duration: 0.01,
                ease: 'easeInOut'
              }}
              style={{ overflow: 'scroll' }}
              className={styles.container}>
              <form className={styles.search} onSubmit={handleSubmit}>
                <FormControl variant="standard" sx={{ flex: 1, width: '100%' }}>
                  <InputLabel id="demo-simple-select-standard-label">Поиск по...</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    label="Поиск по">
                    <MenuItem value={'LICENCE_PLATE'}>Номер машины</MenuItem>
                    <MenuItem value={'MODEL'}>Модель</MenuItem>
                    <MenuItem value={'DESCRIPTION'}>Описание</MenuItem>
                    <MenuItem value={'BODY_NUMBER'}>VIN</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  id="standard-basic"
                  label="Поиск"
                  variant="standard"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <Button variant="text" color="primary" type="submit">
                        <EastIcon />
                      </Button>
                    )
                  }}
                  sx={{ flex: 1, width: '100%' }}
                />
              </form>
              <div className={styles.carList}>
                {isLoading ? (
                  <>
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={60}
                      style={{ margin: 5, flex: 1 }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={60}
                      style={{ margin: 5, flex: 1 }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={60}
                      style={{ margin: 5, flex: 1 }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={60}
                      style={{ margin: 5, flex: 1 }}
                    />
                  </>
                ) : (
                  cars?.content?.map((car, index) => (
                    <div key={index} className={styles.carItem}>
                      <CarItem
                        item={car}
                        isSelected={selectedItem === car}
                        onSelect={() => handleSelect(car)}
                      />
                    </div>
                  ))
                )}
              </div>
              <div className={styles.pagination}>
                {isShowSidebar ? (
                  <Pagination
                    variant="outlined"
                    color="primary"
                    count={cars?.totalPages || 0}
                    onChange={(event, page) => {
                      receiveListCars(page - 1);
                      console.log(event);
                    }}
                  />
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default inject('carStore')(observer(Sidebar));
