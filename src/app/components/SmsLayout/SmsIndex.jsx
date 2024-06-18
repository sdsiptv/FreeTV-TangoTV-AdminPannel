import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight, Menu } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import Notifications from '../Navbar/Notifications';
import Sidebar from '../SmsSidebar/SmsIndex';
import { useStyles } from './styles';
function Layout({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div>
        <div className={classes.root}>
          <CssBaseline />

          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
            style={{ backgroundColor: '#101010' }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <Menu />
              </IconButton>

              <img src={Logo} alt="Logo" height="40px" />
              <Typography variant="h6" noWrap component="div">
                SDS IPTV----------SMS USER
              </Typography>
              <Notifications />
            </Toolbar>
          </AppBar>

          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />

            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? (
                    <ChevronLeft style={{ color: 'white' }} />
                  ) : (
                    <ChevronRight style={{ color: 'white' }} />
                  )}
                </IconButton>
              </div>

              <Divider />
              <List>{<Sidebar />}</List>
            </Drawer>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
