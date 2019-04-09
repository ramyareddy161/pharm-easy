import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Medicines from './Medicines';
import Supplier from './Supplier';
import MyCart from './MyCart'; 
import Cookies from 'universal-cookie'; 

class App extends Component {

  cookies = new Cookies();
  state = {
    isAuthenticated : false,
    username:'',
    token:null,
  }
  constructor(){
    super();
    if (this.cookies.get('userJwtToken') !== '')
    {
      this.updateLoginStatus(true);
    }
  }

  updateLoginStatus = (isAuthenticated) => {
    this.setState({isAuthenticated})
  }

  updateUsername = (username) => {
    this.setState({username})
  }


  render() {
    return (
      <div>
        <Router>
          <Switch>
              <Route exact path="/" render = {(props)=> <Home isAuthenticated={this.state.isAuthenticated} username={this.state.username}/> }/>
              <Route exact path="/register" render = {(props) => <Register isAuthenticated={this.state.isAuthenticated} username={this.state.username}/>}/>
              <Route exact path="/login" render={(props) => this.state.isAuthenticated? 
                <Redirect to="/medicines"/> :
                <Login 
                  isAuthenticated={this.state.isAuthenticated}
                  username={this.state.username} updateUsername={this.updateUsername} updateStatus={this.updateLoginStatus}
                />
              }/>
              <Route exact path="/medicines" render={(props) => <Medicines isAuthenticated={this.state.isAuthenticated} username={this.state.username}/>}/>
              <Route exact path="/supplier" render={(props) => <Supplier isAuthenticated={this.state.isAuthenticated} username={this.state.username}/>}/>
              <Route exact path="/mycart" render={(props) => this.state.isAuthenticated? 
                <MyCart isAuthenticated={this.state.isAuthenticated} username={this.state.username}/> : <Redirect to="/login"/> 
              }/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
