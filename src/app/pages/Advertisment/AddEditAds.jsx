import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { Upload } from 'antd';
import apis from 'app/api';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useStyles from 'styles/globalStyles';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { failureNotification, toastMessage } from 'utils/helper';
import { Autocomplete } from '@material-ui/lab';

export default function AddEditAds() {
  const history = useHistory();
  const classes = useStyles();
  const { register, handleSubmit, setValue } = useForm();
  const buttonStyle = { backgroundColor: '#63acf0', margin: '9px' };
  const [imageType, setimageType] = useState('');
  const [imageList, setImageList] = useState([]);

  const [enabledUserId, setEnabledUserId] = useState(true);
  const [enabledAuditMode, setEnabledAuditMode] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [userIds, setUserId] = useState(0);
  const handleGetCustomer = () => {
    apis.getCustomerUser().then(res => {
      setCustomerData(res.data);
    });
  };

  useEffect(() => {
    handleGetCustomer();
  }, []);

  const handleUserIdCheckboxChange = (e) => {
    setEnabledUserId(e.target.checked);
    if (e.target.checked) {
      setEnabledAuditMode(false);
      setValue('areacode', '');
    }
  };

  const handleAuditModeCheckboxChange = (e) => {
    setEnabledAuditMode(e.target.checked);
    if (e.target.checked) {
      setEnabledUserId(false);
      setValue('userId', '');
    }
  };

  const onSubmit = ({ userId, areacode, Position, Duration, imageURL }) => {
    let data = new FormData();
    // data.append('userId', userId);
    // data.append('areacode', areacode);
    data.append('position', Position);
    data.append('duration', Duration);
    data.append('type', imageType);

    if (enabledUserId) {
      data.append('userId', userIds);
    }

    if (enabledAuditMode) {
      data.append('areacode', areacode);
    }

    if (imageType === 'image') {
      imageList.map(file => {
        data.append('images', file);
      });
    } else {
      data.append('urls', imageURL);
    }

    apis
      .addAdvertisment(data)
      .then(data => {
        toastMessage('Successfully added');
        history.push('/Advertisments');
      })
      .catch(error => {
        failureNotification('Network error');
      });
  };

  const props = {
    onRemove: file => {
      const index = imageList.indexOf(file);
      const newFileList = imageList.slice();
      newFileList.splice(index, 1);
      setImageList(newFileList);
    },
    beforeUpload: (file, fileList) => {
      setImageList(fileList);
      return false;
    },
    fileList: imageList,
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                Add Advertisement
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={enabledUserId}
                    onChange={handleUserIdCheckboxChange}
                    name="enableUserId"
                  />
                }
                label="User ID"
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                id="user_id"
                disabled={!enabledUserId}
                options={customerData}
                getOptionLabel={option => option?.id + ' - ' + option?.name}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setUserId(newValue.id);
                  } else {
                    setUserId(null);
                  }
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Customer"
                    variant="outlined"
                    helperText="Please select your Customer"
                    required
                    autoFocus
                  />
                )}
              />
            </Grid>

            {/* <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                name="userId"
                label="User ID"
                type="text"
                InputLabelProps={{ shrink: true }}
                id="userId"
                {...register('userId')}
                disabled={!enabledUserId}
              />
            </Grid> */}

            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={enabledAuditMode}
                    onChange={handleAuditModeCheckboxChange}
                    name="enableAuditMode"
                  />
                }
                label="Area Code"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                name="areacode"
                label="Area Code"
                type="number"
                InputLabelProps={{ shrink: true }}
                helperText={"Area Code will be Number"}
                id="areacode"
                {...register('areacode')}
                disabled={!enabledAuditMode}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="position"
                InputLabelProps={{ shrink: true }}
                helperText={"Position will be Number"}
                label="Position"
                type="number"
                id="position"
                {...register('Position', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="duration"
                label="Duration"
                type="number"
                InputLabelProps={{ shrink: true }}
                helperText={"Duration will be Seconds"}
                id="duration"
                {...register('Duration', { required: true })}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid item xs={6}>
                <TextField
                  id="type"
                  select
                  label="Type"
                  required
                  fullWidth
                  helperText="Please select your Image Type"
                  variant="outlined"
                  size="small"
                  value={imageType}
                  type="text"
                  onChange={e => {
                    setimageType(e.target.value);
                  }}
                >
                  <MenuItem key={'image'} value={'image'}>
                    Image
                  </MenuItem>
                  <MenuItem key={'url'} value={'url'}>
                    URL
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>

            {imageType === 'url' && (
              <TextField
                id="imageURL"
                label="Image URLs"
                helperText="Image URLs separated by commas"
                multiline
                {...register('imageURL')}
                rows={4}
                fullWidth
                variant="outlined"
              />
            )}

            {imageType === 'image' && (
              <Grid item xs={12}>
                <Upload listType="picture" maxCount={10} multiple {...props}>
                  <Button style={buttonStyle} icon={<UploadOutlined />}>
                    Upload (Max: 10)
                  </Button>
                </Upload>
              </Grid>
            )}

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
                    style={{ backgroundColor: GREEN, width: 200 }}
                  >
                    Submit
                  </Button>
                </div>
                <div>
                  <Button
                    required
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: LIGHT_GREY.length, width: 200 }}
                    onClick={() => {
                      history.push('/Advertisments');
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
