import { IconUser } from '../../icons/IconUser';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import AuthStore from '~/core/stores/Auth.store';
import React from 'react';
import ThemeToggle from '~/components/simple/ThemeToggle';
import styles from './ProfileMenu.module.scss';
import { IconLogout } from '~/components/icons/IconLogout';
import { AnimatePresence, motion } from 'framer-motion';
import {Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {Logout, PersonAdd, Settings} from "@mui/icons-material";
import ModalAddCar from "~/components/smart/ModalAddCar/ModalAddCar";

interface IProfileMenuProps {
  authStore?: AuthStore;
}

const ProfileMenu: React.FC<IProfileMenuProps> = ({ authStore }) => {
  const [isShow, setIsShow] = React.useState(false);
  const handleClickLogout = async () => {
    await localStorage.removeItem('token');
    await authStore?.setAuth(false);
  };
  const ref = React.useRef(null);
  const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsShow(false);
      }
  };

  React.useEffect(() => {
    // Добавляем обработчик нажатия вне компонента при монтировании компонента
    document.addEventListener('mousedown', handleClickOutside);
    // Удаляем обработчик нажатия вне компонента при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
  return (
      <React.Fragment>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              {/*<Typography sx={{ minWidth: 100 }}><ThemeToggle /></Typography>*/}
              <ModalAddCar title={'Добавить клиента'}/>
              <Tooltip title="Account settings">
                  <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                  >
                      <Avatar sx={{ width: 32, height: 32 }}>
                          <Avatar />
                      </Avatar>
                  </IconButton>
              </Tooltip>
          </Box>
          <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                  elevation: 0,
                  sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                      },
                      '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                      },
                  },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
              <MenuItem onClick={handleClose}>
                  <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                      <Settings fontSize="small" />
                  </ListItemIcon>
                  Настройки
              </MenuItem>
              <MenuItem onClick={handleClickLogout}>
                  <ListItemIcon>
                      <Logout className={styles.logout} fontSize="small" />
                  </ListItemIcon>
                  Выход
              </MenuItem>
              <MenuItem disabled={true} sx={{ ml: 2 }}>
                  <ListItemIcon sx={{ fontSize: 'small' , color: '#000' }}>
                      Версия приложения: {process.env.REACT_APP_VERSION}
                  </ListItemIcon>
              </MenuItem>
          </Menu>
      </React.Fragment>
  );
};

export default inject('authStore')(observer(ProfileMenu));