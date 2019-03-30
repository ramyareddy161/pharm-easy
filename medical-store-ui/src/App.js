import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import medical_cover_pic from '././static/medical_cover_pic.png';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Medicines from './Medicines';
import Supplier from './Supplier';
import MyCart from './MyCart'; 
import Cookies from 'universal-cookie';

class App extends Component {
  state = {
    isAuthenticated : false,
    username:'',
    token:null,
  }

  cookies = new Cookies();

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

  render() {
    return (
      <div>
        <header>
          <img className="headerImg" src={medical_cover_pic} alt="medical_cover_pic"/>
        </header>
        <nav className="navbar navbar-inverse margin">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/"><span className="glyphicon glyphicon-home"></span> Home </a>
              <a className="navbar-brand" href="/medicines"><span className="glyphicon glyphicon-plus"></span> Medicines </a>
              <a className="navbar-brand" href="/supplier"><span className="glyphicon glyphicon-compressed"></span> Supplier </a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="/mycart"><span className="glyphicon glyphicon-shopping-cart"></span> My Cart </a></li>
              <li><a href="/admin/login"><span className="glyphicon glyphicon-user"></span> Admin </a></li>
              <li><a href="/user/login"><span className="glyphicon glyphicon-log-in"></span> User </a></li>
            </ul>
            </div>
        </nav>
        <Router>
          <Switch>
              <Route exact path="/" render = {(props)=> <Home/> }/>
              <Route exact path="/user/register" render = {(props) => <Register/>}/>
              <Route exact path="/user/login" render={(props) => this.state.isAuthenticated? 
                <Redirect to="/"/> :
                <Login 
                  isAuthenticated={this.state.isAuthenticated}
                  username={this.state.username} updateUsername={this.updateUsername} updateStatus={this.updateLoginStatus}
                />
              }/>
              <Route exact path="/admin/login" render={(props) => this.state.isAuthenticated? 
                <Redirect to="/"/> :
                <Login 
                  isAuthenticated={this.state.isAuthenticated}
                  username={this.state.username} updateUsername={this.updateUsername} updateStatus={this.updateLoginStatus}
                />
              }/>
              <Route exact path="/medicines" render={(props) => this.state.isAuthenticated? 
                <div></div> :<Medicines/> 
                // :<Redirect to="/user/login"/>   
              }/>
              <Route exact path="/supplier" render={(props) => this.state.isAuthenticated? 
                <div></div> :<Supplier/> 
                // :<Redirect to="/user/login"/>   
              }/>
              <Route exact path="/mycart" render={(props) => this.state.isAuthenticated? 
                <div></div> :<MyCart/> 
                // :<Redirect to="/user/login"/>   
              }/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
