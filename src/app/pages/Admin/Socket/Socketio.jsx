import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  CssBaseline,
  Container,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import apis from 'app/api';
import { failureNotification, toastMessage } from 'utils/helper';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import useStyles from 'styles/globalStyles';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

export default function SocketIO() {
  const classes = useStyles();
  const history = useHistory();
  const [AppUpdateData, setAppUpdateData] = useState([]);

  const columns = [
    { field: 'id', title: 'SNO' },
    {
      field: 'created_at',
      title: 'Uploaded At',
    },

    {
      field: 'actions',
      title: 'Main File',
      sorting: false,
      render: rowData => (
        <>

          <Tooltip title="Download">
            <IconButton
              variant="contained"
              size="small"
              color="secondary"
            >
              <CloudDownloadIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const getAppUpdates = () => {
    apis
      .getBackup()
      .then(res => {
        setAppUpdateData(res?.data);
      })
      .catch(() => {
        failureNotification('Network error');
      });
  };

  useEffect(() => {
    getAppUpdates();
  }, []);



  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />

        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'Database Backup'}
                columns={columns}
                data={AppUpdateData}
              />
            </Grid>
          </Grid>
        </div>
      
    </Container>
  );
}
