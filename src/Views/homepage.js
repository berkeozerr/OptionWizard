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
const textMotion = {
    rest: {
      color: "grey",
      x: 500,
      y: -150,
      transition: {
        duration: 2,
        type: "tween",
        ease: "easeIn"
      }
    },
    hover: {
      color: "blue",
      rotateZ: 30,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut"
      }
    }
  };
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
                 <h3 style={{color:"white"}}><a href="https://www.linkedin.com/in/eren-aky%C4%B1ld%C4%B1z-b67470205/"> Eren Akyıldız</a> </h3><h3 style={{color:"white"}}> <a href="https://www.linkedin.com/in/eren-aky%C4%B1ld%C4%B1z-b67470205/">Berke Özer</a> </h3>  </Col>
                 <br></br>
                 <Col>
                <h2 style={{color:"white"}}> Smart contracts by:</h2>
                <h3 style={{color:"white"}}><a href="https://www.linkedin.com/in/eren-aky%C4%B1ld%C4%B1z-b67470205/">Ege Caner</a> </h3> <h3 style={{color:"white"}}><a href="https://www.linkedin.com/in/eren-aky%C4%B1ld%C4%B1z-b67470205/">Volkan Erdemli</a> </h3></Col>
                 </Row>
                <br></br>
                <h2 style={{color:"white"}}> Developed for <a href="https://chain.link/hackathon">chainlink hackathon 2022</a></h2>
                
              </CardBody>
            </Card>
            <Card className="py-2 ml-8" style= {{width: "50%" ,float:"left", border:"none", backgroundColor:"#282c34"}}>
      
                
              <CardBody className="mx-5 ">
             
              <h1 style={{color:"wheat"}}> What is OptWiz ? </h1>
              
              <p style={{color:"white", width:"60%"}}>OpWiz is a very flexible american options trading platform where traders can sell/buy options for any combination of ERC20, ERC721, ERC1155 assets, choose their desired asset as option premium and those options can change hands in our secondary-market for options.
              </p>
                    <motion.svg
                    
                    variants = {textMotion}
                    initial="rest"
                    style={{width:"350px", height:"350px", position:"absolute"}}>
                        <motion.path initial={{x:20}}
                    strokeWidth={2}
                    fill="transparent"
                    stroke="#fff"
                    d="M 279.261719 237.382812 L 271.023438 237.382812 C 267.972656 237.382812 265.472656 239.707031 265.195312 242.675781 L 255.722656 242.675781 C 255.445312 239.707031 252.945312 237.382812 249.894531 237.382812 L 242.117188 237.382812 L 242.117188 143.8125 C 242.117188 140.582031 239.492188 137.96875 236.257812 137.96875 C 233.023438 137.96875 230.402344 140.582031 230.402344 143.8125 L 230.402344 237.382812 L 69.597656 237.382812 L 69.597656 62.035156 L 230.402344 62.035156 L 230.402344 97.082031 C 230.402344 100.308594 233.023438 102.925781 236.261719 102.925781 C 239.496094 102.925781 242.117188 100.308594 242.117188 97.082031 L 242.117188 62.035156 L 249.894531 62.035156 C 252.949219 62.035156 255.453125 59.703125 255.726562 56.722656 L 265.195312 56.722656 C 265.464844 59.699219 267.96875 62.035156 271.023438 62.035156 L 279.261719 62.035156 C 290.695312 62.035156 300 51.269531 300 38.039062 C 300 24.820312 290.695312 14.0625 279.261719 14.0625 L 271.023438 14.0625 C 267.972656 14.0625 265.472656 16.386719 265.195312 19.355469 L 255.722656 19.355469 C 255.445312 16.386719 252.945312 14.0625 249.894531 14.0625 L 50.089844 14.0625 C 47.039062 14.0625 44.539062 16.386719 44.257812 19.355469 L 34.789062 19.355469 C 34.511719 16.386719 32.007812 14.0625 28.960938 14.0625 L 20.722656 14.0625 C 9.292969 14.0625 0 24.820312 0 38.039062 C 0 51.269531 9.292969 62.03125 20.722656 62.03125 L 28.960938 62.03125 C 32.011719 62.03125 34.519531 59.699219 34.792969 56.722656 L 44.257812 56.722656 C 44.527344 59.699219 47.035156 62.03125 50.089844 62.03125 L 57.882812 62.03125 L 57.882812 237.382812 L 50.089844 237.382812 C 47.039062 237.382812 44.539062 239.707031 44.257812 242.675781 L 34.789062 242.675781 C 34.511719 239.707031 32.007812 237.382812 28.960938 237.382812 L 20.722656 237.382812 C 9.292969 237.382812 0 248.140625 0 261.363281 C 0 274.589844 9.292969 285.355469 20.722656 285.355469 L 28.960938 285.355469 C 32.011719 285.355469 34.519531 283.023438 34.792969 280.046875 L 44.257812 280.046875 C 44.527344 283.023438 47.035156 285.355469 50.089844 285.355469 L 249.894531 285.355469 C 252.949219 285.355469 255.453125 283.023438 255.722656 280.046875 L 265.191406 280.046875 C 265.464844 283.023438 267.96875 285.355469 271.023438 285.355469 L 279.261719 285.355469 C 290.695312 285.355469 300 274.589844 300 261.363281 C 300 248.140625 290.695312 237.382812 279.261719 237.382812 Z M 265.164062 45.035156 L 255.753906 45.035156 L 255.753906 31.046875 L 265.164062 31.046875 Z M 288.285156 38.039062 C 288.285156 44.707031 284.152344 50.34375 279.261719 50.34375 L 276.878906 50.34375 L 276.878906 25.753906 L 279.261719 25.753906 C 284.152344 25.753906 288.285156 31.378906 288.285156 38.039062 Z M 34.816406 31.046875 L 44.230469 31.046875 L 44.230469 45.035156 L 34.816406 45.035156 Z M 11.714844 38.039062 C 11.714844 31.378906 15.839844 25.75 20.722656 25.75 L 23.101562 25.75 L 23.101562 50.34375 L 20.722656 50.34375 C 15.839844 50.34375 11.714844 44.707031 11.714844 38.039062 Z M 55.945312 25.753906 L 244.039062 25.753906 L 244.039062 50.34375 L 55.945312 50.34375 Z M 255.753906 254.367188 L 265.164062 254.367188 L 265.164062 268.355469 L 255.753906 268.355469 Z M 34.816406 254.367188 L 44.230469 254.367188 L 44.230469 268.355469 L 34.816406 268.355469 Z M 11.714844 261.363281 C 11.714844 254.703125 15.839844 249.074219 20.722656 249.074219 L 23.101562 249.074219 L 23.101562 273.664062 L 20.722656 273.664062 C 15.839844 273.664062 11.714844 268.03125 11.714844 261.363281 Z M 55.945312 249.074219 L 244.039062 249.074219 L 244.039062 273.664062 L 55.945312 273.664062 Z M 279.261719 273.664062 L 276.878906 273.664062 L 276.878906 249.074219 L 279.261719 249.074219 C 284.152344 249.074219 288.285156 254.703125 288.285156 261.359375 C 288.285156 268.03125 284.152344 273.664062 279.261719 273.664062 Z M 279.261719 273.664062 "                   
                    > </motion.path>
                    <motion.path initial={{x:20}}
                    strokeWidth={3}
                    fill="transparent"
                    stroke="#fff"
                    d="M 209.800781 75.558594 L 90.910156 75.558594 C 87.675781 75.558594 85.054688 78.175781 85.054688 81.402344 C 85.054688 84.632812 87.675781 87.246094 90.910156 87.246094 L 209.800781 87.246094 C 213.035156 87.246094 215.660156 84.632812 215.660156 81.402344 C 215.660156 78.175781 213.035156 75.558594 209.800781 75.558594 Z M 209.800781 75.558594 "                   
                    animate={{
          
                        pathLength: [0, 0.5 , 1, 1, 1, 1, 1, 1, 1, 0.5 ,0],
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        times: [0, 0.1, 0.2,0.3,0.4,0.5,0.6,0.7,0.8, 0.9,  1],
                        repeat: Infinity,
                        repeatDelay: 0
                      }}
                    > </motion.path>
                    <motion.path initial={{x:20}}
                    strokeWidth={3}
                    animate={{
          
                        pathLength: [0, 0.5 , 1, 1, 1, 1, 1, 1, 1, 0.5 ,0],
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        times: [0, 0.1, 0.2,0.3,0.4,0.5,0.6,0.7,0.8, 0.9,  1],
                        repeat: Infinity,
                        repeatDelay: 0
                      }}
                      fill="transparent"

                    stroke="#fff"
                    d="M 90.179688 115.996094 L 209.085938 115.996094 C 212.320312 115.996094 214.945312 113.382812 214.945312 110.152344 C 214.945312 106.925781 212.320312 104.308594 209.085938 104.308594 L 90.179688 104.308594 C 86.949219 104.308594 84.324219 106.925781 84.324219 110.152344 C 84.324219 113.382812 86.949219 115.996094 90.179688 115.996094 Z M 90.179688 115.996094 "                    
                    > </motion.path>
                    <motion.path initial={{x:20}}
                    strokeWidth={3}
                    animate={{
          
                        pathLength: [0, 0.5 , 1, 1, 1, 1, 1, 1, 1, 0.5 ,0],
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        times: [0, 0.1, 0.2,0.3,0.4,0.5,0.6,0.7,0.8, 0.9,  1],
                        repeat: Infinity,
                        repeatDelay: 0
                      }}
                      fill="transparent"
                    stroke="#fff"
                    d="M 215.027344 138.886719 C 215.027344 135.65625 212.402344 133.039062 209.171875 133.039062 L 90.179688 133.039062 C 86.949219 133.039062 84.324219 135.65625 84.324219 138.886719 C 84.324219 142.113281 86.949219 144.730469 90.179688 144.730469 L 209.171875 144.730469 C 212.402344 144.730469 215.027344 142.113281 215.027344 138.886719 Z M 215.027344 138.886719 "
                    > </motion.path>
                    <motion.path initial={{x:20}}
                    strokeWidth={3}
                    animate={{
          
                        pathLength: [0, 0.5 , 1, 1, 1, 1, 1, 1, 1, 0.5 ,0],
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        times: [0, 0.1, 0.2,0.3,0.4,0.5,0.6,0.7,0.8, 0.9,  1],
                        repeat: Infinity,
                        repeatDelay: 0
                      }}
                      fill="transparent"
                    stroke="#fff"
                    d="M 178.949219 172.378906 C 178.105469 170.917969 176.671875 169.894531 175.019531 169.566406 L 162.207031 167.015625 L 153.601562 157.214844 C 152.488281 155.945312 150.882812 155.222656 149.195312 155.222656 C 147.507812 155.222656 145.902344 155.945312 144.789062 157.210938 L 136.167969 167.015625 L 123.351562 169.566406 C 121.695312 169.898438 120.265625 170.917969 119.421875 172.378906 C 118.578125 173.835938 118.40625 175.585938 118.949219 177.179688 L 123.160156 189.53125 L 118.949219 201.902344 C 118.40625 203.496094 118.582031 205.246094 119.421875 206.707031 C 120.269531 208.164062 121.699219 209.1875 123.359375 209.515625 L 136.167969 212.046875 L 144.789062 221.867188 C 145.902344 223.132812 147.503906 223.859375 149.195312 223.859375 C 150.886719 223.859375 152.492188 223.128906 153.601562 221.863281 L 162.207031 212.046875 L 175.015625 209.515625 C 176.667969 209.1875 178.105469 208.164062 178.945312 206.707031 C 179.789062 205.246094 179.964844 203.496094 179.421875 201.902344 L 175.210938 189.53125 L 179.421875 177.179688 C 179.964844 175.585938 179.792969 173.835938 178.949219 172.378906 Z M 157.972656 200.96875 C 156.703125 201.21875 155.550781 201.878906 154.699219 202.851562 L 149.191406 209.140625 L 143.667969 202.847656 C 142.816406 201.878906 141.667969 201.21875 140.402344 200.96875 L 132.191406 199.34375 L 134.894531 191.410156 C 135.308594 190.191406 135.308594 188.867188 134.894531 187.648438 L 132.191406 179.726562 L 140.40625 178.09375 C 141.671875 177.839844 142.816406 177.183594 143.667969 176.214844 L 149.191406 169.929688 L 154.703125 176.210938 C 155.554688 177.179688 156.703125 177.839844 157.964844 178.09375 L 166.179688 179.726562 L 163.480469 187.648438 C 163.0625 188.867188 163.0625 190.191406 163.480469 191.410156 L 166.179688 199.34375 Z M 157.972656 200.96875 "                   
                    > </motion.path>
                    <motion.path initial={{x:20}}
                    strokeWidth={3}
                    animate={{
          
                        pathLength: [0, 0.5 , 1, 1, 1, 1, 1, 1, 1, 0.5 ,0],
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        times: [0, 0.1, 0.2,0.3,0.4,0.5,0.6,0.7,0.8, 0.9,  1],
                        repeat: Infinity,
                        repeatDelay: 0
                      }}
                      fill="transparent"
                    
                    stroke="#fff"
                    d="M 197.492188 173.925781 C 200.730469 173.925781 203.351562 171.308594 203.351562 168.082031 C 203.351562 164.855469 200.730469 162.234375 197.492188 162.234375 L 197.394531 162.234375 C 194.15625 162.234375 191.535156 164.855469 191.535156 168.082031 C 191.535156 171.308594 194.15625 173.925781 197.394531 173.925781 Z M 197.492188 173.925781 "                   
                    > </motion.path>
                    <motion.path initial={{x:20}}
                    strokeWidth={3}
                    animate={{
          
                        pathLength: [0, 0.5 , 1, 1, 1, 1, 1, 1, 1, 0.5 ,0],
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        times: [0, 0.1, 0.2,0.3,0.4,0.5,0.6,0.7,0.8, 0.9,  1],
                        repeat: Infinity,
                        repeatDelay: 0
                      }}
                      fill="transparent"
                    stroke="#fff"
                    d="M 197.492188 213.640625 L 197.609375 213.640625 C 200.84375 213.640625 203.464844 211.023438 203.464844 207.792969 C 203.464844 204.566406 200.84375 201.953125 197.609375 201.953125 L 197.492188 201.953125 C 194.257812 201.953125 191.636719 204.566406 191.636719 207.792969 C 191.636719 211.023438 194.257812 213.640625 197.492188 213.640625 Z M 197.492188 213.640625 "                   
                    > </motion.path>

                    <motion.path initial={{x:20}}
                    strokeWidth={3}
                    animate={{
          
                        pathLength: [0, 0.5 , 1, 1, 1, 1, 1, 1, 1, 0.5 ,0],
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        times: [0, 0.1, 0.2,0.3,0.4,0.5,0.6,0.7,0.8, 0.9,  1],
                        repeat: Infinity,
                        repeatDelay: 0
                      }}
                      fill="transparent"
                    stroke="#fff"
                    d="M 100.828125 173.925781 C 104.0625 173.925781 106.6875 171.308594 106.6875 168.082031 C 106.6875 164.855469 104.0625 162.234375 100.828125 162.234375 L 100.710938 162.234375 C 97.476562 162.234375 94.855469 164.855469 94.855469 168.082031 C 94.855469 171.308594 97.476562 173.925781 100.710938 173.925781 Z M 100.828125 173.925781 "  
                    > </motion.path>
                    <motion.path initial={{x:20}}
                    strokeWidth={3}
                    animate={{
          
                        pathLength: [0, 0.5 , 1, 1, 1, 1, 1, 1, 1, 0.5 ,0],
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        times: [0, 0.1, 0.2,0.3,0.4,0.5,0.6,0.7,0.8, 0.9,  1],
                        repeat: Infinity,
                        repeatDelay: 0
                      }}
                      fill="transparent"
                    stroke="#fff"
                    d="M 100.828125 213.640625 L 100.925781 213.640625 C 104.164062 213.640625 106.785156 211.023438 106.785156 207.792969 C 106.785156 204.566406 104.164062 201.953125 100.925781 201.953125 L 100.828125 201.953125 C 97.59375 201.953125 94.972656 204.566406 94.972656 207.792969 C 94.972656 211.023438 97.59375 213.640625 100.828125 213.640625 Z M 100.828125 213.640625 "
                    > </motion.path>
                    <motion.path initial={{x:20}}
                    strokeWidth={2}
                    fill="transparent"
                    stroke="#fff"
                    d="M 236.257812 126.285156 C 233.023438 126.285156 230.402344 123.664062 230.402344 120.4375 L 230.402344 120.339844 C 230.402344 117.109375 233.023438 114.492188 236.257812 114.492188 C 239.496094 114.492188 242.117188 117.109375 242.117188 120.339844 L 242.117188 120.4375 C 242.117188 123.664062 239.496094 126.285156 236.257812 126.285156 Z M 236.257812 126.285156 "
                    > </motion.path>
                    </motion.svg> 
                    
                    
               <p style={{color:"white", width:"60%"}}> Traders can also choose their desired asset to receive while selling the options in the secondary market. That much flexibility makes option trading more complex for inexperienced crypto traders so we also provide a user-friendly interface where users can create and trade option contracts for well known ERC20 tokens in a simple way.</p>
              <p style={{color:"white"}}> OpWiz utilizes chainlink price feed and node keepers to automatically exercise the option for option contracts where chainlink price feed is available for the token pairs that option contract is agreed on. This protocol might be improved by utilizing flash-loans to exercise the option for asset pairs that profitable execution of flash-loans are possible. </p>
                 
              </CardBody>
            </Card>
            </motion.div>
          );
      }
    }
       
        
  
        
         
        
           
      
    }
  
  
  export default Homepage;