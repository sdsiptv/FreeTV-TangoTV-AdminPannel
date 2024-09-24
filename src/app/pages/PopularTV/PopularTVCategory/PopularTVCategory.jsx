import { Button, Container, CssBaseline, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import SingleMaterialTables from 'app/components/SingleDeleteTable2';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from './styles';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

export default function PopularTVCategories() {
  const classes = useStyles();
  const history = useHistory();
  const [AppTVCategory, setAppTVCategory] = useState([]);
  const Role = localStorage.getItem("roles");

  const columns = [
    { field: 'categoryName', title: 'Name' },
    { field: 'categoryId', title: 'Category ID' },
    { field: 'position', title: 'Position' },
    { field: 'populartvCount', title: 'Popular TV Count' },
    {
      field: 'createdAt',
      title: 'Created At',
      render: rowData => moment(rowData.createdAt).format('YYYY-MM-DD HH:MM'),
    },
    { field: 'enabled', title: 'Enabled' },
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
              history.push('EditPopularTVCategories', {
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

  const getPopularTVCategories = () => {
    apis.getPopularTVCategory().then(res => {
      setAppTVCategory(res?.data);
    });
  };

  useEffect(() => {
    getPopularTVCategories();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.categoryId);
    apis.deletePopularTVCategory(JSON.stringify(filter)).then(res => {
      toastMessage('Successfully Deleted');
      getPopularTVCategories();
    });
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      {Role === 'admin' && (
        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Grid container spacing={1} alignItems="flex-end"></Grid>
            </Grid>
            <Grid item xs={3}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    history.push('/AddPopularTVCategories');
                  }}
                >
                  Add Categories
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <MaterialTables
                title={'Popular Tv Categories'}
                columns={columns}
                data={AppTVCategory}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}

      {Role === 'maintenance' && (
        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Grid container spacing={1} alignItems="flex-end"></Grid>
            </Grid>
            <Grid item xs={3}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    history.push('/AddPopularTVCategories');
                  }}
                >
                  Add Categories
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'Popular Tv Categories'}
                columns={columns}
                data={AppTVCategory}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}

      {Role === 'maintenance2' && (
        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Grid container spacing={1} alignItems="flex-end"></Grid>
            </Grid>
            <Grid item xs={3}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    history.push('/AddPopularTVCategories');
                  }}
                >
                  Add Categories
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'Popular Tv Categories'}
                columns={columns}
                data={AppTVCategory}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
}
