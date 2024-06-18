import { Button, Container, CssBaseline, Grid } from '@material-ui/core';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import useStyles from './styles';

function Mail() {
  const classes = useStyles();
  let history = useHistory();
  const [mailList, setMailList] = useState([]);
  let columns = [
    { field: 'to_user_id', title: 'UserId' },
    { field: 'to_username', title: 'To' },
    { field: 'title', title: 'Title' },
    { field: 'description', title: 'Description' },
    { field: 'created_by', title: 'Created By' },

    {
      field: 'created_at',
      title: 'Created At',
      render: rowData => moment(rowData.created_at).format('YYYY-MM-DD HH:MM'),
    },
  ];

  const getMailData = () => {
    apis.getMailList().then(res => {
      setMailList(res?.data);
    });
  };

  useEffect(() => {
    getMailData();
  }, []);

  return (
    <div>
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
                    history.push('/compose-mail');
                  }}
                >
                  Compose Mail{' '}
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <MaterialTables
                title={'Mail'}
                columns={columns}
                data={mailList}
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default Mail;
