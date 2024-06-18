import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    fontSize: 5,
  },
}));

export default function FormTable(props) {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(0);
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />

      <div className={classes.paper}>
        <Grid container spacing={2}>
          <form className={classes.form}>
            <Grid container spacing={2} maxwidth="xs">
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  type="text"
                  autoFocus
                  value={name}
                  size="small"
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  type="text"
                  autoFocus
                  value={username}
                  size="small"
                  onChange={e => {
                    setUsername(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="password"
                  name="password"
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  label="password"
                  type="password"
                  autoFocus
                  value={password}
                  size="small"
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="text"
                  value={email}
                  size="small"
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="country"
                  label="country"
                  type="text"
                  id="country"
                  value={country}
                  size="small"
                  onChange={e => {
                    setCountry(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="company"
                  label="company"
                  type="text"
                  id="company"
                  value={company}
                  size="small"
                  onChange={e => {
                    setCompany(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="website"
                  label="website"
                  type="text"
                  id="website"
                  value={website}
                  size="small"
                  onChange={e => {
                    setWebsite(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="Phone"
                  label="Phone"
                  type="number"
                  id="Phone"
                  value={phone}
                  size="small"
                  onChange={e => {
                    setPhone(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="address"
                  label="address"
                  type="text"
                  id="address"
                  value={address}
                  size="small"
                  onChange={e => {
                    setAddress(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>
    </Container>
  );
}
