import { Button, Container, CssBaseline, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from '../styles';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

export default function ViewSystemUptime() {
  const classes = useStyles();
  const history = useHistory();
  const [ViewSystemUptime, setViewSystemUptime] = useState([]);

  const column = [
    { field: 'uptime', title: 'Uptime' },
    { field: 'uptimesec', title: 'Uptime Sec' },
  ];

  const getViewSystemUptime = () => {
    try {
      apis.getViewSystemUptime().then(res => {
        setViewSystemUptime(res);
      });
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };
  

  useEffect(() => {
    getViewSystemUptime();
  }, []);

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Grid container spacing={1} alignItems="flex-end"></Grid>
          </Grid>
          <Grid item xs={3}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            </div>
          </Grid>

          <Grid item xs={12}>
            <DRMWaitListTable
              title={'View System Uptime'}
              columns={column}
              data={ViewSystemUptime}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
