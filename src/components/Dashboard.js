import React,{Component} from 'react';
import Admin from './EventManagerComponent/AdminHandler';
import Cookies from "universal-cookie";


export default class Dashboard extends Component{
    constructor(props) {
        const cookies = new Cookies();
        let user = cookies.get('user');
        super(props);
        this.state = {
            user: user,
           
        }
    }
    render(){
        return (
            <div >
                {
                     (this.state.user) ?
                     (

                        (this.state.user.type === "EventManager") ? (<Admin/>)  : null

                     )
                     :
                     (window.location.pathname = '/')
                }
                
            </div>
        );
    }
}