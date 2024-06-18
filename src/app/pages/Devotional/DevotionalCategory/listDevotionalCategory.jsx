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

export default function ListDevotionalCategory() {
  const classes = useStyles();
  const history = useHistory();
  const [DEVCategory, setDEVCategory] = useState([]);
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
              history.push('EditDEVCategory', {
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

  const getDEVOTIONALCategory = () => {
    apis
      .getDEVOTIONALCategory()
      .then(res => {
        setDEVCategory(res?.data);
      })
      .catch(() => {
        failureNotification('Network error');
      });
  };

  useEffect(() => {
    getDEVOTIONALCategory();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.category_id);
    apis
      .deleteDEVOTIONALCategory(JSON.stringify(filter))
      .then(res => {
        toastMessage('Successfully deleted');
        getDEVOTIONALCategory();
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
                    history.push('/AddDEVCategory');
                  }}
                >
                  Add CATEGORY
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <MaterialTables
                title={'DEVOTIONAL CATEGORIES'}
                columns={columns}
                data={DEVCategory}
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
                    history.push('/AddDEVCategory');
                  }}
                >
                  Add CATEGORY
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'DEVOTIONAL CATEGORIES'}
                columns={columns}
                data={DEVCategory}
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
                    history.push('/AddDEVCategory');
                  }}
                >
                  Add CATEGORY
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'DEVOTIONAL CATEGORIES'}
                columns={columns}
                data={DEVCategory}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
}
