import React from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { IClientStore } from '~/core/stores/Client.store';
import styles from './SettingsPage.module.scss';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import SettingsMain from '~/components/ordinary/SettingsMain/SettingsMain';

interface ISettingsPage {
  clientStore?: IClientStore;
}

const SettingsPage: React.FC<ISettingsPage> = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  React.useEffect(() => {}, []);
  // const [open, setOpen] = React.useState(true);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  const renderContent = (selected: number) => {
    switch (selected) {
      case 0:
        return <SettingsMain />;
      case 1:
        return (
          <div>
            <p>Тестовый коммит</p>
          </div>
        );
      case 2:
        return <div>test 3</div>;
      default:
        return <div>Default content</div>;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex' }}>
      <div className={styles.leftMenu}>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List
            component="nav"
            aria-label="main mailbox folders"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Настройки
              </ListSubheader>
            }>
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
              sx={{ borderRadius: 3, marginBottom: 1 }}>
              <ListItemIcon>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Основные" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
              sx={{ borderRadius: 3, marginBottom: 1 }}>
              <ListItemIcon>
                <GppGoodOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Безопасность" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
              sx={{ borderRadius: 3, marginBottom: 1 }}>
              <ListItemIcon>
                <InsertChartOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Статистика" />
            </ListItemButton>
          </List>
        </Box>
      </div>
      <div className={styles.content}>{renderContent(selectedIndex)}</div>
    </Container>
  );
};

export default inject('clientStore')(observer(SettingsPage));
