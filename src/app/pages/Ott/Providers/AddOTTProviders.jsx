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
import useStyles from 'styles/globalStyles';
import { failureNotification, toastMessage } from 'utils/helper';

export default function AddEditOTTProviders({ pageMode = 'add' }) {
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

  const onSubmit = ({ name, position, package_name, intent_url,image }) => {
    let data = new FormData();
    data.append('name', name);
    data.append('position', position)
    data.append('package_name', package_name)
    data.append('intent_url', intent_url)
    data.append('logo', imageObj);

    const apiCall =
      pageMode === 'add'
        ? apis.addOTTProviders(data)
        : apis.editOTTProviders(location.state.state.data?.sno, data);

    apiCall
      .then(res => {
        toastMessage(
          pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
        );
        history.push('/OTTProviders');
      })
      .catch(err => {
        failureNotification('Network error');
      });
  };

  useEffect(() => {
    if (location.state) {
      let params = location.state.state.data;
      setValue('name', params.name);
      setValue('position', params.position);
      setValue('package_name', params.package_name);
      setValue('intent_url', params.intent_url);
      setImage(params.logo);
    } else {
      history.push('/AddOTTProviders');
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
                {pageMode === 'add' ? 'ADD' : 'EDIT'} OTT PROVIDERS
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
              <TextField
                variant="outlined"
                required
                fullWidth
                name="package_name"
                label="Package name"
                type="text"
                InputLabelProps={{ shrink: true }}
                id="package_name"
                {...register('package_name', { required: true })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="intent_url"
                label="URL"
                type="text"
                InputLabelProps={{ shrink: true }}
                id="intent_url"
                {...register('intent_url', { required: true })}
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
                    {pageMode === 'add' ? 'Create' : 'Update'}
                  </Button>
                </div>
                <div>
                  <Button
                    required
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: LIGHT_GREY.length, width: 150 }}
                    onClick={() => {
                      history.push('/OTTProviders');
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
