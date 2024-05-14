import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { IClientStore } from '~/core/stores/Client.store';
import styles from './ClientCard.module.scss';
import EmptyItem from '~/components/simple/EmptyItem/EmptyItem';
import { Button, Skeleton, TextField } from '@mui/material';

interface IClientCard {
  clientStore?: IClientStore;
}

const ClientCard: React.FC<IClientCard> = ({ clientStore }) => {
  const { currentClient, deleteClient, isLoadingCurrentClient } = clientStore!;
  React.useEffect(() => {}, [currentClient]);
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
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteClient(currentClient.id)}>
                  Удалить машину
                </Button>
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
