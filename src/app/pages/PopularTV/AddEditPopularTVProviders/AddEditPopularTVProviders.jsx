import {
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
  } from '@material-ui/core';
  import apis from 'app/api';
  import React, { useEffect, useState } from 'react';
  import { useForm } from 'react-hook-form';
  import { useHistory, useLocation } from 'react-router-dom';
  import { GREEN, LIGHT_GREY } from 'utils/constant/color';
  import useStyles from './styles';
  import { failureNotification, toastMessage } from 'utils/helper';
  
  export default function AddEditPopularTVProviders({ pageMode = 'add' }) {
    const hiddenFileInput = React.useRef(null);
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const [imageObj, setImageObj] = useState(undefined);
    const [image, setImage] = useState('');
    const { register, handleSubmit, setValue } = useForm();
  
    const handleImageChange = event => {
      const fileUploaded = event.target.files[0];
      setImageObj(fileUploaded);
    };
  
    const onSubmit = ({ name }) => {
      let data = new FormData();
      data.append('name', name);
      data.append('logo', imageObj);
      const apiCall =
        pageMode === 'add'
          ? apis.addPopularTVProviders(data)
          : apis.editPopularTVProviders(location.state.state.data?.providerId, data);
  
      apiCall
        .then(res => {
          toastMessage(
            pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
          );
          history.push('/PopularTVProviders');
        })
        .catch(err => {
          failureNotification('Network error');
        });
    };
  
    useEffect(() => {
      if (location.state) {
        let params = location.state.state.data;
        setValue('name', params.providerName);
        setImage(params.logo);
      } else {
        history.push('/AddPopularTVProviders');
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
                  {pageMode === 'add' ? 'ADD' : 'EDIT'} POPULAR TV PROVIDERS
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
  
              <Grid item xs={6}>
                <div style={{ display: 'flex' }}>
                  <input
                    type="file"
                    accept="image/*"
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                    id="contained-button-file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      htmlFor="contained-button-file"
                    >
                      ADD LOGO *
                    </Button>
                  </label>
                  <img
                    src={
                      typeof imageObj == 'object'
                        ? URL.createObjectURL(imageObj)
                        : image
                    }
                    alt=""
                    style={{ paddingLeft: '10px', width: '100px' }}
                  />
                </div>
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
                        history.push('/PopularTVProviders');
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
  