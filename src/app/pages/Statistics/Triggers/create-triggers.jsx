import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import useStyles from './styles';
import { useForm } from 'react-hook-form';
import apis from 'app/api';
import { toast } from 'react-toastify';
import { Autocomplete } from '@material-ui/lab';

export default function CreateTriggers() {
  const history = useHistory();
  const classes = useStyles();
  const { handleSubmit, register, setValue } = useForm();

  const [customerData, setCustomerData] = useState([]);
  const [type] = useState([
    { id: 'forceLogout', name: 'Force Logout' },
    { id: 'refresh', name: 'Refresh' },
  ]);
  const [selectedType, setSelectedType] = useState('');
  const [enabledUserId, setEnabledUserId] = useState(true);
  const [enabledAuditMode, setEnabledAuditMode] = useState(false);
  const [userId, setUserId] = useState(0);
  const [areaCode, setAreaCode] = useState('');

  useEffect(() => {
    handleGetCustomer();
  }, []);

  const handleUserIdCheckboxChange = (e) => {
    setEnabledUserId(e.target.checked);
    if (e.target.checked) {
      setEnabledAuditMode(false);
      setValue('area_code', '');
    }
  };

  const handleAuditModeCheckboxChange = (e) => {
    setEnabledAuditMode(e.target.checked);

    if (e.target.checked) {
      setEnabledUserId(false);
      setValue('user_id', 0);
      setUserId(0);
    }
  };


  const handleGetCustomer = () => {
    apis.getCustomerUser().then(res => {
      setCustomerData(res.data);
    });
  };

  const onSubmit = () => {
    apis
      .postTriggerList({
        userId: enabledUserId ? userId : "",
        type: selectedType,
        areacode: enabledAuditMode ? areaCode : "",
      })
      .then(res => {
        toast('Successfully added', {
          position: 'top-right',
          autoClose: 2000,
        });
        history.push('/Triggers');
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
                Create Triggers
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={enabledUserId}
                    onChange={handleUserIdCheckboxChange}
                    name="enableUserId"
                  />
                }
                label="User ID"
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                id="user_id"
                disabled={!enabledUserId}
                options={customerData}
                getOptionLabel={option => option?.id + ' - ' + option?.name}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setUserId(newValue.id);
                  } else {
                    setUserId(null);
                  }
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

            <Grid item xs={3}></Grid>

            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={enabledAuditMode}
                    onChange={handleAuditModeCheckboxChange}
                    name="enableAuditMode"
                  />
                }
                label="Area Code"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                name="area_code"
                label="Area Code"
                type="text"
                InputLabelProps={{ shrink: true }}
                id="area_code"
                onChange={(e) => setAreaCode(e.target.value)}
                disabled={!enabledAuditMode}
              />
            </Grid>

            <Grid item xs={3}></Grid>

            <Grid item xs={12}>

              <Grid container spacing={2} maxwidth="xs">
                <Grid item xs={6}>
                  <Autocomplete
                    id="Type"
                    options={type}
                    getOptionLabel={option => option?.name}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setSelectedType(newValue.id);
                      } else {
                        setSelectedType(null);
                      }
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Trigger Type"
                        variant="outlined"
                        helperText="Please select trigger type"
                        required
                        autoFocus
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} maxwidth="xs">
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </form>
    </Container>
  );
}
