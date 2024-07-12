import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  Chip,
  FormControlLabel,
  IconButton,

} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { useForm, Controller } from 'react-hook-form';
import apis from 'app/api';
import useStyles from 'styles/globalStyles';
import { failureNotification, toastMessage } from 'utils/helper';
import { encrypt } from 'utils/helper/cryptography.js';
import { v4 as uuidv4 } from 'uuid';

export default function AddDevotionals() {
  const hiddenFileInput = React.useRef(null);
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [OTTCategory, setOTTCategory] = useState([]);
  const [shrinkInputProps, setShrinkInputProps] = useState(false);
  const [providerData, setProviderData] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');

  const roles = [
    { label: 'Live', value: 0 },
    { label: 'Recorded', value: 1 },
  ];

  const [selectedOTTCategory, setSelectedOTTCategory] = useState('');

  const [LocationData, setLocationData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  // const [selectedLanguage, setSelectedOTTCategory] = useState('');
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), title: '', url: '', stream: '' },
  ]);
  const [educationBoard, SetEducationBoard] = useState([]);
  const [valueEducationBoard, SetValueEducationBoard] = useState([]);

  const [vodLanguage, setVodLanguage] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);

  const [imageObj, setImageObj] = useState(undefined);
  const [image, setImage] = useState('');


  const handleImageChange = event => {
    const fileUploaded = event.target.files[0];
    setImageObj(fileUploaded);
  };

  const { register, handleSubmit, setValue, getValues, control } = useForm({
    defaultValues: { enabled: false },
  });

  useEffect(() => {
    getOTTCategories();
  }, []);

  useEffect(() => {
    getOTTProvider();
  }, []);

  useEffect(() => {
    getOTTLocation();
  }, []);


  const onSubmit = ({
    title,
    provider_id,
    category_id,
    religion,
    location,
    temple,
    year,
    releaseDate,
    description,
    comments,
    image,
    top_trending,
    parental_control,
    enabled,
    board,
    url
  }) => {
    let data = new FormData();
    data.append('title', title);
    data.append('category_id', selectedOTTCategory);
    data.append('language', selectedLanguage);
    data.append('provider_id', selectedProvider);
    data.append('religion', valueEducationBoard);
    data.append('location', selectedLocation);
    data.append('temple', temple);
    data.append('year', year);
    data.append('releaseDate', releaseDate);
    data.append('description', description);
    data.append('comments', comments);
    data.append('top_trending', top_trending);
    data.append('parental_control', parental_control);
    data.append('url', 'url');
    data.append('enabled', getValues('enabled') ? getValues('enabled') : 0);
    data.append('image', imageObj);


    let encryptedData = [];
    inputFields.map(e => {
      let json = {
        id: e?.id,
        title: e?.title,
        stream: e.role,
        url: encrypt(e?.url),
      };
      encryptedData.push(json);
    });
    data.append('episodes', JSON.stringify(encryptedData));

    apis.addDEVOTIONAL(data).then(res => {
      toastMessage('Successfully addedd');
      history.push('/Devotional');
    });

  };

  const handleChangeInput = (id, event) => {
    const { name, value } = event.target;
    const newInputFields = inputFields.map(i => {
      if (id === i.id) {
        i[name] = value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), title: '', url: '', role: '' }]);
  };

  const handleRemoveFields = id => {
    const values = [...inputFields];
    values.splice(
      values.findIndex(value => value.id === id),
      1,
    );
    setInputFields(values);
  };

  useEffect(() => {
    apis.getLanguage().then(res => {
      setVodLanguage(res.data);
    });
  }, []);

  useEffect(() => {
    apis.getReligious().then(res => {
      SetEducationBoard(res.data);
    })
  }, []);

  const getOTTProvider = () => {
    apis.getDEVOTIONALProvider()
      .then(res => {
        setProviderData(res?.data);
      })
      .catch(error => {
        console.error("Error fetching provider data:", error);
      });
  }

  const getOTTLocation = () => {
    apis.getLocation()
      .then(res => {
        setLocationData(res?.data);
      })
      .catch(error => {
        console.error("Error fetching provider data:", error);
      });
  }

  const getOTTCategories = () => {
    apis
      .getDEVOTIONALCategory()
      .then(res => {
        setOTTCategory(res?.data);
      })
      .catch(() => {
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
                ADD DEVOTIONALS
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="title"
                label="Title"
                type="text"
                id="title"
                {...register('title', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="filled-select-currency"
                select
                label="Category"
                required
                fullWidth
                helperText="Please select your Category"
                variant="outlined"
                size="medium"
                value={selectedOTTCategory}
                type="text"
                onChange={e => {
                  setSelectedOTTCategory(e.target.value);
                }}
              >
                {OTTCategory.map(ele => (
                  <MenuItem key={ele.category_id} value={ele.category_id}>
                    {ele.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                select
                fullWidth
                name="providers"
                label="Providers"
                type="text"
                id="providers"
                {...register('providers')}
                value={selectedProvider}
                onChange={(e) => {
                  setSelectedProvider(e.target.value);
                }}
              >
                {providerData.map((provider) => (
                  <MenuItem key={provider.sno} value={provider.sno}>
                    {provider.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="filled-select-currency"
                select
                label="Religion"
                required
                fullWidth
                variant="outlined"
                size="medium"
                value={valueEducationBoard}
                type="text"
                onChange={e => {
                  SetValueEducationBoard(e.target.value);
                }}
              >
                {educationBoard.map(ele => (
                  <MenuItem key={ele.religion_id} value={ele.religion_id}>
                    {ele.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                select
                fullWidth
                name="location"
                label="Location"
                type="text"
                id="location"
                {...register('location')}
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                }}
              >
                {LocationData.map((location) => (
                  <MenuItem key={location.location_id} value={location.location_id}>
                    {location.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="filled-select-currency"
                select
                label="Language"
                required
                fullWidth
                variant="outlined"
                size="medium"
                value={selectedLanguage}
                type="text"
                onChange={e => {
                  setSelectedLanguage(e.target.value);
                }}
              >
                {vodLanguage.map(ele => (
                  <MenuItem key={ele.language_id} value={ele.language_id}>
                    {ele.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="temple"
                label="Temple"
                type="text"
                id="temple"
                {...register('temple', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="year"
                label="Year"
                type="number"
                id="year"
                {...register('year', { required: true })}
                helperText={"Year will be Only in Numbers"}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="releaseDate"
                label="Release Date"
                placeholder="Date in YYYYMMDD Format"
                type="text"
                id="releaseDate"
                {...register('releaseDate', { required: true })}
                helperText={"Use Format YYYY-MM-DD"}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="top_trending"
                label="Top Trending"
                type="number"
                id="top_trending"
                {...register('top_trending', { required: true })}
                helperText={"Top Trending will be Only in Numbers"}

              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="parental_control"
                label="Parental Control"
                type="number"
                id="parental_control"
                {...register('parental_control', { required: true })}
                helperText={"Parental Control will be Only in 0 or 1"}

              />
            </Grid>


            <Grid item xs={6}>
              <TextField
                variant="outlined"
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
              <TextField
                variant="outlined"
                required
                fullWidth
                name="comments"
                label="Comment"
                type="text"
                id="comments"
                {...register('comments', { required: true })}
              />
            </Grid>

            <Grid item xs={3}>
              <Controller
                name="enabled"
                control={control}
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
              {inputFields.map(inputField => (
                <div key={inputField.id}>
                  <TextField
                    name="title"
                    label="Title"
                    variant="outlined"
                    value={inputField.title}
                    onChange={event => handleChangeInput(inputField.id, event)}
                  />

                  <TextField
                    name="role"
                    select
                    label="Stream"
                    variant="outlined"
                    value={inputField.role}
                    onChange={event => handleChangeInput(inputField.id, event)}
                    style={{ width: 120 }}
                  >
                    {roles.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    name="url"
                    label="URL"
                    variant="outlined"
                    value={inputField.url}
                    onChange={event => handleChangeInput(inputField.id, event)}
                    style={{ width: 700, marginRight: 10 }}
                  />

                  <IconButton
                    disabled={inputFields.length === 1}
                    onClick={() => handleRemoveFields(inputField.id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={handleAddFields}>
                    <AddIcon />
                  </IconButton>
                </div>
              ))}
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
                    Create
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                    onClick={() => {
                      history.push('/Devotional');
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