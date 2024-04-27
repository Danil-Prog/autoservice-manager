import { Backdrop, Box, Button, Fade, Modal, TextField } from '@mui/material';
import React from 'react';
import styles from './ModalAddCar.module.scss';
import { ICarStore } from '~/core/stores/Car.store';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

interface IModalAddCarProps {
  title: string;
  carStore?: ICarStore;
}

const ModalAddCar: React.FC<IModalAddCarProps> = ({ title, carStore }) => {
  const [car, setCar] = React.useState({
    licencePlate: '',
    stamp: '',
    model: '',
    year: '',
    bodyNumber: '',
    oil: '',
    odometer: null
  });
  const { createCar } = carStore!;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(car);
    try {
      createCar(car);
      setCar({
        licencePlate: '',
        stamp: '',
        model: '',
        year: '',
        bodyNumber: '',
        oil: '',
        odometer: null
      });
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value
    }));
  };

  return (
    <div>
      <div>
        <Button onClick={handleOpen} variant="contained" color="inherit">
          {title}
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500
            }
          }}>
          <Fade in={open}>
            <Box sx={style}>
              <form onSubmit={handleSubmit} className={styles.createCarForm}>
                <TextField
                  onChange={handleChange}
                  name="licencePlate"
                  value={car.licencePlate}
                  id="standard-basic"
                  label="Номер машины"
                  variant="standard"
                />

                <TextField
                  onChange={handleChange}
                  name="stamp"
                  value={car.stamp}
                  id="standard-basic"
                  label="Марка"
                  variant="standard"
                />

                <TextField
                  onChange={handleChange}
                  name="model"
                  value={car.model}
                  id="standard-basic"
                  label="Модель"
                  variant="standard"
                />

                <TextField
                  onChange={handleChange}
                  name="bodyNumber"
                  value={car.bodyNumber}
                  id="standard-basic"
                  label="VIN"
                  variant="standard"
                />

                <TextField
                  onChange={handleChange}
                  name="year"
                  value={car.year}
                  id="standard-basic"
                  label="Год"
                  variant="standard"
                />

                <TextField
                  onChange={handleChange}
                  name="oil"
                  value={car.oil}
                  id="standard-basic"
                  label="Масло"
                  variant="standard"
                />

                <TextField
                  onChange={handleChange}
                  name="odometer"
                  value={car.odometer ?? ''}
                  id="standard-basic"
                  label="Пробег"
                  variant="standard"
                />
                <Button variant="contained" type={'submit'}>
                  Добавить
                </Button>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default inject('carStore')(observer(ModalAddCar));
