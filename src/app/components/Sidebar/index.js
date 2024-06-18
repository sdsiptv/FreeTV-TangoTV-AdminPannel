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
  const Role = localStorage.getItem("roles")

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
  const [open12, setOpen12] = useState(false);
  const [open13, setOpen13] = useState(false);
  const [open14, setOpen14] = useState(false);
  const [open15, setOpen15] = useState(false);
  const [openAds, setOpenAds] = useState(false);

  const options = [
    { name: 'Administrator', open: open, setOpen: setOpen },
    { name: 'Subscribers', open: open1, setOpen: setOpen1 },
    { name: 'Live Streams', open: open2, setOpen: setOpen2 },
    { name: 'Video On Demand', open: open3, setOpen: setOpen3 },
    { name: 'Series On Demand', open: open4, setOpen: setOpen4 },
    { name: 'Music On Demand', open: open5, setOpen: setOpen5 },
    { name: 'EDUCATION', open: open14, setOpen: setOpen14 },
    { name: 'DEVOTIONAL', open: open15, setOpen: setOpen15 },
    { name: 'OTT', open: open9, setOpen: setOpen9 },
    { name: 'App TV', open: open10, setOpen: setOpen10 },
    { name: 'Popular TV', open: open12, setOpen: setOpen12 },
    { name: 'App Store', open: open11, setOpen: setOpen11 },
    { name: 'Statistics', open: open6, setOpen: setOpen6 },
    { name: 'Fingerprint', open: open7, setOpen: setOpen7 },
    { name: 'Reports and Logs', open: open8, setOpen: setOpen8 },
    { name: 'Channel List And Status', open: open13, setOpen: setOpen13 },

  ];

  let SubscribersMenu = [
    { name: 'Subscribers', link: '/Subscribers' },
    { name: 'Subscriber Package Details', link: '/UserPackageDetails' },
  ];

  if (isSelfSigned === 'true') {
    SubscribersMenu.push({ name: 'Assign Package', link: '/AssignPackage' });
  }

  let SubscribersMenuSms = [
    { name: 'Subscribers', link: '/Subscribers' },
    { name: 'Subscriber Package Details', link: '/UserPackageDetails' },
  ];


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
      {Role === 'admin' && (
        <div>
          <NavLink to="/" className="linkitem">
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
                { name: 'Admin Users ', link: '/AdminUsers' },
                { name: 'System Information', link: '/SystemInformation' },
                { name: 'App Updates', link: '/AppUpdates' },
                { name: 'Advertisments', link: '/Advertisments' },
                { name: 'Bulk Operations', link: '/Bulk' },
                { name: 'Database Backup', link: '/Backup' },
                { name: 'Web Url', link: '/listweburl' },
                { name: 'DRM White List', link: '/DRMWaitlist' },
                { name: 'Tune Version', link: '/viewTuneVersion' },
                { name: 'User Engineering', link: '/UserEngineerings' },
                { name: 'Languages', link: '/Language' },
                { name: 'Server Logs', link: '/ServerLogs' },
                { name: 'Access Logs', link: '/AccessLogs' },
                { name: 'Socket', link: '/Socket' },
              ].map((value, index) => {
                return (
                  <ListItem
                    buttons
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

          <Mybutton label="Subscribers" onClick={handleClick} expand={open1} />

          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {SubscribersMenu.map((value, index) => {
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

          <Mybutton label="Live Streams" onClick={handleClick} expand={open2} />

          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Source IP', link: '/SourceIP' },
                { name: 'Channel Categories', link: '/ChannelCategories' },
                { name: 'Channel Streams', link: '/ChannelStreams' },
                { name: 'Manage Package', link: '/ManagePackageStreams' },
                { name: 'EPG', link: '/EPG' },
                { name: 'View Channel Status', link: '/ChannelStatus' },
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

          <Mybutton label="Video On Demand" onClick={handleClick} expand={open3} />

          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'VOD Categories', link: '/VODCategories' },
                { name: 'VOD Providers', link: '/VODProviders' },
                // { name: 'VOD Language', link: '/VODLanguage' },
                { name: 'VOD Genres', link: '/VODGenre' },
                { name: 'VOD Media', link: '/VODMedia' },
                { name: 'Manage package (VOD)', link: '/VODManagePackage' },
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

          <Mybutton label="Series On Demand" onClick={handleClick} expand={open4} />

          <Collapse in={open4} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'SOD Categories', link: '/SODCategories' },
                { name: 'SOD Providers', link: '/SODProviders' },
                // { name: 'SOD Language', link: '/SODLanguage' },
                { name: 'SOD Genres', link: '/SODGenre' },
                { name: 'SOD Media', link: '/SODMedia' },
                { name: 'Manage Package(SOD)', link: 'SODManagePackage' },
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

          <Mybutton label="Music On Demand" onClick={handleClick} expand={open5} />

          <Collapse in={open5} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'MOD Categories', link: '/MODCategories' },
                { name: 'MOD Media', link: '/MODMedia' },
                { name: 'Manage Package(MOD)', link: 'MODManagePackage' },
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

          <Mybutton label="EDUCATION" onClick={handleClick} expand={open9} />

          <Collapse in={open14} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'EDUCATION Providers', link: '/EDUProviders' },
                { name: 'EDUCATION Medium', link: '/EDUCategory' },
                { name: 'EDUCATION Board', link: '/Board' },
                { name: 'EDUCATION Subject', link: '/Educations' },
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

          <Mybutton label="DEVOTIONAL" onClick={handleClick} expand={open15} />

          <Collapse in={open15} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Locations', link: '/Location' },
                { name: 'DEVOTIONAL Category', link: '/DEVCategory' },
                { name: 'DEVOTIONAL Providers', link: '/DevotionalProviders' },
                { name: 'Religious', link: '/Religious' },
                { name: 'DEVOTIONAL', link: '/Devotional' },
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

          <Mybutton label="OTT" onClick={handleClick} expand={open9} />

          <Collapse in={open9} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'OTT Providers', link: '/OTTProviders' },
                { name: 'OTT Categories', link: '/OTTCategories' },
                { name: 'OTT Channels', link: '/OTTChannel' },
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

          <Mybutton label="App TV" onClick={handleClick} expand={open10} />

          <Collapse in={open10} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'App TV Categories', link: '/AppTVCategories' },
                { name: 'App TV Providers', link: '/AppTVProviders' },
                { name: 'App TV Media', link: '/AppTVMedia' },
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

          <Mybutton label="Popular TV" onClick={handleClick} expand={open12} />

          <Collapse in={open12} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Popular TV Categories', link: '/PopularTVCategories' },
                { name: 'Popular TV Providers', link: '/PopularTVProviders' },
                { name: 'Popular TV Media', link: '/PopularTVMedia' },
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

          <Mybutton label="App Store" onClick={handleClick} expand={open11} />

          <Collapse in={open11} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'App Store Categories', link: '/AppStoreCategory' },
                { name: 'App Upload', link: '/ListAppStoreUpload' },
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


          <Mybutton label="Statistics" onClick={handleClick} expand={open6} />

          <Collapse in={open6} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Online Users', link: '/OnlineUsers' },
                { name: 'Triggers', link: '/Triggers' },
                { name: 'Channel views', link: '/ChannelViews' },
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


          <Mybutton label="Fingerprint" onClick={handleClick} expand={open7} />

          <Collapse in={open7} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Mail', link: '/Mail' },
                { name: 'Fingerprint', link: '/Fingerprint' },
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

          <Mybutton label="Reports and Logs" onClick={handleClick} expand={open8} />

          <Collapse in={open8} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Reports', link: '/Reports' },
                { name: 'Logs', link: '/Logs' },
                { name: 'Contact Info', link: '/listContactInfo' },
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
        </div>
      )}

      {Role === 'maintenance' && (
        <div>
          <NavLink to="/" className="linkitem">
            {/* <ListItem button className="listItem">
              <ListItemIcon>
                <DashboardIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem> */}
          </NavLink>

          {/* <Mybutton label="Administrator" onClick={handleClick} expand={open} />
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Admin Users ', link: '/AdminUsers' },
                { name: 'System Information', link: '/SystemInformation' },
                { name: 'Advertisments', link: '/Advertisments' },
                { name: 'Bulk Operations', link: '/Bulk' },
                { name: 'Database Backup', link: '/Backup' },
                { name: 'Tune Version', link: '/viewTuneVersion' },
                { name: 'User Engineering', link: '/UserEngineerings' },
                { name: 'Languages', link: '/Language' },
              ].map((value, index) => {
                return (
                  <ListItem
                    buttons
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
          </Collapse> */}

          {/* <Mybutton label="Live Streams" onClick={handleClick} expand={open2} />
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Source IP', link: '/SourceIP' },
                { name: 'Channel Categories', link: '/ChannelCategories' },
                { name: 'Channel Streams', link: '/ChannelStreams' },
                { name: 'EPG', link: '/EPG' },
                { name: 'View Channel Status', link: '/ChannelStatus' },
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
          </Collapse> */}

          <Mybutton label="Video On Demand" onClick={handleClick} expand={open3} />

          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'VOD Categories', link: '/VODCategories' },
                { name: 'VOD Providers', link: '/VODProviders' },
                // { name: 'VOD Language', link: '/VODLanguage' },
                { name: 'VOD Genres', link: '/VODGenre' },
                { name: 'VOD Media', link: '/VODMedia' },
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

          <Mybutton label="Series On Demand" onClick={handleClick} expand={open4} />

          <Collapse in={open4} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'SOD Categories', link: '/SODCategories' },
                { name: 'SOD Providers', link: '/SODProviders' },
                // { name: 'SOD Language', link: '/SODLanguage' },
                { name: 'SOD Genres', link: '/SODGenre' },
                { name: 'SOD Media', link: '/SODMedia' },
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

          <Mybutton label="Music On Demand" onClick={handleClick} expand={open5} />

          <Collapse in={open5} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'MOD Categories', link: '/MODCategories' },
                { name: 'MOD Media', link: '/MODMedia' },
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

          <Mybutton label="EDUCATION" onClick={handleClick} expand={open9} />

          <Collapse in={open14} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'EDUCATION Providers', link: '/EDUProviders' },
                { name: 'EDUCATION Medium', link: '/EDUCategory' },
                { name: 'EDUCATION Board', link: '/Board' },
                { name: 'EDUCATION Subject', link: '/Educations' },
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

          <Mybutton label="DEVOTIONAL" onClick={handleClick} expand={open15} />

          <Collapse in={open15} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'DEVOTIONAL Category', link: '/DEVCategory' },
                { name: 'DEVOTIONAL Providers', link: '/DevotionalProviders' },
                { name: 'Religious', link: '/Religious' },
                { name: 'DEVOTIONAL', link: '/Devotional' },
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

          <Mybutton label="OTT" onClick={handleClick} expand={open9} />

          <Collapse in={open9} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'OTT Providers', link: '/OTTProviders' },
                { name: 'OTT Categories', link: '/OTTCategories' },
                { name: 'OTT Channels', link: '/OTTChannel' },
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

          <Mybutton label="App TV" onClick={handleClick} expand={open10} />

          <Collapse in={open10} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'App TV Categories', link: '/AppTVCategories' },
                { name: 'App TV Providers', link: '/AppTVProviders' },
                { name: 'App TV Media', link: '/AppTVMedia' },
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

          <Mybutton label="Popular TV" onClick={handleClick} expand={open12} />

          <Collapse in={open12} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Popular TV Categories', link: '/PopularTVCategories' },
                { name: 'Popular TV Providers', link: '/PopularTVProviders' },
                { name: 'Popular TV Media', link: '/PopularTVMedia' },
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

          {/* <Mybutton label="App Store" onClick={handleClick} expand={open11} />

          <Collapse in={open11} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'App Store Categories', link: '/AppStoreCategory' },
                { name: 'App Upload', link: '/ListAppStoreUpload' },
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
          </Collapse> */}

        </div>
      )}

      {Role === 'maintenance2' && (
        <div>
          <NavLink to="/" className="linkitem">
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
                // { name: 'Admin Users ', link: '/AdminUsers' },
                // { name: 'System Information', link: '/SystemInformation' },
                { name: 'Advertisments', link: '/Advertisments' },
                // { name: 'Bulk Operations', link: '/Bulk' },
                // { name: 'Database Backup', link: '/Backup' },
                // { name: 'Tune Version', link: '/viewTuneVersion' },
                // { name: 'User Engineering', link: '/UserEngineerings' },
                // { name: 'Languages', link: '/Language' },
              ].map((value, index) => {
                return (
                  <ListItem
                    buttons
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

          <Mybutton label="Live Streams" onClick={handleClick} expand={open2} />
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Source IP', link: '/SourceIP' },
                { name: 'Channel Categories', link: '/ChannelCategories' },
                { name: 'Channel Streams', link: '/ChannelStreams' },
                { name: 'EPG', link: '/EPG' },
                { name: 'View Channel Status', link: '/ChannelStatus' },
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

          <Mybutton label="Video On Demand" onClick={handleClick} expand={open3} />

          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'VOD Categories', link: '/VODCategories' },
                { name: 'VOD Providers', link: '/VODProviders' },
                // { name: 'VOD Language', link: '/VODLanguage' },
                { name: 'VOD Genres', link: '/VODGenre' },
                { name: 'VOD Media', link: '/VODMedia' },
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

          <Mybutton label="Series On Demand" onClick={handleClick} expand={open4} />

          <Collapse in={open4} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'SOD Categories', link: '/SODCategories' },
                { name: 'SOD Providers', link: '/SODProviders' },
                // { name: 'SOD Language', link: '/SODLanguage' },
                { name: 'SOD Genres', link: '/SODGenre' },
                { name: 'SOD Media', link: '/SODMedia' },
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

          <Mybutton label="Music On Demand" onClick={handleClick} expand={open5} />

          <Collapse in={open5} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'MOD Categories', link: '/MODCategories' },
                { name: 'MOD Media', link: '/MODMedia' },
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

          <Mybutton label="EDUCATION" onClick={handleClick} expand={open9} />

          <Collapse in={open14} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'EDUCATION Providers', link: '/EDUProviders' },
                { name: 'EDUCATION Medium', link: '/EDUCategory' },
                { name: 'EDUCATION Board', link: '/Board' },
                { name: 'EDUCATION Subject', link: '/Educations' },
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

          <Mybutton label="DEVOTIONAL" onClick={handleClick} expand={open15} />

          <Collapse in={open15} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'DEVOTIONAL Category', link: '/DEVCategory' },
                { name: 'DEVOTIONAL Providers', link: '/DevotionalProviders' },
                { name: 'Religious', link: '/Religious' },
                { name: 'DEVOTIONAL', link: '/Devotional' },
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

          <Mybutton label="OTT" onClick={handleClick} expand={open9} />

          <Collapse in={open9} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'OTT Providers', link: '/OTTProviders' },
                { name: 'OTT Categories', link: '/OTTCategories' },
                { name: 'OTT Channels', link: '/OTTChannel' },
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

          <Mybutton label="App TV" onClick={handleClick} expand={open10} />

          <Collapse in={open10} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'App TV Categories', link: '/AppTVCategories' },
                { name: 'App TV Providers', link: '/AppTVProviders' },
                { name: 'App TV Media', link: '/AppTVMedia' },
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

          <Mybutton label="Popular TV" onClick={handleClick} expand={open12} />

          <Collapse in={open12} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Popular TV Categories', link: '/PopularTVCategories' },
                { name: 'Popular TV Providers', link: '/PopularTVProviders' },
                { name: 'Popular TV Media', link: '/PopularTVMedia' },
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

          <Mybutton label="Statistics" onClick={handleClick} expand={open6} />

          <Collapse in={open6} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Online Users', link: '/OnlineUsers' },
                { name: 'Triggers', link: '/Triggers' },
                { name: 'Channel views', link: '/ChannelViews' },
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


          <Mybutton label="Reports and Logs" onClick={handleClick} expand={open8} />

          <Collapse in={open8} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Reports', link: '/Reports' },
                { name: 'Logs', link: '/Logs' },
                { name: 'Contact Info', link: '/listContactInfo' },
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

        </div>
      )}


      {Role === 'SmsUser' && (
        <div>
          <NavLink to="/" className="linkitem">
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
                // { name: 'Admin Users ', link: '/AdminUsers' },
                // { name: 'System Information', link: '/SystemInformation' },
                // { name: 'App Updates', link: '/AppUpdates' },
                { name: 'Advertisments', link: '/Advertisments' },
                { name: 'Bulk Operations', link: '/Bulk' },
                { name: 'Database Backup', link: '/Backup' },
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

          <Mybutton label="Subscribers" onClick={handleClick} expand={open1} />

          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {SubscribersMenuSms.map((value, index) => {
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

          <Mybutton label="Live Streams" onClick={handleClick} expand={open2} />

          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Channel Categories', link: '/ChannelCategories' },
                { name: 'Channel Streams', link: '/ChannelStreams' },
                { name: 'Manage Package', link: '/ManagePackageStreams' },
                { name: 'EPG', link: '/EPG' },
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

          <Mybutton label="Video On Demand" onClick={handleClick} expand={open3} />

          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'VOD Categories', link: '/VODCategories' },
                { name: 'VOD Providers', link: '/VODProviders' },
                { name: 'VOD Media', link: '/VODMedia' },
                { name: 'Manage package (VOD)', link: '/VODManagePackage' },
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

          <Mybutton label="Series On Demand" onClick={handleClick} expand={open4} />

          <Collapse in={open4} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'SOD Categories', link: '/SODCategories' },
                { name: 'SOD Providers', link: '/SODProviders' },
                { name: 'SOD Media', link: '/SODMedia' },
                { name: 'Manage Package(SOD)', link: 'SODManagePackage' },
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

          <Mybutton label="Music On Demand" onClick={handleClick} expand={open5} />

          <Collapse in={open5} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'MOD Categories', link: '/MODCategories' },
                { name: 'MOD Media', link: '/MODMedia' },
                { name: 'Manage Package(MOD)', link: 'MODManagePackage' },
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

          {/* <Mybutton label="OTT" onClick={handleClick} expand={open9} />

          <Collapse in={open9} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'OTT Providers', link: '/OTTProviders' },
                { name: 'OTT Categories', link: '/OTTCategories' },
                { name: 'OTT Channels', link: '/OTTChannel' },
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

          <Mybutton label="App TV" onClick={handleClick} expand={open10} />

          <Collapse in={open10} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'App TV Categories', link: '/AppTVCategories' },
                { name: 'App TV Providers', link: '/AppTVProviders' },
                { name: 'App TV Media', link: '/AppTVMedia' },
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


          <Mybutton label="App Store" onClick={handleClick} expand={open11} />

          <Collapse in={open11} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'App Store Categories', link: '/AppStoreCategory' },
                { name: 'App Upload', link: '/ListAppStoreUpload' },
                // { name: 'App TV Media', link: '/AppTVMedia' },
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
          </Collapse> */}


          <Mybutton label="Statistics" onClick={handleClick} expand={open6} />

          <Collapse in={open6} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Online Users', link: '/OnlineUsers' },
                { name: 'Triggers', link: '/Triggers' },
                { name: 'Channel views', link: '/ChannelViews' },
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


          <Mybutton label="Fingerprint" onClick={handleClick} expand={open7} />

          <Collapse in={open7} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Mail', link: '/Mail' },
                { name: 'Fingerprint', link: '/Fingerprint' },
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


        </div>
      )}


      {Role === 'audit' && (
        <div>
          <NavLink to="/" className="linkitem">
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
                { name: 'Admin Users ', link: '/AdminUsers' },
                { name: 'System Information', link: '/SystemInformation' },
                { name: 'App Updates', link: '/AppUpdates' },
                { name: 'Advertisments', link: '/Advertisments' },
                { name: 'Bulk Operations', link: '/Bulk' },
                { name: 'Database Backup', link: '/Backup' },
                { name: 'Web Url', link: '/listweburl' },
                { name: 'DRM White List', link: '/DRMWaitlist' },
              ].map((value, index) => {
                return (
                  <ListItem
                    buttons
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

          <Mybutton label="Subscribers" onClick={handleClick} expand={open1} />

          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {SubscribersMenuSms.map((value, index) => {
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

          <Mybutton label="Live Streams" onClick={handleClick} expand={open2} />
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Channel Categories', link: '/ChannelCategories' },
                { name: 'Channel Streams', link: '/ChannelStreams' },
                { name: 'Manage Package', link: '/ManagePackageStreams' },
                { name: 'EPG', link: '/EPG' },
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

          <Mybutton label="Video On Demand" onClick={handleClick} expand={open3} />
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'VOD Categories', link: '/VODCategories' },
                { name: 'VOD Providers', link: '/VODProviders' },
                { name: 'VOD Language', link: '/VODLanguage' },
                { name: 'VOD Genres', link: '/VODGenre' },
                { name: 'VOD Media', link: '/VODMedia' },
                { name: 'Manage package (VOD)', link: '/VODManagePackage' },
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

          <Mybutton label="Series On Demand" onClick={handleClick} expand={open4} />
          <Collapse in={open4} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'SOD Categories', link: '/SODCategories' },
                { name: 'SOD Providers', link: '/SODProviders' },
                { name: 'SOD Language', link: '/SODLanguage' },
                { name: 'SOD Genres', link: '/SODGenre' },
                { name: 'SOD Media', link: '/SODMedia' },
                { name: 'Manage Package(SOD)', link: 'SODManagePackage' },
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

          <Mybutton label="Music On Demand" onClick={handleClick} expand={open5} />
          <Collapse in={open5} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'MOD Categories', link: '/MODCategories' },
                { name: 'MOD Media', link: '/MODMedia' },
                { name: 'Manage Package(MOD)', link: 'MODManagePackage' },
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

          <Mybutton label="Statistics" onClick={handleClick} expand={open6} />
          <Collapse in={open6} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Online Users', link: '/OnlineUsers' },
                { name: 'Triggers', link: '/Triggers' },
                { name: 'Channel views', link: '/ChannelViews' },
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

          <Mybutton label="Fingerprint" onClick={handleClick} expand={open7} />
          <Collapse in={open7} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Mail', link: '/Mail' },
                { name: 'Fingerprint', link: '/Fingerprint' },
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

          <Mybutton label="Reports and Logs" onClick={handleClick} expand={open8} />
          <Collapse in={open8} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Reports', link: '/Reports' },
                { name: 'Logs', link: '/Logs' },
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

        </div>
      )}

      {Role === 'mso' && (
        <div>
          <NavLink to="/" className="linkitem">
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
                { name: 'Admin Users ', link: '/AdminUsers' },
                { name: 'System Information', link: '/SystemInformation' },
                { name: 'App Updates', link: '/AppUpdates' },
                { name: 'Advertisments', link: '/Advertisments' },
                { name: 'Bulk Operations', link: '/Bulk' },
                { name: 'Database Backup', link: '/Backup' },
                { name: 'Web Url', link: '/listweburl' },
                { name: 'DRM White List', link: '/DRMWaitlist' },
              ].map((value, index) => {
                return (
                  <ListItem
                    buttons
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

          <Mybutton label="Subscribers" onClick={handleClick} expand={open1} />
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {SubscribersMenuSms.map((value, index) => {
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

          <Mybutton label="Live Streams" onClick={handleClick} expand={open2} />
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Channel Categories', link: '/ChannelCategories' },
                { name: 'Channel Streams', link: '/ChannelStreams' },
                { name: 'Manage Package', link: '/ManagePackageStreams' },
                { name: 'EPG', link: '/EPG' },
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

          <Mybutton label="Video On Demand" onClick={handleClick} expand={open3} />
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'VOD Categories', link: '/VODCategories' },
                { name: 'VOD Providers', link: '/VODProviders' },
                { name: 'VOD Language', link: '/VODLanguage' },
                { name: 'VOD Genres', link: '/VODGenre' },
                { name: 'VOD Media', link: '/VODMedia' },
                { name: 'Manage package (VOD)', link: '/VODManagePackage' },
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

          <Mybutton label="Series On Demand" onClick={handleClick} expand={open4} />
          <Collapse in={open4} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'SOD Categories', link: '/SODCategories' },
                { name: 'SOD Providers', link: '/SODProviders' },
                { name: 'SOD Language', link: '/SODLanguage' },
                { name: 'SOD Genres', link: '/SODGenre' },
                { name: 'SOD Media', link: '/SODMedia' },
                { name: 'Manage Package(SOD)', link: 'SODManagePackage' },
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

          <Mybutton label="Music On Demand" onClick={handleClick} expand={open5} />
          <Collapse in={open5} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'MOD Categories', link: '/MODCategories' },
                { name: 'MOD Media', link: '/MODMedia' },
                { name: 'Manage Package(MOD)', link: 'MODManagePackage' },
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

          <Mybutton label="OTT" onClick={handleClick} expand={open9} />
          <Collapse in={open9} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'OTT Providers', link: '/OTTProviders' },
                { name: 'OTT Categories', link: '/OTTCategories' },
                { name: 'OTT Channels', link: '/OTTChannel' },
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

          <Mybutton label="App TV" onClick={handleClick} expand={open10} />
          <Collapse in={open10} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'App TV Categories', link: '/AppTVCategories' },
                { name: 'App TV Providers', link: '/AppTVProviders' },
                { name: 'App TV Media', link: '/AppTVMedia' },
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

          <Mybutton label="Popular TV" onClick={handleClick} expand={open10} />
          <Collapse in={open12} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Popular TV Categories', link: '/PopularTVCategories' },
                { name: 'Popular TV Providers', link: '/PopularTVProviders' },
                { name: 'Popular TV Media', link: '/PopularTVMedia' },
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

          <Mybutton label="App Store" onClick={handleClick} expand={open11} />
          <Collapse in={open11} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'App Store Categories', link: '/AppStoreCategory' },
                { name: 'App Upload', link: '/ListAppStoreUpload' },
                // { name: 'App TV Media', link: '/AppTVMedia' },
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


          <Mybutton label="Statistics" onClick={handleClick} expand={open6} />
          <Collapse in={open6} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Online Users', link: '/OnlineUsers' },
                { name: 'Triggers', link: '/Triggers' },
                { name: 'Channel views', link: '/ChannelViews' },
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


          <Mybutton label="Fingerprint" onClick={handleClick} expand={open7} />
          <Collapse in={open7} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Mail', link: '/Mail' },
                { name: 'Fingerprint', link: '/Fingerprint' },
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

          <Mybutton label="Reports and Logs" onClick={handleClick} expand={open8} />
          <Collapse in={open8} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              style={{ backgroundColor: '#212121' }}
            >
              {[
                { name: 'Reports', link: '/Reports' },
                { name: 'Logs', link: '/Logs' },
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

        </div>
      )}
    </List>
  );
}
