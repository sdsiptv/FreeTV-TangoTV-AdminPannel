import { makeStyles } from '@material-ui/core';
import { BLUE, LIGHT_GREY, RED, ORANGE } from 'utils/constant/color';
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  del_submit: {
    margin: theme.spacing(1),
    backgroundColor: RED,
    height: 20,
    width: 20,
    fontSize: 10,
  },
  edit_submit: {
    margin: theme.spacing(1),
    backgroundColor: ORANGE,
    height: 20,
    width: 20,
    fontSize: 10,
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
  table: {
    backgroundColor: LIGHT_GREY,
    border: '1px solid black',
    padding: 10,

    borderRadius: 10,
    overflow: 'auto',
  },
}));
export default useStyles;
