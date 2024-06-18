import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import apis from 'app/api';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { countries } from 'utils/constant/countries';
import { countryToFlag, toastMessage, failureNotification } from 'utils/helper';
import useStyles from './styles';

const roles = ['admin', 'mso', 'SmsUser', 'audit'];

export default function NewUser() {
  const history = useHistory();
  const classes = useStyles();
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('admin');
  const [inputValue, setInputValue] = useState('');

  const handleChangeRole = event => {
    setRole(event.target.value);
  };

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const handleRegisterAdmin = () => {
    apis
      .addAdminUser(
        getValues('username'),
        getValues('password'),
        getValues('email'),
        getValues('name'),
        getValues('phone'),
        getValues('country'),
        getValues('address'),
        getValues('company'),
        getValues('website'),
        role,
      )
      .then(res => {
        if (res.status === "Failed") {
          const errorMessage = res.error.length > 0 ? res.error[0] : "Unknown error";
          failureNotification(`Error: ${errorMessage}`);
        } else {
          toastMessage(`Successfully Added: ${res.message}`);
          history.push('/AdminUsers');
        }
      })
      .catch(err => {
        const errorMessage = err.response && err.response.data ? err.response.data.error : err.message;
        failureNotification(`Network error:  ${errorMessage}`);
      });
  };
  
  const onSubmit = () => { };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                NEW ADMIN USER / MSO USER
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
                    size="small"
                    {...register('name', { required: true })}
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
                    size="small"
                    {...register('username', { required: true })}
                  />
                </Grid>

                {/* <Grid item xs={12}>
                  <TextField
                    autoComplete="password"
                    name="password"
                    variant="outlined"
                    required
                    fullWidth
                    id="password"
                    label="password"
                    type="password"
                    autoFocus
                    size="small"
                    {...register('password', { required: true })}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ minLength: 8 }}
                    render={({ field }) => {
                      return (
                        <TextField
                          {...field}
                          variant="outlined"
                          type="password"
                          required
                          fullWidth
                          size="small"
                          id="password"
                          label="Password"
                          error={Boolean(errors.password)}
                          helperText={
                            errors.password &&
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
                    size="small"
                    {...register('email', { required: true })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    value={country}
                    onChange={(event, newValue) => {
                      setCountry(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={countries}
                    classes={{
                      option: classes.option,
                    }}
                    autoHighlight
                    getOptionLabel={option => option.code}
                    renderOption={option => (
                      <React.Fragment>
                        <span>{countryToFlag(option.code)}</span>
                        {option.label} ({option.code}) +{option.phone}
                      </React.Fragment>
                    )}
                    size="small"
                    required
                    fullwidth
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Choose the Country"
                        variant="outlined"
                        {...register('country', { required: true })}
                      />
                    )}
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
                    size="small"
                    {...register('company', { required: true })}
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
                    size="small"
                    {...register('website', { required: true })}
                  />
                </Grid>

                {/* <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Phone"
                    label="Phone"
                    type="text"
                    id="Phone"
                    size="small"
                    min={10}
                    max={10}
                    {...register('phone', { required: true })}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Phone"
                    label="Phone"
                    type="number"
                    id="Phone"
                    size="small"
                    {...register('phone', { required: true, minLength: 10 })}
                    error={Boolean(errors.phone)}
                    helperText={
                      errors.phone && '*Phone Number must be minimum 10 digits'
                    }
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
                    size="small"
                    {...register('address', { required: true })}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="standard-select-currency"
                select
                label="Roles"
                value={role}
                onChange={handleChangeRole}
                style={{ width: 450, marginLeft: 20 }}
              >
                {roles.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="enabled"
                control={control}
                render={({ field }) => {
                  return (
                    <FormControlLabel
                      label="Enabled"
                      control={
                        <Checkbox
                          onChange={e => {
                            field.onChange(e);
                          }}
                        />
                      }
                    />
                  );
                }}
              />
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
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: GREEN, width: 200 }}
                    onClick={handleRegisterAdmin}
                  >
                    Resigter
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
