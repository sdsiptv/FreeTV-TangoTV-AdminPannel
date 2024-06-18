import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import apis from 'app/api';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from './styles';

export default function EditAdmin() {
  const history = useHistory();
  const classes = useStyles();
  const enabled = 1;
  const roles = 'admin';
  const userid = 18;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    apis
      .editAdminUser(
        getValues('AdminId'),
        getValues('Name'),
        getValues('Email'),
        getValues('Country'),
        getValues('Company'),
        getValues('Website'),
        getValues('Phone'),
        getValues('Address'),
        getValues('Password'),
        enabled,
        getValues('Roles'),
      )
      .then(res => {
        toastMessage('Successfully Edited');
        history.push('/AdminUsers');
      });
  };

  const handleGetAdmin = () => {
    apis.getAdmin().then(res => {
      if (res.data.length) {
        setValue('Name', res.data[0].name);
        setValue('Username', res.data[0].username);
        setValue('Email', res.data[0].email);
        setValue('Country', res.data[0].country);
        setValue('Company', res.data[0].company);
        setValue('Website', res.data[0].website);
        setValue('Phone', res.data[0].phone);
        setValue('Address', res.data[0].address);
        setValue('AdminId', res.data[0].id);
        setValue('Roles', res.data[0].roles);
      }
    });
  };

  useEffect(() => {
    handleGetAdmin();
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                EDIT ADMIN
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} maxwidth="xs">
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    type="text"
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    {...register('Name', { required: true })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    autoComplete="username"
                    name="username"
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    type="text"
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    {...register('Username', { required: true })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="Password"
                    control={control}
                    rules={{ minLength: 8 }}
                    render={({ field }) => {
                      return (
                        <TextField
                          {...field}
                          variant="outlined"
                          type="password"
                          fullWidth
                          size="small"
                          id="Password"
                          label="Password"
                          error={Boolean(errors.Password)}
                          helperText={
                            errors.Password &&
                            '*Password must be minimum 8 characters'
                          }
                        />
                      );
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    {...register('Email', { required: true })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="country"
                    label="Country"
                    type="text"
                    id="country"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    {...register('Country', { required: true })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="company"
                    label="Company"
                    type="text"
                    id="company"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    {...register('Company', { required: true })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="website"
                    label="Website"
                    type="text"
                    id="website"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    {...register('Website', { required: true })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Phone"
                    label="Phone"
                    type="text"
                    id="Phone"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    {...register('Phone', {
                      required: true,
                      minLength: 10,
                    })}
                    error={Boolean(errors.Phone)}
                    helperText={errors.Phone && '*Minimum 10 digits'}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    type="text"
                    id="address"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    {...register('Address', { required: true })}
                  />
                </Grid>
              </Grid>
            </Grid>

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
                    variant="contained"
                    style={{ backgroundColor: GREEN, width: 200 }}
                  >
                    Update
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                    onClick={() => {
                      history.push('/AdminUsers');
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
