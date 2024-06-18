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
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from './styles';

export default function EditUser() {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const roles = ['admin', 'mso'];
  const [role, setRole] = useState('');

  const handleUpdate = () => {
    apis
      .editAdminUser(
        getValues('id'),
        getValues('Name'),
        getValues('Email'),
        getValues('Country'),
        getValues('Company'),
        getValues('Website'),
        getValues('Phone'),
        getValues('Address'),
        getValues('Password'),
        getValues('enabled'),
        role,
      )
      .then(res => {
        toastMessage('Successfully Edited');
        history.push('/AdminUsers');
      });
  };
  const onSubmit = () => {};

  useEffect(() => {
    if (location.state) {
      let params = location.state.state.data;
      setValue('Name', location.state.state.data.name);
      setValue('Username', location.state.state.data.username);
      setValue('Email', location.state.state.data.email);
      setValue('Country', location.state.state.data.country);
      setValue('Company', location.state.state.data.company);
      setValue('Website', location.state.state.data.website);
      setValue('Phone', location.state.state.data.phone);
      setValue('Address', location.state.state.data.address);
      setValue('enabled', location.state.state.data.enabled);
      setValue('id', location.state.state.data.userid);
      setRole(location.state.state.data.roles);
    } else {
      history.push('/NewUser');
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
                EDIT ADMIN USER / MSO USER
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
                    size="small"
                    {...register('Username', { required: true })}
                  />
                </Grid>

                {/* <Grid item xs={12}>
                  <TextField
                    autoComplete="password"
                    name="password"
                    variant="outlined"
                    fullWidth
                    id="password"
                    label="password"
                    type="password"
                    size="small"
                    {...register('Password')}
                  />
                </Grid> */}
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
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="country"
                    label="Country"
                    type="text"
                    id="country"
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
                    size="small"
                    {...register('Website', { required: true })}
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
                    {...register('Phone', { required: true })}
                  />
                </Grid> */}

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
                    size="small"
                    {...register('Address', { required: true })}
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
                onChange={e => {
                  setRole(e.target.value);
                }}
                style={{ width: 450, marginLeft: 20 }}
              >
                {roles.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* Reused from surfing */}
            {/* <FormControl>
                <InputLabel htmlFor="roles-select">Roles</InputLabel>
                <Controller
                  control={control}
                  name="role"
                  as={
                    <Select id="roles-select">
                      {roles.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                />
              </FormControl>*/}
            {/* // useform material ui reused from checkbox */}
            {/* <Grid item xs={12}>
              <Controller>
                name="role" control={control}
                render=
                {({ field }) => {
                  return (
                    <FormControlLabel
                      label="Roles"
                      control={
                        <Select>
                          {roles.map(ele => (
                            <MenuItem key={ele} value={ele}>
                              {ele}
                            </MenuItem>
                          ))}
                        </Select>
                      }
                    />
                  );
                }}
              </Controller>
            </Grid> */}
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
                          checked={watch('enabled') === 1}
                          onChange={e => {
                            field.onChange(e);
                            setValue('enabled', Number(getValues('enabled')));
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
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: GREEN, width: 200 }}
                    onClick={handleUpdate}
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
