import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { IClientStore } from '~/core/stores/Client.store';
import styles from './ClientCardInfo.module.scss';
import { Button, Divider } from '@mui/material';
import AddVisit from '~/components/smart/AddVisit/AddVisit';
import HistoryVisits from '~/components/smart/HistoryVisits/HistoryVisits';

interface ICarCardInfo {
  clientStore?: IClientStore;
}

const ClientCardInfo: React.FC<ICarCardInfo> = ({ clientStore }) => {
  const [isShowFormVisit, setShowFormVisit] = React.useState(false);
  const { currentVisit, setCurrentVisit, currentClient, isLoadingNewVisit } = clientStore!;
  React.useEffect(() => {
    setShowFormVisit(false);
  }, [currentClient, isLoadingNewVisit]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.addVisit}>
          {currentVisit ? (
            <Button onClick={() => setCurrentVisit(null)} variant="outlined">
              Назад
            </Button>
          ) : (
            <Button onClick={() => setShowFormVisit(!isShowFormVisit)} variant="outlined">
              {isShowFormVisit ? 'Назад' : 'Новое посещение'}
            </Button>
          )}
        </div>
      </div>
      <Divider />
      <div className={styles.content}>{isShowFormVisit ? <AddVisit /> : <HistoryVisits />}</div>
    </div>
  );
};

export default inject('clientStore')(observer(ClientCardInfo));
