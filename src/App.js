import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Component } from 'react';
import Header from './Components/HeaderSignedOut'
import Home from './Components/Home/Home';

class App extends Component {
  
  render(){
    return (
      <BrowserRouter>  
        <div className="App">
          <Header/>
          <Switch>
            <Route path='/'>
              <Home></Home>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
  );
  }
}

export default App;
