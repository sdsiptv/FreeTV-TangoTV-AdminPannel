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
  import useStyles from './styles';
  import { failureNotification, toastMessage } from 'utils/helper';
  
  export default function AddEditPopularTVCategories({ pageMode = 'add' }) {
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const { register, handleSubmit, setValue, control } = useForm();
    const [enabled, setEnabled] = useState(true);
  
    const onSubmit = ({ name, position, category_id }) => {
      const apiCall =
        pageMode === 'add'
          ? apis.addPopularTVCategory(name, position)
          : apis.editPopularTVCategory(name, position, enabled ? 1 : 0, category_id);
  
      apiCall
        .then(res => {
          toastMessage(
            pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
          );
          history.push('/PopularTVCategories');
        })
        .catch(err => {
          failureNotification('Network error');
        });
    };
  
    useEffect(() => {
      if (location.state) {
        let params = location.state.state.data;
        setValue('name', params.categoryName);
        setValue('position', params.position);
        setEnabled(params.enabled === 1);
        setValue('category_id', params.categoryId);
      } else {
        history.push('/AddPopularTVCategories');
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
                  {pageMode === 'add' ? 'ADD' : 'EDIT'} POPULAR TV CATEGORIES
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
                  InputLabelProps={{ shrink: true }}
                  id="name"
                  {...register('name', { required: true })}
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
                  InputLabelProps={{ shrink: true }}
                  id="position"
                  {...register('position', { required: true })}
                  helperText={"Position will be Only in Numbers"}
                />
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
                            checked={enabled}
                            onChange={e => {
                              field.onChange(e);
                              setEnabled(e.target.checked);
  
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
                        history.push('/PopularTVCategories');
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
  