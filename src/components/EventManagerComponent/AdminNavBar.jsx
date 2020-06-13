import React, { Component } from 'react';
import {Nav, Navbar,NavDropdown} from 'react-bootstrap'
import user from './images/user.png';
import Cookies from 'universal-cookie';
import axios from "axios";
import APIs from '../../constants/APIs';


class AdminNavBar extends Component {
    constructor(props) {
        const cookies = new Cookies();
        let user = cookies.get('user');
            super(props);
            this.onClickSignOut = this.onClickSignOut.bind(this);
           
            this.state = {
                user: user.type,
                
            }
    }


    onClickSignOut(e) {
        e.preventDefault();
        console.log("Signout");
        const cookies = new Cookies();
        const obj = {
            token: cookies.get('token'),
            user: cookies.get('user'),
        };
        axios.post(APIs.BASE_URL+'/user/sign-out', obj)
            .then(
                (response) => {
                    const cookies = new Cookies();
                    cookies.remove('token');
                    cookies.remove('user');
                    window.location.href = "/sign-in";
                },
                (error) => {
                    cookies.remove('token');
                    cookies.remove('user');
                    window.location.href = "/";
                }
            );
    }

    render() { 
        return (  
            <div >
                
            <Navbar collapseOnSelect expand="lg" >
                <Navbar.Brand href="/">Event Planing</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/log/EventManager/AddEventPackage">Add Event Package</Nav.Link>
                    <Nav.Link href="/log/EventManager/AddEvent">Event Reservation</Nav.Link>
                    <Nav.Link href="/log/EventManager/ViewEvent">View Event Reservation</Nav.Link>
                    <Nav.Link href="/log/EventManager/viewEventPackage">View Event Package</Nav.Link>
                
                </Nav>
                <Nav>
                    <NavDropdown title={this.state.user} id="collasible-nav-dropdown">
                      
                        <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={this.onClickSignOut}>
                            
                                <div>
                                    
                                        <span>Logout</span>
                                    
                                </div>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Navbar.Brand href="/"  className="user">
                            <img style={{height:"30px", width:"30px", }} src={user} alt="user" align="center"/>
                        </Navbar.Brand>
                </Navbar.Collapse>
            </Navbar>
            <hr className="navDivider"/>

            <div>
                <header id="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10">
                                <h1><span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Dashboard <small>Manage Your Site</small></h1>
                            </div>
                    
                        </div>
                    </div>
                </header>

            </div>
            
        </div>

        
        
        );
    }
}
 
export default AdminNavBar;