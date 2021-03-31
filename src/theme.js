import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      paper: "#ffffff",
      default: "#fafafa",
      search: "#f0f0f0"
    },
    primary: {
      main: "#2b303a",
      light: '#bfc0c3'
    },
    secondary: {
      main: "#d64933",
      light: '#df6f5d'
    },
    text:{
      primary: "#2b303a",
      secondary: "#d64933",
      blueText: '#0000ff'
    }
  },
  typography:{
    button: {
      textTransform: 'none'
    }
  }
});

export default theme