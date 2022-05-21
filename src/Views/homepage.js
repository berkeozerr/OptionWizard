import React, { Component } from "react";

import { ReactSession }  from 'react-client-session';
import pic from "../assets/img/wizard.svg";
import bitcoin from "../assets/img/bitcoin.png";
import ethereum from "../assets/img/ethereum.png";

import tether from "../assets/img/tether.png";
import {
  Col,
  Row,
  Button,
  Form,
  Card,
  FormGroup,
  Jumbotron,
  Label,
  Input,
  FormText,
  InputGroup,
  CardHeader,
  CardBody,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container

 } from "reactstrap";

 
import Select,{ components } from 'react-select'
import { motion } from "framer-motion"
import { Link, NavLink, withRouter } from "react-router-dom";
import {useState,useEffect} from "react";
import Loader from "./Loader";

const itemMain = {
    hidden: { opacity: 0, y: 300 },
    show: {
      opacity: 1,
      y: 100,
      transition: {
        ease: [0.6, 0.01, -0.05, 0.95],
        duration: 1.6,
      },
      exit: {
      opacity: 0,
      y: -200,
      transition: {
        ease: "easeInOut",
        duration: 0.8,
      },
    },
    },
  };
class Homepage extends Component {
  
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {userFriendly: new Boolean(),loading: new Boolean(true), modalShow: new Boolean(false)};
  
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
     
        return (
            <motion.div variants={itemMain} initial="hidden" animate="show">
            

      
            <Card className="py-2 mr-8" style= {{width: "30%" ,float:"right", border:"none", backgroundColor:"#282c34"}}>
      
                
              <CardBody className="mx-5 ">
             
                 <Row>
                 <Col>
                 <h2 style={{color:"white"}}> Frontend by:</h2>
                 <h3 style={{color:"white"}}>Eren Akyıldız </h3><h3 style={{color:"white"}}>Berke Özer </h3>  </Col>
                 <br></br>
                 <Col>
                <h2 style={{color:"white"}}> Smart contracts by:</h2>
                <h3 style={{color:"white"}}>Ege Caner </h3> <h3 style={{color:"white"}}>Volkan Erdemli </h3></Col>
                 </Row>
                <br></br>
                <h2 style={{color:"white"}}> Developed for chainlink hackathon 2022</h2>
              </CardBody>
            </Card>
            <Card className="py-2 ml-8" style= {{width: "50%" ,float:"left", border:"none", backgroundColor:"#282c34"}}>
      
                
              <CardBody className="mx-5 ">
             
              <h1 style={{color:"wheat"}}> What is OptWiz ? </h1>
              <p style={{color:"white"}}>OpWiz is a very flexible american options trading platform where traders can sell/buy options for any combination of ERC20, ERC721, ERC1155 assets, choose their desired asset as option premium and those options can change hands in our secondary-market for options.
              </p> <p style={{color:"white"}}> Traders can also choose their desired asset to receive while selling the options in the secondary market. That much flexibility makes option trading more complex for inexperienced crypto traders so we also provide a user-friendly interface where users can create and trade option contracts for well known ERC20 tokens in a simple way.</p>
              <p style={{color:"white"}}> OpWiz utilizes chainlink price feed and node keepers to automatically exercise the option for option contracts where chainlink price feed is available for the token pairs that option contract is agreed on. This protocol might be improved by utilizing flash-loans to exercise the option for asset pairs that profitable execution of flash-loans are possible. </p>
                 
              </CardBody>
            </Card>
            </motion.div>
          );
      }
    }
       
        
  
        
         
        
           
      
    }
  
  
  export default Homepage;