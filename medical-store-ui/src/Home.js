import React, { Component } from 'react';
import medical_side_pic from '././static/medical_side_pic.png';
import Header from './Header';

class Home extends Component {
    constructor(){
        super();
    }
    render() {
      return (
        <div>
        <Header isAuthenticated={this.props.isAuthenticated} username={this.props.username}/>
        <div className="margin margin-top">
        <h3 className="heading">Pharm Easy</h3>
        <div className="centerAlign">
            <div className="p-r-10">
            <p>     Pharm Easy is a project which is developed for easy maintenance of medical shop. This system reduces time consumption and human effort in maintaining the medical shop. This system provides easy access to maintain all the details of medicines and customers. In this system all the apprehensive fields like purchasing and selling medicines, maintaining their inventory and details of the customers are done effortlessly. This system maintains all the information about medicines and data of the customers which can be retrieved easily at any time. Customers can purchase medicines online from anywhere. This system provides a user-friendly interface in maintaining the data without any duplication.</p>
            {/* <p>     Pharm Easy is a user-friendly system which requires less time. All the information can be stored in the database where we can make any changes to the data like modification or deletions easily without any data loss or data duplication. In this system report generation is very fast and uncomplicated. All the calculations and transaction details are done within no time. Searching for any medicine and details of the customer is easy. This system provides security to the data.</p> */}
            </div>
            <div>
                <img className="medicalSidePic" alt="medicalSidePic" src={medical_side_pic}/>
            </div>
        </div>
        </div>
        </div>
      );
    }
}

export default Home;