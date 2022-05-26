import { MotionConfig, motion} from "framer-motion";
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


export const MydModalWithGrid = (props) =>{
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



export const MydModalWithGridForList = (props) =>{
    let buyButton;
    let participateButton;
    if(props.isListed){
      buyButton = <Button onClick={()=>{
        props.toggle()
    }} style={{background:"#6a04c9", border:"none",color:"white"}}>Buy option</Button>
    }
    else{
      buyButton =  <></>
    }
    if(props.participant == "0x0000000000000000000000000000000000000000"){
      participateButton = <Button onClick={()=>{
        props.toggle()
    }} style={{background:"#6a04c9", border:"none",color:"white"}}>Participate</Button>
    }
    else{
      participateButton = <></>
    }
    
    var offerEndDate = new Date(parseInt(props.offerEnd,10) * 1000);
    var optionExpirationDate = new Date(parseInt(props.optionExpiration,10) * 1000);
      if(props)
      return (
          <Modal size="lg" style={{border:"none",background:"transparent",borderRadius:"10px",paddingTop:"10rem"}} {...props} aria-labelledby="contained-modal-title-vcenter">
          <ModalHeader style={{ background:"#282c34", border:"none",borderRadiusTop:"10px"}} closeButton>
              <Row style={{paddingLeft:"2rem"}}><h1 style={{color:"white"}}> Option Details </h1>
          <img style={{paddingLeft:"2rem"}}color="white" src={require("../assets/img/tarot.svg").default} ></img> </Row>
          </ModalHeader>
          <ModalBody className="show-grid" style={{background:"#282c34", border:"none"}}>
         
            <Container>
            <h2 style={{color:"white"}}> ID: {props.id} </h2>
              <Row>
                 
                <Col xs={12} md={8}>
                  
                  <h3 style={{color:"white"}}> Colleteral Asset: {props.assetname}</h3>
                  <h3 style={{color:"white"}}> Colleteral Amount: {props.assetamount} </h3>
                  
                </Col>
                <Col xs={6} md={4} style={{background:"#6a04c9", borderTopLeftRadius:"20px", borderTopRightRadius:"20px", paddingTop:"10px"}}>
                <h4 style={{color:"white", textAlign:"center"}}> Offer ends at:  </h4>
                  <h5 style={{color:"white", textAlign:"center"}}> {offerEndDate.getDay() +"/" +offerEndDate.getMonth() +"/"+ offerEndDate.getFullYear() +"-"+offerEndDate.getHours() + ":" + offerEndDate.getMinutes()} </h5>
                </Col>
              </Row>
              
              
              <Row>
              <Col xs={12} md={8}>
                  <h3 style={{color:"white"}}> Counter Asset: {props.counterassetname} </h3>
                  <h3 style={{color:"white"}}> Counter Amount: {props.counterassetamount} </h3>
                  
                  
                </Col>
                
              
                <Col xs={6} md={4} style={{background:"#6a04c9", borderBottomLeftRadius:"20px", borderBottomRightRadius:"20px", }}>
                  <h4 style={{color:"white", textAlign:"center"}}> Option expires at:  </h4>
                  <h5 style={{color:"white", textAlign:"center"}}>{optionExpirationDate.getDay() +"/" +optionExpirationDate.getMonth() +"/"+ optionExpirationDate.getFullYear() +"-"+optionExpirationDate.getHours() + ":" + optionExpirationDate.getMinutes()}</h5>
 
                </Col>
              </Row>
  
    
              <Row>
              <Col xs={12} md={8}>
                  <h3 style={{color:"white"}}> Premium Asset: {props.premiumassetname}</h3>
                  <h3 style={{color:"white"}}> Premium Amount: {props.premiumassetamount}</h3>
                  
                  
                </Col>
                
                
              </Row>
              <br></br>
                <Row>
                  
              <Row xs={12} md={12}>
                  
                 
                  
                  
                </Row>
                
                
              </Row>
              <Container style={{background:"#6a04c9", borderRadius:"20px", paddingTop:"10px"}}>
              <Row className="justify-content-md-center">
    <Col lg="auto">
    <h3 style={{color:"white"}}> Initiator: {props.initiator} </h3>
    </Col>
    
    <Col lg="auto">
    <h3 style={{color:"white"}}> Participant: {props.participant} </h3>
    </Col>
  </Row>
  </Container>
              <br/>
              <Col xs={15} md={8}>
                  
              <Row style={{height:"40px"}}><h5 style={{color:"white", height:"50px"}}>Price feed is provided by chainlink  </h5> 
              <motion.svg 
              initial={{
                x:10,
                y:-7,
                
              }}
              
              
              style={{width:"33px",height:"36px"}}> 
              <motion.path initial={{x:1, y:1}} animate={{
        pathLength: [0,0.2,0.4,0.6,0.8, 1 , 0.8, 0.6,0.4,0.2,0],
        }}
        transition={{
          duration: 2,
          ease: "linear",
          repeat: Infinity,
      }} fill={"transparent"} strokeWidth={2} stroke="#305cdc" d="M 15 0.0664062 L 11.824219 1.851562 L 3.175781 6.746094 L 0 8.53125 L 0 25.46875 L 3.175781 27.253906 L 11.90625 32.148438 L 15.078125 33.933594 L 18.253906 32.148438 L 26.824219 27.253906 L 30 25.46875 L 30 8.53125 L 26.824219 6.746094 L 18.175781 1.851562 Z M 6.347656 21.894531 L 6.347656 12.105469 L 15 7.210938 L 23.652344 12.105469 L 23.652344 21.894531 L 15 26.789062 Z M 6.347656 21.894531"></motion.path>
              </motion.svg>
              </Row>
              
                  
                </Col>
            </Container>
          </ModalBody>
          <ModalFooter style={{background:"#282c34", border:"none"}}>
          
            <Row>{participateButton}{buyButton}<Button onClick={()=>{
                props.toggle()
            }} style={{background:"#6a04c9", border:"none",color:"white"}}>Close</Button></Row>
            
            
          </ModalFooter>
        </Modal>
      );
}