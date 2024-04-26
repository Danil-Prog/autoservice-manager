import React from 'react';
import styles from './EmptyItem.module.scss';
import { SearchOffOutlined } from '@mui/icons-material';
import { ListItemIcon } from '@mui/material';

interface IEmptyItem {}

const EmptyItem: React.FC<IEmptyItem> = () => {
  return (
    <div className={styles.container}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <ListItemIcon
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <SearchOffOutlined fontSize="large" />
        </ListItemIcon>
        <p style={{ color: '#919191' }}>Нет данных</p>
      </div>
    </div>
  );
};

export default EmptyItem;
