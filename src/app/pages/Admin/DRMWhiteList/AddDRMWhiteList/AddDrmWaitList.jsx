import React, { useState } from 'react';
import {
  Grid,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import useStyles from './styles';
import { Controller, useForm } from 'react-hook-form';
import apis from 'app/api';
import { toast } from 'react-toastify';

export default function AddDRMWaitList() {
  const history = useHistory();
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();

  const [enabled, setEnabled] = useState(false);

  const onSubmit = data => {
    apis.addWaitlist(data.mac_id).then(res => {
      toast('Successfully added', {
        position: 'top-right',
        autoClose: 2000,
      });
      history.push('/DRMWaitlist');
    });
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                Add DRM White List
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="mac_id"
                label="Mac ID"
                type="text"
                id="mac_id"
                {...register('mac_id', { required: true })}
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
                    Create
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                    onClick={() => {
                      history.push('/DRMWaitlist');
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
