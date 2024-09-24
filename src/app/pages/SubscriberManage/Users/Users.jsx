import {
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import apis from 'app/api';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toastMessage } from 'utils/helper';
import useStyles from './styles';
import { GREEN } from 'utils/constant/color';
import EditIcon from '@material-ui/icons/Edit';
import MaterialTables from 'app/components/MaterialTables';

export default function SubscriberUser() {
  const classes = useStyles();
  const Role = localStorage.getItem("roles")
  let isSelfSigned = process.env.REACT_APP_SELF;
  let history = useHistory();
  const columns = [
    { field: 'id', title: 'Customer ID' },
    { field: 'username', title: 'Username' },
    {
      field: 'email',
      title: 'Email',
    },
    { field: 'name', title: 'Name' },
    { field: 'phone', title: 'Phone' },
    { field: 'macs', title: 'MAC' },
    { field: 'areaCode', title: 'Area Code' },
    { field: 'country', title: 'Country' },
    { field: 'createdAt', title: 'createdAt' },
    { field: 'updateAt', title: 'updateAt' },
  ];

  if (isSelfSigned === 'true') {
    columns.push({
      title: 'Actions',
      sorting: false,
      render: rowData => (
        <Tooltip title="Edit">
          <IconButton
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => {
              history.push('/EditSubscriberUser', {
                state: { data: rowData },
              });
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    });
  }

  const getCustomerUsers = () => {
    apis.getCustomerUser().then(res => {
      setCustomerData(res?.data);
    });
  };

  useEffect(() => {
    getCustomerUsers();
  }, []);

  const [customerData, setCustomerData] = useState([]);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.id);
    if (filter.length > 0) {
      apis.deleteCustomerUser(JSON.stringify(filter)).then(res => {
        toastMessage('Successfully Deleted');
        getCustomerUsers();
      });
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      {Role === "admin" && (
        <div className={classes.paper}>
          <Grid container spacing={1}>
            {isSelfSigned === 'true' && (
              <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={() => {
                      history.push('/NewSubscriberUser');
                    }}
                  >
                    Add Subscriber
                  </Button>
                </div>
              </Grid>
            )}

            <Grid item xs={12}>
              {isSelfSigned === 'true' ? (
                <MaterialTables
                  title={'Subscribers'}
                  columns={columns}
                  data={customerData}
                  deleteHandler={deleteHandler}
                />
              ) : (
                <MaterialTable
                  title={'Subscribers'}
                  options={{
                    sorting: true,
                    search: true,
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 30],
                    headerStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                  columns={columns}
                  data={customerData}
                  style={{ padding: '0px 10px' }}
                />
              )}
            </Grid>
          </Grid>
        </div>
      )}

      {Role === "SmsUser" && (
        <div className={classes.paper}>
          <Grid container spacing={1}>
            {/* {isSelfSigned === 'true' && (
              <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={() => {
                      history.push('/NewSubscriberUser');
                    }}
                  >
                    Add Subscriber
                  </Button>
                </div>
              </Grid>
            )} */}

            <Grid item xs={12}>
              {isSelfSigned === 'true' ? (
                <MaterialTables
                  title={'Subscribers'}
                  columns={columns}
                  data={customerData}
                />
              ) : (
                <MaterialTable
                  title={'Subscribers'}
                  options={{
                    sorting: true,
                    search: true,
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 30],
                    headerStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                  columns={columns}
                  data={customerData}
                  style={{ padding: '0px 10px' }}
                />
              )}
            </Grid>
          </Grid>
        </div>
      )}

      {Role === "audit" && (
        <div className={classes.paper}>
          <Grid container spacing={1}>
            {/* {isSelfSigned === 'true' && (
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    history.push('/NewSubscriberUser');
                  }}
                >
                  Add Subscriber
                </Button>
              </div>
            </Grid>
          )} */}

            <Grid item xs={12}>
              {isSelfSigned === 'true' ? (
                <MaterialTables
                  title={'Subscribers'}
                  columns={columns}
                  data={customerData}
                />
              ) : (
                <MaterialTable
                  title={'Subscribers'}
                  options={{
                    sorting: true,
                    search: true,
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 30],
                    headerStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                  columns={columns}
                  data={customerData}
                  style={{ padding: '0px 10px' }}
                />
              )}
            </Grid>
          </Grid>
        </div>
      )}

      {Role === "mso" && (
        <div className={classes.paper}>
          <Grid container spacing={1}>
            {/* {isSelfSigned === 'true' && (
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    history.push('/NewSubscriberUser');
                  }}
                >
                  Add Subscriber
                </Button>
              </div>
            </Grid>
          )} */}

            <Grid item xs={12}>
              {isSelfSigned === 'true' ? (
                <MaterialTables
                  title={'Subscribers'}
                  columns={columns}
                  data={customerData}
                />
              ) : (
                <MaterialTable
                  title={'Subscribers'}
                  options={{
                    sorting: true,
                    search: true,
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 30],
                    headerStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                  columns={columns}
                  data={customerData}
                  style={{ padding: '0px 10px' }}
                />
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
}
