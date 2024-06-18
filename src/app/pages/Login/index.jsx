import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import apis from 'app/api';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from 'store/session/actions';
import useStyles from './styles';

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = await apis.login(data?.username, data?.password);
      const { auth_token, username, roles } = res.data;
  

  
      if (roles.includes('SmsUser')) {
        dispatch(login(auth_token, username, roles));
        history.push('/');
      } else if (roles.includes('admin')) {
        dispatch(login(auth_token, username, roles));
        history.push('/');
      } else if (roles.includes('audit')) {
        dispatch(login(auth_token, username, roles));
        history.push('/');
      } else if (roles.includes('mso')) {
        dispatch(login(auth_token, username, roles));
        history.push('/');
      } else if (roles.includes('maintenance2')) {
        dispatch(login(auth_token, username, roles));
        history.push('/');
      } else if (roles.includes('maintenance')) {
        dispatch(login(auth_token, username, roles));
        history.push('/VODMedia');
      } else {
        console.log('No recognized role found');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(
        error?.response?.status === 401
          ? 'Invalid Credentials'
          : 'Unable to login at the moment',
        {
          position: 'top-right',
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Email Address / Username"
            name="username"
            {...register('username', { required: true })}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            {...register('password', { required: true })}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Login;
