import React, { Component } from "react";
import { ReactSession }  from 'react-client-session';

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
import opWizAbi from "../assets/abis/OpWizChainlinkCompatible.json"
import { motion } from "framer-motion"
import { Link, NavLink, withRouter } from "react-router-dom";
import {useState,useEffect} from "react";
import Loader from "./Loader";
import { allTokenOptions } from "./AllPossibleTokens";
import { ethers } from "ethers";
import { userAddress } from "./globals";
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
    this.state = {userFriendly: new Boolean(),loading: new Boolean(true), colleteral: new String(""), 
      counterAsset:  new String(""), 
      premiumAsset:  new String(""), 
      colleteralAmount: new String(""),
      counterAmount: new String(""),
      premiumAmount: new String(""),
      offerEnd: new String(""),
      optionExpiry: new String("")};

  }
  handleSubmit = (e) => {
    
    this.props.history.push("/admin/searchplayer");
        /*this.setState({
          error: err.response.data.Message,
        });*/
        //this.togglewarningModal();
      
  };
  
  
  render() {

    //handlers:
    const colleteralSetter = (e) => {
      this.setState({colleteral:e.value});
    };
    const colleteralSetterForProffessional = (e) => {
      this.setState({colleteral:e.value});
    };
    const colleteralAmountSetter = (e) => {
      this.setState({colleteralAmount:e.value});
    };
    const premiumAssetSetter = (e) => {
      this.setState({premiumAsset:e.value});
    };
    const premiumAssetSetterForProffessional = (e) => {
      this.setState({premiumAsset:e.value});
    };
    const premiumAmountSetter = (e) => {
      this.setState({premiumAmount:e.value});
    };
    const counterAssetSetter = (e) => {
      this.setState({counterAsset:e.value});
    };
    const counterAssetSetterForProffessional = (e) => {
      this.setState({counterAsset:e.value});
    };
    const counterAmountSetter = (e) => {
      this.setState({counterAmount:e.value});
    };
    const offerEndSetter = (e) => {
      
      this.setState({offerEnd: e.value }); //maybe day month etc..
    };
    
    const optionExpirySetter = (e) => {
      this.setState({optionExpiry: e.value});
    };
    async function offer() {
        

        const { initiator }= ReactSession.get("address") ;
        const WAIT_CONFIRMATION = 6;
        const colleteralToken = new ethers.Contract(this.state.colleteral, opWizAbi , initiator) ; 
        const opWizChainlink  = new ethers.Contract("OpWizChainlinkCompatible");
        const approveTx = await colleteralToken.connect(initiator).approve(opWizChainlink.address, this.state.colleteralAmount);
        await approveTx.wait(WAIT_CONFIRMATION);
        
        const offerTx = await opWizChainlink.connect(initiator).offerOption(
            this.state.colleteral,
            this.state.counterAsset, 
            this.state.premiumAsset, 
            this.state.colleteralAmount, 
            this.state.counterAmount, 
            this.state.premiumAmount, 
            this.state.optionExpiry, 
            this.state.offerEnd
        );
    
        const offerTxReceipt = await offerTx.wait(WAIT_CONFIRMATION);
        console.log(offerTxReceipt);
      
    }
    var options = [
    ];
    const keys = Object.keys(allTokenOptions);
    const values = Object.values(allTokenOptions);
    let i = 0;
    while (i < 59){
      var obj ={ value: keys[i], label: keys[i], icon: values[i] }
      options.push(obj);
      i++;
    }
    console.log(keys + values);
    var setLoading = (x) => {
      this.setState({loading: x})
    }
    const { Option } = components;
    const IconOption = props => (
      <Option {...props}>
        <img
          src={props.data.icon}
          style={{ width: 18 }}
          alt={props.data.label}
        />
        {props.data.label}
      </Option>
    );
    const IconValue = props => (
      <div>
        <img
          src={props.data.icon}
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
    </div><h1 class="ml-auto mr-5" style={{color:"white"}}>Professional</h1></Row>
          
          </CardHeader>
          <CardBody style={{background:"#282c34"}} className="px-lg-5 ">
            <Form role="form">
             
              <Row className="mb-3">
              <Col sm={6}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-paper-diploma" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Collateral Asset"
                    type="text"
                    onChange={colleteralSetterForProffessional}
                  />
                </InputGroup>
              </FormGroup></Col>
              <Col sm={3}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-money-coins" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Amount"
                    type="text"
                    onChange={colleteralAmountSetter}
                  />
                </InputGroup>
              </FormGroup></Col>
              <Col sm={3}><FormGroup className="mb-3">
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
              <Col sm={6}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-paper-diploma" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Counter Asset"
                    type="text"
                    onChange={counterAssetSetterForProffessional}
                  />
                </InputGroup>
              </FormGroup></Col>
              <Col sm={3}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-money-coins" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Amount"
                    type="text"
                    onChange={counterAmountSetter}
                  />
                </InputGroup>
              </FormGroup></Col>
              <Col sm={3}><FormGroup className="mb-3">
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
              <Col sm={6}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-paper-diploma" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Premium Asset"
                    type="text"
                    onChange={premiumAssetSetterForProffessional}
                  />
                </InputGroup>
              </FormGroup></Col>
              <Col sm={3}><FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-money-coins" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Amount"
                    type="text"
                    onChange={premiumAmountSetter}
                  />
                </InputGroup>
              </FormGroup></Col>
              <Col sm={3}><FormGroup className="mb-3">
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
              <Col sm={3}>
              Offer ends in:
              </Col>
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
              <Col  sm={3
      }><FormGroup>
              <div className="custom-control custom-checkbox my-auto">
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
              <Row>
              <Col sm={3}>
              Option expires in:
                </Col>
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
              
              </Row>
              
             
             
              <div className="text-center">
                <Button style={{background:"#6a04c9", color:"white", border:"none"}} type="button" onClick={() => offer()}>
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
          <CardBody className="px-lg-5 ">
            <Form role="form">
             
              <Row className="mb-3">
              <Col sm={6}><FormGroup className="mb-3">

                 
<Select options={options} placeholder={<div>Type to search</div>}
components={{ Option: IconOption,SingleValue:IconValue }} onChange={colleteralSetter} styles={customStyles} className = "align-right" />
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
                    onChange={colleteralAmountSetter}
                  />
                </InputGroup>
              </FormGroup></Col>
              
              </Row>
              <Row className="mb-3">
              <Col sm={6}><FormGroup className="mb-3">

                 
<Select options={options} placeholder={<div>Type to search</div>}
components={{ Option: IconOption,SingleValue:IconValue }} onChange={counterAssetSetter} styles={customStyles} className = "align-right" />
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
                    onChange={counterAmountSetter}
                  />
                </InputGroup>
              </FormGroup></Col>
              
              </Row>

              <Row className="mb-3">
              <Col sm={6}><FormGroup className="mb-3">

                 
<Select options={options} placeholder={<div>Type to search</div>}
components={{ Option: IconOption,SingleValue:IconValue }} onChange={premiumAssetSetter} styles={customStyles} className = "align-right"   />
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
                    
                    onChange={premiumAmountSetter}
                  />
                </InputGroup>
              </FormGroup></Col>
              
              
              </Row>
              <Row>
                <Col sm={3}>
                  Offer ends in:
                </Col>
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
              
              <Col  sm={3}><FormGroup>
              <div className="custom-control custom-checkbox my-auto">
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
              <Row>
              <Col sm={3}>
              Option expires in:
                </Col>
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
