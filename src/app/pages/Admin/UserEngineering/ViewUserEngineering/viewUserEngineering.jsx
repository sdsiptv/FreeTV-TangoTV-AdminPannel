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
import useStyles from 'styles/globalStyles';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

export default function ViewListUserEngineering() {
  const classes = useStyles();
  const history = useHistory();
  const [AppTVCategory, setAppTVCategory] = useState([]);
  const Role = localStorage.getItem("roles")

  const columns = [
    { field: 'user_id', title: 'User ID' },
    { field: 'area_code', title: 'Area Code' },
    { field: 'audit_mode', title: 'Audit Mode' },
    { field: 'low_profile_mode', title: 'Low Profile Mode' },
    { field: 'stream_type', title: 'Stream Type' },
    { field: 'bootup', title: 'BootUp' },
    { field: 'channel_change', title: 'Channel Change' },
    { field: 'first_play', title: 'First Play' },
    { field: 'language', title: 'Language' },
    {
      field: 'createdAt',
      title: 'Created At',
      render: rowData => moment(rowData.createdAt).format('YYYY-MM-DD HH:MM'),
    },
    // { field: 'enabled', title: 'Enabled V' },
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
              history.push('EditUserEngineering', {
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
    apis.getUserEngineering().then(res => {
      setAppTVCategory(res?.data);
    });
  };

  useEffect(() => {
    getPopularTVCategories();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.id);
    apis.deleteeUserEngineering(JSON.stringify(filter)).then(res => {
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
                    history.push('/AddUserEngineering');
                  }}
                >
                  Add User Engineering
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <MaterialTables
                title={'User Engineering'}
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
                    history.push('/AddUserEngineering');
                  }}
                >
                  Add User Engineering
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'User Engineering'}
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
