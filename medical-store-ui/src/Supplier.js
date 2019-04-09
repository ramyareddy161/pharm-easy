import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import supplier_image from './static/supplier_image.jpg';
import Header from './Header';

class Supplier extends Component{
    cookies = new Cookies();
    constructor(){
    super();
    this.state={
        auth_url : 'http://127.0.0.1:8000/api-basictoken-auth/',
        jwt_url : 'http://127.0.0.1:8000/api-jwttoken-auth/',
        SuppliersList:[],
        search : '',
    }
    }   

    logout = (props) =>
    {
        // <a href="/forum/templateview"></a>
        // this.cookies.remove('userJwtToken');
        // this.cookies.remove('username');
        // console.log(this.cookies.get('userJwtToken'));
        // this.props.updateUsername('');
        // this.props.updateStatus(false);
        // this.setState(prev => ( {buttonName : 'Login'}));
    }
    
    componentDidMount() {
        fetch('http://127.0.0.1:8000/pharm_easy/api/medical_shop/', {
                method: 'get', 
                headers: new Headers({
                    'Authorization': 'JWT '+ this.cookies.get('userJwtToken').token, 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }),
                }).then(function(response) {
                    return response.json();
                })
                .then((myJson) => {
                    this.setState(prev => ( {SuppliersList : myJson}));
                })
                .catch(e => {console.log("Error occured in fetching..")});
    }

    updateSearch(event){
        // this.setState({search:event.target.value.substr(0,20)});
    }
    
    render(){
        // let filteredQuestions = this.state.QuestionsList.filter(
        //     (currentObj)=>{
        //         return currentObj.title.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1;
        //     }
        // );
        return(
            <div>
            <Header isAuthenticated={this.props.isAuthenticated} username={this.props.username}/>
            <div className="margin margin-top modalAlign body">
            <section className="section">
                <div className="textAlignL">
                <h3 className="" style={{color: "white"}}> Supplier Details </h3>
                <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0" className="table">
                    <thead>
                    <tr>
                        <th className="th">Name</th>
                        <th className="th">Owner Name</th>
                        <th className="th">Location</th>
                        <th className="th">Contact</th>
                    </tr>
                    </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table cellPadding="0" cellSpacing="0" border="0" className="table">
                    <tbody>
                    {this.state.SuppliersList.map((currentSupplier) =>
                    <tr>
                        <td className="td">{currentSupplier.name}</td>
                        <td className="td">{currentSupplier.owner_name}</td> 
                        <td className="td">{currentSupplier.location}</td>
                        <td className="td">{currentSupplier.contact}</td>       
                    </tr>
                    )}
                    </tbody>
                    </table>
                </div>
                </div>
                </section>
                <div className="medical-details">
                <img src={supplier_image} className="medical-details-img" alt="supplier_image"/>
                </div>
            </div>
            </div>
        );
        }
    }

export default Supplier;