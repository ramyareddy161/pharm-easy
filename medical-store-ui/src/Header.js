import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import medical_cover_pic from '././static/medical_cover_pic.png';

class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            isAuthenticated: this.props.isAuthenticated,
            username: this.props.username,
        }
    }   
    render(){
        return(
            <div>
            <header>
                <img className="headerImg" src={medical_cover_pic} alt="medical_cover_pic"/>
            </header>
            <nav className="navbar navbar-inverse margin">
                <div className="container-fluid">
                <div className="navbar-header">
                    {this.state.isAuthenticated ? null :
                    <Link className="navbar-brand" to="/"><span className="glyphicon glyphicon-home"></span> Home </Link>}
                    <Link className="navbar-brand" to="/medicines"><span className="glyphicon glyphicon-plus"></span> Medicines </Link>
                    <Link className="navbar-brand" to="/supplier"><span className="glyphicon glyphicon-compressed"></span> Supplier </Link>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li className="username">{this.state.isAuthenticated ? <p className="margin d-contents">Welcome To Pharm Easy</p> : null}</li>
                    {/* <li>{this.state.isAuthenticated ? <p className="margin">{this.state.username}</p> : null}</li> */}
                    {this.state.isAuthenticated &&
                    <li><Link to="/mycart"><span className="glyphicon glyphicon-shopping-cart"></span> My Cart </Link></li>}
                    <li>
                        {!this.state.isAuthenticated ?
                            <Link to="/login"><span className="glyphicon glyphicon-log-in d-inline"></span><p className="d-inline p-10">Login</p></Link>
                             :
                            <a href="/login"><span className="glyphicon glyphicon-log-in d-inline"></span><p className="d-inline p-10">Logout</p></a>}
                    </li>
                </ul>
                </div>
            </nav>
            </div>
        );
    }
}

export default Header;