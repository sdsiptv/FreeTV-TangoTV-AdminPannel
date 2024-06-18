import { Button, Container, CssBaseline, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import SingleMaterialTables from 'app/components/SingleDeleteTable2';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GREEN } from 'utils/constant/color';
import useStyles from './styles';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

function AdminUserManage() {
  const classes = useStyles();
  let history = useHistory();
  const [userData, setUserData] = useState([]);
  const Role = localStorage.getItem("roles")
  const columns = [
    {
      title: 'User ID',
      field: 'userid',
    },
    { field: 'name', title: 'Name' },
    { field: 'email', title: 'Email' },
    { field: 'phone', title: 'Phone' },
    { field: 'country', title: 'Country' },
    { field: 'website', title: 'Website' },
    { field: 'company', title: 'Company' },
    { field: 'roles', title: 'Role' },
    {
      field: 'enabled',
      title: 'Enabled',
      cellStyle: {
        textAlign: 'center',
      },
    },
    {
      title: 'Actions',
      sorting: false,
      render: rowData => (
        <Tooltip title="Edit">
          <IconButton
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => {
              history.push('/EditUser', {
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

  const getAdminUsers = () => {
    apis.getAdminUser().then(res => {
      setUserData(res?.data);
    });
  };

  useEffect(() => {
    getAdminUsers();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.userid);
    if (filter.length > 0) {
      apis.deleteAdminUser(JSON.stringify(filter)).then(res => {
        toast('Successfully deleted', {
          position: 'top-right',
          autoClose: 2000,
          pauseOnFocusLoss: false,
        });
        getAdminUsers();
      });
    }
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
                    history.push('/NewUser');
                  }}
                >
                  Add User
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <MaterialTables
                title={'Admin Users'}
                columns={columns}
                data={userData}
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
                    history.push('/NewUser');
                  }}
                >
                  Add User
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'Admin Users'}
                columns={columns}
                data={userData}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </Container>


  );
}
export default AdminUserManage;
