import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import apis from 'app/api';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from './styles';

export default function EditUserPackage() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const [channelPackage, setChannelPackage] = useState([]);
  const [vodPackage, setVodPackage] = useState([]);
  const [sodPackage, setSodPackage] = useState([]);
  const [modPackage, setModPackage] = useState([]);
  const [Period, setPeriod] = useState();
  const [Customer, setCustomer] = useState();

  const [channelPackageData, setChannelPackageData] = useState([]);
  const [vodPackageData, setVodPackageData] = useState([]);
  const [modPackageData, setModPackageData] = useState([]);
  const [sodPackageData, setSodPackageData] = useState([]);

  const [userId, setUserId] = useState(0);
  const [startDate, setStartDate] = useState();
  const [enabled, setEnabled] = useState(false);
  const [activationCode, setActivationCode] = useState();
  const [packageId, setPackageId] = useState([]);

  const getChannelPackage = () => {
    apis.getChannelPackage().then(res => {
      let result = res.data;
      setChannelPackageData(result);
    });
  };

  const getVODPackage = () => {
    apis.getVodPackage().then(res => {
      let result = res.data;
      setVodPackageData(result);
    });
  };

  const getMODPackage = () => {
    apis.getModPackage().then(res => {
      let result = res.data;
      setModPackageData(result);
    });
  };

  const getSODPackage = () => {
    apis.getSodPackage().then(res => {
      let result = res.data;
      setSodPackageData(result);
    });
  };

  const getUserPackageActivation = code => {
    apis.getUserPackageActivation(code).then(res => {
      let result = res.data.package_id;

      setPackageId(result);
    });
  };

  const findIndexOfPackageData = () => {
    let channelPackageIndex = [];
    let vodPackageIndex = [];
    let sodPackageIndex = [];
    let modPackageIndex = [];
    packageId?.forEach(element => {
      //   // To-Do if element matches stop iteration packageData
      channelPackageData?.forEach(ele => {
        if (element.toString() === ele.package_id) {
          channelPackageIndex.push(ele);
        }
      });
      vodPackageData?.forEach(ele => {
        if (element.toString() === ele.package_id) {
          vodPackageIndex.push(ele);
        }
      });
      sodPackageData?.forEach(ele => {
        if (element.toString() === ele.package_id) {
          sodPackageIndex.push(ele);
        }
      });
      modPackageData?.forEach(ele => {
        if (element.toString() === ele.package_id) {
          modPackageIndex.push(ele);
        }
      });
    });
    setChannelPackage(channelPackageIndex);
    setVodPackage(vodPackageIndex);
    setSodPackage(sodPackageIndex);
    setModPackage(modPackageIndex);
  };

  const handleUpdateUserPackage = () => {
    let channeldata = [];
    channeldata = channelPackage.map(ele => {
      return ele.package_id;
    });

    let voddata = [];
    voddata = vodPackage.map(ele => {
      return ele.package_id;
    });

    let soddata = [];
    soddata = sodPackage.map(ele => {
      return ele.package_id;
    });

    let moddata = [];
    moddata = modPackage.map(ele => {
      return ele.package_id;
    });

    let selectedPackages = [].concat(channeldata, voddata, soddata, moddata);

    apis
      .editUserPackage(
        Period,
        startDate,
        enabled,
        userId,
        activationCode,
        selectedPackages,
      )
      .then(res => {
        toastMessage('Successfully edited');
        history.push('/UserPackageDetails');
      });
  };

  useEffect(() => {
    getChannelPackage();
    getVODPackage();
    getMODPackage();
    getSODPackage();

    if (location.state) {
      let params = location.state.state.data;
      setPeriod(params.period);
      setCustomer(params.customerName);
      setUserId(params.customerId);
      setEnabled(params.enabled);
      setActivationCode(params.code);
      setStartDate(
        moment(moment(params.startDate, 'DD-MM-YYYY')).format('YYYY-MM-DD'),
      );
      getUserPackageActivation(params.code);
    } else {
      history.push('/AssignPackage');
    }
  }, []);
  useEffect(() => {
    if (
      channelPackageData !== [] &&
      vodPackageData !== [] &&
      sodPackageData !== [] &&
      modPackageData !== [] &&
      packageId !== undefined
    ) {
      findIndexOfPackageData();
    }
  }, [
    channelPackageData,
    vodPackageData,
    sodPackageData,
    modPackageData,
    packageId,
  ]);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" className={classes.title}>
              Edit Subscriber Package Details
            </Typography>
          </Grid>

          <form className={classes.form}>
            <Grid container spacing={2} maxwidth="xs">
              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  disabled
                  label="Customer"
                  value={Customer}
                  fullWidth
                  type="text"
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="date"
                  label="Start Date"
                  type="date"
                  value={startDate}
                  className={classes.textField}
                  helperText="Please select your Start Date"
                  onChange={e => {
                    setStartDate(e.target.value);
                  }}
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <form className={classes.container} noValidate>
                  <TextField
                    id="date"
                    label="Period"
                    type="text"
                    value={Period}
                    className={classes.textField}
                    helperText="Enter your period in Days"
                    onChange={e => {
                      setPeriod(e.target.value);
                    }}
                    required
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </Grid>

              <Grid item xs={6}>
                <Autocomplete
                  limitTags={2}
                  id="Channel Package"
                  options={channelPackageData}
                  disableCloseOnSelect
                  value={channelPackage}
                  getOptionLabel={option =>
                    option?.package_id + ' - ' + option?.name
                  }
                  onChange={(event, newValue) => {
                    setChannelPackage(newValue);
                  }}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox style={{ marginRight: 8 }} checked={selected} />
                      {option.package_id + ' - ' + option.name}
                    </React.Fragment>
                  )}
                  multiple
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Channel Package"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Autocomplete
                  limitTags={2}
                  id="VOD Package"
                  options={vodPackageData}
                  disableCloseOnSelect
                  value={vodPackage}
                  getOptionLabel={option =>
                    option?.package_id + ' - ' + option?.name
                  }
                  onChange={(event, newValue) => {
                    setVodPackage(newValue);
                  }}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox style={{ marginRight: 8 }} checked={selected} />
                      {option.package_id + ' - ' + option.name}
                    </React.Fragment>
                  )}
                  multiple
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="VOD Package"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Autocomplete
                  limitTags={2}
                  id="SOD Package"
                  options={sodPackageData}
                  value={sodPackage}
                  disableCloseOnSelect
                  getOptionLabel={option =>
                    option?.package_id + ' - ' + option?.name
                  }
                  onChange={(event, newValue) => {
                    setSodPackage(newValue);
                  }}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox style={{ marginRight: 8 }} checked={selected} />
                      {option.package_id + ' - ' + option.name}
                    </React.Fragment>
                  )}
                  multiple
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="SOD Package"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Autocomplete
                  limitTags={2}
                  id="MOD Package"
                  options={modPackageData}
                  value={modPackage}
                  disableCloseOnSelect
                  getOptionLabel={option =>
                    option?.package_id + ' - ' + option?.name
                  }
                  onChange={(event, newValue) => {
                    setModPackage(newValue);
                  }}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox style={{ marginRight: 8 }} checked={selected} />
                      {option.package_id + ' - ' + option.name}
                    </React.Fragment>
                  )}
                  multiple
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="MOD Package"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={enabled}
                      onChange={e => {
                        setEnabled(Number(e.target.checked));
                      }}
                    />
                  }
                  label="Enabled"
                />
              </Grid>

              <Grid item xs={12}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'right',
                  }}
                >
                  <div>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleUpdateUserPackage();
                      }}
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
                        history.push('/UserPackageDetails');
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
