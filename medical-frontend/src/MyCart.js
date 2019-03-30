import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import my_cart_image from './static/my_cart_details.png';

class MyCart extends Component{
    cookies = new Cookies();
    constructor(){
    super();
    this.state={
        auth_url : 'https://ramyareddy-colloquium.herokuapp.com/api-basictoken-auth/',
        jwt_url : 'https://ramyareddy-colloquium.herokuapp.com/api-jwttoken-auth/',
        QuestionsList:[],
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
        // fetch('https://ramyareddy-colloquium.herokuapp.com/forum/api/questions/', {
                // method: 'get', 
               
                // }).then(function(response) {
                //     return response.json();
                // })
                // .then((myJson) => {
                //     this.setState(prev => ( {QuestionsList : myJson}));
                // })
                // .catch(e => {console.log("Error occured in fetching..")});
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
                    <tr>
                        <td className="td">Shiva Medical</td>
                        <td className="td">Shiva Reddy</td> 
                        <td className="td">Chikkadpally</td>
                        <td className="td">9876789564</td>       
                    </tr>
                    </tbody>
                    </table>
                </div>
                </div>
                </section>
                <div className="medical-details">
                <img src={my_cart_image} className="medical-details-img" alt="my_cart_image"/>
                </div>
                {/* {filteredQuestions.map((currentObj) =>
                    <div className="card bg-light"  style={{border:"1px groove",width:"50%",height:"200px",position:'relative'}}>
                        <div className = "card-body">
                        <p className="card-title" align="left"><h3><Link  to={'/forum/templateview/questions/'+currentObj.id +'/'}>{currentObj.title}</Link></h3></p>
                        <p className="card-text" align="left">{currentObj.description}</p>
                        <h5 className="card-footer" style={{position:'absolute',bottom:'0',right:'1px'}}>
                        Asked By : {currentObj.user_profile.user.first_name} </h5>
                        </div>
                    </div>
                    )
                } */}     
            </div>
        );
        }
    }

export default MyCart;