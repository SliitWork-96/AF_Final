// Import modules and files
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomeStyle.css';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
             <h4 className="text-center mt-4">Contact Us</h4>
             <ul className="text-center mt-5">
               <li><i className="fa fa-phone"></i> (011) 4 222 333</li>
               <li><i className="fa fa-envelope"></i> nfo@thebanquetcompany.com</li>
               <li><i className="fa fa-map"></i> 4A Aloe Avenue, Colombo 3, Sri Lanka</li>
             </ul>
            </div>
            <div className="col-md-4 cus-service">
             <h4 className="text-center mt-4">Customer Services</h4>
             <ul className="text-center mt-5">
               <p>The Banquet Company is Sri Lanka’s premier event planning and coordination company. Having worked with internationally renowned event planners and coordinators, 
                 we have the expertise to plan and execute events of international standard that will not disappoint you or your guests. 
              </p>
               
             </ul>
            </div>
            <div className="col-md-4">
              <div className="text-center mt-4">
                <h4 className="text-center mb-5">Follw Us</h4>
                 <a href="https://www.facebook.com/"><i className="fab fa-facebook fa-3x ml-4"></i></a>
                 <a href="https://twitter.com/login"><i className="fab fa-twitter fa-3x ml-4"></i></a>
                 <a href="https://www.instagram.com/?hl=en"><i className="fab fa-instagram fa-3x ml-4"></i></a>
              </div>
            </div>
          </div>
        </div>
       <p className="text-center Copyright">Copyright &copy; 2020 | International Luxury Wedding & Party Planners</p>
      </div>
    )
  }
}
