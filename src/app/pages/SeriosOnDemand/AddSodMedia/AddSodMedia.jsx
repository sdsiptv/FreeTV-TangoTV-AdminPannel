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
    FormControl,
    InputLabel,
    Select,
    Chip
  } from '@material-ui/core';
  import AddIcon from '@material-ui/icons/Add';
  import RemoveIcon from '@material-ui/icons/Remove';
  import { Autocomplete } from '@material-ui/lab';
  import apis from 'app/api';
  import React, { useEffect, useState } from 'react';
  import { Controller, useForm } from 'react-hook-form';
  import { useHistory } from 'react-router-dom';
  import { GREEN, LIGHT_GREY } from 'utils/constant/color';
  import { toastMessage,failureNotification } from 'utils/helper';
  import { encrypt } from 'utils/helper/cryptography';
  import { v4 as uuidv4 } from 'uuid';
  import useStyles from './styles';
  
  export default function AddSODMedia() {
    const hiddenFileInput = React.useRef(null);
    const history = useHistory();
    const classes = useStyles();
    const { register, control, getValues, setValue, handleSubmit } = useForm();
    const [imageObj, setImageObj] = useState(undefined);
    const [category, setCategory] = useState('');
    const [sodCategories, setSodCategories] = useState([]);
    const [image, setImage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [titleId, setTitleId] = useState();
    const [title, setTitle] = useState();
    const [inputTitle, setInputTitle] = useState();
    const [provider, setProvider] = useState('');
    const [sodProvider, setSodProvider] = useState([]);
    const [isTmdbChecked, setIsTmdbChecked] = useState(true);
    const [showInputTitle, setShowInputTitle] = useState(false);
    const [tmdbId, setTmdbId] = useState('');
    const [imageUrls, setImageUrl] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [tmdbPosterPath, setTmdbPosterPath] = useState('');
  
    const [inputFields, setInputFields] = useState([
      { id: uuidv4(), title: '', url: '' },
    ]);
  
    const [vodLanguage, setVodLanguage] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState([]);
  
    const handleLanguageChange = (event) => {
      setSelectedLanguage(event.target.value);
    };
  
    useEffect(() => {
      apis.getVodLanguage().then(res => {
        setVodLanguage(res.data);
      });
    }, []);
  
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
  
    const handleImageChange = event => { 
      const fileUploaded = event.target.files[0];
      setImageObj(fileUploaded);
    };
    const onSubmit = () => {
      let data = new FormData();
      const finalTitle = isTmdbChecked ? title : getValues('Title');
      const finalTitleId = isTmdbChecked ? titleId : getValues('MovTitle');
      data.append('title', finalTitle);
      data.append('movtitle', finalTitleId);
      data.append('tmdb_id', getValues('TmdbId'));
      data.append('category_id', category);
      data.append('provider_id', provider);
      data.append('country', getValues('Country'));
      data.append('director', getValues('Director'));
      data.append('actors', getValues('Actor'));
      data.append('trailer', getValues('Trailer'));
      data.append('language', selectedLanguage);
      data.append('genres', isTmdbChecked ? getValues('Genres') : selectedGenres);
      data.append('duration', getValues('Duration'));
      data.append('year', getValues('Year'));
      data.append('rating', getValues('Rating'));
      data.append('tmdb_rating', getValues('TmdbRating'));
      data.append('releaseDate', getValues('ReleaseDate'));
      data.append('description', getValues('Description'));
      data.append('comments', getValues('Comment'));
      data.append('top_trending', getValues('top_trending'));
      data.append('parental_control', getValues('parental_control'));
      data.append('url', 'url');
      data.append('enabled', getValues('enabled') ? getValues('enabled') : 0);
      data.append(
        'video_music',
        getValues('videoMusic') ? getValues('videoMusic') : 0,
      );
      data.append('image', isChecked ? null : imageObj ? imageObj : '');
  
      data.append('image_url', imageUrls != "" ? imageUrls : '');
  
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
  
      apis.addSodMedia(data).then(data => {
        toastMessage('Successfully added');
        history.push('/SODMedia');
      })
      .catch(error => {
        if (error.response && error.response.status) {
          const statusCode = error.response.status;
          if (statusCode === 409) {
            failureNotification('Resource Already Exists');
          } else if (statusCode === 500) {
            failureNotification('Internal server error');
          } else {
            failureNotification(`An error occurred with status code: ${statusCode}`);
          }
        } else {
          console.error('API Error:', error);
          failureNotification('An error occurred while making the API request');
        }
      });
    };
  
    useEffect(() => {
      apis.getSodCatergory().then(res => {
        setSodCategories(res.data);
      });
    }, []);
  
    const getSodProvider = () => {
      apis.getSodProviders().then(res => {
        setSodProvider(res?.data);
      });
    };
  
    useEffect(() => {
      getSodProvider();
    }, []);
  
  
    const handleGetMovieDetails = id => {
      if (!id) {
        setValue('Actors', '');
        setValue('TmdbId', '');
        setValue('Director', '');
        setValue('Description', '');
        setValue('ReleaseDate', '');
        setValue('Language', '');
        setValue('Genres', '');
        setValue('Actor', '');
        setValue('Duration', '');
        setValue('Rating', '');
        setValue('TmdbRating', '');
        setValue('Country', '');
        setValue('Year', '');
        return;
      }
  
      if (isTmdbChecked) {
        apis.getTMDBTVData(id)
          .then(res => {
            if (res.status === 404) {
              console.error('TV show not found');
              setValue("")
            } else {
              let info = res;
              let cast = [];
              let director = info.credits.crew.find(({ job }) => job === 'Director');
              for (var i = 0; i <= 2; i++) {
                cast.push(info.credits.cast[i].name);
              }
              let temp = cast.toString();
              setValue('Actor', temp);
              let genre_info = [];
              for (var j = 0; j < info.genres.length; j++) {
                genre_info.push(info.genres[j].id);
              }
  
              setTmdbPosterPath(info.poster_path);
  
              setValue('TmdbId', info.id);
              setValue('Director', info.created_by[0]?.name);
              setValue('Description', info.overview);
              setValue('ReleaseDate', info.first_air_date);
              setValue('Duration', info.episode_run_time);
              setValue('Language', info.original_language);
              setValue('Genres', genre_info);
              setValue('Rating', info.vote_average);
              setValue('TmdbRating', info.popularity);
              setValue('Country', info.production_countries[0]?.name);
              setValue('Year', info?.first_air_date ? new Date(info?.first_air_date).getFullYear() : '',);
            }
          })
          .catch(error => {
            console.error('Error fetching TV show data:', error);
          });
      } else {
        const director = getValues('Director');
        const info = {
          overview: getValues('Description'),
        };
        const release_date = getValues('ReleaseDate');
        const duration = getValues('Duration');
        const rating = getValues('Rating');
        const tmdbrating = getValues('TmdbRating');
        const country = getValues('Country');
        const year = getValues('Year');
        const urlImage = getValues('urlImage');
  
        setValue('Director', director);
        setValue('Description', info.overview);
        setValue('ReleaseDate', release_date);
        setValue('Duration', duration);
        setValue('Rating', rating);
        setValue('TmdbRating', tmdbrating);
        setValue('Country', country);
        setValue('Year', year);
        setValue('urlImage', urlImage);
      }
    };
  
    const handleGetTvIdDetails = id => {
      if (!id) {
        setValue('Actors', '');
        setValue('Director', '');
        setValue('Description', '');
        setValue('ReleaseDate', '');
        setValue('Duration', '');
        setValue('Rating', '');
        setValue('TmdbRating', '');
        setValue('Country', '');
        setValue('Year', '');
        return;
      }
  
      if (isTmdbChecked) {
  
        apis.getTMDBTvId(id)
          .then(res => {
            if (res.status === 404) {
              console.error('TV show not found');
              setValue("")
            } else {
              let info = res;
              let cast = [];
              let director = info.credits.crew.find(({ job }) => job === 'Director');
              for (var i = 0; i <= 2; i++) {
                cast.push(info.credits.cast[i].name);
              }
              let temp = cast.toString();
              setValue('Actor', temp);
              let genre_info = [];
              for (var j = 0; j < info.genres.length; j++) {
                genre_info.push(info.genres[j].name);
              }
  
              setTmdbPosterPath(info.poster_path);
  
              setTitle(info.title)
              setInputTitle(info.name);
              setTitle(info.name)
              setShowInputTitle(true);
              setValue('MovTitle', info.name);
  
              setValue('TmdbId', info.id);
              setValue('Director', info.created_by[0]?.name);
              setValue('Description', info.overview);
              setValue('ReleaseDate', info.first_air_date);
              setValue('Duration', info.episode_run_time);
              setValue('Language', info.original_language);
              setValue('Genres', genre_info);
              setValue('Rating', info.vote_average);
              setValue('TmdbRating', info.popularity);
              setValue('Country', info.production_countries[0]?.name);
              setValue('Year', info?.first_air_date ? new Date(info?.first_air_date).getFullYear() : '',);
            }
          })
          .catch(error => {
            console.error('Error fetching TV show data:', error);
          });
      } else {
        const director = getValues('Director');
        const info = {
          overview: getValues('Description'),
        };
        const release_date = getValues('ReleaseDate');
        const duration = getValues('Duration');
        const rating = getValues('Rating');
        const tmdbrating = getValues('TmdbRating');
        const country = getValues('Country');
        const year = getValues('Year');
  
        setValue('Director', director);
        setValue('Description', info.overview);
        setValue('ReleaseDate', release_date);
        setValue('Duration', duration);
        setValue('Rating', rating);
        setValue('TmdbRating', tmdbrating);
        setValue('Country', country);
        setValue('Year', year);
      }
    };
  
    const handleTmdbIdChange = (event) => {
      setTmdbId(event.target.value);
    };
    const handleGetMovie = query => {
      apis.getTMDBTvSearch(query).then(res => {
        let result = res?.results;
        let dataList = result?.map(value => {
          return {
            value: value.name,
            id: value.id,
          };
        });
        setMovieList(dataList);
      });
    };
  
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
  
    const handleCheckboxChange = (e) => {
      setIsChecked(e.target.checked);
      if (!e.target.checked) {
        setImageUrl('');
        setImage('');
        setImageObj(null);
        hiddenFileInput.current.value = '';
      } else {
        const fullImageUrl = "https://image.tmdb.org/t/p/w500/" + tmdbPosterPath;
        setImageUrl(fullImageUrl);
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
                  Add Series on Demand
                </Typography>
              </Grid>
  
              <Grid item xs={6}>
                {isTmdbChecked ? (
                  <Autocomplete
                    value={title}
                    options={movieList}
                    getOptionLabel={option => option.value}
                    onChange={(event, newTitle) => {
                      setTitle(newTitle?.value);
                      setTmdbId(newTitle?.id);
                      handleGetMovieDetails(newTitle?.id);
                    }}
                    inputValue={inputTitle}
                    onInputChange={(event, newInputTitle) => {
                      setInputTitle(newInputTitle);
                      if (newInputTitle?.length > 0) {
                        handleGetMovie(newInputTitle);
                      }
                    }}
                    id="title"
                    renderInput={params => (
                      <TextField {...params} label="Title" variant="outlined" />
                    )}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="title"
                    label="Title"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    id="title"
                    {...register('Title')}
                  />
                )}
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
  
              <Grid item xs={2}>
                <Controller
                  name="tmdbChecked"
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormControlLabel
                        label="Tv Shows"
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
                {isTmdbChecked ? (
                  <div style={{ display: "flex" }}>
                    <Grid item xs={8}>
                      {/* Input for tmdbId */}
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="tmdbId"
                        label="tmdb id"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        id="tmdbId"
                        {...register('TmdbId', { required: true })}
                        helperText={"TMDB ID will be Only in Numbers"}

                        value={tmdbId}
                        onChange={handleTmdbIdChange}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      {/* Button to get movie details */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleGetTvIdDetails(tmdbId)}
                        style={{ marginTop: "8px", marginLeft: "5px" }}
                      >
                        Get
                      </Button>
                    </Grid>
  
                  </div>
                ) : (
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="tmdbId"
                    label="tmdb id"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    id="tmdbId"
                    {...register('TmdbId', { required: true })}
                    helperText={"TMDB ID will be Only in Numbers"}

                  />
                )}
  
              </Grid>
  
              <Grid item xs={6}>
                <div>
                  {showInputTitle && (
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="Tmdb title"
                      label="Tmdb Title"
                      type="text"
                      InputLabelProps={{ shrink: true }}
                      id="title"
                      {...register('MovTitle', { required: true })}
                      disabled
                    />
                  )}
                </div>
  
              </Grid>
  
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  select
                  name="category"
                  label="Category"
                  type="text"
                  id="category"
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
                  type="text"
                  id="trailer"
                  {...register('Trailer', { required: true })}
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
                {isTmdbChecked ? (
                  <Grid item >
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Genres"
                    label="Genres"
                    type="text"
                    id="Genres"
                    InputLabelProps={{ shrink: true }}
                    {...register('Genres', { required: true })}
                  />
                </Grid>
                ) : (
                  <Grid item >
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
                )}
              </Grid>
  
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="duration"
                  InputLabelProps={{ shrink: true }}
                  label="Episode Duration in Minutes"
                  type="number"
                  id="duration"
                  {...register('Duration', { required: true })}
                  helperText={"Episode will be Only in Minutes"}

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
                  {...register('Year', { required: true })}
                  helperText={"Year will be Only in Number"}

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
                  {...register('Rating', { required: true })}
                  helperText={"Rating will be Only in Number"}

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
                  InputLabelProps={{ shrink: true }}
                  id="tmdbRating"
                  {...register('TmdbRating', { required: true })}
                  helperText={"TMDB Rating will be Only in Number"}

                />
              </Grid>
  
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="releaseDate"
                  InputLabelProps={{ shrink: true }}
                  label="Release Date"
                  placeholder="Date in YYYYMMDD Format"
                  type="text"
                  id="releaseDate"
                  {...register('ReleaseDate', { required: true })}
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
                InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
                  type="text"
                  id="description"
                  {...register('Description', { required: true })}
                />
              </Grid>
  
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="comment"
                  InputLabelProps={{ shrink: true }}
                  label="Comment"
                  type="text"
                  id="comment"
                  {...register('Comment', { required: true })}
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
                    disabled={isChecked}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      htmlFor="contained-button-file"
                      disabled={isChecked}
                    >
                      Add LOGO *
                    </Button>
                  </label>
                  {imageObj instanceof File && !isChecked && ( 
                    <img
                      src={URL.createObjectURL(imageObj)}
                      alt=""
                      style={{ paddingLeft: '10px', width: '100px' }}
                    />
                  )}
                  {image && !isChecked && ( 
                    <img
                      src={imageObj}
                      alt=""
                      style={{ paddingLeft: '10px', width: '100px' }}
                    />
                  )}
                </div>
              </Grid>
  
  
              <Grid item xs={12}>
                <Grid item xs={6}>
                  <div>
                    <div>
                      <label>
                        <Checkbox
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                        Include URL
                      </label>
                    </div>
                    {isChecked && (
                      <div style={{ display: 'flex' }}>
                        <div>
  
                          <TextField
                            name="urlImage"
                            label="Image URL"
                            type="text"
                            variant="outlined"
                            id='urlImage'
                            value={imageUrls}
                            {...register('urlImage')}
                            onChange={(e) => setImageUrl(e.target.value)}
                            disabled
                          />
                        </div>
                        {imageUrls && (
                          <div>
                            <img
                              src={imageUrls}
                              alt="Preview"
                              style={{ paddingLeft: '10px', width: '100px' }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Grid>
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
                      Add
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
  