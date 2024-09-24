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
import useStyles from 'styles/globalStyles';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

export default function ListPartner() {
  const classes = useStyles();
  const history = useHistory();
  const [Partner, setPartner] = useState([]);

  const columns = [
    {
      field: 'logo',
      title: 'Logo',
      render: rowData =>
        typeof rowData.logo == 'string' ? (
          <img src={rowData.logo} alt="" width={40} height={30} />
        ) : null,
    },
    { field: 'partner_id', title: 'Partner ID' },
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
              history.push('EditPartner', {
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

  const getPartner = () => {
    apis.getPartner().then(res => {
      setPartner(res?.data);
    });
  };

  useEffect(() => {
    getPartner();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.id);
    apis.deletePartner(JSON.stringify(filter)).then(res => {
      toastMessage('Successfully deleted');
      getPartner();
    });
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <Grid container spacing={1} alignItems="flex-end"></Grid>
            </Grid>
            <Grid item xs={2}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    history.push('/AddPartner');
                  }}
                >
                  Add Partners
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <MaterialTables
                title={'PARTNERS'}
                columns={columns}
                data={Partner}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>


    </Container>
  );
}
