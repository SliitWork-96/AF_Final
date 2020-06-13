import React, { Component } from 'react';
import axios from 'axios';
import {  Message } from 'semantic-ui-react'
import {Button, Col, Form, FormControl} from 'react-bootstrap';
import ImageUpload from './ImageUpload';
import APIs from '../../../constants/APIs';

class EventPackage extends Component {
    constructor(props) {
        super(props);

        this.onChangeEventPackageID = this.onChangeEventPackageID.bind(this);
        this.onChangeEventType = this.onChangeEventType.bind(this);
        this.onChangeSubType = this.onChangeSubType.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        

        this.state = { 
            EventPackageID: '',
            EventType : '',
            SubType : '',
            ItemStages:[],
            allStages:[
                {stage:''}
            ],
            description : '',
            message:'',
            images: [],
            PackagePrice : 0


         }
    }


    onChangeEventPackageID(e) {
        this.setState({
            EventPackageID: e.target.value
        });
    }

    onChangeEventType(e) {
        this.setState({
            EventType: e.target.value
        });
    }

    onChangeSubType(e) {
        this.setState({
            SubType: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangePackagePrice = (e) => {
        this.setState({ PackagePrice: e.target.value })
    }


    handleAddStage = () => {
        const item = {
            stage: "",
        };
        this.setState({
            allStages: [...this.state.allStages, item]
        });
    };


    handleChangeStageName = idx => e => {
        const allStages = [...this.state.allStages];
        allStages[idx] = {
            stage: e.target.value,
        };
        this.setState({
            allStages
        });
    };


    handleRemoveStage = () => {

        this.setState({
            allStages: this.state.allStages.slice(0, -1)
        
        });
    };

    onSubmit(e) {
        e.preventDefault();

        let stages;
        for(let i = 0; i < this.state.allStages.length ; i++){
            stages = {
                stageNo: i + 1,
                stage: this.state.allStages[i].stage,
            };
            this.state.ItemStages.push(stages);
        }



        const obj = {
            EventPackageID: this.state.EventPackageID,
            EventType : this.state.EventType,
            SubType : this.state.SubType,
            stages: this.state.ItemStages,
            description :this.state.description,
            images: this.state.images,
            PackagePrice:this.state.PackagePrice
        }



        axios.post(APIs.BASE_URL+'/event/create', obj)
        .then(res => {
                this.setState({
                    message: res.data.message
                });
                console.log(res.data.message);
            }
        );


        this.setState({
            EventPackageID: '',
            EventType : '',
            SubType : '',
            ItemStages:[],
            allStages:[{stage:''}],
            description : '',
            images:[],
            PackagePrice:0

        });


    }

    updateFiles = (newImages) => {
        console.log(newImages)
        this.setState({ images: newImages })
    }

    render() { 
        return ( 
            <div>
                <div className="row">
                    <div  className="col-13 mt-5 ml-5" style={{paddingRight:"60px"}}>
                        <div className="container ">
                            <h5 style={{padding:"15px"}}>Create Event Packages</h5>
                            <Form onSubmit={this.onSubmit}>

                                    <Form.Row>
                                        <Form.Group as={Col} >
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    id="cid"
                                                    name="cid"
                                                    value={this.state.EventPackageID}
                                                    onChange={this.onChangeEventPackageID}
                                                    placeholder="Event Package ID"/>
                                        </Form.Group>

                                        <Form.Group as={Col} >
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    id="ctype"
                                                    name="ctype"
                                                    value={this.state.EventType}
                                                    onChange={this.onChangeEventType}
                                                    placeholder="Package Event Name"/>
                                        </Form.Group>

                                    </Form.Row>

                                    <Form.Group >
                                    <Form.Label>Sub type</Form.Label>
                                        <Form.Control as="select" 
                                        id="subtype"
                                        name="subtype"
                                        value={this.state.SubType}
                                        onChange={this.onChangeSubType}>
                                        >
                                            <option>None</option>
                                            <option>Exclusive full</option>
                                            <option>Partial Planning and Coordination</option>
                                            <option>Day Planning</option>
                                            <option>Creation of Themes</option>
                                            

                                        </Form.Control>
                                    </Form.Group>


                                    <Form.Group>
                                    <Form.Control
                                                required
                                                type="text"
                                                id="description"
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.onChangeDescription}
                                                placeholder="Description" />
                                    </Form.Group>

                                    <Form.Group  >
                                    <Form.Label>Package Price</Form.Label>
                                    <Form.Control required 
                                                    type="number" 
                                                    id = "dprice" 
                                                    name = "dressprice" 
                                                    value = {this.state.PackagePrice} 
                                                    onChange = {this.onChangePackagePrice}  />
                                    </Form.Group>

                                    <div style={{paddingTop:"5px", paddingBottom:"5px"}}> 
                                    <Form.Label>Choose Image</Form.Label>
                                        <ImageUpload refreshFunction = {this.updateFiles} /> 
                                    </div>

                                    <Button className="mt-3" variant="primary" type="submit">
                                        Submit
                                    </Button>
                            </Form>

                            {   (this.state.message) ? 

                                (
                                    (this.state.message === 'Event Package successfully created') ? 
                                    
                                    (   
                                        <Message color='green'>
                                            <center>{this.state.message}</center>
                                        </Message>
                                    )

                                    :

                                    (   <Message color='red'>
                                            <center>{this.state.message}</center>
                                        </Message>
                                    )

                                )
                                :
                                null

                            }
                    </div>
            </div>
            <div className="mt-5 ml-5" > 
                <div className="container ">

                
                    <Form.Group>
                            <Form.Label>Sub Services</Form.Label>

                                {}
                                <table  className="stageTable" id="tab_logic">
                                    <thead>

                                            <tr>
                                                <td>No</td>
                                                <td align="center">Services</td>
                                            </tr>

                                    </thead>
                                    <tbody>
                                        {this.state.allStages.map((item, idx) => (
                                            <tr id="addr0" key={idx}>
                                                <td>
                                                    <h6>{idx+1}</h6>
                                                </td>
                                                <td>
                                                    <FormControl
                                                        type="text"
                                                        aria-label="stage"
                                                        value={this.state.allStages[idx].stage}
                                                        onChange={this.handleChangeStageName(idx)}
                                                    
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <table className="buttons mt-3">
                                    <tbody>
                                        <tr>
                                            <td align="right">
                                                <Button onClick={this.handleAddStage}>Add Services</Button>
                                            </td>
                                            <td align="left">
                                                <Button onClick={this.handleRemoveStage}>Delete Services</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                        </Form.Group>

                    </div>
                </div>
            </div>
          
        </div>
        );
    }
}
 
export default EventPackage;