import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import useStyles from './styles';
import { failureNotification, toastMessage } from 'utils/helper';

export default function AddEditEPG({ pageMode = 'add' }) {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const { register, handleSubmit, setValue } = useForm();
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState();
  const [serverRecorder, setServerRecorder] = useState(0);

  useEffect(() => {
    apis.getChannelStream().then(res => {
      setChannels(res.data);
    });
  }, []);

  const onSubmit = ({ name, channels, source, timing, id }) => {
    const apiCall =
      pageMode === 'add'
        ? apis.addEPG(
            name,
            selectedChannel,
            source,
            serverRecorder,
            timing ? timing : '0',
          )
        : apis.editEPG(name, selectedChannel, source, serverRecorder, timing);

    apiCall
      .then(res => {
        toastMessage(
          pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
        );
        history.push('/EPG');
      })
      .catch(err => {
        failureNotification('Network error');
      });
  };

  useEffect(() => {
    if (location.state) {
      let params = location.state.state.data;
      setValue('name', params.name);
      setSelectedChannel(params.channel_id);
      setValue('source', params.source);
      setServerRecorder(params.allowRecord);
      setValue('timing', params.timing);
    } else {
      history.push('/AddEpg');
    }
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                {pageMode === 'add' ? 'Add' : 'Edit'} EPG
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="name"
                {...register('name', { required: true })}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="channelId"
                options={channels}
                getOptionLabel={option =>
                  option?.channel_id
                    ? `${option.channel_id} - ${option.name}`
                    : ''
                }
                value={
                  selectedChannel
                    ? channels.find(
                        channel => channel.channel_id === selectedChannel,
                      )
                    : null
                }
                onChange={(event, newValue) => {
                  setSelectedChannel(newValue?.channel_id);
                }}
                required
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Channels"
                    {...register('channels', { required: true })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="source"
                label="Source"
                type="text"
                id="source"
                {...register('source', { required: true })}
              />
            </Grid>

            {/* <Grid item xs={6}>
              <Switch
                checked={serverRecorder == 1}
                onChange={event => {
                  setServerRecorder(event.target.checked ? 1 : 0);
                }}
                name="serverRecorder"
              />
              Server Recorder
            </Grid>

            {serverRecorder == 1 && (
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="timing"
                  label="Catch up Timing in Days"
                  type="text"
                  id="timing"
                  {...register('timing', { required: true })}
                />
              </Grid>
            )} */}

            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <div>
                  <Button
                    type="submit"
                    style={{ backgroundColor: GREEN, width: 200 }}
                  >
                    {pageMode === 'add' ? 'Create' : 'Update'}
                  </Button>
                </div>
                <div>
                  <Button
                    style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                    onClick={() => {
                      history.push('/EPG');
                    }}
                  >
                    Back
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </form>
    </Container>
  );
}
