import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GREEN } from 'utils/constant/color';
import useStyles from './styles';

export default function ComposeMail() {
  const history = useHistory();
  const Role = localStorage.getItem("roles");
  const classes = useStyles();
  const { handleSubmit, register } = useForm();

  const [customerData, setCustomerData] = useState([]);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    handleGetCustomer();
  }, []);

  const handleGetCustomer = () => {
    apis.getCustomerUser().then(res => {
      setCustomerData(res.data);
    });
  };

  const onSubmit = ({ Description, Title }) => {
    apis
      .postMailList({
        userId: userId,
        description: Description,
        title: Title,
      })
      .then(res => {
        toast('Successfully added', {
          position: 'top-right',
          autoClose: 2000,
        });
        history.push('/Mail');
      });
  };

  const SmsonSubmit = ({ Description, Title }) => {
    apis
      .postMailList({
        userId: userId,
        description: Description,
        title: Title,
      })
      .then(res => {
        toast('Successfully added', {
          position: 'top-right',
          autoClose: 2000,
        });
        history.push('/Mail');
      });
  };
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      {Role === "admin" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5" className={classes.title}>
                  Compose Mail
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2} maxwidth="xs">
                  <Grid item xs={6}>
                    <Autocomplete
                      id="Customer"
                      options={customerData}
                      getOptionLabel={option =>
                        option?.id + ' - ' + option?.username
                      }
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
                </Grid>
                <Grid container spacing={2} maxwidth="xs">
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="Title"
                      label="Title"
                      type="text"
                      id="Title"
                      {...register('Title', { required: true })}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} maxwidth="xs">
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="Description"
                      label="Description"
                      type="text"
                      id="Description"
                      multiline
                      rows={4}
                      {...register('Description', { required: true })}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} maxwidth="xs">
                <Grid item xs={6}>
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
            </Grid>
          </div>
        </form>
      )}

      {Role === "SmsUser" && (
        <form onSubmit={handleSubmit(SmsonSubmit)}>
          <div className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5" className={classes.title}>
                  SMS--- Compose Mail
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2} maxwidth="xs">
                  <Grid item xs={6}>
                    <Autocomplete
                      id="Customer"
                      options={customerData}
                      getOptionLabel={option =>
                        option?.id + ' - ' + option?.username
                      }
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
                </Grid>
                <Grid container spacing={2} maxwidth="xs">
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="Title"
                      label="Title"
                      type="text"
                      id="Title"
                      {...register('Title', { required: true })}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} maxwidth="xs">
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="Description"
                      label="Description"
                      type="text"
                      id="Description"
                      multiline
                      rows={4}
                      {...register('Description', { required: true })}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} maxwidth="xs">
                  <Grid item xs={6}>
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
            </Grid>
          </div>
        </form>
      )}
    </Container>
  );
}
