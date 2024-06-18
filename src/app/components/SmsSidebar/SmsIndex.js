import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Mybutton from './mybutton';
import './Sidebar.css';

export default function Sidebar() {
  let history = useHistory();
  let isSelfSigned = process.env.REACT_APP_SELF;

  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const [open9, setOpen9] = useState(false);
  const [open10, setOpen10] = useState(false);
  const [open11, setOpen11] = useState(false);
  const [openAds, setOpenAds] = useState(false);

  const options = [
    { name: 'Administrator', open: open, setOpen: setOpen },
    // { name: 'Subscribers', open: open1, setOpen: setOpen1 },
    // { name: 'Live Streams', open: open2, setOpen: setOpen2 },
    // { name: 'Video On Demand', open: open3, setOpen: setOpen3 },
    // { name: 'Series On Demand', open: open4, setOpen: setOpen4 },
    // { name: 'Music On Demand', open: open5, setOpen: setOpen5 },
    // { name: 'OTT', open: open9, setOpen: setOpen9 },
    // { name: 'App TV', open: open10, setOpen: setOpen10 },
    // { name: 'App Store', open: open11, setOpen: setOpen11 },
    // { name: 'Statistics', open: open6, setOpen: setOpen6 },
    // { name: 'Fingerprint', open: open7, setOpen: setOpen7 },
    // { name: 'Reports and Logs', open: open8, setOpen: setOpen8 },
  ];

  let SubscribersMenu = [
    { name: 'Subscribers', link: '/Subscribers' },
    { name: 'Subscriber Package Details', link: '/UserPackageDetails' },
  ];

  if (isSelfSigned === 'true') {
    SubscribersMenu.push({ name: 'Assign Package', link: '/AssignPackage' });
  }

  const handleClick = name => {
    const selectedOption = options.find(option => option.name === name);
    options.forEach(option => option.setOpen(false));
    selectedOption.setOpen(!selectedOption.open);
  };

  return (
    <List
      style={{ width: '90%', paddingRight: '0px' }}
      sx={{ width: '100%', maxWidth: 340, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className="listNav"
    >
      <NavLink to="/smsdashboard" className="linkitem">
        <ListItem button className="listItem">
          <ListItemIcon>
            <DashboardIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </NavLink>

      <Mybutton label="Administrator" onClick={handleClick} expand={open} />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          style={{ backgroundColor: '#212121' }}
        >
          {[
            { name: 'customers ', link: '/AdminUsers' },
            // { name: 'System Information', link: '/SystemInformation' },
            // { name: 'App Updates', link: '/AppUpdates' },
            // { name: 'Advertisments', link: '/Advertisments' },
            // { name: 'Bulk Operations', link: '/Bulk' },
            // { name: 'Database Backup', link: '/Backup' },
          ].map((value, index) => {
            return (
              <ListItem
                button
                sx={{ pl: 2 }}
                key={value.name}
                className="listItem"
                onClick={() => {
                  history.push(value.link);
                }}
              >
                <ListItemText primary={value.name} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>


    </List>
  );
}
