import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router';
import Header from './Header';

class Register extends Component{
    constructor() {
        super();
        this.state = {
            auth_url : 'http://127.0.0.1:8000/api-basictoken-auth/',
            jwt_url : 'http://127.0.0.1:8000/api-jwttoken-auth/',
            buttonName : 'Register',
            first_name : "",
            last_name : "",
            username : "" ,
            password: "",
            location: "",
            contact: "",
        };
    }
    cookies = new Cookies();
    
    
    saveFirst_name = (event) => {
        const {target : {value}}  = event;
        this.setState({
            first_name : value
        })
    }

    saveLast_name = (event) => {
        const {target : {value}}  = event;
        this.setState({
            last_name : value
        })
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

    saveLocation = (event) => {
        const {target : {value}}  = event;
        this.setState({
            location : value
        })
    }

    saveContact = (event) => {
        const {target : {value}}  = event;
        this.setState({
            contact : value
        })
    }

    logout = (props) =>
    {
        this.cookies.remove('userJwtToken');
        this.cookies.remove('username');
        console.log(this.cookies.get('userJwtToken'));
        this.props.updateUsername('');
        this.props.updateStatus(false);
        this.setState(prev => ( {buttonName : 'Login'}));
    }

    submit = (e) =>{
        var data=JSON.stringify({
                username: this.state.username,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                password: this.state.password,
                location: this.state.location,
                contact: this.state.contact
        });
        fetch('http://127.0.0.1:8000/pharm_easy/api/auth/register/',{
            method:'POST',
            headers: new Headers({
                 'Content-Type': 'application/json',
                 'Accept': 'application/json',
               }),
            body: data,
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                  } else {
                    var error = new Error(response.statusText);
                    error.response = response;
                    console.log(response.statusText);
                    alert(error,response.statusText);
                    throw error
                  }    
            })
        .then(responseJson => {
            // this.setState({
            //     status:true
            // });
            alert("Registered Successfully");
            this.props.history.push('/login');
        })
        .catch(e => {console.log (e);});
        }

    
    render(){
        return (
            <div>
            <Header isAuthenticated={this.props.isAuthenticated} username={this.props.username}/>
            <div className= "margin margin-top modalAlign">
                <form className = "modal-content animate d-block" style={{height: "330px",padding: "15px"}}>
                <div className="textAlignC">
                <h3 className="heading"> Pharm Easy </h3>
                <label htmlFor="first_name" className="p-l-r"><b> First_Name </b></label>
                <input onChange={this.saveFirst_name} type="text" placeholder="Enter first_name"/><br/>
                <label htmlFor="last_name" className="p-l-r"><b> Last_Name </b></label>
                <input onChange={this.saveLast_name} type="text" placeholder="Enter last_name"/><br/>
                <label htmlFor="username" className="p-l-r"><b> UserName </b></label>
                <input onChange={this.saveUsername} type="text" placeholder="Enter username"/><br/>
                <label htmlFor="password" className="p-l-r"><b> Password </b></label>
                <input onChange={this.savePassword} type="password" placeholder="Enter Password"/><br/>
                <label htmlFor="location" className="p-l-r"><b> Location </b></label>
                <input onChange={this.saveLocation} type="text" placeholder="Enter Location"/><br/>
                <label htmlFor="contact" className="p-l-r"><b> Contact </b></label>
                <input onChange={this.saveContact} type="text" placeholder="Enter Contact"/><br/>
                <div className="p-10 centerAlign">
                <button onClick={this.submit} className={"btn btn-primary m-auto"} value="Register">Register</button>
                </div>
                </div>
                </form>
            </div>
            </div>
        )
    }
}

export default withRouter(Register)