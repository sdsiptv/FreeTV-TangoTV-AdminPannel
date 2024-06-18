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
  Chip,
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core';
import apis from 'app/api';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import { decrypt, encrypt } from 'utils/helper/cryptography.js';
import useStyles from './styles';

export default function EditVODMedia() {
  const hiddenFileInput = React.useRef(null);
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const handleImageChange = event => {
    const fileUploaded = event.target.files[0];
    setImageObj(fileUploaded);
  };

  const [videoMusic, setVideoMusic] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [url, setUrl] = useState('url');
  const [localfile, setLocalfile] = useState(0);
  const [vod_id, setVod_id] = useState();
  const [image, setImage] = useState();
  const [imageObj, setImageObj] = useState(undefined);
  const [category, setCategory] = useState('');
  const [vodCategories, setVodCategories] = useState([]);
  const [provider, setProvider] = useState('');
  const [vodProvider, setVodProvider] = useState([]);


  const [GenresData, setGenresData] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenresChange = (event) => {
    setSelectedGenres(event.target.value);
  };

  useEffect(() => {
    apis.getVodGenres().then(res => {
      setGenresData(res.data);
    });
  }, []);


  const [vodLanguage, setVodLanguage] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };


  useEffect(() => {
    apis.getLanguage().then(res => {
      setVodLanguage(res.data);
    });
  }, []);


  useEffect(() => {
    if (location.state) {
      let params = location.state.state.data;
      setValue('Title', params.title);
      setValue('TmdbId', params.tmdb_id);
      setValue('Country', params.country);
      setValue('Director', params.director);
      setValue('Actor', params.actors);
      setValue('Trailer', params.trailer);
      setValue('Language', params.language);
      setValue('Genres', params.genres);
      setValue('Duration', params.duration);
      setValue('Year', params.year);
      setValue('top_trending', params.top_trending);
      setValue('freetube_top_trending', params.freetube_top_trending);
      setValue('parental_control', params.parental_control);
      setValue('Rating', params.rating);
      setValue('TmdbRating', params.tmdb_rating);
      setValue('ReleaseDate', moment(params.releaseDate).format('YYYYMMDD'));
      setValue('Description', params.description);
      setValue('Comment', params.comments);
      setValue('urlLink', decrypt(params.url));
      setCategory(params.category_id);
      setVideoMusic(params.video_music);
      setEnabled(params.enabled);
      setImage(params.image);
      setVod_id(params.vod_id);
      setProvider(params.provider_id);
    }
  }, []);

  const textInputValue = getValues('Language');
  const selectedLanguages = selectedLanguage.join(',');
  const combinedValue = textInputValue + ',' + selectedLanguages;

  const textGenreValue = getValues('Genres');
  const selectedGenresValue = selectedGenres.join(',');
  const combinedGenresValue = textGenreValue + ',' + selectedGenresValue;

  const onSubmit = () => {
    let data = new FormData();
    data.append('title', getValues('Title'));
    data.append('tmdb_id', getValues('TmdbId'));
    data.append('country', getValues('Country'));
    data.append('director', getValues('Director'));
    data.append('actors', getValues('Actor'));
    data.append('trailer', getValues('Trailer'));
    data.append('language', combinedValue);
    data.append('genres', combinedGenresValue);
    data.append('duration', getValues('Duration'));
    data.append('year', getValues('Year'));
    data.append('rating', getValues('Rating'));
    data.append('tmdb_rating', getValues('TmdbRating'));
    data.append('releaseDate', getValues('ReleaseDate'));
    data.append('parental_control', getValues('parental_control'));
    data.append('freetube_top_trending', getValues('freetube_top_trending'));
    data.append('top_trending', getValues('top_trending'));
    data.append('description', getValues('Description'));
    data.append('comments', getValues('Comment'));
    data.append('enabled', enabled);
    data.append('video_music', videoMusic);
    data.append('category_id', category);
    data.append('provider_id', provider);
    const selectedGenresValues = selectedGenres;
    if (typeof imageObj == 'object') {
      data.append('image', imageObj);
    }
    data.append('image', image);
    data.append('url', encrypt(getValues('urlLink')));

    apis.editVodMedia(vod_id, data).then(data => {
      toastMessage('Successfully Updated');
      history.push('/VODMedia');
    });
  };

  useEffect(() => {
    apis.getVodCategory().then(res => {
      setVodCategories(res.data);
    });
  }, []);

  const getVodProvider = () => {
    apis.getVodProviders().then(res => {
      setVodProvider(res?.data);
    });
  };

  useEffect(() => {
    getVodProvider();
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                Update Video on Demand
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

            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={videoMusic}
                    onChange={e => {
                      setVideoMusic(Number(e.target.checked));
                    }}
                    name="videoMusic"
                    color="primary"
                    style={{ marginLeft: 20 }}
                  />
                }
                label="Video Music"
              />
            </Grid>

            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={enabled}
                    onChange={e => {
                      setEnabled(Number(e.target.checked));
                    }}
                    name="enabled"
                    color="primary"
                    style={{ marginLeft: 20 }}
                  />
                }
                label="Enabled"
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
                {vodCategories.map(ele => (
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
                {vodProvider.map(ele => (
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
                name="genres"
                label="Genres"
                type="text"
                id="genres"
                {...register('Genres', { required: true })}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Genres</InputLabel>
                <Select
                  multiple
                  value={selectedGenres}
                  onChange={handleGenresChange}
                  renderValue={(selectedGenre) => (
                    <div>
                      {selectedGenre.map((values) => (
                        <Chip key={values} label={GenresData.find((genres) => genres.genres_id === values).genres_name} />
                      ))}
                    </div>
                  )}
                >
                  {GenresData.map(index => (
                    <MenuItem key={index.genres_id} value={index.genres_id}>
                      <Checkbox checked={selectedGenres.includes(index.genres_id)} />
                      {index.genres_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>



            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                name="language"
                label="Language"
                type="text"
                id="language"
                {...register('Language')}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  multiple
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  renderValue={(selected) => (
                    <div>
                      {selected.map((value) => (
                        <Chip key={value} label={vodLanguage.find((language) => language.language_id === value).name} />
                      ))}
                    </div>
                  )}
                >
                  {vodLanguage.map(ele => (
                    <MenuItem key={ele.language_id} value={ele.language_id}>
                      <Checkbox checked={selectedLanguage.includes(ele.language_id)} />
                      {ele.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="duration"
                label="Duration in Mintues"
                type="number"
                id="duration"
                {...register('Duration', { required: true })}
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
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="freetube_top_trending"
                label="FreeTube Top Trending"
                type="number"
                id="freetube_top_trending"
                // InputLabelProps={{ shrink: true }}
                {...register('freetube_top_trending', { required: true })}
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
                // InputLabelProps={{ shrink: true }}
                {...register('top_trending', { required: true })}
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
                // InputLabelProps={{ shrink: true }}
                id="parental_control"
                {...register('parental_control', { required: true })}
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
                {...register('Description', { required: true })}
              />
            </Grid>

            <Grid item xs={3}>
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

            <Grid item xs={6}>
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
                    Add LOGO
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={1}
                    onChange={e => {
                      setUrl(e.target.checked);
                    }}
                    name="url"
                    color="primary"
                    style={{ marginLeft: 20 }}
                  />
                }
                label="URL"
              />
            </Grid>

            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    onChange={e => {
                      setLocalfile(e.target.checked);
                    }}
                    name="localfile"
                    color="primary"
                    style={{ marginLeft: 20 }}
                  />
                }
                label="Local File"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="urlLink"
                label="URL"
                variant="outlined"
                type="text"
                InputLabelProps={{ shrink: true }}
                {...register('urlLink')}
                style={{ width: 700, marginRight: 10 }}
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
                    type="onSubmit"
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
                      history.push('/VODMedia');
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
