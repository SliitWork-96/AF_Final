import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import AddEventPackage from './CreateEventComponent/CreateEventPackage';
import viewEventPackage from './ViewComponent/viewEventPackages';
import editEventPackage from './EditComponent/editEventPackage';
import AddEvent from './CreateEventComponent/CreateEventReservation';
import ViewEvent from './ViewComponent/ViewEvent';
import editEvent from './EditComponent/EditEvent';
import EventDash from './CreateEventComponent/EventDash';

 
class AdminDashboardController  extends Component {
    render() { 
        return ( 

            <Switch>

                <Route exact path="/log" component={ EventDash } />

                <Route path="/log/EventManager/AddEventPackage" component={ AddEventPackage } />
                <Route path="/log/EventManager/AddEvent" component={ AddEvent } />

                <Route path="/log/EventManager/viewEventPackage" component={ viewEventPackage } />
                <Route path="/log/EventManager/ViewEvent" component={ ViewEvent } />

                <Route path="/log/EventManager/EditEventPackage/:id" component={ editEventPackage } />
                <Route path="/log/EventManager/EditEvent/:id" component={ editEvent } />
            </Switch>
         );
    }
}
 
export default AdminDashboardController;