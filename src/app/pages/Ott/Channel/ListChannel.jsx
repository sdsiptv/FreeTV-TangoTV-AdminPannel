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
import EditIcon from '@material-ui/icons/Edit';
import SingleMaterialTables from 'app/components/SingleDeleteTable2';

import useStyles from 'styles/globalStyles';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

export default function ListChannels() {
  const classes = useStyles();
  const history = useHistory();
  const [OTTChannels, setOTTChannels] = useState([]);
  const Role = localStorage.getItem("roles");

  const columns = [
    { field: 'ott_id', title: 'OTT ID' },
    { field: 'title', title: 'Title' },
    { field: 'genre', title: 'Genre' },
    { field: 'language', title: 'Language' },
    { field: 'platform', title: 'Platform' },
    { field: 'category_name', title: 'Category Name' },
    { field: 'season', title: 'Season' },
    { field: 'episode', title: 'Episode' },
    {
      field: 'actions',
      title: 'Actions',
      sorting: false,
      render: rowData => (
        <Tooltip title="Edit">
          <IconButton
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => {
              history.push('EditOTTChannels', {
                state: { data: rowData },
              });
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const getOTTChannels = () => {
    apis
      .getOTTChannel()
      .then(res => {
        setOTTChannels(res?.data);
      })
      .catch(() => {
        failureNotification('Network error');
      });
  };

  useEffect(() => {
    getOTTChannels();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.sno);
    apis
      .deleteOTTChannel(JSON.stringify(filter))
      .then(res => {
        toastMessage('Successfully deleted');
        getOTTChannels();
      })
      .catch(err => {
        failureNotification('Network error');
      });
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      {Role === 'admin' && (
        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    history.push('/AddOTTChannels');
                  }}
                >
                  Add Channel
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <MaterialTables
                title={'OTT Channels'}
                columns={columns}
                data={OTTChannels}
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
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    history.push('/AddOTTChannels');
                  }}
                >
                  Add Channel
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'OTT Channels'}
                columns={columns}
                data={OTTChannels}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}

      {Role === 'maintenance2' && (
        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    history.push('/AddOTTChannels');
                  }}
                >
                  Add Channel
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'OTT Channels'}
                columns={columns}
                data={OTTChannels}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
}
