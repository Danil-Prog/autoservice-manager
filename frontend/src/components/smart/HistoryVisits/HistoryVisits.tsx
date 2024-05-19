import React from 'react';
import { IClientStore } from '~/core/stores/Client.store';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import styles from './HistoryVisits.module.scss';
import { Button, ListItemIcon, Modal, Typography } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import AddVisit from '~/components/smart/AddVisit/AddVisit';
import { formatDate } from '~/core/utils/formatDate';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';

interface IHistoryVisits {
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

const HistoryVisits: React.FC<IHistoryVisits> = ({ clientStore }) => {
  const {
    setCurrentVisit,
    currentVisit,
    currentClient,
    isLoadingNewVisit,
    receiveCurrentClient,
    deleteVisit
  } = clientStore!;
  const [open, setOpen] = React.useState(false);
  const [selectedVisit, setSelectedVisit] = React.useState<TVisit>();
  const handleOpen = async (visit: TVisit) => {
    await setOpen(true);
    await setSelectedVisit(visit);
  };
  const handleClose = () => setOpen(false);
  const handleClickVisit = (visit: TVisit) => {
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
          {currentClient?.visits.map((visit: TVisit, index: number) => (
            <div key={index + 'visit'} className={styles.item}>
              <div>{visit.id}</div>
              <div>{formatDate(visit.visitDate) ?? ''}</div>
              <div className={styles.comment}>{visit.comment ?? ''}</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon>
                  <ArrowForwardIos
                    onClick={() => handleClickVisit(visit)}
                    className={styles.select}
                  />
                </ListItemIcon>
                <ListItemIcon>
                  <DeleteOutlineIcon onClick={() => handleOpen(visit)} className={styles.trash} />
                </ListItemIcon>
              </div>
            </div>
          ))}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Удалить посещение от {selectedVisit && formatDate(selectedVisit?.visitDate)}?
              </Typography>
              <div className={styles.modalContentDeleteVisit}>
                <Button variant="outlined" color="info" onClick={handleClose} style={{ flex: 1 }}>
                  Отмена
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={async () => {
                    await handleClose();
                    selectedVisit && deleteVisit(selectedVisit.id);
                  }}
                  style={{ flex: 1 }}>
                  Удалить
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
};

export default inject('clientStore')(observer(HistoryVisits));
