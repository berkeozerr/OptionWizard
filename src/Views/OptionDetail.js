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