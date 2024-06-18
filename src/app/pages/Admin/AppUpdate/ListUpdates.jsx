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
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import { failureNotification, toastMessage } from 'utils/helper';

import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import useStyles from 'styles/globalStyles';

export default function ListUpdates() {
  const classes = useStyles();
  const history = useHistory();
  const [AppUpdateData, setAppUpdateData] = useState([]);

  const columns = [
    { field: 'sno', title: 'SNO' },
    { field: 'app_version', title: 'App Version' },
    {
      field: 'created_at',
      title: 'Uploaded At',
    },

    {
      field: 'actions',
      title: 'Actions',
      sorting: false,
      render: rowData => (
        <>
          <Tooltip title={rowData?.enabled === 1 ? 'Disable' : 'Enable'}>
            <IconButton
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => {
                editHandler(rowData);
              }}
            >
              {rowData?.enabled === 1 ? (
                <VisibilityOffIcon />
              ) : (
                <VisibilityIcon />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Download">
            <IconButton
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => {
                window.location.href = rowData.url;
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
      .getAppUpdate()
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
    let filter = data.map(obj => obj.sno);
    apis
      .deleteAppUpdate(JSON.stringify(filter))
      .then(res => {
        toastMessage('Successfully deleted');
        getAppUpdates();
      })
      .catch(err => {
        failureNotification('Network error');
      });
  };

  const editHandler = data => {
    apis
      .editAppUpdate(data?.sno, data?.enabled === 1 ? 0 : 1)
      .then(res => {
        toastMessage('Successfully Updated');
        getAppUpdates();
      })
      .catch(err => {
        failureNotification('Network error');
      });
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: GREEN }}
                onClick={() => {
                  history.push('/AddAppUpdates');
                }}
              >
                App Updates
              </Button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <MaterialTables
              title={'App Updates'}
              columns={columns}
              data={AppUpdateData}
              deleteHandler={deleteHandler}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
