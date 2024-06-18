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
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import { encrypt } from 'utils/helper/cryptography.js';
import { v4 as uuidv4 } from 'uuid';
import useStyles from './styles';

export default function AddMODMedia() {
  const history = useHistory();
  const classes = useStyles();
  const [category, setCategory] = useState('');
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), title: '', url: '' },
  ]);
  const [modCategories, setModCategories] = useState([]);
  const [imageObj, setImageObj] = useState(undefined);
  const [image, setImage] = useState('');
  const hiddenFileInput = React.useRef(null);

  const handleImageChange = event => {
    const fileUploaded = event.target.files[0];
    setImageObj(fileUploaded);
  };

  useEffect(() => {
    apis.getModCategory().then(res => {
      setModCategories(res.data);
    });
  }, []);

  const { register, handleSubmit, control, setValue, getValues, watch } =
    useForm();
  const onSubmit = ({
    Title,
    Genre,
    Country,
    Director,
    Duration,
    Year,
    ReleaseDate,
    Description,
    Comment,
    videoMusic,
    enabled,
    top_trending,
    parental_control,
    url,
  }) => {
    let formData = new FormData();
    formData.append('title', Title);
    // formData.append('genre', Genre);
    formData.append('country', Country);
    formData.append('director', Director);
    formData.append('duration', Duration);
    formData.append('year', Year);
    formData.append('releaseDate', ReleaseDate);
    formData.append('description', Description);
    formData.append('top_trending', top_trending);
    formData.append('parental_control', parental_control);
    formData.append('comments', Comment);
    formData.append('video_music', videoMusic ? videoMusic : 0);
    formData.append('enabled', enabled ? enabled : 0);
    // formData.append('url', url);
    formData.append('category_id', category);
    formData.append('image', imageObj);

    let data = [];
    inputFields.map(e => {
      let json = {
        id: e?.id,
        title: e?.title,
        url: encrypt(e?.url),
      };
      data.push(json);
    });

    formData.append('songs', JSON.stringify(data));

    apis.addModMedia(formData).then(res => {
      toastMessage('Successfully addedd');
      history.push('/MODMedia');
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

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                Add Music on Demand Media
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
                {modCategories.map(ele => (
                  <MenuItem key={ele.categoryId} value={ele.categoryId}>
                    {ele.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="genre"
                label="Genre"
                type="text"
                id="genre"
                {...register('Genre', { required: true })}
              />
            </Grid> */}

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
                label="Music Director"
                type="text"
                id="director"
                {...register('Director', { required: true })}
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
                name="releaseDate"
                label="Release Date"
                type="text"
                id="releaseDate"
                placeholder="Date in YYYYMMDD Format"
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
                    Add LOGO *
                  </Button> 
                </label>
                <img
                  src={
                    typeof imageObj == 'object'
                      ? URL.createObjectURL(imageObj)
                      : image
                  }
                  alt=""
                  width={100}
                  height={80}
                  style={{ paddingLeft: '10px' }}
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
                    Add
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                    onClick={() => {
                      history.push('/MODMedia');
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
