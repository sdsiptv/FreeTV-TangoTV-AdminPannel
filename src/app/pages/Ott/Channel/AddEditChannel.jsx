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

export default function AddEditOTTChannels({ pageMode = 'add' }) {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [OTTCategory, setOTTCategory] = useState([]);
  const [shrinkInputProps, setShrinkInputProps] = useState(false);
  const [providerData, setProviderData] = useState([]);
  const [selectedOTTCategory, setSelectedOTTCategory] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');

  const [logoObj, setLogoObj] = useState(undefined);
  const [logoImage, setLogoImage] = useState('');
  const hiddenLogoFileInput = React.useRef(null);

  const [bdObj, setBdObj] = useState(undefined);
  const [bdImage, setBdImage] = useState('');
  const hiddenBDFileInput = React.useRef(null);




  const onLogoFileChange = event => {
    const fileUploaded = event.target.files[0];
    setLogoObj(fileUploaded);
  };

  const onBDFileChange = event => {
    const fileUploaded = event.target.files[0];
    setBdObj(fileUploaded);
  };

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { enabled: false },
  });

  useEffect(() => {
    getOTTCategories();
  }, []);

  useEffect(() => {
    getOTTProvider();
  }, []);

  const onSubmit = ({
    title,
    genre,
    language,
    platform,
    type,
    availability,
    country,
    season,
    episode,
    tmdb_id,
    imdb_id,
    cast,
    director,
    lead_actors,
    duration,
    release_year,
    release_date,
    description,
    tmdb_rating,
    imdb_rating,
    certificate,
    age_restriction,
    image_url,
    source_url,
    audio_language,
    top_trending,
    parental_control,
  }) => {
    let data = new FormData();
    data.append('title', title);
    data.append('genre', genre);
    data.append('language', language);
    data.append('platform', platform);
    data.append('type', type);
    data.append('availability', availability);
    data.append('country', country);
    data.append('season', season);
    data.append('episode', episode);
    data.append('tmdb_id', tmdb_id);
    data.append('imdb_id', imdb_id);
    data.append('cast', cast);
    data.append('director', director);
    data.append('lead_actors', lead_actors);
    data.append('duration', duration);
    data.append('release_year', release_year);
    data.append('release_date', release_date);
    data.append('description', description);
    data.append('tmdb_rating', tmdb_rating);
    data.append('imdb_rating', imdb_rating);
    data.append('certificate', certificate);
    data.append('age_restriction', age_restriction);
    data.append('image_url', image_url);
    data.append('source_url', source_url);
    data.append('top_trending', top_trending);
    data.append('parental_control', parental_control);
    data.append('audio_language', audio_language);
    data.append('category_id', selectedOTTCategory);

    data.append('logo', logoObj);
    data.append('backdrop', bdObj);

    const selectedProvider = '';

    const apiCall =
      pageMode === 'add'
        ? apis.addOTTChannel(data)
        : apis.editOTTChannel(location.state.state.data?.ott_id, data);

    apiCall
      .then(res => {
        toastMessage(
          pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
        );
        history.push('/OTTChannel');
      })
      .catch(err => {
        failureNotification('Network error');
      });
  };
  const getOTTProvider = () => {
    apis.getOTTProvider()
      .then(res => {
        setProviderData(res?.data);
      })
      .catch(error => {
        console.error("Error fetching provider data:", error);
      });
  }

  const getOTTCategories = () => {
    apis
      .getOTTCategory()
      .then(res => {
        setOTTCategory(res?.data);
        if (pageMode !== 'add' && location.state) {
          let params = location.state.state.data;
          getDetailedOTTChannel(params.ott_id);
        } else {
          setShrinkInputProps(true);
        }
      })
      .catch(() => {
        failureNotification('Network error');
      });
  };

  const getDetailedOTTChannel = ottId => {
    apis
      .getDetailedOTTChannel(ottId)
      .then(res => {
        let data = res?.data[0];
        setValue('title', data?.title);
        setValue('genre', data?.genre);
        setValue('language', data?.language);
        // setValue('platform', data?.platform);
        setValue('type', data?.type);
        setValue('availability', data?.availability);
        setValue('country', data?.country);
        setValue('season', data?.season);
        setValue('episode', data?.episode);
        setValue('tmdb_id', data?.tmdb_id);
        setValue('imdb_id', data?.imdb_id);
        setValue('cast', data?.cast);
        setValue('director', data?.director);
        setValue('lead_actors', data?.lead_actors);
        setValue('duration', data?.duration);
        setValue('release_year', data?.release_year);
        setValue('release_date', data?.release_date);
        setValue('description', data?.description);
        setValue('top_trending', data?.top_trending);
        setValue('parental_control', data?.parental_control);
        setValue('tmdb_rating', data?.tmdb_rating);
        setValue('imdb_rating', data?.imdb_rating);
        setValue('certificate', data?.certificate);
        setValue('age_restriction', data?.age_restriction);
        setValue('image_url', data?.image_url);
        setValue('source_url', data?.source_url);
        setValue('audio_language', data?.audio_language);

        setSelectedOTTCategory(data?.category_id);
        setSelectedProvider(data?.platform)
        setLogoImage(data?.logo);
        setBdImage(data?.backdrop_image);
        setShrinkInputProps(true);
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
                {pageMode === 'add' ? 'Add' : 'Edit'} OTT Channel
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
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
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="genre"
                label="Genre"
                type="text"
                id="genre"
                {...register('genre', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="language"
                label="Language"
                type="text"
                id="language"
                {...register('language', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                select
                fullWidth
                name="platform"
                label="Platform"
                type="text"
                id="platform"
                {...register('platform')}
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
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="type"
                label="Type"
                type="text"
                id="type"
                {...register('type', { required: true })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="availability"
                label="Availability"
                type="text"
                id="availability"
                {...register('availability', { required: true })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="country"
                label="Country"
                type="text"
                id="country"
                {...register('country', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="season"
                label="Season"
                type="number"
                id="season"
                {...register('season', { required: true })}
                helperText={"Season will be Only in Numbers"}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="episode"
                label="Episode"
                type="number"
                id="episode"
                {...register('episode', { required: true })}
                helperText={"Episodes will be Only in Numbers"}

              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="tmdb_id"
                label="TMDB ID"
                type="number"
                id="tmdb_id"
                {...register('tmdb_id', { required: true })}
                helperText={"TMDB ID will be Only in Numbers"}

              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="imdb_id"
                label="IMDB ID"
                type="number"
                id="imdb_id"
                {...register('imdb_id', { required: true })}
                helperText={"IMDB ID will be Only in Numbers"}

              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="cast"
                label="Cast"
                type="text"
                id="cast"
                {...register('cast', { required: true })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="director"
                label="Director"
                type="text"
                id="director"
                {...register('director', { required: true })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="lead_actors"
                label="Lead Actors"
                type="text"
                id="lead_actors"
                {...register('lead_actors', { required: true })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="duration"
                label="Duration"
                type="number"
                id="duration"
                {...register('duration', { required: true })}
                helperText={"Duration will be Only in Minutes"}

              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="release_year"
                label="Release Year"
                type="number"
                id="release_year"
                placeholder="YYYY"
                {...register('release_year', { required: true })}
                helperText={"Use Format Only YYYY"}

              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="release_date"
                label="Release Date"
                type="text"
                id="release_date"
                placeholder="Date in YYYY-MM-DD Format"
                {...register('release_date', { required: true })}
                helperText={"Use Format YYYY-MM-DD"}
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
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="tmdb_rating"
                label="TMDB Rating"
                type="number"
                id="tmdb_rating"
                {...register('tmdb_rating', { required: true })}
                helperText={"TMDB Rating will be Only in Numbers"}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="imdb_rating"
                label="IMDB Rating"
                type="number"
                id="imdb_rating"
                {...register('imdb_rating', { required: true })}
                helperText={"IMDB Rating will be Only in Numbers"}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="certificate"
                label="Certificate"
                type="text"
                id="certificate"
                {...register('certificate', { required: true })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="age_restriction"
                label="Age Restriction"
                type="text"
                id="age_restriction"
                {...register('age_restriction', { required: true })}
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
                InputLabelProps={{ shrink: shrinkInputProps }}
                size="small"
                value={selectedOTTCategory}
                type="text"
                onChange={e => {
                  setSelectedOTTCategory(e.target.value);
                }}
              >
                {OTTCategory.map(ele => (
                  <MenuItem key={ele.categoryId} value={ele.categoryId}>
                    {ele.categoryName}
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
                name="image_url"
                label="Image URL"
                type="text"
                id="image_url"
                {...register('image_url', { required: true })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="source_url"
                label="Source URL"
                type="text"
                id="source_url"
                {...register('source_url', { required: true })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
                required
                fullWidth
                name="audio_language"
                label="Audio Language"
                type="text"
                id="audio_language"
                {...register('audio_language', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
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

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: shrinkInputProps }}
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
              <div style={{ display: 'flex' }}>
                <input
                  type="file"
                  accept="image/*"
                  ref={hiddenBDFileInput}
                  style={{ display: 'none' }}
                  onChange={onBDFileChange}
                  id="contained-bd-file"
                />
                <label htmlFor="contained-bd-file">
                  <Button variant="contained" color="primary" component="span">
                    Add Backdrop
                  </Button>
                </label>
                <img
                  src={
                    typeof bdObj == 'object'
                      ? URL.createObjectURL(bdObj)
                      : bdImage
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
                      history.push('/OTTChannel');
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
