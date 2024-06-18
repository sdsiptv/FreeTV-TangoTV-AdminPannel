import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SendIcon from '@material-ui/icons/Send';
import TuneIcon from '@material-ui/icons/Tune';
import TvIcon from '@material-ui/icons/Tv';
import VideocamIcon from '@material-ui/icons/Videocam';
import React from 'react';
import './Sidebar.css';

const Mybutton = props => {
  return (
    <ListItem
      button
      onClick={() => {
        props.onClick(props.label);
      }}
      className="listItem"
    >
      <ListItemIcon>
        {props.label === 'Dasboard' ? (
          <DashboardIcon style={{ color: 'white' }} />
        ) : props.label === 'Administrator' ? (
          <TuneIcon style={{ color: 'white' }} />
        ) : props.label === 'Subscriber manage' ? (
          <PersonAddIcon style={{ color: 'white' }} />
        ) : props.label === 'Live Streams' ? (
          <LiveTvIcon style={{ color: 'white' }} />
        ) : props.label === 'Video On Demand' ? (
          <VideocamIcon style={{ color: 'white' }} />
        ) : props.label === 'Series On Demand' ? (
          <TvIcon style={{ color: 'white' }} />
        ) : props.label === 'Music On Demand' ? (
          <MusicVideoIcon style={{ color: 'white' }} />
        ) : props.label === 'App TV' ? (
          <TvIcon style={{ color: 'white' }} />
        ) : props.label === 'Statistics' ? (
          <BarChartIcon style={{ color: 'white' }} />
        ) : props.label === 'Fingerprint' ? (
          <FingerprintIcon style={{ color: 'white' }} />
        ) : (
          <SendIcon style={{ color: 'white' }} />
        )}
      </ListItemIcon>
      <ListItemText primary={props.label} />
      {props.expand ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
  );
};

export default Mybutton;
