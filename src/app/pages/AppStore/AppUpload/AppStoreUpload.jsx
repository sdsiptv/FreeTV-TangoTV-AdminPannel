import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  MenuItem,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { useForm } from 'react-hook-form';
import apis from 'app/api';
import useStyles from 'styles/globalStyles';
import { failureNotification, toastMessage } from 'utils/helper';

export default function AppStoreUpload({ pageMode = 'add' }) {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [shrinkInputProps, setShrinkInputProps] = useState(false);
  const [providerData, setProviderData] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');

  const [logoObj, setLogoObj] = useState(undefined);
  const [logoImage, setLogoImage] = useState('');
  const hiddenLogoFileInput = React.useRef(null);

  const [bdObj, setBdObj] = useState(null);

  const onLogoFileChange = event => {
    const fileUploaded = event.target.files[0];
    setLogoObj(fileUploaded);
  };

  const onBDFileChange = event => {
    const fileUploaded = event.target.files[0];
    setBdObj(fileUploaded);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // const onBDFileChange = async (event) => {
  //   const fileUploaded = event.target.files[0];
  //   if (fileUploaded) {
  //     if (fileUploaded.name.endsWith('.apk')) {
  //       try {
  //         const base64 = await convertToBase64(fileUploaded);
  //         setBdObj({
  //           name: fileUploaded.name, // Set the name of the file
  //           base64: base64, // Set the base64 string
  //         });
  //       } catch (error) {
  //         console.error('Error reading file:', error);
  //       }
  //     } else {
  //       console.error('Invalid file type. Please select an APK file.');
  //     }
  //   }
  // };
  

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { enabled: false },
  });

  useEffect(() => {
    getAppStoreCategory();
  }, []);


  const onSubmit = ({
    name,
    version,
    package_name,
    description,
    category,
  }) => {
    let data = new FormData();
    data.append('name', name);
    data.append('version', version);
    data.append('package_name', package_name);
    data.append('category', category);
    data.append('description', description);
    if (typeof logoObj == 'object') {
      data.append('logo', logoObj);
    }
    data.append('apk_file', bdObj);
    const appUploadId = location.state?.state?.data?.id;

    const apiCall =
      pageMode === 'add'
        ? apis.addAppStoreUpload(data)
        : apis.editAppUploadChannel(appUploadId, data);
    apiCall
      .then(res => {
        toastMessage(
          pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
        );
        history.push('/ListAppStoreUpload');
      })
      .catch(err => {
        failureNotification('Network error');
      });
  };

  const getAppStoreCategory = () => {
    apis
      .getAppStoreCategory()
      .then(res => {
        setProviderData(res?.data);
        if (pageMode !== 'add' && location.state) {
          let params = location.state.state.data;
          getDetailedAppUpload(params.id);
        } else {
          setShrinkInputProps(true);
        }
      })
      .catch(() => {
        failureNotification('Network error');
      });
  };

  const getDetailedAppUpload = async (id) => {
    try {
      const res = await apis.getDetailedAppStoreUpload(id);
      const data = res?.data[0];
      setValue('name', data?.name);
      setValue('version', data?.version);
      setValue('package_name', data?.package_name);
      setValue('category', data?.category);
      setValue('description', data?.description);
      setValue('apk_file', data?.apk_file);
      setBdObj('apk_file', data?.bdObj);
      setLogoImage(data?.logo);
      setShrinkInputProps(true);
    } catch (error) {
      console.error('Error:', error);
      failureNotification('Network error');
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                {pageMode === 'add' ? 'Add' : 'Edit'} APP UPLOAD
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="Name"
                label="Name"
                type="text"
                id="name"
                {...register('name', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="Version"
                label="Version"
                type="number"
                id="version"
                {...register('version', { required: true })}
                helperText={"Version will be Only in Numbers"}

              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="filled-select-currency"
                select
                label="Category"
                required
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                {...register('category')}
                value={selectedProvider}
                onChange={(e) => {
                  setSelectedProvider(e.target.value);
                }}
              >
                {providerData.map((provider) => (
                  <MenuItem key={provider.category_id} value={provider.category_id}>
                    {provider.category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="package_name"
                label="Package Name"
                type="text"
                id="package_name"
                {...register('package_name', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="description"
                label="Description"
                type="text"
                id="description"
                {...register('description', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <div style={{ display: 'flex' }}>
                <input
                  type="file"
                  accept="image/*"
                  ref={hiddenLogoFileInput}
                  style={{ display: 'none' }}
                  onChange={onLogoFileChange}
                  id="contained-button-file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Add LOGO *
                  </Button>
                </label>
                <img
                  src={
                    typeof logoObj == 'object'
                      ? URL.createObjectURL(logoObj)
                      : logoImage
                  }
                  alt=""
                  style={{ paddingLeft: '10px', width: '100px' }}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div>
                <input
                  accept=".apk"
                  id="apk_file_input"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={onBDFileChange}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      id="apk_file_display"
                      variant="outlined"
                      disabled
                      InputLabelProps={{ shrink: shrinkInputProps }}
                      fullWidth
                      value={bdObj ? bdObj.name : ''}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        // Trigger file input click when the button is clicked
                        document.getElementById('apk_file_input').click();
                      }}
                    >
                      Select APK File
                    </Button>
                  </Grid>
                </Grid>
                {/* {bdObj.base64 && (
                  <div>
                    <h2>Base64 Data:</h2>
                    <textarea
                      rows="5"
                      cols="50"
                      readOnly
                      value={bdObj.base64}
                    />
                  </div>
                )} */}
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
                      history.push('/ListAppStoreUpload');
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
