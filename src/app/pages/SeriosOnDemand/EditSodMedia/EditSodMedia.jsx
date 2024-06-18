import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import apis from 'app/api';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import { decrypt, encrypt } from 'utils/helper/cryptography';
import { v4 as uuidv4 } from 'uuid';
import useStyles from './styles';

export default function EditSODMedia() {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const { register, handleSubmit, control, setValue, watch, getValues } =
    useForm();
  const hiddenFileInput = React.useRef(null);

  const [image, setImage] = useState();
  const [imageObj, setImageObj] = useState(undefined);
  const [sod_id, setSod_id] = useState();
  const [category, setCategory] = useState('');
  const [sodCategories, setSodCategories] = useState([]);
  const [provider, setProvider] = useState('');
  const [sodProvider, setSodProvider] = useState([]);

  const handleImageChange = event => {
    const fileUploaded = event.target.files[0];
    setImageObj(fileUploaded);
  };

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), title: '', url: '' },
  ]);

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), title: '', url: '' }]);
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
    if (location.state) {
      let params = location.state.state.data;
      setValue('Title', params.title);
      setValue('TmdbId', params.tmdb_id);
      setValue('Country', params.country);
      setValue('Director', params.director);
      setValue('Actor', params.actors);
      setValue('Trailer', params.trailer);
      setValue('Duration', params.duration);
      setValue('Language', params.language);
      setValue('Genres', params.genres);
      setValue('Year', params.year);
      setValue('Rating', params.rating);
      setValue('TmdbRating', params.tmdb_rating);
      setValue('ReleaseDate', moment(params.releaseDate).format('YYYY-MM-DD'));
      setValue('top_trending', params.top_trending);
      setValue('parental_control', params.parental_control);
      setValue('Description', params.description);
      setValue('Comment', params.comments);
      setValue('videoMusic', params.video_music);
      setValue('enabled', params.enabled);
      setValue('url', params.url);
      setImage(params.image);
      setSod_id(params.sod_id);
      setCategory(params.category_id);
      setProvider(params.provider_id);
    }
  }, []);

  const onSubmit = () => {
    let data = new FormData();
    data.append('title', getValues('Title'));
    data.append('tmdb_id', getValues('TmdbId'));
    data.append('country', getValues('Country'));
    data.append('director', getValues('Director'));
    data.append('actors', getValues('Actor'));
    data.append('trailer', getValues('Trailer'));
    data.append('duration', getValues('Duration'));
    data.append('genres', getValues('Genres'));
    data.append('language', getValues('Language'));
    data.append('year', getValues('Year'));
    data.append('rating', getValues('Rating'));
    data.append('tmdb_rating', getValues('TmdbRating'));
    data.append('releaseDate', getValues('ReleaseDate'));
    data.append('parental_control', getValues('parental_control'));
    data.append('top_trending', getValues('top_trending'));
    data.append('description', getValues('Description'));
    data.append('comments', getValues('Comment'));
    data.append('url', 'url');
    data.append('enabled', getValues('enabled'));
    data.append('video_music', getValues('videoMusic'));
    data.append('category_id', category);
    data.append('provider_id', provider);

    let encryptedData = [];
    inputFields.map(e => {
      let json = {
        id: e?.id,
        title: e?.title,
        url: encrypt(e?.url), 
      };
      encryptedData.push(json);
    });

    data.append('episodes', JSON.stringify(encryptedData));

    data.append('image', imageObj);

    apis.editSodMedia(sod_id, data).then(data => {
      toastMessage('Successfully Updated');
      history.push('/SODMedia');
    });
  };

  const getSodCategories = () => {
    apis.getSodCatergory().then(res => {
      setSodCategories(res.data);
    });
  };

  const getSodProvider = () => {
    apis.getSodProviders().then(res => {
      setSodProvider(res?.data);
    });
  };

  useEffect(() => {
    getSodProvider();
  }, []);

  const getSodEpisodes = () => {
    apis.getSodEpisode(location.state.state.data.sod_id).then(res => {
      let urlData = res.data;
      if (urlData.length > 0) {
        let decryptedData = [];
        urlData.map(e => {
          let json = {
            id: e?.id,
            mod_id: e?.mod_id,
            title: e?.title,
            url: decrypt(e?.url),
          };
          decryptedData.push(json);
        });
        setInputFields(decryptedData);
      }
    });
  };

  useEffect(() => {
    getSodCategories();
    getSodEpisodes.apply();
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                Edit Series on Demand
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
                {...register('Title', { required: true })}
              />
            </Grid>

            <Grid item xs={2}>
              <Controller
                name="videoMusic"
                control={control}
                render={({ field }) => {
                  return (
                    <FormControlLabel
                      label="Video Music"
                      control={
                        <Checkbox
                          checked={watch('videoMusic') === 1}
                          onChange={e => {
                            field.onChange(e);
                            setValue(
                              'videoMusic',
                              Number(getValues('videoMusic')),
                            );
                          }}
                        />
                      }
                    />
                  );
                }}
              />
            </Grid>

            <Grid item xs={2}>
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

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="tmdbId"
                label="tmdb id"
                type="number"
                id="tmdbId"
                {...register('TmdbId', { required: true })}
                helperText={"TMDB ID will be Only in Number"}

              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                select
                name="Category"
                label="Category"
                type="text"
                id="Category"
                value={category}
                onChange={e => {
                  setCategory(e.target.value);
                }}
              >
                {sodCategories.map(ele => (
                  <MenuItem key={ele.categoryId} value={ele.categoryId}>
                    {ele.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                select
                name="providers"
                label="Providers"
                type="text"
                id="providers"
                value={provider}
                onChange={e => {
                  setProvider(e.target.value);
                }}
              >
                {sodProvider.map(ele => (
                  <MenuItem key={ele.sno} value={ele.sno}>
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
                name="country"
                label="Country"
                type="text"
                id="country"
                {...register('Country', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="director"
                label="Director"
                type="text"
                id="director"
                {...register('Director', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="actors"
                label="Actors"
                type="text"
                id="actors"
                {...register('Actor', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="trailer"
                label="Trailer"
                type="text"
                id="trailer"
                {...register('Trailer', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="language"
                InputLabelProps={{ shrink: true }}
                label="Language"
                type="text"
                id="language"
                {...register('Language', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="genres"
                InputLabelProps={{ shrink: true }}
                label="Genres"
                type="text"
                id="genres"
                {...register('Genres', { required: true })}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="duration"
                label="Duration in Minutes"
                type="number"
                id="duration"
                {...register('Duration', { required: true })}
                helperText={"Duration will be Only in Minutes"}

              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="year"
                label="Year"
                type="number"
                id="year"
                {...register('Year', { required: true })}
                helperText={"Year will be Only in Numbers"}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="rating"
                label="Rating"
                type="number"
                id="rating"
                {...register('Rating', { required: true })}
                helperText={"Rating will be Only in Numbers"}

              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="tmdbRating"
                label="tmdb Rating"
                type="number"
                id="tmdbRating"
                {...register('TmdbRating', { required: true })}
                helperText={"TMDB Rating will be Only in Numbers"}

              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="releaseDate"
                label="Release Date"
                type="text"
                id="releaseDate"
                {...register('ReleaseDate', { required: true })}
                helperText={"Use Format YYYY-MM-DD"}

              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="description"
                label="Description"
                type="text"
                id="description"
                {...register('Description', { description: true })}
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
                name="comment"
                label="Comment"
                type="text"
                id="comment"
                {...register('Comment', { required: true })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <div>
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
                    Upload
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
              <Typography component="h6" variant="h6" style={{ fontSize: 15 }}>
                Select a way
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Controller
                name="url"
                control={control}
                render={({ field }) => {
                  return (
                    <FormControlLabel
                      label="URL"
                      control={
                        <Checkbox
                          checked={1}
                          onChange={e => {
                            field.onChange(e);
                          }}
                        />
                      }
                    />
                  );
                }}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                name="localfile"
                control={control}
                render={({ field }) => {
                  return (
                    <FormControlLabel
                      label="Local File"
                      control={
                        <Checkbox
                          checked={false}
                          onChange={e => {
                            field.onChange(e);
                          }}
                        />
                      }
                    />
                  );
                }}
              />
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
                    name="url"
                    label="URl "
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
                    Update
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                    onClick={() => {
                      history.push('/SODMedia');
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
