import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import medical_details from './static/medicine_details.png';
import Header from './Header';

class Medicines extends Component{
    cookies = new Cookies();
    constructor(){
    super();
    this.state={
        auth_url : 'http://127.0.0.1:8000/api-basictoken-auth/',
        jwt_url : 'http://127.0.0.1:8000/api-jwttoken-auth/',
        MedicinesList:[],
        search : '',
    }
    }   

    logout = (props) =>
    {
        // <a href="/"></a>    
        this.cookies.remove('userJwtToken');
        this.cookies.remove('username');
        // console.log(this.cookies.get('userJwtToken'));
        this.props.updateUsername('');
        this.props.updateStatus(false);
        // this.setState(prev => ( {buttonName : 'Login'}));
    }
    
    componentDidMount() {
        fetch('http://127.0.0.1:8000/pharm_easy/api/medicines/', {
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
                    this.setState(prev => ( {MedicinesList : myJson}));
                })
                .catch(e => {console.log("Error occured in fetching..")});
    }

    updateSearch(event){
        // this.setState({search:event.target.value.substr(0,20)});
    }

    addMedicineToCart(medicine){
        console.log(medicine);
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
                <h3 className="" style={{color: "white"}}> Medicine Details </h3>
                <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0" className="table">
                    <thead>
                    <tr>
                        <th className="th">Name</th>
                        <th className="th">Quantity (mg)</th>
                        <th className="th">Price</th>
                        <th className="th">Mfg-Date</th>
                        <th className="th">Exp-Date</th>
                        <th className="th">No of Tablets</th>
                        <th className="th">Company</th>
                        <th className="th">Type</th>
                        <th className="th">Shop</th>
                        {this.props.isAuthenticated &&
                        <th className="th">Add</th>}
                    </tr>
                    </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table cellPadding="0" cellSpacing="0" border="0" className="table">
                    <tbody>
                    {this.state.MedicinesList.map((currentMedicine) =>
                    <tr>
                        <td className="td">{currentMedicine.name}</td>
                        <td className="td">{currentMedicine.quantity}</td> 
                        <td className="td">{currentMedicine.price}</td>
                        <td className="td">{currentMedicine.mfg_date}</td>
                        <td className="td">{currentMedicine.exp_date}</td>
                        <td className="td">{currentMedicine.no_of_tablets}</td>
                        <td className="td">{currentMedicine.company}</td>
                        <td className="td">{currentMedicine.type}</td>
                        <td className="td">{currentMedicine.shop.name}</td>
                        {this.props.isAuthenticated && 
                        <td className="td">
                            <button className="add-button" onClick={this.addMedicineToCart.bind(this, currentMedicine.id)}>ADD</button>
                        </td>}        
                    </tr>
                    )}
                    </tbody>
                    </table>
                </div>
                </div>
                </section>
                <div className="medical-details">
                <img src={medical_details} className="medical-details-img" alt="medical_details"/>
                </div>   
            </div>
            </div>
        );
        }
    }

export default Medicines;