import React, { Component } from "react";

import {
  Col,
  Row,
  Button,
  Form,
  Card,
  FormGroup,
  Jumbotron,
  Container,
  Label,
  Input,
  FormText,
  InputGroup,
  CardHeader,
  CardBody,
  InputGroupAddon,
  InputGroupText

} from "reactstrap";
import Select,{ components } from 'react-select'
import pic from '../assets/img/brand/argon-react.png'
import { motion } from "framer-motion"
import { Link, NavLink, withRouter } from "react-router-dom";
import {useState,useEffect} from "react";
import Loader from "./Loader";
const typeOptions = [
  { value: 'chocolate', label: 'Day' },
  { value: 'strawberry', label: 'Week' },
  { value: 'vanilla', label: 'Month' }
]
const numOptions = []
for(var i = 0;i < 366; i += 1)
{
numOptions.push({value:i,label:i})
}
const customStyles = {
  control: base => ({
    ...base,
    height: 45,
    
  })
};


const itemMain = {
  hidden: { opacity: 0, y: 400 },
  show: {
    opacity: 1,
    y: 100,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.6,
    },
    exit: {
    opacity: 0,
    y: -100,
    transition: {
      ease: "easeInOut",
      duration: 0.8,
    },
  },
  },
};


class CreateOption extends Component {
  
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {userFriendly: new Boolean(),loading: new Boolean(true)};

  }
  handleSubmit = (e) => {
    
    this.props.history.push("/admin/searchplayer");
        /*this.setState({
          error: err.response.data.Message,
        });*/
        //this.togglewarningModal();
      
  };
  

  render() {
    const options = [
      { value: "England", label: "BTC", icon: '../assets/img/brand/argon-react.png' },
      { value: "Germany", label: "ETH", icon: '../assets/img/brand/argon-react.png' }
    ];

    var setLoading = (x) => {
      this.setState({loading: x})
    }
    const { Option } = components;
    const IconOption = props => (
      <Option {...props}>
        <img
          src={require("../assets/img/brand/argon-react.png").default}
          style={{ width: 18 }}
          alt={props.data.label}
        />
        {props.data.label}
      </Option>
    );
    const IconValue = props => (
      <div>
        <img
          src={require("../assets/img/brand/argon-react.png").default}
          style={{ width: 18 }}
          alt={props.data.label}
        />
        {props.data.label}
        </div>
    );
  let dataFile = require('../assets/mainnetAddresses.json');
  let pairData = dataFile.ethereumAddresses.networks[1].proxies;
  const pairs = []
  pairData.forEach(element => {
    pairs.push({value: element.proxy, label: element.pair })
  });
  console.log(pairs)
    const spring = {
      type: "spring",
      stiffness: 700,
      damping: 30
    };
    if(this.state.loading == true){
      return (
        <Loader setLoading={setLoading} />
      )
    }
    else{
    if (this.state.userFriendly == true) 
    {
      return (
        <motion.div variants={itemMain} initial="hidden" animate="show">

    

      
        <Card className="m-auto py-2" style= {{width: "40%" ,height: "40%",float:"center", background:"#282c34"}}>
  
        
          <CardHeader style = {{border:"none",background:"#282c34"}}>
            <Row>
          <div className="switch ml-5" data-isOn={this.state.userFriendly} onClick={ () => this.setState({userFriendly:false})} style ={{float:"right"}}>
      <motion.div className="handle" layout transition={spring} />
    </div><h1 class="ml-auto mr-5" style={{color:"white"}}>Proffessional</h1></Row>
          
          </CardHeader>
          <CardBody style={{background:"#282c34"}} className="px-lg-5 ">
            <Form role="form">
             
              <Row className="mb-3">
              <Col sm={8}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-paper-diploma" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Collateral Asset"
                    type="text"
                  />
                </InputGroup>
              </FormGroup></Col>
              <Col sm={2}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-money-coins" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Amount"
                    type="text"
                  />
                </InputGroup>
              </FormGroup></Col>
              <Col sm={2}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-align-left-2" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="If NFT, Index"
                    type="text"
                  />
                </InputGroup>
              </FormGroup></Col>
              </Row>
              <Row className="mb-3">
              <Col sm={8}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-paper-diploma" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Counter Asset"
                    type="text"
                  />
                </InputGroup>
              </FormGroup></Col>
              <Col sm={2}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-money-coins" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Amount"
                    type="text"
                  />
                </InputGroup>
              </FormGroup></Col>
              <Col sm={2}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-align-left-2" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="If NFT, Index"
                    type="text"
                  />
                </InputGroup>
              </FormGroup></Col>
              </Row>

              <Row className="mb-3">
              <Col sm={8}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-paper-diploma" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Premium Asset"
                    type="text"
                  />
                </InputGroup>
              </FormGroup></Col>
              <Col sm={2}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-money-coins" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Amount"
                    type="text"
                  />
                </InputGroup>
              </FormGroup></Col>
              <Col sm={2}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-align-left-2" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="If NFT, Index"
                    type="text"
                  />
                </InputGroup>
              </FormGroup></Col>
              
              </Row>
              <Row>
              <Col sm={4}><FormGroup >
                  <div style={{width:"20vh"}}>

                 
                  <Select options={typeOptions}className = "align-right"  defaultValue={{ label: "Day", value: 0 }} />
                  </div>
              </FormGroup></Col>
              <Col sm={4}><FormGroup >
                  <div style={{width:"20vh"}}>

                 
                  <Select className = "align-right" options={numOptions} defaultValue={{ label: "1", value: 1 }} />
                  </div>
              </FormGroup></Col>
              </Row>
              
             
             
              <div className="text-center">
                <Button style={{background:"#6a04c9", color:"white", border:"none"}} type="button" onClick={() => this.setState({userFriendly:false})}>
                  Create
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        </motion.div>
        );
    }
    else {
      return (

        <motion.div variants={itemMain} initial="hidden" animate="show">

      
        <Card className="m-auto py-2" style= {{width: "40%" ,height: "30%",float:"center" , background:"#282c34"}}>
  
        
        
      
          <CardHeader style = {{border:"none" , background:"#282c34"}}>
           <Row> 
          <div className="switch ml-5" data-isOn={this.state.userFriendly} onClick={ () => this.setState({userFriendly:true})} style ={{float:"right"}}>
      <motion.div className="handle" layout transition={spring} />
      
    </div><h1 class="ml-auto mr-5" style={{color:"white"}}>User friendly</h1></Row>
          </CardHeader>
          <CardBody className="mx-5 ">
            <Form role="form">
             
              <Row className="mb-3">
              <Col sm={6}><FormGroup className="mb-3">

                 
<Select options={options} 
components={{ Option: IconOption,SingleValue:IconValue }} styles={customStyles} className = "align-right"  defaultValue={options[0]} />
              </FormGroup></Col>
              <Col sm={6}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-money-coins" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Amount"
                    type="text"
                  />
                </InputGroup>
              </FormGroup></Col>
              
              </Row>
              <Row className="mb-3">
              <Col sm={6}><FormGroup className="mb-3">

                 
<Select options={options} 
components={{ Option: IconOption,SingleValue:IconValue }} styles={customStyles} className = "align-right"  defaultValue={options[0]} />
              </FormGroup></Col>
              <Col sm={6}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-money-coins" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Amount"
                    type="text"
                  />
                </InputGroup>
              </FormGroup></Col>
              
              </Row>

              <Row className="mb-3">
              <Col sm={6}><FormGroup className="mb-3">

                 
<Select options={options} placeholder={<div>Type to search</div>}
components={{ Option: IconOption,SingleValue:IconValue }} styles={customStyles} className = "align-right"   />
              </FormGroup></Col>
              <Col sm={6}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-money-coins" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Amount"
                    type="text"
                  />
                </InputGroup>
              </FormGroup></Col>
              
              
              </Row>
              <Row>
              <Col sm={3}><FormGroup >
                  <div style={{width:"13vh"}}>

                 
                  <Select options={typeOptions}className = "align-right"  defaultValue={{ label: "Day", value: 0 }} />
                  </div>
              </FormGroup></Col>
              <Col sm={3}><FormGroup >
                  <div style={{width:"13vh"}}>

                 
                  <Select className = "align-right" options={numOptions} defaultValue={{ label: "1", value: 1 }} />
                  </div>
              </FormGroup></Col>
              <Col  sm={{
        offset: 1,
        size: 3
      }}><FormGroup>
              <div className="custom-control custom-checkbox ml-9 my-auto">
          <input
            className="custom-control-input float-right"
            id="customCheck1"
            type="checkbox"
          />
          <label style={{color:"white"}} className="custom-control-label" htmlFor="customCheck1">
            Auto Excercise
          </label>
        </div>

              </FormGroup>
              </Col>
              </Row>
              
             
             
              <div className="text-center">
                <Button style={{background:"#6a04c9", color:"white", border:"none"}} type="button" onClick={() => this.setState({userFriendly:false})}>
                  Create
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card></motion.div>
        );
    }
  }
     
      

      
       
      
         
    
  }
}

export default CreateOption;
