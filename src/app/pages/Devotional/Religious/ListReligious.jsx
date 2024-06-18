import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  CssBaseline,
  Container,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import { failureNotification, toastMessage } from 'utils/helper';
import EditIcon from '@material-ui/icons/Edit';
import SingleMaterialTables from 'app/components/SingleDeleteTable2';

import useStyles from 'styles/globalStyles';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

export default function ListReligious() {
  const classes = useStyles();
  const history = useHistory();
  const [Religious, setReligious] = useState([]);
  const Role = localStorage.getItem("roles");

  const columns = [
    { field: 'name', title: 'Name' },
    { field: 'position', title: 'Position' },
    { field: 'enabled', title: 'Enabled ' },
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
              history.push('EditReligious', {
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

  const getReligious = () => {
    apis
      .getReligious()
      .then(res => {
        setReligious(res?.data);
      })
      .catch(() => {
        failureNotification('Network error');
      });
  };

  useEffect(() => {
    getReligious();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.religion_id);
    apis
      .deleteReligious(JSON.stringify(filter))
      .then(res => {
        toastMessage('Successfully deleted');
        getReligious();
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
                    history.push('/AddReligious');
                  }}
                >
                  Add Religious
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <MaterialTables
                title={'RELIGIOUS'}
                columns={columns}
                data={Religious}
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
                    history.push('/AddReligious');
                  }}
                >
                  Add Religious
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'RELIGIOUS'}
                columns={columns}
                data={Religious}
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
                    history.push('/AddReligious');
                  }}
                >
                  Add Religious
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'RELIGIOUS'}
                columns={columns}
                data={Religious}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
}
