import { makeStyles } from '@material-ui/core';
import { BLUE, LIGHT_GREY, YELLOW } from 'utils/constant/color';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: LIGHT_GREY,
    padding: 30,
    margin: 10,
  },
  paper_list: {
    overflow: 'auto',
    height: 300,
  },
  title: {
    backgroundColor: BLUE,
    padding: 10,
    color: '#212121',
    fontSize: 20,

    textAlign: 'left',
    boxShadow: '1px 3px 1px #9E9E9E',
    width: 300,
  },
  Subtitle: {
    backgroundColor: 'grey',
    padding: 10,
    color: 'white',
    fontSize: 15,

    textAlign: 'center',
    boxShadow: '1px 1px 1px #9E9E9E',

    height: 40,
  },
  button: {
    margin: theme.spacing(0.5, 0),
    backgroundColor: YELLOW,
    width: '80%',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    fontSize: 5,
  },
}));

export default useStyles;
