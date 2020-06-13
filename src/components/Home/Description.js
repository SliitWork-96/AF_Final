// Import modules and files
import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeStyle.css";
import Cookies from "universal-cookie";
import NavBar from "./NavBar";
import Card from "react-bootstrap/Card";
import APIs from '../../constants/APIs';

export default class Description extends Component {
  constructor(props) {
    const cookies = new Cookies();
    let user = cookies.get("user");
    super(props);

    this.state = {
            user: user,
            EventPackageID: '',
            EventType : '',
            SubType : '',
            description : '',
            stages:[
                {stage:""}
            ],
            ItemStages:[],
            message:'',
            images: [],
            PackagePrice : 0
    };

   
  }

  componentDidMount() {
    // Get selected product from db using axios
    
      axios.get(APIs.BASE_URL+'/event/'+this.props.match.params.id)
      .then((response) => {
        this.setState({
          EventPackageID: response.data.EventPackageID,
          EventType: response.data.EventType,
          SubType: response.data.SubType,
          stages:response.data.stages,
          description: response.data.description,
          images: response.data.images,
          PackagePrice: response.data.PackagePrice
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="main-container">
          <div className="container mt-4 category-container">
            <div className="row">
              <div className="col-md-6">
                <Card className="mr-4 product-card" style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/${this.state.images[0]}`}
                  />
                  <Card.Body>
                    <hr />
                    <Card.Title className="text-center">
                      Package Price: <h2>Rs. {this.state.PackagePrice.toFixed(2)}</h2>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-6">
                <h1 className="page-header ml-4 text-center">
                  {this.state.Subtype}
                </h1>
                <ul className="mt-5">
                  <li>
                  <h4>
                    <b>Event PackageID  : </b>
                    {this.state.EventPackageID}
                  </h4>
                  </li>

                  <li>
                  <h4>
                    <b>Package Price  : </b>Rs. {this.state.PackagePrice}.00
                  </h4>
                  </li>

                  <li>
                  <h4>
                    <b>EventType : </b>
                    {this.state.EventType}
                  </h4>
                  </li>

                  <li>
                  <h4>
                    <b>Subtype : </b>
                    {this.state.SubType}
                  </h4>
                  </li>

                  <li>
                  <h4>
                    <b>Description : </b>
                    {this.state.description}
                  </h4>
                  </li>

                </ul>

              </div>

              <div className="mt-5">
                <h1>{this.state.SubType}</h1>
              </div>

              <div className="mt-5">
                <ul>
                  {this.state.stages.map((item, idx) => {
                    return (
                    <h3><li key={idx}>{this.state.stages[idx].stage}</li></h3>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
