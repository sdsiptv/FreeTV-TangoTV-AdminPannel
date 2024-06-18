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
  
  export default function AddEditNetIP({ pageMode = 'add' }) {
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const { register, handleSubmit, setValue, control } = useForm();
    const [enabled, setEnabled] = useState(true);
  
    const onSubmit = ({ netip, id }) => {
      const apiCall =
        pageMode === 'add'
          ? apis.addNetIP(netip)
          : apis.editNetIP(netip, id);
  
      apiCall
        .then(res => {
          toastMessage(
            pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
          );
          history.push('/SourceIP');
        })
        .catch(err => {
          failureNotification('Network error');
        });
    };
  
    useEffect(() => {
      if (location.state) {
        let params = location.state.state.data;
        setValue('netip', params.netip);
        setValue('id', params.id);
      } else {
        history.push('/AddSourceIP');
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
                  {pageMode === 'add' ? 'ADD' : 'EDIT'} SOURCE IP
                </Typography>
              </Grid>
  
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="netip"
                  label="Source IP"
                  type="text"
                  InputLabelProps={{ shrink: true }}
                  id="netip"
                  {...register('netip', { required: true })}
                  helperText={"Source IP will be Only in Number"}
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
                        history.push('/SourceIP');
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
  