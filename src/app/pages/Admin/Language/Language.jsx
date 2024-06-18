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
import useStyles from 'styles/globalStyles';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

export default function Language() {
  const classes = useStyles();
  const history = useHistory();
  const [language, setLanguage] = useState([]);

  const columns = [
    { field: 'name', title: 'Name' },
    {
      field: 'createdAt',
      title: 'Created At',
      render: rowData => moment(rowData.createdAt).format('YYYY-MM-DD HH:MM'),
    },
  ];

  const getLanguage = () => {
    apis.getLanguage().then(res => {
      setLanguage(res?.data);
    });
  };

  useEffect(() => {
    getLanguage();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.language_id);
    apis.deleteVodLanguage(JSON.stringify(filter)).then(res => {
      toastMessage('Successfully Deleted');
      getLanguage();
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
          {/* <Grid item xs={3}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: GREEN }}
                onClick={() => {
                  history.push('/AddVODLanguage');
                }}
              >
                Add Language
              </Button>
            </div>
          </Grid> */}

          <Grid item xs={12}>
            <DRMWaitListTable
              title={'Languages'}
              columns={columns}
              data={language}
              deleteHandler={deleteHandler}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
