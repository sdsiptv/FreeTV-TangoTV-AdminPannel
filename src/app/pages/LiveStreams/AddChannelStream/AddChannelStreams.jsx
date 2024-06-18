import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from './styles';

export default function AddChannelStreams() {
  const DRMList = ['Yes', 'No'];
  const PlayBackList = ['Enabled', 'Disabled'];
  const FilePathList = ['/root'];
  const streamMethod = ['0', '1', '2'];
  const TranscoderList = ['Enabled', 'Disabled'];
  const CodecList = ['aac', 'mp2a', 'opus', 'ac3', 'pcma'];
  const DeInterlaceList = ['On', 'Off'];
  const CodecVideoList = ['h264', 'hevc', 'mp2v'];
  const ProtocolList = ['Dash', 'HLS'];
  const EzProtocolList = ['http', 'udp'];

  const classes = useStyles();
  const history = useHistory();
  const [Name, setName] = useState('');
  const [channelCategories, setChannelCategories] = useState([]);
  const [selectedStreamMethod, setSelectedStreamMethod] = useState('');
  const [channelNo, setChannelNo] = useState('');
  const [source, setSource] = useState('');
  const [catergory, setCatergory] = useState('');
  const [drm, setdrm] = useState('No');
  const [imageObj, setImageObj] = useState(undefined);
  const [image, setImage] = useState('');
  const [playBack, setPlayBack] = useState('Disabled');
  const [playBackDuration, setPlayBackDuration] = useState(1);
  const [filePath, setFilePath] = useState(FilePathList[0]);
  const [directSource, setDirectSource] = useState(false);
  const [description, setDescription] = useState('');
  const [Parental, setParental] = useState('');
  const [toptrending, setTopTrending] = useState('');
  const [price, setPrice] = useState('');
  const [transcoder, setTranscoder] = useState('Disabled');

  const [netIp, setNetIP] = useState([]);
  const [netIpDrop, setNetIPDrop] = useState([]);

  const [myCheckbox, setMyCheckbox] = useState(0);
  const [catchUp, setCatchUp] = useState(0);

  const [bitrate, setBitrate] = useState(0);
  const [codec, setCodec] = useState('');

  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);

  const [bitrateVideo, setBitrateVideo] = useState(0);
  const [deInterlace, setDeInterlace] = useState('');
  const [codecVideo, setCodecVideo] = useState('');
  const [protocol, setProtocol] = useState('Dash');
  const [inputAdapter, setInputAdapter] = useState([]);
  const [selectedInputAdapter, setSelectedInputAdapter] = useState('');

  const [ezProtocol, setEzProtocol] = useState('');

  const { handleSubmit } = useForm();

  const [selectedValue, setSelectedValue] = useState('');

  const handleEncryptionTypeChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const onFileChange = event => {
    // setSelectedFile(event.target.files[0]);
    const fileUploaded = event.target.files[0];
    setImageObj(fileUploaded);
  };
  
  const hiddenFileInput = React.useRef(null);
  const drmEnable = {
    Yes: 1,
    No: 0,
  };

  const onSubmit = () => {
    let data = new FormData();

    data.append('channelno', channelNo);
    data.append('categoryid', catergory);
    data.append('netip', netIp);
    data.append('description', description);
    data.append('encryption_type', selectedValue);
    data.append('inputsource', source);
    data.append('price', price);
    data.append('top_trending',toptrending);
    data.append('parental_control',Parental);
    data.append('drmenabled', drmEnable[drm]);
    data.append('name', Name);
    data.append('channel_type', myCheckbox);
    data.append('catch_up', catchUp);
    data.append('direct_source', directSource);
    data.append('protocol', protocol);
    data.append(
      'playback',
      playBack === 'Enabled'
        ? JSON.stringify({
          playBackDuration: playBackDuration,
          filePath: filePath,
        })
        : '',
    );

    data.append(
      'transcoder',
      transcoder === 'Enabled'
        ? JSON.stringify({
          copyAudio: audio,
          audioBitrate: bitrate,
          audioCodec: codec,
          copyVideo: video,
          videoBitrate: bitrateVideo,
          videoCodec: codecVideo,
          deInterlace: deInterlace,
        })
        : '',
    );
    data.append('image', imageObj);
    data.append('streamMethod', selectedStreamMethod);

    data.append('inputAdapter', selectedInputAdapter);
    data.append('ezProtocol', ezProtocol);

    apis.addChannelStream(data).then(response => {
      toastMessage('success');
      history.push('/ChannelStreams');
    });
  };

  useEffect(() => {
    apis.getChannelCategory().then(res => {
      setChannelCategories(res.data);
    });
  }, []);

  useEffect(() => {
    apis.getNetIP().then(res => {
      setNetIPDrop(res.data);
    });
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" className={classes.title}>
              Add Channel Streams
            </Typography>
          </Grid>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                  size="small"
                  onChange={e => {
                    setName(e.target.value);
                  }}
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
                  size="small"
                  onChange={e => {
                    setChannelNo(e.target.value);
                  }}
                  helperText={"Channel Number will be Only in Number"}

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
                  size="small"
                  value={catergory}
                  type="text"
                  onChange={e => {
                    setCatergory(e.target.value);
                  }}
                >
                  {channelCategories.map(ele => (
                    <MenuItem key={ele.categoryId} value={ele.categoryId}>
                      {ele.categoryName}
                    </MenuItem>
                  ))}
                </TextField>
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
                  size="small"
                  onChange={e => {
                    setSource(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  autoComplete="price"
                  name="price"
                  variant="outlined"
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  type="number"
                  size="small"
                  onChange={e => {
                    setPrice(e.target.value);
                  }}
                  helperText={"Price will be Only in Number"}

                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  autoComplete="parental_control"
                  name="Parental Control"
                  variant="outlined"
                  required
                  fullWidth
                  id="parental_control"
                  label="Parental Control"
                  type="number"
                  size="small"
                  onChange={e => {
                    setParental(e.target.value);
                  }}
                  helperText={"Parental Control will be Only in 0 or 1"}

                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  autoComplete="top_trending"
                  name="Top Trending"
                  variant="outlined"
                  required
                  fullWidth
                  id="top_trending"
                  label="Top Trending"
                  type="number"
                  size="small"
                  onChange={e => {
                    setTopTrending(e.target.value);
                  }}
                  helperText={"Top Trending will be Only in Number"}

                />
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
                >
                  <MenuItem value="0"> 0</MenuItem>
                  <MenuItem value="1"> 1</MenuItem>
                  <MenuItem value="2"> 2</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={myCheckbox === 1}
                      onChange={() => setMyCheckbox(myCheckbox === 1 ? 0 : 1)}
                      color="primary"
                      name="channel_type"
                    />
                  }
                  label="Channel Type"
                />
              </Grid>

              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={catchUp === 1}
                      onChange={() => setCatchUp(catchUp === 1 ? 0 : 1)}
                      color="primary"
                      name="catch_up"
                    />
                  }
                  label="Catch Up"
                />
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
                  multiline
                  rows={2}
                  size="small"
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  select
                  label="Source IP"
                  required
                  fullWidth
                  helperText="Please select your Source IP"
                  variant="outlined"
                  size="small"
                  value={netIp}
                  type="text"
                  onChange={e => {
                    setNetIP(e.target.value);
                  }}
                >
                  {netIpDrop.map(ele => (
                    <MenuItem key={ele.netip} value={ele.netip}>
                      {ele.netip}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>


              <Grid item xs={3}>
                <h1>Image Must be Upload</h1>
                <div style={{ display: 'flex' }}>
                  <input
                    type="file"
                    accept="image/*"
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                    onChange={onFileChange}
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
                    style={{ paddingLeft: '10px', width: '100px' }}
                  />
                </div>
              </Grid>

              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={directSource}
                      onChange={e => {
                        setDirectSource(e.target.checked);
                      }}
                      name="directSource"
                      color="primary"
                      style={{ marginLeft: 20 }}
                    />
                  }
                  label="Direct Source Link"
                />
              </Grid>

              {!directSource ? (
                <Grid item xs={6}>
                  <TextField
                    id="stream-method"
                    select
                    label="Stream Method"
                    required
                    fullWidth
                    helperText="Please select your stream method"
                    variant="outlined"
                    size="small"
                    value={selectedStreamMethod}
                    type="text"
                    onChange={e => {
                      setSelectedStreamMethod(e.target.value);
                    }}
                  >
                    {streamMethod.map(ele => (
                      <MenuItem key={ele} value={ele}>
                        {ele}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              ) : null}

              {selectedStreamMethod == '2' && !directSource ? (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      id="directSource"
                      disabled={directSource ? true : false}
                      select
                      label="Protocol "
                      value={protocol}
                      required={directSource ? false : true}
                      fullWidth
                      variant="outlined"
                      size="small"
                      type="text"
                      onChange={e => {
                        setProtocol(e.target.value);
                      }}
                    >
                      {ProtocolList.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      id="filled-select-currency"
                      select
                      label="DRM "
                      value={drm}
                      required
                      fullWidth
                      variant="outlined"
                      size="small"
                      type="text"
                      onChange={e => {
                        setdrm(e.target.value);
                      }}
                    >
                      {DRMList.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid md={12}>
                    <Typography component="h6" variant="h6">
                      Play back
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      id="filled-select-currency"
                      select
                      label="Play back "
                      value={playBack}
                      required={!directSource}
                      disabled={directSource}
                      fullWidth
                      onChange={e => {
                        setPlayBack(e.target.value);
                      }}
                      variant="filled"
                      size="small"
                      type="text"
                    >
                      {PlayBackList.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      disabled={playBack === 'Enabled' ? false : true}
                      autoComplete="name"
                      name="playBackDuration"
                      variant="outlined"
                      helperText="Enter in hours"
                      required={playBack === 'Enabled' ? true : false}
                      fullWidth
                      id="playBackDuration"
                      label="Play Back Duration"
                      type="number"
                      autoFocus
                      value={playBackDuration}
                      size="small"
                      onChange={e => {
                        setPlayBackDuration(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      disabled={playBack === 'Enabled' ? false : true}
                      id="filled-select-currency"
                      select
                      label="File Path"
                      value={filePath}
                      required={playBack === 'Enabled' ? true : false}
                      fullWidth
                      onChange={e => {
                        setFilePath(e.target.value);
                      }}
                      helperText="Please select your File Path"
                      variant="filled"
                      size="small"
                      type="text"
                    >
                      {FilePathList.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid md={12}>
                    <Typography component="h6" variant="h6">
                      Transcoder
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="filled-select-currency"
                      select
                      label="Transcoder"
                      value={transcoder}
                      required={!directSource}
                      disabled={directSource}
                      fullWidth
                      onChange={e => {
                        setTranscoder(e.target.value);
                      }}
                      variant="filled"
                      size="small"
                      type="text"
                    >
                      {TranscoderList.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component="h6" variant="h6">
                      Audio
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          disabled={transcoder === 'Enabled' ? false : true}
                          checked={audio}
                          onChange={e => {
                            setAudio(e.target.checked);
                          }}
                          color="primary"
                          name="audioCopy"
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      }
                      label="Copy from input"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      disabled={
                        transcoder === 'Enabled' && !audio ? false : true
                      }
                      autoComplete="bitrate"
                      name="bitrate"
                      variant="outlined"
                      required={audio ? false : true}
                      fullWidth
                      id="bitrate"
                      label="Bitrate"
                      type="number"
                      autoFocus
                      value={bitrate}
                      size="small"
                      onChange={e => {
                        setBitrate(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      disabled={
                        transcoder === 'Enabled' && !audio ? false : true
                      }
                      id="filled-select-currency"
                      select
                      label="Codec"
                      value={codec}
                      required={audio ? false : true}
                      fullWidth
                      onChange={e => {
                        setCodec(e.target.value);
                      }}
                      variant="filled"
                      size="small"
                      type="text"
                    >
                      {CodecList.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography component="h6" variant="h6">
                      Video
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          disabled={transcoder === 'Enabled' ? false : true}
                          checked={video}
                          onChange={e => {
                            setVideo(e.target.checked);
                          }}
                          color="primary"
                          name="videoCopy"
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      }
                      label="Copy from input"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      disabled={
                        transcoder === 'Enabled' && !video ? false : true
                      }
                      autoComplete="bitrate"
                      name="bitrateVideo"
                      variant="outlined"
                      required={video ? false : true}
                      fullWidth
                      id="bitrateVideo"
                      label="Bitrate"
                      type="number"
                      autoFocus
                      value={bitrateVideo}
                      size="small"
                      onChange={e => {
                        setBitrateVideo(e.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      disabled={
                        transcoder === 'Enabled' && !video ? false : true
                      }
                      id="filled-select-currency"
                      select
                      label="Codec"
                      value={codecVideo}
                      required={video ? false : true}
                      fullWidth
                      onChange={e => {
                        setCodecVideo(e.target.value);
                      }}
                      variant="filled"
                      size="small"
                      type="text"
                    >
                      {CodecVideoList.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      disabled={
                        transcoder === 'Enabled' && !video ? false : true
                      }
                      id="filled-select-currency"
                      select
                      label="DeInterlace"
                      value={deInterlace}
                      required={video ? false : true}
                      fullWidth
                      onChange={e => {
                        setDeInterlace(e.target.value);
                      }}
                      variant="filled"
                      size="small"
                      type="text"
                    >
                      {DeInterlaceList.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              ) : null}

              {selectedStreamMethod == '1' && !directSource ? (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      id="adapterIp"
                      disabled={directSource ? true : false}
                      select
                      label="Input Adapter "
                      value={selectedInputAdapter}
                      required={directSource ? false : true}
                      fullWidth
                      variant="outlined"
                      size="small"
                      type="text"
                      onChange={e => {
                        setSelectedInputAdapter(e.target.value);
                      }}
                    >
                      {inputAdapter?.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      id="type"
                      disabled={directSource ? true : false}
                      select
                      label="Type "
                      value={ezProtocol}
                      required={directSource ? false : true}
                      fullWidth
                      variant="outlined"
                      size="small"
                      type="text"
                      onChange={e => {
                        setEzProtocol(e.target.value);
                      }}
                    >
                      {EzProtocolList.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              ) : null}
            </Grid>

            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  margin: '10px',
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
                      history.push('/ChannelStreams');
                    }}
                  >
                    Back
                  </Button>
                </div>
              </div>
            </Grid>
          </form>
        </Grid>
      </div>
    </Container>
  );
}
