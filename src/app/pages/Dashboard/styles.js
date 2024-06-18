import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper_main: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  paper: {
    //padding: theme.spacing(3),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    backgroundColor: '#c6cfcf',
    //alignItems: 'center',
  },

  title: {
    backgroundColor: '#0088FE',

    color: '#212121',
    fontSize: 20,
    boxShadow: '1px 3px 1px #9E9E9E',
    padding: 10,
  },
}));
export default useStyles;
