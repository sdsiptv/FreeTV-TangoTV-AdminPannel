import { makeStyles } from '@material-ui/core';
import { BLUE, LIGHT_GREY } from 'utils/constant/color';
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: LIGHT_GREY,
    padding: 10,
    margin: 10,
  },
  title: {
    backgroundColor: BLUE,
    padding: 10,
    color: '#212121',
    fontSize: 20,
    height:10,

    textAlign: 'left',
    boxShadow: '1px 3px 1px #9E9E9E',
    width: 300,
  },
}));
export default useStyles;
