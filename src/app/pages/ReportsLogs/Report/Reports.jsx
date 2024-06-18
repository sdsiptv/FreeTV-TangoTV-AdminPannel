import {
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import apis from 'app/api';
import fileDownload from 'js-file-download';
import moment from 'moment';
import React, { useState } from 'react';
import { GREEN } from 'utils/constant/color';
import useStyles from './styles';

export default function Reports() {
  const classes = useStyles();

  const statusList = [
    { id: 'activated', status: 'Active' },
    { id: 'deactivated', status: 'Deactive' },
  ];
  const [status, setStatus] = useState('activated');

  const reportList = [
    { id: 'total_active_subscriber', status: 'Total Active Subscriber' },
    { id: 'total_deactive_subscriber', status: 'Total Deactive Subscriber' },
    {
      id: 'total_registered_subscriber',
      status: 'Total Registered Subscriber',
    },
    { id: 'product_id_active_count', status: 'ProductId Active Count' },
    { id: 'product_id_deactive_count', status: 'ProductId Deactive Count' },
  ];
  const [selectedReport, setSelectedReport] = useState(
    'total_active_subscriber',
  );

  const date = new Date().toISOString().slice(0, 10);
  const dates = new Date('2021-1-1');

  const [startDate, setStartDate] = useState(
    moment(dates).format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState(date);

  const handlePackageWiseActive = () => {
    apis.getPackagesWiseActive().then(res => {
      let timeStamp = new Date().getTime();
      fileDownload(
        res?.data,
        `As on date active with package and channel wise_${timeStamp}.xlsx`,
      );
    });
  };

  const handlePackageWiseDeactive = () => {
    apis.getPackagesWiseDeactive().then(res => {
      let timeStamp = new Date().getTime();
      fileDownload(
        res?.data,
        `As on date active with package and channel wise_${timeStamp}.xlsx`,
      );
    });
  };

  const handlePackageWise = () => {
    apis.getHistoryPackagesWise(startDate.concat('~', endDate)).then(res => {
      let timeStamp = new Date().getTime();
      fileDownload(
        res?.data,
        `Historical active & deactive with package and channel wise_${timeStamp}.xlsx`,
      );
    });
  };

  const handleSubscriberReport = () => {
    // As on date active & deactive subscribers list
    let fileName = '';
    let timeStamp = new Date().getTime();

    if (status === 'activated') {
      fileName = `As on date active subscribers report_${timeStamp}.xlsx`;
    } else {
      fileName = `As on date deactive subscribers report_${timeStamp}.xlsx`;
    }

    apis.getSubscribers(status).then(res => {
      fileDownload(res?.data, fileName);
    });
  };

  const handleDayWiseSubscriberReport = () => {
    let fileName = '';
    let timeStamp = new Date().getTime();

    if (status === 'activated') {
      fileName = `historical active subscribers report_${timeStamp}.xlsx`;
    } else {
      fileName = `historical deactive subscribers report_${timeStamp}.xlsx`;
    }
    apis
      .getDayWiseSubscribers(startDate.concat('~', endDate), status)
      .then(res => {
        fileDownload(res?.data, fileName);
      });
  };

  const handleCountReport = () => {
    let timeStamp = new Date().getTime();
    apis
      .getReportCount(startDate.concat('~', endDate), selectedReport)
      .then(res => {
        fileDownload(res?.data, `${selectedReport}_${timeStamp}.xlsx`);
      });
  };

  const handleBlacklistReport = () => {
    apis.getBlacklist().then(res => {
      let timeStamp = new Date().getTime();
      fileDownload(res?.data, `blacklist_report_${timeStamp}.xlsx`);
    });
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" className={classes.title}>
              Reports
            </Typography>
          </Grid>
          <form className={classes.form}>
            <Grid container spacing={2} maxwidth="xs">
              <Grid item xs={12}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <Typography component="h3" variant="h5">
                      As on Date Active with Package and Channelwise
                    </Typography>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: GREEN }}
                      onClick={handlePackageWiseActive}
                    >
                      Generate Report
                    </Button>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <Typography component="h3" variant="h5">
                      As on Date Deactive with Package and Channelwise
                    </Typography>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: GREEN }}
                      onClick={handlePackageWiseDeactive}
                    >
                      Generate Report
                    </Button>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12}>
                <Typography component="h3" variant="h5">
                  Historical Active & Deactive with Package and Channelwise
                </Typography>
              </Grid>

              <Grid item xs={5} style={{ display: 'none' }}>
                <form className={classes.container} noValidate>
                  <TextField
                    id="date"
                    label="Start Date"
                    type="date"
                    variant="outlined"
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
                </form>
              </Grid>

              <Grid item xs={1} style={{ display: 'none' }}>
                <Typography
                  component="h3"
                  variant="h6"
                  className={classes.date_to}
                >
                  to
                </Typography>
              </Grid>

              <Grid item xs={5}>
                <form className={classes.container} noValidate>
                  <TextField
                    id="enddate"
                    label="Date"
                    type="date"
                    variant="outlined"
                    value={endDate}
                    className={classes.textField}
                    helperText="Date"
                    onChange={e => {
                      setEndDate(e.target.value);
                    }}
                    required
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </Grid>

              <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={handlePackageWise}
                  >
                    Generate Report
                  </Button>
                </div>
              </Grid>

              <Grid item xs={12}>
                <Typography component="h3" variant="h5">
                  As on Date Active & Deactive Subscribers Report
                </Typography>

                <Grid>
                  <Grid item xs={5}>
                    <TextField
                      id="subscriber-status"
                      select
                      label="Status"
                      value={status}
                      defaultValue="Active"
                      onChange={e => {
                        setStatus(e.target.value);
                      }}
                      helperText="Please select your Status"
                      variant="filled"
                      required
                      fullWidth
                      type="text"
                    >
                      {statusList.map(ele => (
                        <MenuItem key={ele.id} value={ele.id}>
                          {ele.status}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: GREEN }}
                      onClick={handleSubscriberReport}
                    >
                      Generate Report
                    </Button>
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography component="h3" variant="h5">
                  Historical Active & Deactive Subscriber Report
                </Typography>
              </Grid>

              <Grid item xs={5} style={{ display: 'none' }}>
                <form className={classes.container} noValidate>
                  <TextField
                    id="date"
                    label="Start Date"
                    type="date"
                    variant="outlined"
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
                </form>
              </Grid>

              <Grid item xs={1} style={{ display: 'none' }}>
                <Typography
                  component="h3"
                  variant="h6"
                  className={classes.date_to}
                >
                  to
                </Typography>
              </Grid>

              <Grid item xs={5}>
                <form className={classes.container} noValidate>
                  <TextField
                    id="enddate"
                    label="End Date"
                    type="date"
                    variant="outlined"
                    value={endDate}
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
                </form>
              </Grid>

              <Grid item xs={12}>
                <Grid item xs={5}>
                  <TextField
                    id="subscriber-status"
                    select
                    label="Status"
                    value={status}
                    defaultValue="Active"
                    onChange={e => {
                      setStatus(e.target.value);
                    }}
                    helperText="Please select your Status"
                    variant="filled"
                    required
                    fullWidth
                    type="text"
                  >
                    {statusList.map(ele => (
                      <MenuItem key={ele.id} value={ele.id}>
                        {ele.status}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={handleDayWiseSubscriberReport}
                  >
                    Generate Report
                  </Button>
                </div>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h3" variant="h5">
                  Blacklist Report
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={handleBlacklistReport}
                  >
                    Generate Report
                  </Button>
                </div>
              </Grid>

              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Typography component="h3" variant="h5">
                    Report Count
                  </Typography>
                </Grid>
                <Grid container xs={12}>
                  <Grid item xs={6}>
                    <TextField
                      id="report-type"
                      select
                      label="Report"
                      value={selectedReport}
                      defaultValue="Active"
                      onChange={e => {
                        setSelectedReport(e.target.value);
                      }}
                      helperText="Please select your Status"
                      variant="filled"
                      required
                      fullWidth
                      type="text"
                    >
                      {reportList.map(ele => (
                        <MenuItem key={ele.id} value={ele.id}>
                          {ele.status}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>

                <Grid xs={12} container style={{ marginTop: 20 }}>
                  <Grid item xs={5} style={{ display: 'none' }}>
                    <TextField
                      id="date"
                      label="Start Date"
                      type="date"
                      variant="outlined"
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

                  <Grid item xs={1} style={{ display: 'none' }}>
                    <Typography
                      component="h3"
                      variant="h6"
                      className={classes.date_to}
                    >
                      to
                    </Typography>
                  </Grid>

                  <Grid item xs={5}>
                    <TextField
                      id="enddate"
                      label="End Date"
                      type="date"
                      variant="outlined"
                      value={endDate}
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
                </Grid>

                <Grid item xs={12}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: GREEN }}
                      onClick={handleCountReport}
                    >
                      Generate Report
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>
    </Container>
  );
}
