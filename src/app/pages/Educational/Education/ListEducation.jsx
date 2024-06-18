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

export default function ListEDUCATION() {
  const classes = useStyles();
  const history = useHistory();
  const [Education, setEducation] = useState([]);
  const Role = localStorage.getItem("roles");

  const columns = [
    {
      field: 'image',
      title: 'Logo',
      render: rowData =>
        typeof rowData.image == 'string' ? (
          <img src={rowData.image} alt="" width={40} height={30} />
        ) : null,
    },
    { field: 'title', title: 'Title' },
    { field: 'teachers', title: 'Teachers' },
    { field: 'country', title: 'Country' },
    { field: 'top_trending', title: 'Top Trending' },
    { field: 'releaseDate', title: 'Release Date' },
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
              history.push('EditEducations', {
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

  const getEDUCATION = () => {
    apis.getEDUCATION().then(res => {
      setEducation(res?.data);
    });
  };

  useEffect(() => {
    getEDUCATION();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.educational_id);
    apis.deleteEDUCATION(filter).then(res => {
      toastMessage('Successfully deleted');
      getEDUCATION();
    });
  };

  // const deleteHandler = data => {
  //   let filter = data.map(obj => obj.educational_id);
  //   apis.deleteEDUCATION(JSON.stringify(filter)).then(res => {
  //     toastMessage('Successfully deleted');
  //     getEDUCATION();
  //   });
  // };

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
                    history.push('/AddEducations');
                  }}
                >
                  Add EDUCATIONS
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <MaterialTables
                title={'EDUCATIONS'}
                columns={columns}
                data={Education}
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
                    history.push('/AddEducations');
                  }}
                >
                  Add EDUCATIONS
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'EDUCATIONS'}
                columns={columns}
                data={Education}
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
                    history.push('/AddEducations');
                  }}
                >
                  Add EDUCATIONS
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <DRMWaitListTable
                title={'EDUCATIONS'}
                columns={columns}
                data={Education}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
}
