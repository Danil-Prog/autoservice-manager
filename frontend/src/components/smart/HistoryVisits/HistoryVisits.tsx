import React from 'react';
import { IClientStore } from '~/core/stores/Client.store';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import styles from './HistoryVisits.module.scss';
import { ListItemIcon } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import AddVisit from '~/components/smart/AddVisit/AddVisit';
import { formatDate } from '~/core/utils/formatDate';

interface IHistoryVisits {
  clientStore?: IClientStore;
}

const HistoryVisits: React.FC<IHistoryVisits> = ({ clientStore }) => {
  const { setCurrentVisit, currentVisit, currentClient, isLoadingNewVisit, receiveCurrentClient } =
    clientStore!;
  const handleClickVisit = (visit: TVisits) => {
    setCurrentVisit(visit);
  };
  React.useEffect(() => {
    receiveCurrentClient(currentClient.id);
  }, [isLoadingNewVisit]);

  return (
    <>
      {currentVisit ? (
        <AddVisit />
      ) : (
        <div className={styles.itemsContainer}>
          {currentClient?.visits.map((visit: TVisits, index: number) => (
            <div
              key={index + 'visit'}
              className={styles.item}
              onClick={() => handleClickVisit(visit)}>
              <div>{visit.id}</div>
              <div>{formatDate(visit.visitDate) ?? ''}</div>
              <div className={styles.comment}>{visit.comment ?? ''}</div>
              <ListItemIcon>
                <ArrowForwardIos />
              </ListItemIcon>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default inject('clientStore')(observer(HistoryVisits));
