import { createMuiTheme } from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';
import blueGrey from '@material-ui/core/colors/blueGrey';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: blueGrey,
    common: {
      white: '#fff',
    }
  },
});

export default theme;