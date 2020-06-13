import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from "universal-cookie";
import { Image } from 'semantic-ui-react';
import APIs from '../../../constants/APIs';

class CategoryDetails extends Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        let user = cookies.get('user');
        let token = cookies.get('token');
        this.state = {
          user: user,
          token: token,
        };
    }



    delete() {
        axios.delete(APIs.BASE_URL+'/eventReservation/delete/'+this.props.obj._id)
        .then(console.log('Deleted'))
        .catch(err => console.log(err));
        window.location.href = "/log/EventManager/ViewEvent";
    }

    render() { 
        return ( 
            <tr>
               
                <td>
                    <Image  src='https://react.semantic-ui.com/images/avatar/small/matthew.png' avatar/>
                    <span>{this.props.obj.EventID}</span>
                </td>
                <td>
                    {this.props.obj.EventType}
                </td>
                <td>
                    {this.props.obj.EventDate}
                </td>
                <td>
                    {this.props.obj.CustomerFName}
                </td>
                <td>
                    {this.props.obj.CustomerEmail}
                </td>
                <td>
                    {this.props.obj.contact}
                </td>
            
                <td>
                    <Link to={"/log/EventManager/EditEvent/"+this.props.obj._id} className="edit"><i className="fas fa-edit" style={{paddingRight:"10px"}}></i></Link>
                </td>
                <td>

                    <p
                        className="delete"
                        onClick={e =>
                            window.confirm("Are you sure you wish to delete this Event?") &&
                            this.delete()
                        }
                    >
                    <i className="fas fa-trash" style={{paddingRight:"10px"}}></i>
                    </p>
                </td>
            </tr>
         );
    }
}
 
export default CategoryDetails;

