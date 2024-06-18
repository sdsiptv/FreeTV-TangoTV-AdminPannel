import { makeStyles } from '@material-ui/core';
import { BLUE, LIGHT_GREY } from 'utils/constant/color';
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
  title: {
    backgroundColor: BLUE,
    padding: 10,
    color: '#212121',
    fontSize: 20,

    textAlign: 'left',
    boxShadow: '1px 3px 1px #9E9E9E',
    width: 300,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    fontSize: 5,
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
export default useStyles;
