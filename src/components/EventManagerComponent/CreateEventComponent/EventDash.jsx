import React, { Component } from 'react';
import carousel1 from'../../Home/images/Event_Planner.png';

class EventDash extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                 <img src={carousel1} />
            </div>
         );
    }
}
 
export default EventDash;