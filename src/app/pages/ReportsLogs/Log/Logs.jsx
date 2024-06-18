import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import apis from 'app/api';
import fileDownload from 'js-file-download';
import React, { useState } from 'react';
import { GREEN } from 'utils/constant/color';
import useStyles from './styles';

export default function Logs() {
  const classes = useStyles();
  const [userId, setUserId] = useState('');

  const handlePackageComposition = () => {
    apis.getPackageComposition().then(res => {
      fileDownload(
        res?.data,
        `package_channel_composition_log_${new Date().getTime()}.xlsx`,
      );
    });
  };

  const handlePackageLogs = () => {
    apis.getChannelLogs().then(res => {
      fileDownload(
        res?.data,
        `package_channel_modification_log_${new Date().getTime()}.xlsx`,
      );
    });
  };

  const handleAllLogs = () => {
    apis.getActivityLogs().then(res => {
      fileDownload(
        res?.data,
        `other_activity_log_${new Date().getTime()}.xlsx`,
      );
    });
  };

  const handleFingerprintLog = () => {
    apis.getFingerprintLog().then(res => {
      fileDownload(res?.data, `fingerprint_logs_${new Date().getTime()}.xlsx`);
    });
  };

  const handleChannelLog = () => {
    apis.getChannelLog().then(res => {
      fileDownload(res?.data, `channel_logs_${new Date().getTime()}.xlsx`);
    });
  };

  const handleAllLog = () => {
    apis.getAllLog().then(res => {
      fileDownload(res?.data, `all_logs_${new Date().getTime()}.xlsx`);
    });
  };

  const handleMailLog = () => {
    apis.getMailLog().then(res => {
      fileDownload(res?.data, `mail_logs_${new Date().getTime()}.xlsx`);
    });
  };

  const handleUserLog = () => {
    apis.getUserLog(userId).then(res => {
      fileDownload(res?.data, `user_log_${new Date().getTime()}.xlsx`);
    });
  };

  const handlePackageActivationDeactivationLog = () => {
    apis.getPackageLogs().then(res => {
      fileDownload(
        res?.data,
        `package_channel_activation_deactivation_log_${new Date().getTime()}.xlsx`,
      );
    });
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" className={classes.title}>
              Logs
            </Typography>
          </Grid>

          <form className={classes.form}>
            <Grid container spacing={2} maxwidth="xs">
              <Grid item xs={6}>
                <Typography component="h3" variant="h5">
                  Package & Channel Composition Logs
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={handlePackageComposition}
                  >
                    Generate Report
                  </Button>
                </div>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h3" variant="h5">
                  Package & Channel Modification Logs
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={handlePackageLogs}
                  >
                    Generate Report
                  </Button>
                </div>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h3" variant="h5">
                  Package Activation & Deactivation Logs
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={handlePackageActivationDeactivationLog}
                  >
                    Generate Report
                  </Button>
                </div>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h3" variant="h5">
                  Other Activity Logs
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={handleAllLogs}
                  >
                    Generate Report
                  </Button>
                </div>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h3" variant="h5">
                  Fingerprint Logs
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={handleFingerprintLog}
                  >
                    Generate Report
                  </Button>
                </div>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h3" variant="h5">
                  Channel Logs
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={handleChannelLog}
                  >
                    Generate Report
                  </Button>
                </div>
              </Grid>

              <Grid item xs={6}>
                <Typography component="h3" variant="h5">
                  All Logs
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={handleAllLog}
                  >
                    Generate Report
                  </Button>
                </div>
              </Grid>
              <Grid item xs={6}>
                <Typography component="h3" variant="h5">
                  Mail Logs
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={handleMailLog}
                  >
                    Generate Report
                  </Button>
                </div>
              </Grid>

              <Grid item xs={12}>
                <Typography component="h3" variant="h5">
                  User Logs
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="UserId"
                  variant="outlined"
                  required
                  fullWidth
                  id="UserId"
                  label="UserId"
                  type="text"
                  autoFocus
                  value={userId}
                  size="small"
                  onChange={e => {
                    setUserId(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={handleUserLog}
                  >
                    Generate Report
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
