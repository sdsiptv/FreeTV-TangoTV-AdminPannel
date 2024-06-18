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

export default function MODCategories() {
  const classes = useStyles();
  const history = useHistory();
  const [MODCategory, setMODCategory] = useState([]);
  const Role = localStorage.getItem("roles");

  const columns = [
    { field: 'categoryName', title: 'Name' },
    { field: 'position', title: 'Position' },
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
              history.push('EditMODCategories', {
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

  const getModCategories = () => {
    apis.getModCategory().then(res => {
      setMODCategory(res?.data);
    });
  };

  useEffect(() => {
    getModCategories();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.categoryId);
    apis.deleteModCategory(JSON.stringify(filter)).then(res => {
      toastMessage('Successfully deleted');
      getModCategories();
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
                    history.push('/AddMODCategories');
                  }}
                >
                  Add Category
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <MaterialTables
                title={'MOD Categories'}
                columns={columns}
                data={MODCategory}
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
                    history.push('/AddMODCategories');
                  }}
                >
                  Add Category
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'MOD Categories'}
                columns={columns}
                data={MODCategory}
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
                    history.push('/AddMODCategories');
                  }}
                >
                  Add Category
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'MOD Categories'}
                columns={columns}
                data={MODCategory}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
}
