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
import SingleMaterialTables from 'app/components/SingleDeleteTable2';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

export default function ListOttProviders() {
  const classes = useStyles();
  const history = useHistory();
  const [vodProvider, setVodProvider] = useState([]);
  const Role = localStorage.getItem("roles");

  const columns = [
    {
      field: 'logo',
      title: 'Logo',
      render: rowData =>
        typeof rowData.logo == 'string' ? (
          <img src={rowData.logo} alt="" width={40} height={30} />
        ) : null,
    },
    { field: 'name', title: 'Name' },
    { field: 'position', title: 'Position' },
    { field: 'package_name', title: 'Package Name' },
    { field: 'intent_url', title: 'URL' },
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
              history.push('EditOTTProviders', {
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

  const getOTTProvider = () => {
    apis.getOTTProvider().then(res => {
      setVodProvider(res?.data);
    });
  };

  useEffect(() => {
    getOTTProvider();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.sno);
    apis.deleteOTTProviders(JSON.stringify(filter)).then(res => {
      toastMessage('Successfully deleted');
      getOTTProvider();
    });
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      {Role === 'admin' && (
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
                    history.push('/AddOTTProviders');
                  }}
                >
                  Add Providers
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <MaterialTables
                title={'OTT Providers'}
                columns={columns}
                data={vodProvider}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}

      {Role === 'maintenance' && (
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
                    history.push('/AddOTTProviders');
                  }}
                >
                  Add Providers
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'OTT Providers'}
                columns={columns}
                data={vodProvider}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}
      
      {Role === 'maintenance2' && (
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
                    history.push('/AddOTTProviders');
                  }}
                >
                  Add Providers
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'OTT Providers'}
                columns={columns}
                data={vodProvider}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
}
