import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router';
import Header from './Header';

class Login extends Component{
    cookies = new Cookies();
    state = {
        auth_url : 'http://127.0.0.1:8000/api-basictoken-auth/',
        jwt_url : 'http://127.0.0.1:8000/api-jwttoken-auth/',
        username : "" ,
        password: ""
    }
    constructor(){
        super();
    }

    saveUsername = (event) => {
        const {target : {value}}  = event;
        this.setState({
            username : value
        })
    }

    savePassword = (event) => {
        const {target : {value}} = event;
        this.setState({
            password : value
        })
    }

    submit = (e) => {
        e.preventDefault();
        this.login(this.state)
    }

    logout = (props) =>
    {
        this.cookies.remove('userJwtToken');
        this.cookies.remove('username');
        console.log(this.cookies.get('userJwtToken'));
        this.props.updateUsername('');
        this.props.updateStatus(false);
    }
    
    login = ({username, password}) =>
    {
        console.log(username + " : "+password);
        var formData  = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        fetch(this.state.jwt_url,{ 
            method: 'post',
            body: formData, 
          }).then(function(response) {
            return response.json();
        })
        .then((myJson) => {
            if ('token' in myJson){
                this.cookies.set('userJwtToken', myJson, { path: '/',expires: new Date(Date.now()+2592000)} );
                this.cookies.set('username',formData.get('username'), {path : '/', expires: new Date(Date.now()+2592000)})
                console.log(this.cookies.get('userJwtToken'));
                this.props.updateUsername(formData.get('username'));
                this.props.updateStatus(true);
                this.props.history.push('/medicines');
                console.log("Redirecting....")
            }
            else{
                alert("Invalid Credentials");
            }
        })
        .catch(e => {console.log("Error occured in fetching students..")});
    }

    render(){
        return (
        <div>
        <Header isAuthenticated={this.props.isAuthenticated} username={this.props.username}/>
        <div className = "main margin margin-top modalAlign">
            <form className="modal-content animate">
            <div className="textAlignC">
            <h3 className="heading"> Pharm Easy </h3>
                <label htmlFor="uname"><b> Username  </b></label>
                <input type="text" onChange={this.saveUsername} placeholder="Enter Username" name="uname" required/>
                <br/>
                <label htmlFor="psw"><b> Password  </b></label>
                <input type="password" onChange={this.savePassword} placeholder="Enter Password" name="psw" required/>
                <br/>
                {/* <Button color="secondary" type="submit" onClick={this.submit} className={"btn btn-primary"} value="Login">Login</Button> */}
                <button type="submit" onClick={this.submit} className={"btn btn-primary"} value="Login">Login</button>
                New User ? <a href="/register"> Register Here </a>
            </div>
            </form>
        </div>
        </div>
        )
    }
}

export default withRouter(Login)