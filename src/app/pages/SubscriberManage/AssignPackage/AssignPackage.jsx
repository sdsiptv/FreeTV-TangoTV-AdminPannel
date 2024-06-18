import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import { failureNotification, toastMessage } from 'utils/helper';
import useStyles from './styles';
import moment from 'moment';

export default function AssignPackage() {
  const classes = useStyles();
  const history = useHistory();

  const [channelPackage, setChannelPackage] = useState([]);
  const [vodPackage, setVodPackage] = useState([]);
  const [sodPackage, setSodPackage] = useState([]);
  const [modPackage, setModPackage] = useState([]);

  const [channelPackageData, setChannelPackageData] = useState([]);
  const [vodPackageData, setVodPackageData] = useState([]);
  const [sodPackageData, setSodPackageData] = useState([]);
  const [modPackageData, setModPackageData] = useState([]);

  const [customerData, setCustomerData] = useState([]);
  const [userId, setUserId] = useState(0);
  const date = new Date().toISOString().slice(0, 10);
  const [endDate, setEndDate] = useState(date);
  const [focus, setFocus] = useState(false);

  const handleAddPackage = () => {
    let selectedPackages = [].concat(
      channelPackage.map(ele => ele.package_id),
      vodPackage.map(ele => ele.package_id),
      sodPackage.map(ele => ele.package_id),
      modPackage.map(ele => ele.package_id),
    );

    let newFormattedDate = moment(endDate, 'YYYY-MM-DD').format('DD-MM-YYYY');
    const data = {
      userId: userId,
      dPackages: [],
      aPackages: selectedPackages.map(packageId => ({
        packageId,
        endDate: newFormattedDate,
      })),
    };

    apis
      .addUserPackage(data)
      .then(res => {
        toastMessage('Successfully added');
        history.push('/UserPackageDetails');
      })
      .catch(() => {
        failureNotification('Network error');
      });
  };

  const handleGetCustomer = () => {
    apis.getCustomerUser().then(res => {
      setCustomerData(res.data);
    });
  };

  const handleGetChannelPackage = () => {
    apis.getChannelPackage().then(res => {
      setChannelPackageData(res.data);
    });
  };

  const handleGetVODPackage = () => {
    apis.getVodPackage().then(res => {
      setVodPackageData(res.data);
    });
  };

  const handleGetMODPackage = () => {
    apis.getModPackage().then(res => {
      setModPackageData(res.data);
    });
  };

  const handleGetSODPackage = () => {
    apis.getSodPackage().then(res => {
      setSodPackageData(res.data);
    });
  };

  useEffect(() => {
    handleGetCustomer();
    handleGetChannelPackage();
    handleGetVODPackage();
    handleGetMODPackage();
    handleGetSODPackage();
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />

      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" className={classes.title}>
              Assign Package
            </Typography>
          </Grid>

          <form
            className={classes.form}
            onSubmit={e => {
              e.preventDefault();
              if (
                sodPackage.length ||
                vodPackage.length ||
                modPackage.length ||
                channelPackage.length
              ) {
                handleAddPackage();
              } else {
                setFocus(true);
              }
            }}
          >
            <Grid container spacing={2} maxwidth="xs">
              <Grid item xs={6}>
                <Autocomplete
                  id="Customer"
                  options={customerData}
                  getOptionLabel={option => option?.id + ' - ' + option?.name}
                  onChange={(event, newValue) => {
                    setUserId(newValue.id);
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Customer"
                      variant="outlined"
                      helperText="Please select your Customer"
                      required
                      autoFocus
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="date"
                  label="End Date"
                  type="date"
                  value={endDate}
                  defaultValue={date}
                  className={classes.textField}
                  helperText="Please select your End Date"
                  onChange={e => {
                    setEndDate(e.target.value);
                  }}
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Autocomplete
                  limitTags={2}
                  id="Channel-Package"
                  options={channelPackageData}
                  disableCloseOnSelect
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
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                  >
                    Add
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>
    </Container>
  );
}
