import { Backdrop, Box, Button, Fade, Modal, TextField } from '@mui/material';
import React from 'react';
import styles from './ModalAddClient.module.scss';
import { IClientStore } from '~/core/stores/Client.store';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

interface IModalAddClientProps {
  title: string;
  clientStore?: IClientStore;
}

const ModalAddClient: React.FC<IModalAddClientProps> = ({ title, clientStore }) => {
  const [client, setClient] = React.useState({
    licencePlate: '',
    stamp: '',
    model: '',
    year: '',
    bodyNumber: '',
    oil: '',
    odometer: null
  });
  const { createClient } = clientStore!;
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (client.licencePlate.length < 6 || client.licencePlate.length > 9) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    try {
      createClient(client);
      setClient({
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
    setClient((prevClient) => ({
      ...prevClient,
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
              <form onSubmit={handleSubmit} className={styles.createClientForm}>
                <TextField
                  onChange={handleChange}
                  name="licencePlate"
                  value={client.licencePlate}
                  id="standard-basic"
                  label="Номер машины"
                  variant="standard"
                  error={error}
                  helperText={error && 'Длина должна быть от 6 до 9'}
                />

                <TextField
                  onChange={handleChange}
                  name="stamp"
                  value={client.stamp}
                  id="standard-basic"
                  label="Марка"
                  variant="standard"
                />

                <TextField
                  onChange={handleChange}
                  name="model"
                  value={client.model}
                  id="standard-basic"
                  label="Модель"
                  variant="standard"
                />

                <TextField
                  onChange={handleChange}
                  name="bodyNumber"
                  value={client.bodyNumber}
                  id="standard-basic"
                  label="VIN"
                  variant="standard"
                />

                <TextField
                  onChange={handleChange}
                  name="year"
                  value={client.year}
                  id="standard-basic"
                  label="Год"
                  variant="standard"
                />

                <TextField
                  onChange={handleChange}
                  name="oil"
                  value={client.oil}
                  id="standard-basic"
                  label="Масло"
                  variant="standard"
                />

                <TextField
                  onChange={handleChange}
                  name="odometer"
                  value={client.odometer ?? ''}
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

export default inject('clientStore')(observer(ModalAddClient));
