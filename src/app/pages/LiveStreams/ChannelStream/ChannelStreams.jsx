import { Button, Container, CssBaseline, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import apis from 'app/api';
import SingleDeleteTable from "../../../components/SingleDeleteTable/index"
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from './styles';
import { Delete } from '@material-ui/icons';

export default function ChannelStreams() {
  const [channel, setChannel] = useState([]);
  const classes = useStyles();
  let history = useHistory();

  const columns = [
    {
      field: 'logo',
      title: 'LOGO',

      render: rowData => (
        <img src={rowData.logo} alt="" width={40} height={30} />
      ),
    },
    { field: 'name', title: 'Name' },
    { field: 'drm_enabled', title: 'DRM Enabled' },
    {
      field: 'channel_no',
      title: 'Channel No',
    },
    {
      field: 'price',
      title: 'price',
    },
    {
      field: 'createdAt',
      title: 'Created At',
      render: rowData => moment(rowData.createdAt).format('YYYY-MM-DD HH:MM'),
    },
    {
      field: 'encryption_type',
      title: 'Encryption Type',
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
            color="secondary"
            size="small"
            onClick={() => {
              history.push('/EditChannelStreams', {
                state: { data: rowData },
              });
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: 'delete',
      title: 'Delete',
      sorting: false,
      render: rowData => (
        <Tooltip title="Delete">
          <IconButton
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => {
              deleteHandler([rowData]);
            }}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      ),
    },

  ];

  const getChannelStreams = () => {
    apis.getChannelStream().then(res => {
      setChannel(res?.data);
    });
  };

  useEffect(() => {
    getChannelStreams();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => {
      const { channel_id, name } = obj;
      apis.deleteChannelStream(`/${channel_id}/${name}`).then(res => {
        toastMessage('Successfully Deleted');
        getChannelStreams();
      });
    });

  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Grid container spacing={1} alignItems="flex-end">
              <h3>Multi Delete Not Avalilable on Live TV</h3>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: GREEN }}
                onClick={() => {
                  history.push('/AddChannelStreams');
                }}
              >
                Add Channel
              </Button>
            </div>

          </Grid>

          <Grid item xs={12}>
            <SingleDeleteTable
              title={'Channel Streams'}
              columns={columns}
              data={channel}
              deleteHandler={deleteHandler}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
