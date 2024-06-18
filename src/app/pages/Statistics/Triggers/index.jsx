import { Button, Container, CssBaseline, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { GREEN } from 'utils/constant/color';
import MaterialTables from 'app/components/MaterialTables';
import { useHistory } from 'react-router-dom';
import apis from 'app/api';
import moment from 'moment';
import { toastMessage } from 'utils/helper';

function Triggers() {
  const classes = useStyles();
  let history = useHistory();
  const [triggerList, setTriggerList] = useState([]);
  let columns = [
    { field: 'user_id', title: 'UserId' },
    { field: 'areacode', title: 'Area Code' },
    { field: 'customers_username', title: 'User' },
    { field: 'type', title: 'Type' },
    { field: 'created_by', title: 'Created By' },

    {
      field: 'created_at',
      title: 'Created At',
      render: rowData => moment(rowData.created_at).format('YYYY-MM-DD HH:MM'),
    },
  ];

  const getTriggerData = () => {
    apis.getTriggerList().then(res => {
      setTriggerList(res?.data);
    });
  };

  useEffect(() => {
    getTriggerData();
  }, []);
  
  const deleteHandler = data => {
    let filter = data.map(obj => obj.id);
    apis.DeleteTriggerList(JSON.stringify(filter)).then(res => {
      toastMessage('Successfully deleted');
      getTriggerData();
    });
  };

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
                    history.push('/create-triggers');
                  }}
                >
                  Send Triggers{' '}
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <MaterialTables
                title={'Triggers'}
                columns={columns}
                data={triggerList}
                deleteHandler={deleteHandler}
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default Triggers;
