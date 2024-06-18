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
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from './styles';

export default function EditChannelCategories() {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const { register, handleSubmit, control, setValue, watch, getValues } =
    useForm();
  const onSubmit = data => {
    apis.editChannelCategory(data.id, data.Name,data.position, data.enabled).then(res => {
      toastMessage('Successfully Edited');
      history.push('/ChannelCategories');
    });
  };

  useEffect(() => {
    if (location.state) {
      let params = location.state.state.data;
      setValue('Name', params.categoryName);
      setValue('position', params.position);
      setValue('enabled', params.enabled);
      setValue('id', params.categoryId);
    } else {
      history.push('/AddChannelCategories');
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
                Edit Channel Categories
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
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="enabled" 
                control={control}
                render={({ field }) => (
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
                )}
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
                  >
                    Update
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                    onClick={() => {
                      history.push('/ChannelCategories');
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
