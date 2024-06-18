import { Button, Container, CssBaseline, Grid } from '@material-ui/core';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import useStyles from './styles';
import { toastMessage } from 'utils/helper';

export default function Fingerprint() {
  const classes = useStyles();
  const history = useHistory();
  const [fingerPrintData, setFingerPrintData] = useState([]);

  const columns = [
    { field: 'sno', title: 'SNO' },
    { field: 'resellerId', title: 'Reseller ID' },
    { field: 'userId', title: 'User ID' },
    { field: 'channelId', title: 'Channel ID' },
    {
      field: 'createdAt',
      title: 'Created At',
      render: rowData =>
        moment(rowData.createdAt)
          .subtract(330, 'minutes')
          .format('YYYY-MM-DD HH:mm:ss'),
    },
    { field: 'text', title: 'Text' },
    { field: 'timeInterval', title: 'timeInterval' },
    { field: 'repeatTimes', title: 'repeatTimes' },
    {
      field: 'fingerprint_type',
      title: 'FingerPrint',
    },
    // {
    //   field: 'actions',
    //   title: 'Actions',
    //   render: rowData => (
    //     <div>
    //       <Button
    //         type="button"
    //         variant="contained"
    //         color="secondary"
    //         onClick={() => {
    //           history.push('EditFingerprint', {
    //             state: { data: rowData },
    //           });
    //         }}
    //       >
    //         Details
    //       </Button>
    //     </div>
    //   ),
    // },
  ];

  const handleGetFingerPrint = () => {
    apis.getFingerprint().then(res => {
      setFingerPrintData(res.data);
    });
  };

  useEffect(() => {
    handleGetFingerPrint();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.sno);
    apis.DeleteFingerprint(JSON.stringify(filter)).then(res => {
      toastMessage('Successfully deleted');
      handleGetFingerPrint();
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
                  history.push('/AddFingerPrint');
                }}
              >
                Add FingerPrint
              </Button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <MaterialTables
              title={'FingerPrint'}
              columns={columns}
              data={fingerPrintData}
              deleteHandler={deleteHandler}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
