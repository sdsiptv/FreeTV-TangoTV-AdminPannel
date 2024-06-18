import { Button, Container, CssBaseline, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GREEN, RED } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from './styles';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';
import { toast } from 'react-toastify';

export default function ChannelStatus() {
  const classes = useStyles();
  const history = useHistory();
  const [SODCategory, setSODCategory] = useState([]);

  const columns = [
    { field: 'channelNumber', title: 'Channel Number' },
    { field: 'name', title: 'Name' },
    { field: 'watchedCount', title: 'Watch Count' },
    { field: 'activeCount', title: 'Active Count' },
    { field: 'uptime', title: 'Uptime' },
    { field: 'status', title: 'Status' },
    { field: 'bitrate', title: 'BitRate' },
  ];

  const getEZserverChannelStatus = () => {
    try {
      apis.getEZserverChannelStatus().then(res => {
        setSODCategory(res);
      });
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };
  

  useEffect(() => {
    getEZserverChannelStatus();
  }, []);

  
  const channelRefresh = () => {
    try {
      apis.getChannelRefresh().then(res => {
        toastMessage('Channel Refresh Successfully');
        // toast('Channel Refresh Successfully', {
        //   position: 'top-right',
        //   autoClose: 2000,
        // });
        getEZserverChannelStatus();
      });
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };

  const channelRestart = () => {
      apis.getChannelRestart().then(res => {
        toastMessage('SDS Streamer Restart Successfully');
        // toast('SDS Streamer Restart Successfully', {
        //   position: 'top-right',
        //   autoClose: 2000,
        // });
         getEZserverChannelStatus();
      });
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="flex-end"></Grid>
          </Grid>
          <Grid item xs={6}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: RED }}
                onClick={() => {
                  channelRestart();
              }}
              >
                 SDS Streamer Restart
              </Button>
            </div>
            <p>Please Don't Restart Often</p>
          </Grid>
          <Grid item xs={6}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: GREEN }}
                onClick={() => {
                  channelRefresh();
              }}
              >
                 Channel Refresh
              </Button>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            </div>
          </Grid>

          <Grid item xs={12}>
            <DRMWaitListTable
              title={'Channel Status'}
              columns={columns}
              data={SODCategory}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
