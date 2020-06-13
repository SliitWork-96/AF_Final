import React, { Component } from 'react';
import axios from 'axios';
import TableRow from '../ViewDetails/EventDetails';
import { Statistic } from 'semantic-ui-react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import APIs from '../../../constants/APIs';

class ViewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events : []
          }
    }


    componentDidMount(){
        axios.get(APIs.BASE_URL+'/eventReservation/')
            .then(response => {
                this.setState({ events: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRow(){
        return this.state.events.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
    }

    countCategory(){
        let Exclusive = 0;
        let partial = 0;
        let dayplaning = 0;
        let theme = 0;

         this.state.packages.map( object => {
             if(object.SubType ==='Exclusive full'){
                Exclusive += 1; 
             }else if(object.SubType ==='Partial Planning and Coordination'){
                partial += 1;
             }else if(object.SubType ==='Day Planning'){
                dayplaning += 1;
              }else{
                theme=+ 1;
             }
        });

        const obj ={Exclusive,partial,dayplaning,theme}

        return obj;
    }



    render() { 
        return ( 
            <div className="row">
                 <div className="container">
                    <div className="mt-5 ml-5" > 
                        <Statistic.Group>
                    
                                <Statistic color='teal'>
                                <Statistic.Value>
                                    
                                    {this.state.events.length}
                                </Statistic.Value>
                                <Statistic.Label>Events</Statistic.Label>
                                </Statistic>

                                
                                
                            </Statistic.Group>
                    </div>
                </div>
                <div className="container">
                    <div  className="col-10 mt-5 ml-5 mr-5" >
            
                        <h5 align="center">Event List</h5>
                        <MDBTable striped hover responsive>
                        
                            <MDBTableHead>
                            <tr>
                                <th>Event ID</th>
                                <th>Event Type</th>
                                <th>Event Date</th>
                                <th>Customer name</th>
                                <th>Customer Email</th>
                                <th>Contact</th>
                                <th colSpan="2">Action</th>
                            </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                { this.tabRow() }
                            </MDBTableBody>
                        
                        </MDBTable>
                    </div>
                    
                </div>
               
            </div>
         );
    }
}
 
export default ViewEvent;