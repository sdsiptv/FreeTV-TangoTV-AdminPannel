import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import apis from 'app/api';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useStyles from 'styles/globalStyles';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { failureNotification, toastMessage } from 'utils/helper';

export default function AddAppUpdates() {
  const history = useHistory();
  const classes = useStyles();

  const { register, handleSubmit } = useForm({
    defaultValues: { enabled: false },
  });

  const onSubmit = ({ app_version, url }) => {
    apis
      .addAppUpdate(app_version, url)
      .then(res => {
        toastMessage('Successfully added');
        history.push('/AppUpdates');
      })
      .catch(err => {
        failureNotification('Network error');
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                Add App Updates
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="app_version"
                label="App Version"
                type="number"
                id="app_version"
                {...register('app_version', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="url"
                label="URL"
                type="text"
                id="url"
                {...register('url', { required: true })}
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
                    variant="contained"
                    style={{ backgroundColor: GREEN, width: 200 }}
                  >
                    Add
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                    onClick={() => {
                      history.push('/AppUpdates');
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
