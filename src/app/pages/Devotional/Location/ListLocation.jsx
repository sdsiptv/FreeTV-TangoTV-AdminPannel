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

export default function ListLocation() {
  const classes = useStyles();
  const history = useHistory();
  const [Location, setLocation] = useState([]);
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
              history.push('EditLocation', {
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

  const getLocation = () => {
    apis
      .getLocation()
      .then(res => {
        setLocation(res?.data);
      })
      .catch(() => {
        failureNotification('Network error');
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.location_id);
    apis
      .deleteLocation(JSON.stringify(filter))
      .then(res => {
        toastMessage('Successfully deleted');
        getLocation();
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
                    history.push('/AddLocation');
                  }}
                >
                  Add Location
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <MaterialTables
                title={'LOCATIONS'}
                columns={columns}
                data={Location}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      
    </Container>
  );
}
