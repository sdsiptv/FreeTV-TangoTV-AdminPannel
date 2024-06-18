import {
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Controller
} from '@material-ui/core';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from './styles';

export default function EditChannelStreams() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [Name, setName] = useState();
  const [oldName, setOldName] = useState();

  const [Source, setSource] = useState();
  const [ChannelNo, setChannelNo] = useState();
  const [description, setDescription] = useState('');
  const [DRMSource, setDRMSource] = useState('');
  const [image, setImage] = useState();
  const [imageObj, setImageObj] = useState();
  const [channelId, setChannelId] = useState();
  const [Parental, setParental] = useState('');
  const [toptrending, setTopTrending] = useState('');
  const [channelType, setChannelType] = useState(0);
  const [price, setPrice] = useState('');
  const [catchUp, setCatchUp] = useState(1);

  const [Categorie, setCategorie] = useState('');
  const [netIp, setnetIp] = useState('');
  const [drm, setdrm] = useState(0);

  // const  = ['YES', 'NO'];
  var DRMList = [
    {
      name: 'No',
      value: 0,
    },
    {
      name: 'Yes',
      value: 1,
    },
  ];
  const [netIpList, setnetIpList] = useState([]);
  const [categorieList, setCategorieList] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const handleEncryptionTypeChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (location.state) {
      let params = location.state.state.data;

      // setnetIp(params.netIp)
      setOldName(params.old_name);
      setChannelNo(params.channel_no);
      setDescription(params.description);
      setSelectedValue(params.encryption_type);
      setParental(params.parental_control);
      setTopTrending(params.top_trending);
      setDRMSource(params.drm_source);
      setPrice(params.price)
      setdrm(params.drm_enabled);
      setName(params.name);
      setSource(params.source);
      setImage(params.logo);
      setChannelId(params.channel_id);
      setChannelType(params.channel_type);
      setCatchUp(params.catch_up)
    }
  }, []);
  const hiddenFileInput = React.useRef(null);

  const handleImageChange = event => {
    const fileUploaded = event.target.files[0];
    setImageObj(fileUploaded);
  };

  const handleUpdateChannel = id => {
    let data = new FormData();
    data.append('old_name', oldName)
    data.append('channelno', ChannelNo);
    data.append('description', description);
    data.append('drmenabled', drm);
    data.append('encryption_type', selectedValue);
    data.append('source', Source);
    data.append('price', price);
    data.append('inputsource', Source);
    data.append('top_trending',toptrending);
    data.append('parental_control',Parental);
    data.append('channel_type', channelType);
    data.append('catch_up', catchUp);
    data.append('drmsource', DRMSource);
    data.append('categoryid', Categorie);
    data.append('netip', netIp);
    data.append('name', Name);
    if (typeof imageObj == 'object') {
      data.append('image', imageObj);
    }
    // data.append('image', image);


    apis.editChannelStream(channelId, data).then(data => {
      toastMessage('success');
      history.push('/ChannelStreams');
    });
  };

  const handleGetChannelCategories = () => {
    apis
      .getChannelCategory()
      .then(res => {
        setCategorieList(res.data);
        setCategorie(location.state.state.data?.category_id);
      })
      .catch(e => { });
  };
  const handleGetNetIp = () => {
    apis
      .getNetIP()
      .then(res => {
        setnetIpList(res.data);
        setnetIp(location.state.state.data?.netip);
      })
      .catch(e => { });
  };

  useEffect(() => {
    handleGetChannelCategories();
  }, []);

  useEffect(() => {
    handleGetNetIp();
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" className={classes.title}>
              Edit Channel Streams
            </Typography>
          </Grid>

          <form className={classes.form}>
            <Grid container spacing={2} maxwidth="xs">
              <Grid item xs={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  type="text"
                  autoFocus
                  value={Name}
                  size="small"
                  onChange={e => {
                    setName(e.target.value);
                  }}
                  disabled
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  autoComplete="name"
                  name="ChannelNo"
                  variant="outlined"
                  required
                  fullWidth
                  id="ChannelNo"
                  label="ChannelNo"
                  type="number"
                  autoFocus
                  value={ChannelNo}
                  size="small"
                  onChange={e => {
                    setChannelNo(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  autoComplete="Source"
                  name="Source"
                  variant="outlined"
                  required
                  fullWidth
                  id="Source"
                  label="Input URL"
                  type="text"
                  autoFocus
                  value={Source}
                  size="small"
                  onChange={e => {
                    setSource(e.target.value);
                  }}
                  disabled
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  label="DRM Source"
                  value={DRMSource}
                  required
                  fullWidth
                  onChange={e => {
                    setDRMSource(e.target.value);
                  }}
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  autoComplete="price"
                  name="Price"
                  variant="outlined"
                  required
                  fullWidth
                  id="price"
                  value={price}
                  label="price"
                  type="number"
                  size="small"
                  onChange={e => {
                    setPrice(e.target.value);
                  }}
                  disabled
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  autoComplete="parental_control"
                  name="Parental Control"
                  variant="outlined"
                  value={Parental}
                  required
                  fullWidth
                  id="parental_control"
                  label="parental_control"
                  type="text"
                  size="small"
                  onChange={e => {
                    setParental(e.target.value);
                  }}
                  disabled
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  autoComplete="top_trending"
                  name="Top Trending"
                  variant="outlined"
                  value={toptrending}
                  required
                  fullWidth
                  id="top_trending"
                  label="top_trending"
                  type="text"
                  size="small"
                  onChange={e => {
                    setTopTrending(e.target.value);
                  }}
                  disabled
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  select
                  label="Category"
                  value={Categorie}
                  required
                  fullWidth
                  onChange={e => {
                    setCategorie(e.target.value);
                  }}
                  variant="outlined"
                  size="small"
                  type="text"
                >
                  {categorieList.map(option => (
                    <MenuItem key={option} value={option.categoryId}>
                      {option.categoryName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  select
                  label="Source IP"
                  value={netIp}
                  required
                  fullWidth
                  onChange={e => {
                    setnetIp(e.target.value);
                  }}
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled
                >
                  {netIpList.map(option => (
                    <MenuItem key={option} value={option.netip}>
                      {option.netip}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  select
                  label="DRM Enable "
                  value={drm}
                  required
                  fullWidth
                  onChange={e => {
                    setdrm(e.target.value);
                  }}
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled
                >
                  {DRMList.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  select
                  name="encryption_type"
                  id="encryption_type"
                  label="Encryption Type"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={selectedValue}
                  onChange={handleEncryptionTypeChange}
                  disabled
                >
                  <MenuItem value="0"> 0</MenuItem>
                  <MenuItem value="1"> 1</MenuItem>
                  <MenuItem value="2"> 2</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  autoComplete="Description"
                  name="Description"
                  variant="outlined"
                  required
                  fullWidth
                  id="Description"
                  label="Description"
                  type="text"
                  autoFocus
                  size="small"
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                  disabled
                />
              </Grid>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={channelType === 1}
                    onChange={() => setChannelType(channelType === 1 ? 0 : 1)}
                    color="primary"
                    name="channel_type"
                    disabled
                  />
                }
                label="Channel Type"
              />

              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={catchUp === 1}
                      onChange={() => setCatchUp(catchUp === 1 ? 0 : 1)}
                      color="primary"
                      name="catch_up"
                      disabled
                    />
                  }
                  label="Catch Up"
                />
              </Grid>

              <Grid item xs={12}>
              <h1>Image Must be Upload</h1>
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
                      Upload *
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
            </Grid>
          </form>

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
                  variant="contained"
                  style={{ backgroundColor: GREEN, width: 200 }}
                  onClick={handleUpdateChannel}
                >
                  {' '}
                  Update{' '}
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                  onClick={() => {
                    history.push('/ChannelStreams');
                  }}
                >
                  Back
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
