import { createMuiTheme } from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';
import blueGrey from '@material-ui/core/colors/blueGrey';

let theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: blueGrey,
    common: {
      white: '#fff',
    },
  },
});

theme = {
  ...theme,
  mixins: {
    ...theme.mixins,
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 64px)',
      padding: '150px 0',
    },
    form: {
      width: '100%',
      maxWidth: '400px',
      padding: '25px 50px',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 5,
    },
  },
};

export default theme;
