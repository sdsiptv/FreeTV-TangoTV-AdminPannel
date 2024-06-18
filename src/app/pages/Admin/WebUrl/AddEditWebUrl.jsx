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

export default function AddEditAppStoreCategories({ pageMode = 'add' }) {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const { register, handleSubmit, setValue, control } = useForm();
  const [enabled, setEnabled] = useState(true);

  const onSubmit = ({ contact_url,recharge_url, subscription_url,id }) => {
    const apiCall =
      pageMode === 'add'
        ? apis.addWebURL(contact_url,recharge_url,subscription_url)
        : apis.editWebURL( id,contact_url,recharge_url,subscription_url);

    apiCall
      .then(res => {
        toastMessage(
          pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
        );
        history.push('/listweburl');
      })
      .catch(err => {
        failureNotification('Network error');
      });
  };

  useEffect(() => {
    if (location.state) {
      let params = location.state.state.data;
      setValue('contact_url', params.contact_url);
      setValue('recharge_url', params.recharge_url);
      setValue('subscription_url', params.subscription_url);
      setValue('id', params.id);

    } else {
      history.push('/Addweburl');
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
                {pageMode === 'add' ? 'ADD' : 'EDIT'} WEB URL
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="contact_url"
                label="Contact Url"
                type="text"
                id="contact_url"
                {...register('contact_url', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="recharge_url"
                label="Recharge Url"
                type="text"
                id="recharge_url"
                {...register('recharge_url', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="subscription_url"
                label="Subscription Url"
                type="text"
                id="subscription_url"
                {...register('subscription_url', { required: true })}
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
                      history.push('/listweburl');
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
