import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import Notes from './pages/Notes'
import NoteCard from './Components/NotesCard';
import Create from './pages/Create'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Layout from './Components/Layout';




const theme = createTheme({
  palette:{
    primary:{
      main: '#fefefe'
    },
    secondary:purple,
  },
  typography:{
    fontFamily:"Quicksand",
    fontWeightLight:400,
    fontWeightRegular:500,
    fontWeightMedium:600,
    fontWeightBold:700,
    
  }
})

function App() {
  return (
    <div className='App'>

    <ThemeProvider theme={theme}>
    <Router>
      <Layout>
          <Switch>
                <Route exact path="/">
                  <NoteCard />
                </Route>
                <Route path="/create">
                  <Create />
                </Route>
          </Switch>
      </Layout>
    </Router>
    </ThemeProvider>

    </div>
  );
}

export default App;
