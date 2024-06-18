import {
  Button,
  Container,
  CssBaseline,
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
import { countryToFlag, toastMessage } from 'utils/helper';
import useStyles from './styles';

export default function NewSubscriberUser() {
  const history = useHistory();
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [country, setCountry] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [contentType, setcontentType] = useState('');
  const [selectedOption, setSelectedOption] = useState('import');

  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
  };
  const onSubmit = ({
    name,
    username,
    password,
    email,
    country,
    company,
    website,
    phone,
    address,
    areaCode,
    mac,
    mobile,
    sessionLimit,
  }) => {
    apis
      .addCustomerUser(
        username,
        password,
        email,
        name,
        phone,
        country,
        address,
        areaCode,
        company,
        website,
        mac !== undefined ? mac : "",
        mobile,
        sessionLimit ? sessionLimit : 1,
      )
      .then(res => {
        toastMessage('Successfully Added');
        history.push('/Subscribers');
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
                NEW SUBSCRIBER USER
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
                    size="small"
                    {...register('username', { required: true })}
                  />
                </Grid>

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
                    fullwidth
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Choose the Country"
                        variant="outlined"
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
                    {...register('company')}
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
                    {...register('website')}
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
                    size="small"
                    {...register('phone', {
                      required: true,
                      minLength: 10,
                      maxLength: 10,
                    })}
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
              </Grid>
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
                value={contentType}
                {...register('mobile', { required: true })}
                onChange={e => {
                  setcontentType(e.target.value);
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
            {contentType === '1' && (
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
                  paddingTop: '10px',
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
