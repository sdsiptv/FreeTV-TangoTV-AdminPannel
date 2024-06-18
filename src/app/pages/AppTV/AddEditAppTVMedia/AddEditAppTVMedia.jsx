import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  MenuItem,
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
import moment from 'moment';

export default function AddEditAppTVMedia({ pageMode = 'add' }) {
  const hiddenFileInput = React.useRef(null);
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [imageObj, setImageObj] = useState(undefined);
  const [image, setImage] = useState('');
  const { register, handleSubmit, control, setValue } = useForm();
  const [category, setCategory] = useState('');
  const [appTVCategory, setAppTVCategory] = useState([]);
  const [provider, setProvider] = useState('');
  const [appTVProviders, setAppTVProviders] = useState([]);
  const [isTmdbChecked, setIsTmdbChecked] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [videoMusic, setVideoMusic] = useState(false);

  const handleImageChange = event => {
    const fileUploaded = event.target.files[0];
    setImageObj(fileUploaded);
  };

  const onSubmit = ({
    channel_id,
    title,
    tmdb_id,
    country,
    director,
    actors,
    trailer,
    duration,
    year,
    rating,
    tmdb_rating,
    releaseDate,
    description,
    comments,
    top_trending,
    parental_control,
    url,
  }) => {
    let data = new FormData();
    data.append('channel_id', channel_id);
    data.append('title', title);
    data.append('tmdb_id', tmdb_id);
    data.append('category_id', category);
    data.append('provider_id', provider);
    data.append('country', country);
    data.append('director', director);
    data.append('actors', actors);
    data.append('trailer', trailer);
    data.append('duration', duration);
    data.append('year', year);
    data.append('rating', rating);
    data.append('tmdb_rating', tmdb_rating);
    data.append('releaseDate', releaseDate);
    data.append('description', description);
    data.append('top_trending', top_trending);
    data.append('parental_control', parental_control);
    data.append('comments', comments);
    data.append('url', url);
    data.append('enabled', enabled ? '1' : '0');
    data.append('video_music', videoMusic ? '1' : '0');
    data.append('image', imageObj);


    const apiCall =
      pageMode === 'add'
        ? apis.addAppTVMedia(data)
        : apis.editAppTVMedia(location.state.state.data?.apptv_id, data);
    apiCall
      .then(res => {
        toastMessage(
          pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
        );
        history.push('/AppTVMedia');
      })
      .catch(err => {
        failureNotification('Network error');
      });
  };

  useEffect(() => {
    if (location.state) {
      let params = location.state.state.data;
      setValue('channel_id', params.channel_id);
      setValue('title', params.title);
      setValue('tmdb_id', params.tmdb_id);
      setProvider(params.provider_id);
      setCategory(params.category_id);
      setValue('country', params.country);
      setValue('director', params.director);
      setValue('actors', params.actors);
      setValue('trailer', params.trailer);
      setValue('duration', params.duration);
      setValue('year', params.year);
      setValue('rating', params.rating);
      setValue('tmdb_rating', params.tmdb_rating);
      setValue('releaseDate', moment(params.releaseDate).format('YYYYMMDD'));
      setValue('description', params.description);
      setValue('top_trending', params.top_trending);
      setValue('parental_control', params.parental_control);
      setValue('comments', params.comments);
      setValue('url', params.url);
      setEnabled(params.enabled);
      setVideoMusic(params.video_music);
      setImage(params.image);
    } else {
      history.push('/AddAppTVMedia');
    }
  }, []);

  const getAppTVProviders = () => {
    apis.getAppTVProviders().then(res => {
      setAppTVProviders(res?.data);
    });
  };

  const getAppTVCategory = () => {
    apis.getAppTVCategory().then(res => {
      setAppTVCategory(res?.data);
    });
  };

  useEffect(() => {
    getAppTVProviders();
    getAppTVCategory();
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                {pageMode === 'add' ? 'ADD' : 'EDIT'} APP TV MEDIA
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
                InputLabelProps={{ shrink: true }}
                id="title"
                {...register('title', { required: true })}
              />
            </Grid>

            <Grid item xs={2}>
              <Controller
                name="videoMusic"
                control={control}
                render={({ field }) => {
                  return (
                    <FormControlLabel
                      label="VideoMusic"
                      control={
                        <Checkbox
                          checked={videoMusic}
                          onChange={e => {
                            setVideoMusic(e.target.checked);
                            field.onChange(e.target.checked);
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
                          checked={enabled}
                          onChange={e => {
                            setEnabled(e.target.checked);
                            field.onChange(e.target.checked);
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
                name="tmdbChecked"
                control={control}
                render={({ field }) => {
                  return (
                    <FormControlLabel
                      label="TMDb"
                      control={
                        <Checkbox
                          checked={isTmdbChecked}
                          onChange={e => {
                            setIsTmdbChecked(e.target.checked);
                            field.onChange(e.target.checked);
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
                name="channel_id"
                label="Channel Id"
                type="number"
                InputLabelProps={{ shrink: true }}
                id="channel_id"
                {...register('channel_id', { required: true })}
                helperText={"Channel ID will be Only in Numbers"}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="tmdb_id"
                label="Tmdb_id"
                type="number"
                InputLabelProps={{ shrink: true }}
                id="tmdb_id"
                {...register('tmdb_id', { required: true })}
                helperText={"TMDB ID will be Only in Numbers"}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                select
                name="category"
                label="Category"
                type="text"
                id="category_id"
                value={category}
                onChange={e => {
                  setCategory(e.target.value);
                }}
              >
                {appTVCategory.map(ele => (
                  <MenuItem key={ele.categoryId} value={ele.categoryId}>
                    {ele.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                select
                name="provider"
                label="Provider"
                type="text"
                id="provider_id"
                value={provider}
                onChange={e => {
                  setProvider(e.target.value);
                }}
              >
                {appTVProviders.map(ele => (
                  <MenuItem key={ele.providerId} value={ele.providerId}>
                    {ele.providerName}
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
                InputLabelProps={{ shrink: true }}
                id="country"
                {...register('country', { required: true })}
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
                InputLabelProps={{ shrink: true }}
                id="director"
                {...register('director', { required: true })}
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
                InputLabelProps={{ shrink: true }}
                id="actors"
                {...register('actors', { required: true })}
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
                InputLabelProps={{ shrink: true }}
                id="trailer"
                {...register('trailer', { required: true })}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="duration"
                label="Duration in minutes"
                type="number"
                InputLabelProps={{ shrink: true }}
                id="duration"
                {...register('duration', { required: true })}
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
                InputLabelProps={{ shrink: true }}
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
                name="rating"
                label="Rating"
                type="number"
                InputLabelProps={{ shrink: true }}
                id="rating"
                {...register('rating', { required: true })}
                helperText={"Rating will be Only in Numbers"}

              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="tmdb_rating"
                label="tmdb_rating"
                type="number"
                InputLabelProps={{ shrink: true }}
                id="tmdb_rating"
                {...register('tmdb_rating', { required: true })}
                helperText={"TMDB Rating will be Only in Numbers"}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="releaseDate"
                label="Release Date (in YYYYMMDD)"
                placeholder="Date in YYYYMMDD Format"
                type="text"
                InputLabelProps={{ shrink: true }}
                id="releaseDate"
                {...register('releaseDate', { required: true })}
                helperText={"Use Format YYYY-MM-DD"}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="top_trending"
                label="Top Trending"
                type="number"
                InputLabelProps={{ shrink: true }}
                id="top_trending"
                {...register('top_trending', { required: true })}
                helperText={"Top Trending will be Only in Numbers"}

              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="parental_control"
                label="Parental Control"
                type="number"
                InputLabelProps={{ shrink: true }}
                id="parental_control"
                {...register('parental_control', { required: true })}
                helperText={"Parental Control will be Only in 0 or 1"}
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
                InputLabelProps={{ shrink: true }}
                id="description"
                {...register('description', { required: true })}
              />
            </Grid>
           
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="comments"
                label="Comments"
                type="text"
                InputLabelProps={{ shrink: true }}
                id="comments"
                {...register('comments', { required: true })}
              />
            </Grid>

            <Grid item xs={3}>
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
                          checked={true}
                          onChange={e => {
                            field.onChange(e);
                            setValue('url', Number('url'));
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
              <div>
                <TextField
                  name="url"
                  label="URL"
                  variant="outlined"
                  type="text"
                  InputLabelProps={{ shrink: true }}
                  {...register('url')}
                  style={{ width: 700, marginRight: 10 }}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <Button
                required
                fullWidth
                style={{ backgroundColor: 'white', height: 100 }}
              >
                Drop a video or Click
              </Button>
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
                      history.push('/AppTVMedia');
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
