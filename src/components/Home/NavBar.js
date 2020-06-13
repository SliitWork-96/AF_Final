// Import modules and files
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeStyle.css";
import Cookies from "universal-cookie";
import axios from "axios";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import APIs from '../../constants/APIs';

export default class NavBar extends Component {
  constructor(props) {
    const cookies = new Cookies();
    let user = cookies.get("user");
    super(props);

    this.state = {
      user: user,
      Subtype: "",
      Images: [],
      eventpackage: [],
      product: [],
      Search: '',
      showSearch: false,
  
    };

  }

  // Handle signout: chamil
  onClickSignOut = (e) => {
    e.preventDefault();

    console.log("Signout");
    const cookies = new Cookies();

    const obj = {
      token: cookies.get("token"),
      user: cookies.get("user"),
    };

    axios.post("http://localhost:5000/user/sign-out", obj).then(
      (response) => {
        const cookies = new Cookies();
        cookies.remove("token");
        cookies.remove("user");
        window.location.href = "/sign-in";

        // if( window.location.path === "http://localhost:3000/log"){
        //     console.log('inside if')
        //     window.location.path = "/";
        // }
      },
      (error) => {
        cookies.remove("token");
        cookies.remove("user");
        window.location.href = "/";
      }
    );
  };

  componentDidMount() {
    const cookies = new Cookies();
    let user = cookies.get("user");

    axios
      .get(APIs.BASE_URL+'/event/')
      .then((response) => {
        this.setState({ eventpackage: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

    }


  // Get the dropdown value
  onChangeCategory(e) {
    this.setState({
      eventpackage: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Link to="/">
            <Navbar.Brand href="#home">
               <span className="logo-subhead">EVENT PLANNER</span>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown
                title="Event Packages"
                id="basic-nav-dropdown"
                value={this.state.eventpackage}
                onChange={this.onChangeCategory}
              >
                {this.state.eventpackage.map(function (epackages) {
                  return (
                    <NavDropdown.Item href={"/description/" + epackages._id}>
                      {epackages.EventType}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>

             
              <Nav.Link href="/about">About Us</Nav.Link>
           
            </Nav>

            {this.state.user ? (
              <Nav>
                <NavDropdown
                  title={this.state.user ? this.state.user.username : "Sign In"}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item onClick={this.onClickSignOut}>
                    <div>
                      <span>Logout</span>
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
                <Nav.Link href="/sign-in">
                  <i class="fas fa-user mr-2" />{" "}
                  {this.state.user ? this.state.user.username : "Sign In"}
                </Nav.Link>
              )}

            <Form inline onSubmit={this.clickSearch}>
              <FormControl type="text" placeholder="Search..." value={this.state.Search} onChange={this.onChangeSearch} className="mr-sm-2" />
              <Button variant="outline-dark mt-2">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
       
      </div>
    );
  }
}
