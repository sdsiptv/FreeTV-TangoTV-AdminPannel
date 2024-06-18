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
import { GREEN } from 'utils/constant/color';
import SingleMaterialTables from 'app/components/SingleDeleteTable2';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import { failureNotification, toastMessage } from 'utils/helper';

import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import useStyles from 'styles/globalStyles';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

export default function Backup() {
  const classes = useStyles();
  const history = useHistory();
  const [AppUpdateData, setAppUpdateData] = useState([]);
  const Role = localStorage.getItem("roles")

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
              onClick={() => {
                window.location.href = rowData.sdsiptv_db;
              }}
            >
              <CloudDownloadIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    {
      field: 'actions',
      title: 'Log File',
      sorting: false,
      render: rowData => (
        <>

          <Tooltip title="Download">
            <IconButton
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => {
                window.location.href = rowData.sdsiptv_log_db;
              }}
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


  const deleteHandler = data => {
    let filter = data.map(obj => obj.id);
    apis
      .deleteBackup(JSON.stringify(filter))
      .then(res => {
        toastMessage('Successfully deleted');
        getAppUpdates();
      })
      .catch(err => {
        failureNotification('Network error');
      });
  };

  //   const editHandler = data => {
  //     apis
  //       .editAppUpdate(data?.sno, data?.enabled === 1 ? 0 : 1)
  //       .then(res => {
  //         toastMessage('Successfully Updated');
  //         getAppUpdates();
  //       })
  //       .catch(err => {
  //         failureNotification('Network error');
  //       });
  //   };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      {Role === 'admin' && (
        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {/* <Button
                     variant="contained"
                     style={{ backgroundColor: GREEN }}
                     onClick={() => {
                       history.push('/AddAppUpdates');
                     }}
                   >
                     Backup
                   </Button> */}
              </div>
            </Grid>

            <Grid item xs={12}>
              <MaterialTables
                title={'Database Backup'}
                columns={columns}
                data={AppUpdateData}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}

      {Role === 'maintenance' && (
        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {/* <Button
                     variant="contained"
                     style={{ backgroundColor: GREEN }}
                     onClick={() => {
                       history.push('/AddAppUpdates');
                     }}
                   >
                     Backup
                   </Button> */}
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'Database Backup'}
                columns={columns}
                data={AppUpdateData}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}

    </Container>
  );
}
