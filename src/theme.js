import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      paper: "#ffffff",
      default: "#fafafa"
    },
    primary: {
      main: "#2b303a"
    },
    secondary: {
      main: "#d64933"
    },
    text:{
      primary: "#2b303a",
      secondary: "#d64933",
    }
  },
  typography:{
    button: {
      textTransform: 'none'
    }
  }
});

export default theme