import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { IClientStore } from '~/core/stores/Client.store';
import styles from './ClientCard.module.scss';
import EmptyItem from '~/components/simple/EmptyItem/EmptyItem';
import { Button, Modal, Skeleton, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';

interface IClientCard {
  clientStore?: IClientStore;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

const ClientCard: React.FC<IClientCard> = ({ clientStore }) => {
  const { currentClient, deleteClient, isLoadingCurrentClient } = clientStore!;
  React.useEffect(() => {}, [currentClient]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={styles.container}>
      {isLoadingCurrentClient ? (
        <div className={styles.clientInfo}>
          <Skeleton variant="rounded" width={207} height={48} />
          <Skeleton variant="rounded" width={207} height={48} />
          <Skeleton variant="rounded" width={207} height={48} />
          <Skeleton variant="rounded" width={207} height={48} />
          <Skeleton variant="rounded" width={207} height={48} />
          <Skeleton variant="rounded" width={207} height={48} />
          <Skeleton variant="rounded" width={207} height={48} />
          <div className={styles.deleteClient}>
            <Skeleton variant="rounded" width={180} height={40} />
          </div>
        </div>
      ) : (
        <>
          {currentClient ? (
            <div className={styles.clientInfo}>
              <TextField
                id="standard-read-only-input"
                label="Номерной знак"
                value={currentClient.licencePlate ?? ''}
                InputProps={{
                  readOnly: true
                }}
                variant="standard"
                className={styles.clientInfoItem}
              />
              <TextField
                id="standard-read-only-input"
                label="Марка"
                value={currentClient.stamp ?? ''}
                InputProps={{
                  readOnly: true
                }}
                variant="standard"
                className={styles.clientInfoItem}
              />
              <TextField
                id="standard-read-only-input"
                label="Модель"
                value={currentClient.model ?? ''}
                InputProps={{
                  readOnly: true
                }}
                variant="standard"
                className={styles.clientInfoItem}
              />
              <TextField
                id="standard-read-only-input"
                label="VIN"
                value={currentClient.bodyNumber ?? ''}
                InputProps={{
                  readOnly: true
                }}
                variant="standard"
                className={styles.clientInfoItem}
              />
              <TextField
                id="standard-read-only-input"
                label="Год"
                value={currentClient.year ?? ''}
                InputProps={{
                  readOnly: true
                }}
                variant="standard"
                className={styles.clientInfoItem}
              />
              <TextField
                id="standard-read-only-input"
                label="Масло"
                value={currentClient.oil ?? ''}
                InputProps={{
                  readOnly: true
                }}
                variant="standard"
                className={styles.clientInfoItem}
              />
              <TextField
                id="standard-read-only-input"
                label="Пробег"
                value={currentClient.odometer ?? ''}
                InputProps={{
                  readOnly: true
                }}
                variant="standard"
                className={styles.clientInfoItem}
              />
              <div className={styles.deleteClient}>
                <Button variant="outlined" color="error" onClick={handleOpen}>
                  Удалить клиента
                </Button>
                <div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        Удалить выбранного клиента?
                      </Typography>
                      <div className={styles.modalContentDeleteClient}>
                        <Button
                          variant="outlined"
                          color="info"
                          onClick={handleClose}
                          style={{ flex: 1 }}>
                          Назад
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={async () => {
                            await handleClose();
                            await deleteClient(currentClient.id);
                          }}
                          style={{ flex: 1 }}>
                          Удалить
                        </Button>
                      </div>
                    </Box>
                  </Modal>
                </div>
              </div>
            </div>
          ) : (
            <EmptyItem />
          )}
        </>
      )}
    </div>
  );
};

export default inject('clientStore')(observer(ClientCard));
