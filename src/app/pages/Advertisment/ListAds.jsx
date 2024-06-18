import { Container, CssBaseline, Grid, Button } from '@material-ui/core';
import apis from 'app/api';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';
import MaterialTables from 'app/components/MaterialTables';
import SingleMaterialTables from 'app/components/SingleDeleteTable2';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from 'styles/globalStyles';
import { GREEN } from 'utils/constant/color';
import { failureNotification, toastMessage } from 'utils/helper';

function ListAds() {
  const history = useHistory();
  const Role = localStorage.getItem("roles");
  const [Advertisment, setAdvertisment] = useState([]);
  const classes = useStyles();

  const columns = [
    { field: 'position', title: 'Position' },
    { field: 'duration', title: 'Duration' },
    { field: 'adCount', title: 'Ad Count' },
    { field: 'userId', title: 'User ID' },
    { field: 'areacode', title: 'Area Code' },
    {
      field: 'createdAt',
      title: 'Created At',
      render: rowData => moment(rowData.createdAt).format('YYYY-MM-DD HH:MM'),
    },
  ];

  const getAdvertisement = () => {
    apis
      .getAdvertisment()
      .then(response => {
        setAdvertisment(response?.data);
      })
      .catch(error => {
        failureNotification('Network error');
      });
  };

  useEffect(() => {
    getAdvertisement();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.sno);

    apis.deleteAdvertisement(JSON.stringify(filter)).then(res => {
      toastMessage('Successfully Deleted');
      getAdvertisement();
    });
  };

  return (
    <div>
      <div>
        <Container>
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
                      style={{ backgroundColor: GREEN }}
                      varient="contained"
                      onClick={() => {
                        history.push('/AddAdvertisments');
                      }}
                    >
                      Add Advertisement
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <MaterialTables
                    title={'Advertisment'}
                    columns={columns}
                    data={Advertisment}
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
                      style={{ backgroundColor: GREEN }}
                      varient="contained"
                      onClick={() => {
                        history.push('/AddAdvertisments');
                      }}
                    >
                      Add Advertisement
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <DRMWaitListTable
                    title={'Advertisment'}
                    columns={columns}
                    data={Advertisment}
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
                      style={{ backgroundColor: GREEN }}
                      varient="contained"
                      onClick={() => {
                        history.push('/AddAdvertisments');
                      }}
                    >
                      Add Advertisement
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <DRMWaitListTable
                    title={'Advertisment'}
                    columns={columns}
                    data={Advertisment}
                    deleteHandler={deleteHandler}
                  />
                </Grid>
              </Grid>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default ListAds;
