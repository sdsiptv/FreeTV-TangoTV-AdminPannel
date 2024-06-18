import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import useStyles from 'styles/globalStyles';
import { failureNotification, toastMessage } from 'utils/helper';

export default function AddEditEZserverData({ pageMode = 'add' }) {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const { register, handleSubmit, setValue, control } = useForm();
  const [enabled, setEnabled] = useState(true);

  const onSubmit = ({ server_port, token, id }) => {
    const apiCall =
      pageMode === 'add'
        ? apis.addEZserverChannel(server_port, token)
        : apis.editEZserverChannel(id, server_port, token);

    apiCall
      .then(res => {
        toastMessage(
          pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
        );
        history.push('/ChannelData');
      })
      .catch(err => {
        failureNotification('Network error');
      });
  };

  useEffect(() => {
    if (location.state) {
      let params = location.state.state.data;
      setValue('contact_url', params.server_port);
      setValue('recharge_url', params.token);
      setValue('id', params.id);

    } else {
      history.push('/AddChannelData');
    }
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                {pageMode === 'add' ? 'ADD' : 'EDIT'} CHANNEL DATA
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="server_port"
                label="Server Port"
                type="text"
                id="server_port"
                {...register('server_port', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="token"
                label="Token"
                type="text"
                id="token"
                {...register('token', { required: true })}
              />
            </Grid>

            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <div>
                  <Button
                    type="submit"
                    required
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: GREEN, width: 150 }}
                  >
                    {pageMode === 'add' ? 'CREATE' : 'UPDATE'}
                  </Button>
                </div>
                <div>
                  <Button
                    required
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: LIGHT_GREY.length, width: 150 }}
                    onClick={() => {
                      history.push('/ChannelData');
                    }}
                  >
                    BACK
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
