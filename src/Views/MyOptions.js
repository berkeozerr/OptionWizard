import React, { Component } from "react";

import { ReactSession }  from 'react-client-session';
import pic from "../assets/img/wizard.svg";
import bitcoin from "../assets/img/bitcoin.png";
import ethereum from "../assets/img/ethereum.png";
import tether from "../assets/img/tether.png";
import { allTokenOptions } from "./AllPossibleTokens";
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
      x: -60,
      y:-35,
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

  const MyOptionsConstructor = (props) =>{
   
      return(
                <Card className="mx-auto py-2" style= {{width: "30%", height: "200px", background:"#282c34"}}>
                    <Row><div class="avatar-group ml-5 my-2" style={{width:"30%", float:"right",alignContent:"end"}}>
                    <div class="avatar avatar-sm" href="#pablo" id="tooltip742438047">
                        <img alt="..." class="rounded-circle" src={allTokenOptions[props.token1] }/></div>
                    <div class="avatar avatar-sm" href="#pablo" id="tooltip941738690">
                        <img alt="..." class="rounded-circle" src={allTokenOptions[props.token2]}/></div>
                    <div class="avatar avatar-sm" href="#pablo" id="tooltip804044742">
                        <img alt="..." class="rounded-circle" src={allTokenOptions[props.token3]}/></div>
                </div><div class="my-2" style={{ float:"right",color:"white" , fontSize:"24px"}}>
                    {props.token1}/{props.token2}/{props.token3}
                </div></Row>
                <br></br>
                <Row>
                <div class="avatar-group mx-5 my-2" style={{width:"100%", float:"right",color:"white"}}>
                    Expiration Date: {props.expire}
                </div>
                </Row>
                <Row>
                <div class="ml-5 my-2" style={{width:"50%", float:"right",color:"wheat", fontSize:"14px"}}>
                    Current PNL: {props.profit} USD
                </div>
                <Button onClick={()=>{
                    props.setModalStateForParent( props.token1, props.token1Amount,props.token2, props.token2Amount,  props.token3, props.token3Amount, props.startDate, props.expire,props.profit )
                    props.setStateForParent(false)
                }}
                style={{background:"#6a04c9", border:"none",fontSize:"16px",color:"white", width:"150px",height:"80px"}}><motion.svg
                style={{position:"absolute"}}
                variants = {textMotion}
                initial="rest"
                whileHover="hover" 
                width="140"
                height="100"
                >
                    <motion.path
                    initial={{x:0,y:25}}
                    strokeWidth={1}
                    fill="#fff"
                    d="M 40.640625 18.539062 C 42.191406 18.21875 43.613281 17.457031 44.761719 16.308594 C 47.179688 13.890625 47.8125 10.226562 46.421875 7.160156 C 46.789062 6.882812 47.207031 6.6875 47.679688 6.566406 C 48.089844 6.464844 48.386719 6.105469 48.414062 5.683594 C 48.441406 5.261719 48.195312 4.871094 47.800781 4.714844 C 46.238281 4.089844 45.316406 3.191406 44.984375 1.960938 C 44.871094 1.539062 44.488281 1.246094 44.050781 1.242188 C 44.046875 1.242188 44.046875 1.242188 44.042969 1.242188 C 43.609375 1.242188 43.222656 1.53125 43.105469 1.949219 C 42.988281 2.359375 42.765625 2.753906 42.441406 3.128906 C 39.359375 1.6875 35.660156 2.308594 33.21875 4.757812 C 32.070312 5.90625 31.308594 7.332031 30.992188 8.882812 C 29.902344 8.523438 28.652344 8.777344 27.785156 9.644531 C 26.5625 10.871094 26.5625 12.863281 27.785156 14.089844 L 28.8125 15.117188 L 26.390625 17.542969 L 21.320312 20.964844 C 21.230469 21.027344 21.148438 21.101562 21.085938 21.191406 L 16.183594 27.761719 L 1.164062 42.796875 C -0.386719 44.347656 -0.386719 46.875 1.164062 48.425781 C 1.941406 49.203125 2.960938 49.589844 3.976562 49.589844 C 4.996094 49.589844 6.015625 49.203125 6.789062 48.425781 L 12.417969 42.792969 C 12.800781 42.410156 12.800781 41.792969 12.417969 41.414062 C 12.035156 41.03125 11.417969 41.03125 11.039062 41.414062 L 5.410156 47.046875 C 4.621094 47.835938 3.335938 47.835938 2.542969 47.046875 C 1.753906 46.253906 1.753906 44.96875 2.542969 44.175781 L 17.613281 29.089844 C 17.648438 29.058594 17.679688 29.023438 17.707031 28.984375 L 22.550781 22.492188 L 27.558594 19.109375 C 27.609375 19.074219 27.660156 19.035156 27.703125 18.992188 L 30.191406 16.5 L 33.058594 19.371094 L 30.910156 21.523438 L 25.796875 24.878906 C 25.683594 24.953125 25.585938 25.050781 25.511719 25.164062 L 22.28125 30.160156 L 16.621094 35.816406 C 16.242188 36.195312 16.242188 36.816406 16.621094 37.195312 C 17.003906 37.578125 17.621094 37.578125 18.003906 37.195312 L 23.734375 31.464844 C 23.785156 31.417969 23.828125 31.363281 23.863281 31.304688 L 27.039062 26.398438 L 32.066406 23.097656 C 32.121094 23.0625 32.171875 23.019531 32.21875 22.972656 L 34.441406 20.75 L 35.433594 21.746094 C 36.027344 22.339844 36.816406 22.667969 37.65625 22.667969 C 38.5 22.667969 39.289062 22.339844 39.878906 21.746094 C 40.746094 20.878906 41 19.628906 40.640625 18.539062 Z M 43.261719 5.058594 C 43.269531 5.054688 43.277344 5.046875 43.285156 5.039062 C 43.550781 4.804688 43.789062 4.566406 43.996094 4.316406 C 44.34375 4.78125 44.777344 5.195312 45.289062 5.5625 C 44.785156 5.933594 44.351562 6.390625 43.980469 6.941406 C 43.582031 6.414062 43.125 5.957031 42.609375 5.578125 C 42.84375 5.410156 43.0625 5.238281 43.261719 5.058594 Z M 38.5 20.367188 C 38.277344 20.589844 37.976562 20.714844 37.65625 20.714844 C 37.339844 20.714844 37.039062 20.589844 36.816406 20.367188 L 29.167969 12.710938 C 28.703125 12.246094 28.703125 11.488281 29.167969 11.023438 C 29.398438 10.789062 29.703125 10.675781 30.007812 10.675781 C 30.3125 10.675781 30.617188 10.789062 30.847656 11.023438 L 31.113281 11.285156 L 34.71875 14.898438 L 38.5 18.679688 C 38.957031 19.136719 38.957031 19.910156 38.5 20.367188 Z M 32.785156 10.199219 C 32.867188 8.664062 33.5 7.234375 34.597656 6.136719 C 36.199219 4.53125 38.507812 3.957031 40.613281 4.53125 C 40.480469 4.605469 40.34375 4.679688 40.199219 4.753906 C 39.855469 4.929688 39.648438 5.292969 39.667969 5.675781 C 39.691406 6.0625 39.941406 6.402344 40.300781 6.535156 C 41.609375 7.023438 42.539062 7.960938 43.144531 9.402344 C 43.296875 9.765625 43.652344 10 44.042969 10 C 44.054688 10 44.066406 10 44.074219 9.996094 C 44.480469 9.984375 44.835938 9.722656 44.964844 9.339844 C 44.988281 9.269531 45.015625 9.203125 45.042969 9.136719 C 45.511719 11.183594 44.921875 13.386719 43.382812 14.929688 C 42.285156 16.027344 40.855469 16.664062 39.324219 16.742188 Z M 32.785156 10.199219 "                    
                    >
                    </motion.path>
                    <motion.path
                    initial={{x:0,y:25}}
                    strokeWidth={1}
                    fill="#fff"
                    d="M 14.246094 6.996094 C 16.113281 7.691406 17.4375 9.023438 18.300781 11.074219 C 18.453125 11.4375 18.808594 11.671875 19.199219 11.671875 C 19.210938 11.671875 19.21875 11.671875 19.230469 11.671875 C 19.636719 11.65625 19.988281 11.394531 20.121094 11.011719 C 20.882812 8.804688 22.167969 7.5 24.046875 7.027344 C 24.457031 6.925781 24.753906 6.566406 24.78125 6.144531 C 24.8125 5.722656 24.5625 5.332031 24.167969 5.175781 C 21.941406 4.289062 20.625 2.992188 20.140625 1.207031 C 20.027344 0.785156 19.644531 0.492188 19.207031 0.488281 C 19.203125 0.488281 19.203125 0.488281 19.199219 0.488281 C 18.761719 0.488281 18.378906 0.777344 18.261719 1.195312 C 17.832031 2.703125 16.484375 4.015625 14.144531 5.210938 C 13.796875 5.386719 13.589844 5.75 13.613281 6.136719 C 13.636719 6.523438 13.882812 6.859375 14.246094 6.996094 Z M 19.152344 3.722656 C 19.726562 4.605469 20.515625 5.367188 21.507812 6.003906 C 20.550781 6.601562 19.757812 7.4375 19.128906 8.5 C 18.449219 7.484375 17.617188 6.65625 16.636719 6.019531 C 17.710938 5.316406 18.546875 4.550781 19.152344 3.722656 Z M 19.152344 3.722656 "                    
                    >
                    </motion.path>
                    <motion.path
                    initial={{x:0,y:25}}
                    strokeWidth={1}
                    fill="#fff"
                    d="M 49.367188 29.003906 C 47.136719 28.117188 45.816406 26.820312 45.335938 25.039062 C 45.21875 24.617188 44.835938 24.320312 44.398438 24.316406 C 44.394531 24.316406 44.394531 24.316406 44.390625 24.316406 C 43.957031 24.316406 43.574219 24.609375 43.453125 25.027344 C 43.027344 26.53125 41.679688 27.847656 39.335938 29.042969 C 38.992188 29.21875 38.785156 29.582031 38.804688 29.96875 C 38.828125 30.351562 39.074219 30.691406 39.4375 30.824219 C 41.308594 31.523438 42.632812 32.859375 43.492188 34.90625 C 43.644531 35.269531 44 35.503906 44.390625 35.503906 C 44.402344 35.503906 44.414062 35.503906 44.425781 35.503906 C 44.828125 35.492188 45.183594 35.230469 45.316406 34.847656 C 46.074219 32.636719 47.359375 31.332031 49.242188 30.855469 C 49.652344 30.753906 49.949219 30.398438 49.976562 29.976562 C 50.007812 29.554688 49.757812 29.160156 49.367188 29.003906 Z M 44.324219 32.332031 C 43.644531 31.316406 42.8125 30.488281 41.832031 29.851562 C 42.902344 29.144531 43.738281 28.382812 44.34375 27.554688 C 44.921875 28.4375 45.710938 29.199219 46.703125 29.835938 C 45.746094 30.433594 44.953125 31.269531 44.324219 32.332031 Z M 44.324219 32.332031 "
                    >
                    </motion.path>
                    <motion.path
                    initial={{x:0,y:25}}
                    strokeWidth={1}
                    fill="#fff"
                    d="M 13.964844 38.496094 L 13.949219 38.503906 C 13.527344 38.839844 13.460938 39.457031 13.796875 39.875 C 13.988281 40.117188 14.273438 40.242188 14.558594 40.242188 C 14.773438 40.242188 14.988281 40.171875 15.167969 40.027344 L 15.183594 40.019531 C 15.601562 39.679688 15.671875 39.066406 15.335938 38.644531 C 15 38.226562 14.382812 38.15625 13.964844 38.496094 Z M 13.964844 38.496094 "
                    >
                    </motion.path>
                    
                    
                </motion.svg>
                <h3 style={{color: "white", textAlign:"end"}}>Details</h3>
                
                
                </Button>
                
                
                </Row>
                

                </Card>
      );
  }

  const MydModalWithGrid = (props) =>{
    return (
        <Modal size="lg" style={{border:"none",background:"transparent",borderRadius:"10px",paddingTop:"10rem"}} {...props} aria-labelledby="contained-modal-title-vcenter">
        <ModalHeader style={{ background:"#282c34", border:"none",borderRadiusTop:"10px"}} closeButton>
            <Row style={{paddingLeft:"2rem"}}><h1 style={{color:"white"}}> Option Details </h1>
        <img style={{paddingLeft:"2rem"}}color="white" src={require("../assets/img/tarot.svg").default} ></img></Row>
        </ModalHeader>
        <ModalBody className="show-grid" style={{background:"#282c34", border:"none"}}>
          <Container>
            <Row>
               
              <Col xs={12} md={8}>
                <h3 style={{color:"white"}}> Colleteral Asset: {props.assetname}</h3>
                <h3 style={{color:"white"}}> Colleteral Amount: {props.assetamount} </h3>
                
                
              </Col>
              <Col xs={6} md={4}>
                <h5 style={{color:"wheat"}}> Purchased at</h5>
                <h5 style={{color:"wheat"}}> {props.date} </h5>
              </Col>
            </Row>
            <br></br>
  
            <Row>
            <Col xs={12} md={8}>
                <h3 style={{color:"white"}}> Counter Asset: {props.counterassetname} </h3>
                <h3 style={{color:"white"}}> Counter Amount: {props.counterassetamount} </h3>
                
                
              </Col>
              <Col xs={6} md={4}>
                <h5 style={{color:"wheat"}}> Option will be excercised at</h5>
                <h5 style={{color:"wheat"}}> {props.excersizedate} </h5>
              </Col>
            </Row>

            <br></br>
  
            <Row>
            <Col xs={12} md={8}>
                <h3 style={{color:"white"}}> Premium Asset: {props.premiumassetname}</h3>
                <h3 style={{color:"white"}}> Premium Amount: {props.premiumassetamount}</h3>
                
                
              </Col>
              <Col xs={6} md={4}>
                <h5 style={{color:"wheat"}}> Current PNL</h5>
                <h5 style={{color:"wheat"}}> {props.profitloss}</h5>
              </Col>
              
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter style={{background:"#282c34", border:"none"}}>
          <Button onClick={()=>{
              props.toggle()
          }} style={{background:"#6a04c9", border:"none",color:"white"}}>Close</Button>
        </ModalFooter>
      </Modal>
    );
    }
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



class MyOptions extends Component {
  
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {userFriendly: new Boolean(),loading: new Boolean(true), modalShow: new Boolean(false), 
        assetName: new String("Null"), assetAmount: new String("0"), counterAssetName: new String("Null"), counterAssetAmount: new String("0"),
        premiumAssetName: new String("Null"), PremiumAssetAmount: new String("0"),
        date: new String("Null"), excersizeDate: new String("Null"), profitLoss: new String("0")
    };

  }
  handleSubmit = (e) => {
    
    this.props.history.push("/admin/searchplayer");
        /*this.setState({
          error: err.response.data.Message,
        });*/
        //this.togglewarningModal();
      
  };
  

  render() {
    
    
    var setModalState = (assetNamex, assetAmountx, counterAssetNamex, counterAssetAmountx,premiumAssetNamex, premiumAssetAmountx,datex,excersizeDatex,profitLossx) =>{
        this.setState({
            assetName: assetNamex,
            assetAmount: assetAmountx,
            counterAssetName: counterAssetNamex,
            counterAssetAmount: counterAssetAmountx,
            premiumAssetName: premiumAssetNamex,
            premiumAssetAmount: premiumAssetAmountx,
            date: datex,
            excersizeDate: excersizeDatex,
            profitLoss: profitLossx
        })
    }
    var setLoading = (x) => {
      this.setState({loading: x})
    }
    var setModal = (x) => {
        this.setState({modalShow: x})
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
            

      
        <Card className="mx-auto py-2" style= {{width: "90%" ,float:"center", border:"none"}}>
  
        
        <CardHeader><img style={{ width: 50, height: 50 }} alt="..." src={pic} /> {ReactSession.get("userAddress")}</CardHeader>
        
          <CardBody className="mx-5 ">
            <Col>
            <Row className="my-5">
                <MyOptionsConstructor setModalStateForParent = {setModalState} setStateForParent = {setModal} token1= "ADX" token1Amount = "123"token2= "BCH" token2Amount = "33" token3= "USDT" token3Amount = "3213"profit= "103" expire= "22/may/2022" startDate="22/may/2022"></MyOptionsConstructor>
                <MyOptionsConstructor setModalStateForParent = {setModalState} setStateForParent = {setModal} token1= "MANA" token1Amount = "123" token2= "BTC" token2Amount = "33" token3= "USDC" token3Amount = "3213"profit= "23" expire= "22/may/2022" startDate="22/may/2022"></MyOptionsConstructor>
                <MyOptionsConstructor setModalStateForParent = {setModalState} setStateForParent = {setModal} token1= "YFI" token1Amount = "123" token2= "MATIC" token2Amount = "33" token3= "LINK" token3Amount = "3213" profit= "-23" expire= "22/may/2022" startDate="22/may/2022"></MyOptionsConstructor>
                
             </Row>
             <Row className="my-5">
                <MyOptionsConstructor setModalStateForParent = {setModalState} setStateForParent = {setModal} token1= "ADX" token1Amount = "123"token2= "BCH" token2Amount = "33" token3= "USDT" token3Amount = "3213"profit= "103" expire= "22/may/2022" startDate="22/may/2022"></MyOptionsConstructor>
                <MyOptionsConstructor setModalStateForParent = {setModalState} setStateForParent = {setModal} token1= "MANA" token1Amount = "123" token2= "BTC" token2Amount = "33" token3= "USDC" token3Amount = "3213"profit= "23" expire= "22/may/2022" startDate="22/may/2022"></MyOptionsConstructor>
                <MyOptionsConstructor setModalStateForParent = {setModalState} setStateForParent = {setModal} token1= "YFI" token1Amount = "123" token2= "MATIC" token2Amount = "33" token3= "LINK" token3Amount = "3213" profit= "-23" expire= "22/may/2022" startDate="22/may/2022"></MyOptionsConstructor>
                
             </Row><Row className="my-5">
                <MyOptionsConstructor setModalStateForParent = {setModalState} setStateForParent = {setModal} token1= "ADX" token1Amount = "123"token2= "BCH" token2Amount = "33" token3= "USDT" token3Amount = "3213"profit= "103" expire= "22/may/2022" startDate="22/may/2022"></MyOptionsConstructor>
                <MyOptionsConstructor setModalStateForParent = {setModalState} setStateForParent = {setModal} token1= "MANA" token1Amount = "123" token2= "BTC" token2Amount = "33" token3= "USDC" token3Amount = "3213"profit= "23" expire= "22/may/2022" startDate="22/may/2022"></MyOptionsConstructor>
                <MyOptionsConstructor setModalStateForParent = {setModalState} setStateForParent = {setModal} token1= "YFI" token1Amount = "123" token2= "MATIC" token2Amount = "33" token3= "LINK" token3Amount = "3213" profit= "-23" expire= "22/may/2022" startDate="22/may/2022"></MyOptionsConstructor>
                
             </Row>
             </Col>
          </CardBody>
        </Card>
        
        <MydModalWithGrid assetname= {this.state.assetName} assetamount= {this.state.assetAmount} counterassetname = {this.state.counterAssetName} counterassetamount = {this.state.counterAssetAmount} premiumassetamount= {this.state.premiumAssetAmount} premiumassetname={this.state.premiumAssetName} date={this.state.date} profitloss={this.state.profitLoss} excersizedate={this.state.excersizeDate}  isOpen={!this.state.modalShow} toggle={() => this.setState({modalShow: true})}></MydModalWithGrid>
        </motion.div>
        
        );
    }
  }
     
      

      
       
      
         
    
  }


export default MyOptions;




