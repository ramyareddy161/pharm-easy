import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import my_cart_image from './static/my_cart_details.png';
import Header from './Header';

class MyCart extends Component{
    cookies = new Cookies();
    constructor(){
    super();
    this.state={
        auth_url : 'http://127.0.0.1:8000/api-basictoken-auth/',
        jwt_url : 'http://127.0.0.1:8000/api-jwttoken-auth/',
        UserDetails:[],
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
        fetch('http://127.0.0.1:8000/pharm_easy/api/medicines/1/addmedicine/', {
                method: 'POST', 
                headers: new Headers({
                    'Authorization': 'JWT '+ this.cookies.get('userJwtToken').token, 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }),
                }).then(function(response) {
                    return response.json();
                })
                .then((myJson) => {
                    this.setState(prev => ( {UserDetails : myJson}));
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
                <h3 className="" style={{color: "white"}}> My Cart Details </h3>
                <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0" className="table">
                    <thead>
                    <tr>
                        <th className="th">Medicine Name</th>
                        <th className="th">Quantity</th>
                        <th className="th">Price</th>
                    </tr>
                    </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table cellPadding="0" cellSpacing="0" border="0" className="table">
                    <tbody>
                    <tr>
                        <td className="td">Thyronom</td>
                        <td className="td">50</td> 
                        <td className="td">1490</td>       
                    </tr>
                    </tbody>
                    </table>
                </div>
                </div>
                </section>
                <div className="medical-details">
                <img src={my_cart_image} className="medical-details-img" alt="my_cart_image"/>
                </div>
            </div>
            </div>
        );
        }
    }

export default MyCart;