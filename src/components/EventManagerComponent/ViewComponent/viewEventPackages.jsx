import React, { Component } from 'react';
import axios from 'axios';
import TableRow from '../ViewDetails/EventPackageDetails';
import { Statistic } from 'semantic-ui-react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import APIs from '../../../constants/APIs';

class ViewEventPackage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            packages : []
          }
    }


    componentDidMount(){
        axios.get(APIs.BASE_URL+'/event/')
            .then(response => {
                this.setState({ packages: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRow(){
        return this.state.packages.map(function(object, i){
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
                                    
                                    {this.state.packages.length}
                                </Statistic.Value>
                                <Statistic.Label>Packages</Statistic.Label>
                                </Statistic>

                                <Statistic color='pink'>
                                <Statistic.Value> {this.countCategory().Exclusive}</Statistic.Value>
                                <Statistic.Label>Exclusive full</Statistic.Label>
                                </Statistic>

                                
                                <Statistic color='violet'>
                                <Statistic.Value> {this.countCategory().partial}</Statistic.Value>
                                <Statistic.Label>Partial Planning & Coordination</Statistic.Label>
                                </Statistic>

                                <Statistic color='orange'>
                                <Statistic.Value> {this.countCategory().dayplaning}</Statistic.Value>
                                <Statistic.Label>Day Planning</Statistic.Label>
                                </Statistic>

                                <Statistic color='yellow'>
                                <Statistic.Value> {this.countCategory().theme}</Statistic.Value>
                                <Statistic.Label>Creation of Themes</Statistic.Label>
                                </Statistic>
                                
                            </Statistic.Group>
                    </div>
                </div>
                <div className="container">
                    <div  className="col-10 mt-5 ml-5 mr-5" >
            
                        <h5 align="center">Packages List</h5>
                        <MDBTable striped hover responsive>
                        
                            <MDBTableHead>
                            <tr>
                                <th>Event packages Iamge</th>
                                <th>Event packages ID</th>
                                <th>Event packages Type</th>
                                <th>Sub Type</th>
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
 
export default ViewEventPackage;