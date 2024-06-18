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
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import { decrypt, encrypt } from 'utils/helper/cryptography';
import { v4 as uuidv4 } from 'uuid';
import useStyles from './styles';

export default function EditMODMedia() {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const hiddenFileInput = React.useRef(null);
  const { register, handleSubmit, setValue } = useForm();

  const [videoMusic, setVideoMusic] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [url, setUrl] = useState(false);
  const [localfile, setLocalfile] = useState(false);

  const [categoryid, setCategoryid] = useState();
  const [mod_id, setMod_id] = useState();
  const [image, setImage] = useState();
  const [imageObj, setImageObj] = useState(undefined);
  const [modCategories, setModCategories] = useState([]);
  const [category, setCategory] = useState('');

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
      // setValue('Genre', params.category_id);
      setValue('Country', params.country);
      setValue('Director', params.director);
      setValue('Duration', params.duration);
      setValue('Year', params.year);
      setValue('ReleaseDate', moment(params.releaseDate).format('YYYY-MM-DD'));
      setValue('Description', params.description);
      setValue('top_trending', params.top_trending);
      setValue('parental_control', params.parental_control);
      setValue('Comment', params.comments);
      setVideoMusic(params.video_music);
      setEnabled(params.enabled);
      setImage(params.image);
      setMod_id(params.mod_id);
      setCategory(params.category_id);
    }
  }, []);

  const handleModCategory = () => {
    apis.getModCategory().then(res => {
      setModCategories(res.data);
      setCategory(location.state.state.data.category_id);
    });
  };

  const handleModSongs = mod_id => {
    apis.getModSongs(location.state.state.data.mod_id).then(res => {
      let data = res.data;
      if (data?.length > 0) {
        // decrypt
        // let json = {
        //   id: e?.id,
        //   title: e?.title,
        //   url: encrypt(e?.url),
        // };
        let decryptedData = [];
        data.map(e => {
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
    handleModCategory();
    handleModSongs(mod_id);
  }, []);

  const onSubmit = ({
    Title,
    Country,
    Director,
    Duration,
    Year,
    ReleaseDate,
    Description,
    Comment,
    top_trending,
    parental_control,
  }) => {
    let formData = new FormData();
    formData.append('title', Title);
    formData.append('country', Country);
    formData.append('director', Director);
    formData.append('duration', Duration);
    formData.append('year', Year);
    formData.append('releaseDate', ReleaseDate);
    formData.append('top_trending', top_trending);
    formData.append('parental_control', parental_control);
    formData.append('description', Description);
    formData.append('comments', Comment);
    formData.append('video_music', videoMusic ? videoMusic : 0);
    formData.append('enabled', enabled ? enabled : 0);

    let encyptedSongs = [];
    inputFields.map(e => {
      let json = {
        id: e?.id,
        title: e?.title,
        url: encrypt(e?.url),
      };
      encyptedSongs.push(json);
    });

    formData.append('songs', JSON.stringify(encyptedSongs));
    formData.append('category_id', category);
    formData.append('image', imageObj);

    apis.editModMedia(mod_id, formData).then(res => {
      toastMessage('Successfully edited');
      history.push('/MODMedia');
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
                Update Music on Demand Media
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

            <Grid item xs={2}>
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
                select
                name="category"
                label="Category"
                type="text"
                id="category"
                InputLabelProps={{ shrink: true }}
                value={category}
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

            <Grid item xs={3}>
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
            <Grid item xs={2}>
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={true}
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
