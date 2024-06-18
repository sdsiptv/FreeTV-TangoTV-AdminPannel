import {
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core';
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

export default function MODMedia() {
  const classes = useStyles();
  const history = useHistory();
  const [modMedia, setModMedia] = useState([]);
  const Role = localStorage.getItem("roles");

  const columns = [
    {
      field: 'image',
      title: 'Logo',
      render: rowData =>
        typeof rowData.image == 'string' ? (
          <img src={rowData.image} alt={Error} height={30} width={40} />
        ) : null,
    },
    { field: 'title', title: 'Title' },
    { field: 'director', title: 'Director' },
    { field: 'year', title: 'Year' },
    { field: 'country', title: 'Country' },
    { field: 'enabled', title: 'Enable' },
    {
      field: 'actions',
      title: 'Actions',
      sorting: false,
      render: rowData => (
        <Tooltip title="Edit">
          <IconButton
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => {
              history.push('EditMODMedia', {
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

  const getModMedias = () => {
    apis.getModMedia().then(res => {
      setModMedia(res?.data);
    });
  };

  useEffect(() => {
    getModMedias();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.mod_id);
    apis.deleteModMedia(filter).then(res => {
      toastMessage('Successfully deleted');
      getModMedias();
    });
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
                    history.push('/AddMODMedia');
                  }}
                >
                  Add Media
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <MaterialTables
                title={'MOD Media'}
                columns={columns}
                data={modMedia}
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
                    history.push('/AddMODMedia');
                  }}
                >
                  Add Media
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'MOD Media'}
                columns={columns}
                data={modMedia}
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
                    history.push('/AddMODMedia');
                  }}
                >
                  Add Media
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'MOD Media'}
                columns={columns}
                data={modMedia}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
}
