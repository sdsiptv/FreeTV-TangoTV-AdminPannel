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
import useStyles from './styles';
import SingleMaterialTables from 'app/components/SingleDeleteTable2';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

export default function AppTVMedia() {
  const classes = useStyles();
  const history = useHistory();
  const [appTVMedia, setAppTVMedia] = useState([]);
  const Role = localStorage.getItem("roles");

  const columns = [
    {
      field: 'image',
      title: 'Logo',
      render: rowData =>
        typeof rowData.image == 'string' ? (
          <img src={rowData.image} alt="" width={40} height={30} />
        ) : null,
    },
    { field: 'title', title: 'Title' },
    { field: 'channel_id', title: 'Channel Id' },
    { field: 'director', title: 'Director' },
    { field: 'year', title: 'Year' },
    { field: 'description', title: 'Description' },
    { field: 'country', title: 'Country' },
    { field: 'enabled', title: 'Enabled' },
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
              history.push('EditAppTVMedia', {
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

  const getAppTVMedia = () => {
    apis.getAppTVMedia().then(res => {
      setAppTVMedia(res?.data);
    });
  };

  useEffect(() => {
    getAppTVMedia();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.apptv_id);
    if (filter.length > 0) {
      apis.deleteAppTVMedia(filter).then(res => {
        toastMessage('Successfully deleted');
        getAppTVMedia();
      });
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      {Role === 'admin' && (
        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <Grid container spacing={1} alignItems="flex-end"></Grid>
            </Grid>
            <Grid item xs={2}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    history.push('/AddAppTVMedia');
                  }}
                >
                  ADD MEDIA
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <MaterialTables
                title={'App TV Media'}
                columns={columns}
                data={appTVMedia}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}

      {Role === 'maintenance' && (
        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <Grid container spacing={1} alignItems="flex-end"></Grid>
            </Grid>
            <Grid item xs={2}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    history.push('/AddAppTVMedia');
                  }}
                >
                  ADD MEDIA
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'App TV Media'}
                columns={columns}
                data={appTVMedia}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}

      {Role === 'maintenance2' && (
        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <Grid container spacing={1} alignItems="flex-end"></Grid>
            </Grid>
            <Grid item xs={2}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    history.push('/AddAppTVMedia');
                  }}
                >
                  ADD MEDIA
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'App TV Media'}
                columns={columns}
                data={appTVMedia}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
}
