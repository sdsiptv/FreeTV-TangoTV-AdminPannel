import {
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { toastMessage, countryToFlag } from 'utils/helper';
import useStyles from './styles';
import { Autocomplete } from '@material-ui/lab';
import { countries } from 'utils/constant/countries';

export default function EditSubscriberUser() {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [mobileType, setmobileType] = useState(0);
  const [country, setCountry] = useState('');

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = ({
    id,
    Name,
    Username,
    Password,
    Email,
    Company,
    Website,
    Phone,
    Address,
    mac,
    areaCode,
    sessionLimit,
  }) => {
    apis
      .editCustomerUser(
        id,
        Name,
        Username,
        Password,
        Email,
        country,
        Company,
        Website,
        Phone,
        Address,
        mac,
        areaCode,
        mobileType,
        sessionLimit,
      )
      .then(res => {
        toastMessage('Successfully Edited');
        history.push('/Subscribers');
      });
  };

  useEffect(() => {
    if (location.state) {
      let params = location.state.state.data;
      setValue('Name', params.name);
      setValue('Username', params.username);
      setValue('Email', params.email);
      setCountry(params.country);
      setValue('Company', params.company);
      setValue('Website', params.website);
      setValue('Phone', params.phone);
      setValue('Address', params.address);
      setValue('areaCode', params.areaCode);
      setValue('id', params.id);
      setValue('mac', params.macs);
      setmobileType(params.mobile);
      setValue('sessionLimit', params.sessionLimit);
    } else {
      history.push('/NewSubscriberUser');
    }
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                EDIT SUBSCRIBER USER
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
                    size="small"
                    {...register('Email', { required: true })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Autocomplete
                    id="controllable-states-demo"
                    options={countries}
                    getOptionLabel={option => option.code}
                    renderOption={option => (
                      <React.Fragment>
                        <span>{countryToFlag(option.code)}</span>
                        {option.label} ({option.code}) +{option.phone}
                      </React.Fragment>
                    )}
                    value={
                      country
                        ? countries.find(option => option.code === country)
                        : null
                    }
                    onChange={(event, newValue) => {
                      setCountry(newValue?.code || '');
                    }}
                    classes={{
                      option: classes.option,
                    }}
                    autoHighlight
                    size="small"
                    fullwidth
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Choose the Country"
                        variant="outlined"
                        autoFocus
                        {...register('country')}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="company"
                    label="Company"
                    type="text"
                    id="company"
                    size="small"
                    {...register('Company')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="website"
                    label="Website"
                    type="text"
                    id="website"
                    size="small"
                    {...register('Website')}
                  />
                </Grid>

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
                    {...register('Phone', {
                      required: true,
                      minLength: 10,
                      maxLength: 10,
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
                    size="small"
                    {...register('Address', { required: true })}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="areaCode"
                label="Area Code"
                type="text"
                id="areaCode"
                size="small"
                {...register('areaCode', { required: true })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="mac"
                label="Mac"
                type="text"
                id="mac"
                size="small"
                {...register('mac')}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                name="mobile"
                label="Mobile"
                required
                type="text"
                id="type"
                select
                size="small"
                value={mobileType}
                {...register('mobile', { required: true })}
                onChange={e => {
                  setmobileType(e.target.value);
                }}
              >
                <MenuItem key={'yes'} value={'1'}>
                  Yes
                </MenuItem>
                <MenuItem key={'no'} value={'0'}>
                  No
                </MenuItem>
              </TextField>
            </Grid>
            {mobileType == '1' && (
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="sessionLimit"
                  label="Session Limit"
                  type="text"
                  id="sessionLimit"
                  size="small"
                  {...register('sessionLimit', { required: true })}
                />
              </Grid>
            )}

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
                    Change
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                    onClick={() => {
                      history.push('/Subscribers');
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
