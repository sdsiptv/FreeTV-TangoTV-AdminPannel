import { makeStyles } from '@material-ui/core';
import { BLUE, LIGHT_GREY, WHITE } from 'utils/constant/color';
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

    textAlign: 'left',
    boxShadow: '1px 3px 1px #9E9E9E',
    width: 300,
  },
  modal: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
    backgroundColor: WHITE,
  },
}));
export default useStyles;
