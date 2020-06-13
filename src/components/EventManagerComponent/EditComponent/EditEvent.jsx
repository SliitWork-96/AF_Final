import React, { Component } from 'react';
import {Button, Col, Form, FormControl} from 'react-bootstrap';
import axios from 'axios';
import {  Message } from 'semantic-ui-react';
import PackageList from '../CreateEventComponent/list';
import APIs from '../../../constants/APIs';

class EditEventReservation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            EventID : '',
            EventDate : '',
            CustomerLName : '',
            CustomerFName : '',
            CustomerEmail : '',
            contact : '',
            address : '',
            EventType : '',
            SubType : '',
            ItemStages:[],
            stages:[
                {stage:""}
            ],
            description:'',
            amount:0,
            ArrayPackage:[],
            message:''
        

          }
    }

    componentDidMount(){

        axios.get(APIs.BASE_URL+'/eventReservation/'+this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    EventID: response.data.EventID,
                    EventDate: response.data.EventDate,
                    SubType: response.data.SubType,
                    CustomerLName:response.data.CustomerLName,
                    CustomerFName:response.data.CustomerFName,
                    CustomerEmail:response.data.CustomerEmail,
                    description: response.data.description,
                    contact: response.data.contact,
                    address: response.data.address,
                    amount: response.data.amount,
                    EventType: response.data.EventType,
                    stages: response.data.stages,
                });
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get(APIs.BASE_URL+'/event/')
            .then(response => {
                this.setState({ ArrayPackage: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

           
    }


    onChangeEventID = (e)=> {
        this.setState({
            EventID: e.target.value
        });
    }

    onChangeEventDate = (e) =>{
        this.setState({
            EventDate: e.target.value
        });
    }

    onChangeCustomerFName = (e) => {
        this.setState({
            CustomerFName: e.target.value
        });
    }

    onChangeCustomerLName = (e) => {
        this.setState({
            CustomerLName: e.target.value
        });
    }


    onChangeCustomerEmail =(e) =>{
        this.setState({
            CustomerEmail: e.target.value
        });
    }

    onChangeContact = (e) =>{
        this.setState({
            contact: e.target.value
        });
    }

    onChangeAddress = (e) =>{
        this.setState({
            address: e.target.value
        });
    }

    onChangeEventType = (e) => {
        this.setState({
            EventType: e.target.value
        });
    }


    onChangeSubType =(e)=> {
        this.setState({
            SubType: e.target.value
        });
    }


    onChangeDescription = (e) =>{
        this.setState({
            description: e.target.value
        });
    }

    
    onChangeamount = (e) => {
        this.setState({ amount: e.target.value })
    }


    handleAddStage = () => {
        const item = {
            stage: "",
        };
        this.setState({
            stages: [...this.state.stages, item]
        });
    };


    handleChangeStageName = idx => e => {
        const stages = [...this.state.stages];
        stages[idx] = {
            stage: e.target.value,
        };
        this.setState({
            stages
        });
    };


    handleRemoveStage = () => {

        this.setState({
            stages: this.state.stages.slice(0, -1)
        
        });
    };


    onCheckComplete = (id) =>{
        const crossPackage = this.state.ArrayPackage.find( Servicepackage => Servicepackage.EventPackageID === id);
      
       
        this.state.ArrayPackage.forEach(element => {
            if(crossPackage.EventPackageID === element.EventPackageID){

                axios.get(APIs.BASE_URL+'/event/' + element._id)
                .then(response => {
                    this.setState({ 
                        stages: response.data.stages,
                        EventType:response.data.EventType,
                        SubType:response.data.SubType,
                        amount:response.data.PackagePrice
                    });
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
        });
    }



    onSubmit = (e) =>{
        e.preventDefault();

        let editstages;

        for(let i = 0; i < this.state.stages.length ; i++){
            editstages = {
                stageNo: i + 1,
                stage: this.state.stages[i].stage,
            };
            this.state.ItemStages.push(editstages);
        }




        const obj = {

            EventID : this.state.EventID,
            EventDate : this.state.EventDate,
            CustomerFName : this.state.CustomerFName,
            CustomerLName : this.state.CustomerLName,
            CustomerEmail : this.state.CustomerEmail,
            contact : this.state.contact,
            address : this.state.address,
            EventType : this.state.EventType,
            SubType : this.state.SubType,
            stages: this.state.ItemStages,
            description : this.state.description,
            amount:this.state.amount,
        };

        axios.put(APIs.BASE_URL+'/eventReservation/update/'+this.props.match.params.id, obj)
        .then(res => {
                this.setState({
                    message: res.data.message
                });
                console.log(res.data.message);
            }
        );


        this.setState({
            EventID : '',
            EventDate : '',
            CustomerLName : '',
            CustomerFName : '',
            CustomerEmail : '',
            contact : '',
            address : '',
            EventType : '',
            SubType : '',
            ItemStages:[],
            stages:[
                {stage:""}
            ],
            description:'',
            amount:0

        });
        window.location.href = "/log/EventManager/ViewEvent";
        
    }

    render() { 
        return ( 
            <div className="" >
                <div  className="col-13 mt-5 ml-5" style={{paddingRight:"100px"}}>
                    <h2>Event Reservation</h2>
                    <hr/>
                    <h3>
                        <i className="fas fa-user-tie" style={{paddingRight:"10px"}}></i>Customer information
                    </h3>
                    <br></br>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} >
                                    <Form.Control
                                        required
                                        type="text"
                                        id="fname"
                                        name="firstname"
                                        value={this.state.CustomerFName}
                                        onChange={this.onChangeCustomerFName}
                                        placeholder="First Name"/>
                            </Form.Group>

                            <Form.Group as={Col} >
                                    <Form.Control
                                        required
                                        type="text"
                                        id="lname"
                                        name="lastname"
                                        value={this.state.CustomerLName}
                                        onChange={this.onChangeCustomerLName}
                                        placeholder="Last Name"/>
                            </Form.Group>

                        </Form.Row>

                        <Form.Group >
                                <Form.Control 
                                    required
                                    type="email" 
                                    placeholder="Enter email"
                                    name="email" 
                                    value={this.state.CustomerEmail}
                                    onChange={this.onChangeCustomerEmail}
                                />
                        </Form.Group>
                            
                        <Form.Group controlId="formGridAddress1">
                            <Form.Control
                                    required
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={this.state.address}
                                    onChange={this.onChangeAddress}
                                    placeholder="Address" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Control 
                                    required
                                    type="tel"
                                    id="contact"
                                    name="contact"
                                    value={this.state.contact}
                                    onChange={this.onChangeContact}
                                    placeholder="Contact"/>
                        </Form.Group>
                       
                        <br></br>
                        <div className="row">
                        <div  className="col-13 mt-5 ml-4 mb-3">
                            <h3>
                            <i className="fas fa-clipboard-list" style={{paddingRight:"10px"}}></i>Event information
                            </h3>

                            <br></br>
                            
                            <Form.Group >
                            <Form.Label>Event ID</Form.Label>
                                <Form.Control
                                        required
                                        type="text"
                                        id="cid"
                                        name="cid"
                                        value={this.state.EventID}
                                        onChange={this.onChangeEventID}
                                        placeholder="Event ID"/>
                            </Form.Group>

                        

                            <Form.Group >
                                <Form.Label>Event Type ({this.state.EventType})</Form.Label>
                                    <div className="ml-4">
                                        <PackageList 
                                        TodoItem={this.state.ArrayPackage} 
                                        onCheckComplete={this.onCheckComplete}/>
                                    </div>
                            </Form.Group> 

                            <Form.Group>
                                    <Form.Control
                                            required
                                            type="text"
                                            id="cid"
                                            name="cid"
                                            value={this.state.SubType}
                                            onChange={this.onChangeSubType}
                                            placeholder="Event Sub Type"/>
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>Event Date</Form.Label>
                                        <Form.Control
                                            required
                                            type="date"
                                            id="dob"
                                            name="dob"
                                            value={this.state.EventDate}
                                            onChange={this.onChangeEventDate}/>
                                            
                            </Form.Group>

                                

                            <Form.Row>
        
                                <Form.Group as={Col} >
                                <Form.Label>Description</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        id="desc"
                                        name="desc"
                                        value={this.state.description}
                                        onChange={this.onChangeDescription}
                                        placeholder="description"/>
                                </Form.Group>

                                <Form.Group as={Col}>
                                <Form.Label>Amount</Form.Label>
                                    <Form.Control required 
                                            type="number" 
                                            id = "dprice" 
                                            name = "dressprice" 
                                            value = {this.state.amount} 
                                            onChange = {this.onChangeamount}  />
                                </Form.Group>
                        </Form.Row>

                    

                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                    </div>
                   
                    <div className="mt-5 ml-5"> 
                    <br></br><br></br>
                    <Form.Group>
                    
                        <Form.Label><h5>{this.state.SubType}</h5></Form.Label> 

                            {}
                            <table  className="stageTable" id="tab_logic">
                                <thead>

                                            <tr>
                                                <td>No</td>
                                                <td align="center">Services</td>
                                            </tr>

                                </thead>
                                <tbody>
                                    {this.state.stages.map((item, idx) => (
                                        <tr id="addr0" key={idx}>
                                            <td>
                                                <h6>{idx+1}</h6>
                                            </td>
                                            <td>
                                                <FormControl
                                                    type="text"
                                                    aria-label="stage"
                                                    value={this.state.stages[idx].stage}
                                                    onChange={this.handleChangeStageName(idx)}
                                                   
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                                <table className="buttons">
                                    <tbody>
                                        <tr>
                                            <td align="right">
                                            <br/> <Button onClick={this.handleAddStage}>Add Services</Button>
                                            </td>
                                            <td align="left">
                                            <br/><Button onClick={this.handleRemoveStage}>Delete Services</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                    </Form.Group>
                    </div>
                </div>
                    
                   
                </Form>
                
              
            </div>
           
        </div>
        );
    }
}
 
export default EditEventReservation;