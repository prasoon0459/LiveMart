import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      paper: "#ffffff",
      default: "#f9f9f9",
      search: "#f0f0f0",
      tableHead:'#f0f0f0'
    },
    primary: {
      main: "#2b303a",
      light: '#bfc0c3',
      star: '#ffb400'
    },
    secondary: {
      main: "#d64933",
      light: '#df6f5d'
    },
    text:{
      primary: "#050505",
      secondary: "#d64933",
      blueText: '#0000ff',
      white:'#ffffff',
      seen:'#65676b'
    }
  },
  typography:{
    button: {
      textTransform: 'none'
    }
  }
});

export default theme