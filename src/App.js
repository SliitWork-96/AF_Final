import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import EventDashbord from './components/EventManagerComponent/AdminNavBar';
import APIs from './constants/APIs';
import Login from "./components/Login";
import Footer from "../src/components/Home/Footer";
import Container from "../src/components/Home/Container";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import Description from "./components/Home/Description";


class App extends Component {
  constructor(props) {
    super(props);
    this.validateToken = this.validateToken.bind(this);
    const cookies = new Cookies();
    let user = cookies.get("user");
    let token = cookies.get("token");
    this.state = {
      user: user,
      token: token,
    };
    this.validateToken();
  }


  validateToken() {
    //validate token
    let obj = {
      token: this.state.token,
      user: this.state.user,
    };
    if (this.state.user) {
      axios.post(APIs.BASE_URL+"/user/validate", obj).then(
        (response) => {
          if (response.data.valid) {
          } else {
            const cookies = new Cookies();
            cookies.remove("token", this.state.token);
            cookies.remove("user", this.state.user);

            // window.location.href = "/";
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  render() { 
    return ( 
      <div className="home">

          {
            this.state.user
              ? window.location.pathname === "/"
                ? (window.location.pathname = "/log")
                : null
              : null //true
            //((window.location.pathname !== '/') ? (window.location.pathname = '/') : null) //false
          }

         <Router>
            <Switch>

              <Route exact path="/" exact component={Container} />
              <Route path="/sign-in" component={Login} />
              <Route path="/Signup" component={Signup} />
              <Route path="/log" component={Dashboard} />
              
              <Route path="/description/:id" component={Description} />

            </Switch>
          </Router>


          <Footer />
      
      </div>
      
     );
  }
}
 
export default App;
