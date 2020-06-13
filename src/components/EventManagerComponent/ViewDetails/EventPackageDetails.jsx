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
        axios.delete(APIs.BASE_URL+'/event/delete/'+this.props.obj._id)
        .then(console.log('Deleted'))
        .catch(err => console.log(err));
        window.location.href = "/log/EventManager/viewEventPackage";
    }

    render() { 
        return ( 
            <tr>
                <td>
                    <div  className="ui image header">
                        <Image src={APIs.BASE_URL+`/${this.props.obj.images[0]}`} alt={`productImg-${0}`} /> 
                    </div>
                </td>
                <td>
                    {this.props.obj.EventPackageID}
                </td>
                <td>
                    {this.props.obj.EventType}
                </td>
                <td>
                    {this.props.obj.SubType}
                </td>
            
                <td>
                    <Link to={"/log/EventManager/EditEventPackage/"+this.props.obj._id} className="edit"><i className="fas fa-edit" style={{paddingRight:"10px"}}></i></Link>
                </td>
                <td>

                    <p
                        className="delete"
                        onClick={e =>
                            window.confirm("Are you sure you wish to delete this Event package?") &&
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

