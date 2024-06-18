import { Button, Container, CssBaseline, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from './styles';

export default function ListContactInfo() {
  const classes = useStyles();
  const history = useHistory();
  const [AppTVCategory, setAppTVCategory] = useState([]);

  const columns = [
    { field: 'contact_person_name', title: 'Contact Person Name' },
    { field: 'contact_mail', title: 'Contact Mail' },
    { field: 'contact_person_number', title: 'Contact Person Number' },
    { field: 'customer_care_number', title: 'Customer_care Number' },
    {
      field: 'createdAt',
      title: 'Created At',
      render: rowData => moment(rowData.createdAt).format('YYYY-MM-DD HH:MM'),
    },
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
              history.push('EditContactInfo', {
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
    apis.getContactInfo().then(res => {
      setAppTVCategory(res?.data);
    });
  };

  useEffect(() => {
    getPopularTVCategories();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.id);
    apis.deleteContactInfo(JSON.stringify(filter)).then(res => {
      toastMessage('Successfully Deleted');
      getPopularTVCategories();
    });
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
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
                  history.push('/AddContactInfo');
                }}
              >
                Add Contact Info
              </Button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <MaterialTables
              title={'Contact Info'}
              columns={columns}
              data={AppTVCategory}
              deleteHandler={deleteHandler}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
