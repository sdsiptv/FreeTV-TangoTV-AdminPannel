import { makeStyles } from '@material-ui/core';
import { BLUE, LIGHT_GREY } from 'utils/constant/color';
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    LIGHT_GREY,
    padding: 30,
    margin: 10,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#0088FE ',
  },

  title: {
    backgroundColor: BLUE,
    padding: 10,
    color: '#212121',
    fontSize: 15,

    textAlign: 'center',
    boxShadow: '1px 3px 1px #9E9E9E',
  },
}));
export default useStyles;
