import React, { useEffect } from 'react';
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
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { Controller, useForm } from 'react-hook-form';
import apis from 'app/api';
import useStyles from 'styles/globalStyles';
import { failureNotification, toastMessage } from 'utils/helper';

export default function AddEditOTTCategories({ pageMode = 'add' }) {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();

  const { register, handleSubmit, setValue, getValues, control } = useForm({
    defaultValues: { enabled: false },
  });

  useEffect(() => {
    if (location.state) {
      let params = location.state.state.data;
      setValue('Name', params.categoryName);
      setValue('position', params.position);
      setValue('enabled', true);
      setValue('categoryId', params.categoryId);
    }
  }, []);
  const onSubmit = data => {
    const apiCall =
      pageMode === 'add'
        ? apis.addOTTCategory(data.Name,data.position, data.enabled)
        : apis.editOTTCategory(data.categoryId, data.Name,data.position, data.enabled);

    apiCall
      .then(res => {
        toastMessage('Successfully added');
        history.push('/OTTCategories');
      })
      .catch(err => {
        failureNotification('Network error');
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
                {pageMode === 'add' ? 'Add' : 'Edit'} OTT Category
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="name"
                {...register('Name', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="position"
                label="Position"
                type="number"
                id="position"
                {...register('position', { required: true })}
                helperText={"Position will be Only in Numbers"}

              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="enabled"
                control={control}
                defaultValue={false}
                render={({ field }) => {
                  return (
                    <FormControlLabel
                      label="Enabled"
                      control={
                        <Checkbox
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
                  justifyContent: 'flex-end',
                }}
              >
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: GREEN, width: 200 }}
                  >
                    {pageMode === 'add' ? 'Create' : 'Update'}
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                    onClick={() => {
                      history.push('/OTTCategories');
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
