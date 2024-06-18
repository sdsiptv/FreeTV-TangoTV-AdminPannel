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

export default function ListAppUpload() {
  const classes = useStyles();
  const history = useHistory();
  const [vodMedia, setVodMedia] = useState([]);

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
    {
      field: 'version',
      title: 'Version',
    },
    // { field: 'year', title: 'Year' },
    {
      field: 'package_name',
      title: 'Package Name',
    },
    {
      field: 'category',
      title: 'Category',
    },
    {
      field: 'description',
      title: 'Description',
    },
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
              history.push('/EditAppStoreUpload', {
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

  const getAppStoreUpload = () => {
    apis.getAppStoreUpload().then(res => {
      setVodMedia(res?.data);
    });
  };

  useEffect(() => {
    getAppStoreUpload();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.id);
    if (filter.length > 0) {
      apis.deleteAppStoreUpload(filter).then(res => {
        toastMessage('Successfully Deleted');
        getAppStoreUpload();
      });
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: GREEN }}
                onClick={() => {
                  history.push('/AddAppStoreUpload');
                }}
              >
                Add App
              </Button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <MaterialTables
              title={'Upload App'}
              columns={columns}
              data={vodMedia}
              deleteHandler={deleteHandler}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
