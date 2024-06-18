import { Button, Container, CssBaseline, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from './styles';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

export default function DRMWaitList() {
  const classes = useStyles();
  const history = useHistory();
  const [SODCategory, setSODCategory] = useState([]);

  const columns = [
    { field: 'serialNumber', title: 'S No' },
    { field: 'mac_id', title: 'Mac ID' },
  ];

  // const getWaitlist = () => {
  //   apis.getWaitlist().then(res => {
  //     setSODCategory(res?.data);
  //   });
  // };

  const getWaitlist = () => {
    apis.getWaitlist().then(res => {
      const waitlistData = res?.data;
  
      const dataWithSerialNumbers = waitlistData.map((item, index) => ({
        serialNumber: index + 1,
        mac_id: item.mac_id,
      }));
  
      setSODCategory(dataWithSerialNumbers);
    });
  };

  useEffect(() => {
    getWaitlist();
  }, []);

  // const deleteHandler = data => {
  //   let filter = data.map(obj => obj.categoryId);
  //   apis.deleteSodCategory(JSON.stringify(filter)).then(res => {
  //     toastMessage('Successfully Deleted');
  //     getWaitlist();
  //   });
  // };

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
                  history.push('/AddDRMWaitlist');
                }}
              >
                Add DRM List
              </Button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <DRMWaitListTable
              title={'DRM White List Categories'}
              columns={columns}
              data={SODCategory}
              // deleteHandler={deleteHandler}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
