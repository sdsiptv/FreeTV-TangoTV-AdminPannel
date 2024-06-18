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
import { useHistory } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import useStyles from './styles';

export default function AddFingerPrint() {
  const classes = useStyles();
  const history = useHistory();

  const [resellerList, setResellerList] = useState([]);
  const [userData, setUserData] = useState([]);
  const [channelData, setChannelData] = useState([]);

  const [reseller, setReseller] = useState('');
  const [channel, setChannel] = useState('');
  const [fingerPrintType, setFingerPrintType] = useState('');
  const [fontColor, setFontColor] = useState('');
  const [fontText, setFontText] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [user, setUser] = useState('');
  const [time, setTime] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [xAxis, setXAxis] = useState('');
  const [text, setText] = useState('');
  const [forced, setforced] = useState(false);
  const [udid, setUdid] = useState(false);
  const [visibility, setVisibility] = useState('overt');
  const [areaCode, setAreaCode] = useState('');
  const [timeInterval, setTimeInterval] = useState('');
  const [repeatTimes, setRepeatTimes] = useState('');
  const [bgTransparency, setBgTransparency] = useState('');
  const [random, setRandom] = useState(false);

  const handleGetCustomer = id => {
    apis.getCustomerResellers(id).then(res => {
      let result = res.data;

      result.unshift({ id: -1, username: 'All' });
      setUserData(result);
    });
  };

  const handleGetChannel = () => {
    apis.getChannelPackage().then(res => {
      let result = res.data;
      result.unshift({ package_id: -1, name: 'All' });
      setChannelData(result);
    });
  };

  const handleGetReseller = () => {
    apis.getResellers().then(res => {
      let result = res.data;

      if (result?.length > 0) {
        result.unshift({ id: -1, username: 'All' });
      }
      setResellerList(result);
    });
  };

  const handlePostFinger = e => {
    e.preventDefault();

    apis
      .postFingerprint(
        text,
        reseller,
        user,
        channel == '' ? 0 : channel,
        time,
        backgroundColor,
        fontColor,
        fontSize,
        fontText,
        random ? -1 : xAxis,
        random ? -1 : yAxis,
        fingerPrintType,
        forced,
        udid,
        areaCode,
        timeInterval,
        repeatTimes,
        visibility,
        bgTransparency,
      )
      .then(res => {
        // setResellerList(res.data);
        // history.push('/FingerPrint');
      });
  };

  useEffect(() => {
    handleGetReseller();
    handleGetChannel();
  }, []);

  useEffect(() => {
    if (visibility === 'covert' || visibility === 'ForensicWaterMark') {
      setFingerPrintType('fingerprint');
    }
  }, [visibility]);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" className={classes.title}>
              Add FingerPrint
            </Typography>
          </Grid>

          <form className={classes.form} onSubmit={handlePostFinger}>
            <Grid container spacing={2} maxwidth="xs">
              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  select
                  label="Reseller"
                  value={reseller}
                  onChange={e => {
                    setReseller(e.target.value);
                    handleGetCustomer(e.target.value);
                  }}
                  helperText="Please select your Reseller"
                  variant="filled"
                  fullWidth
                  type="text"
                >
                  {resellerList.map(option => (
                    <MenuItem key={option?.id} value={option?.id}>
                      {option?.username}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  select
                  label="User"
                  value={user}
                  onChange={e => {
                    setUser(e.target.value);
                  }}
                  helperText="Please select your User"
                  variant="filled"
                  fullWidth
                  type="text"
                >
                  {userData.map(ele => (
                    <MenuItem key={ele.id} value={ele.id}>
                      {ele.username}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  select
                  label="Packages"
                  value={channel}
                  onChange={e => {
                    setChannel(e.target.value);
                  }}
                  helperText="Please select Package"
                  variant="filled"
                  fullWidth
                  type="text"
                >
                  {channelData.map(ele => (
                    <MenuItem key={ele.package_id} value={ele.package_id}>
                      {ele.package_id} {ele.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  select
                  label="Visibility"
                  value={visibility}
                  onChange={e => {
                    setVisibility(e.target.value);
                  }}
                  helperText="Please select your FingerPrint Visibility"
                  variant="filled"
                  required
                  fullWidth
                  type="text"
                >
                  <MenuItem value={'overt'}>Overt</MenuItem>
                  <MenuItem value={'covert'}>Covert</MenuItem>
                  <MenuItem value={'ForensicWaterMark'}>Forensic WaterMark</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  label="Time in Seconds"
                  value={time}
                  onChange={e => {
                    setTime(e.target.value);
                  }}
                  helperText="Enter in Secounds"
                  variant="filled"
                  required
                  fullWidth
                  type="number"
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  select
                  label="FingerPrint Type"
                  value={fingerPrintType}
                  disabled={visibility === 'covert' || visibility === 'ForensicWaterMark'}
                  onChange={e => {
                    setFingerPrintType(e.target.value);
                  }}
                  helperText="Please select your FingerPrint Type"
                  variant="filled"
                  required
                  fullWidth
                  type="text"
                >
                  <MenuItem value={'fingerprint'}>FingerprintText</MenuItem>
                  <MenuItem value={'scrollText'}>ScrollText</MenuItem>
                  <MenuItem value={'fullScreen'}>FullScreen</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  label="Background Color"
                  value={backgroundColor}
                  onChange={e => {
                    setBackgroundColor(e.target.value);
                  }}
                  variant="filled"
                  required
                  fullWidth
                  type="text"
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  label="Font Color"
                  value={fontColor}
                  onChange={e => {
                    setFontColor(e.target.value);
                  }}
                  variant="filled"
                  required
                  fullWidth
                  type="text"
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  select
                  label="Font Size"
                  value={fontSize}
                  onChange={e => {
                    setFontSize(e.target.value);
                  }}
                  variant="filled"
                  required
                  fullWidth
                  type="text"
                >
                  <MenuItem value={12}>12dp</MenuItem>
                  <MenuItem value={18}>18dp</MenuItem>
                  <MenuItem value={25}>25dp</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  select
                  label="Font Text"
                  value={fontText}
                  onChange={e => {
                    setFontText(e.target.value);
                  }}
                  helperText="Please select your Font Text "
                  variant="filled"
                  required
                  fullWidth
                  type="text"
                >
                  <MenuItem value={'sans-serif'}>sans-serif</MenuItem>
                  <MenuItem value={'sans-serif-medium'}>
                    sans-serif-medium
                  </MenuItem>
                  <MenuItem value={'sans-serif-smallcaps'}>
                    sans-serif-smallcaps
                  </MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  label="X Axis (0.1 to 0.9)"
                  value={xAxis}
                  onChange={e => {
                    setXAxis(e.target.value);
                  }}
                  variant="filled"
                  required={!random}
                  disabled={random}
                  fullWidth
                  type="text"
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  label="Y Axis (0.1 to 0.9)"
                  value={yAxis}
                  onChange={e => {
                    setYAxis(e.target.value);
                  }}
                  variant="filled"
                  required={!random}
                  disabled={random}
                  fullWidth
                  type="text"
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  label="Text"
                  value={text}
                  onChange={e => {
                    setText(e.target.value);
                  }}
                  variant="filled"
                  required
                  fullWidth
                  type="text"
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="AreaCode"
                  label="Area Code"
                  value={areaCode}
                  onChange={e => {
                    setAreaCode(e.target.value);
                  }}
                  variant="filled"
                  fullWidth
                  type="text"
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="backgroundTransperncy"
                  label="Background Transperncy (0 to 100)"
                  value={bgTransparency}
                  onChange={e => {
                    setBgTransparency(e.target.value);
                  }}
                  variant="filled"
                  required
                  fullWidth
                  type="text"
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="timeInterval"
                  label="Time Interval (sec)"
                  value={timeInterval}
                  onChange={e => {
                    setTimeInterval(e.target.value);
                  }}
                  variant="filled"
                  required
                  fullWidth
                  type="text"
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="repeatTimes"
                  label="Repeat Times"
                  value={repeatTimes}
                  onChange={e => {
                    setRepeatTimes(e.target.value);
                  }}
                  variant="filled"
                  required
                  fullWidth
                  type="text"
                ></TextField>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={forced}
                        onChange={e => {
                          setforced(e.target.checked);
                        }}
                        name="Forced"
                        color="primary"
                        style={{ marginLeft: 20 }}
                      />
                    }
                    label="Forced"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={random}
                        onChange={e => {
                          setRandom(e.target.checked);
                        }}
                        name="Random Position"
                        color="primary"
                        style={{ marginLeft: 20 }}
                      />
                    }
                    label="Random Position"
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={udid}
                        onChange={e => {
                          setUdid(e.target.checked);
                        }}
                        name="UDID"
                        color="primary"
                        style={{ marginLeft: 20 }}
                      />
                    }
                    label="UDID"
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'Right',
                  }}
                >
                  <div>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: GREEN, width: 200 }}
                      type="submit"
                    >
                      ADD{' '}
                    </Button>
                  </div>

                  {/* <div>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: GREEN, width: 200 }}
                    >
                      CLEAR{' '}
                    </Button>
                  </div> */}
                  <div>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                      onClick={() => {
                        history.push('/FingerPrint');
                      }}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>
    </Container>
  );
}
