import React, { Component } from 'react';
import {ListGroup,Card} from 'react-bootstrap'
import './style.css';

class SideNavBar extends Component {
    state = {  }
    render() { 
        return ( 
           
            <div style={{paddingBottom :"30px"}}>
                        <Card style={{ width: '18rem' }}>
                        <Card.Header action href="/Admin"><i className="fas fa-users-cog" style={{paddingRight:"10px"}}></i>Dashboard</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item action href="/log/EventManager/AddEventPackage"> <i className="fas fa-user-tie" style={{paddingRight:"10px"}}></i> Add Event Package</ListGroup.Item>
                            <ListGroup.Item action href="/log/EventManager/AddEvent"><i className="fas fa-tshirt" style={{paddingRight:"10px"}}></i>Event Reservation</ListGroup.Item>
                            <ListGroup.Item action href="/log/EventManager/ViewEvent"> <i className="fas fa-street-view" style={{paddingRight:"10px"}}></i>View Event Reservation</ListGroup.Item>
                            <ListGroup.Item action href="/log/EventManager/viewEventPackage"> <i className="fas fa-clipboard-list" style={{paddingRight:"10px"}}></i>View Event Package</ListGroup.Item>
                        </ListGroup>
                        </Card>
            </div>    
         );
    }
}
 
export default SideNavBar;