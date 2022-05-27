import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import React, { Component } from "react";
import { Badge,Jumbotron,Card, CardTitle,Row,Col,Label,CardImg,CardBody} from "reactstrap";
import Loader from "./Loader";
import { MotionConfig } from "framer-motion";
import { motion } from "framer-motion";
import axios from "axios";
import {MydModalWithGridForList} from "./OptionDetail"
import "../assets/css/listOptions.css";

const itemMain = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
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
class ListOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      isLoading: false,
      modalShow: false,
      loading: new Boolean(true),
      assetName: new String("Null"), assetAmount: new String("0"), counterAssetName: new String("Null"), counterAssetAmount: new String("0"),
        premiumAssetName: new String("Null"), PremiumAssetAmount: new String("0"),
        date: new String("Null"), excersizeDate: new String("Null"), profitLoss: new String("0"), initiator: new String("None"), participant: new String("None"),
        offerEnd: new String("Null"), optionExpiration: new String("Null"), isListed : new Boolean(false), id: new String("0")
    };
    this.closeCollapse = this.closeCollapse.bind(this);
  }
  toogleDetailModal= (row) => {
    this.getOptionDetail(row)
     
    
  }

  closeCollapse = () => {
    this.setState({
      modalShow: false,
    });
  };
   
  getOptions()
  {
    const endpoint = "https://api.thegraph.com/subgraphs/name/berkeozerr/opwiz";
    const headers = {
      "content-type": "application/json",
    };
    const graphqlQuery = {
        "operationName": "fetchOptions",
        "query": `{
          options
          {
            id
            initiator
            participant
            colleteral
            counterAsset
            premiumAsset
            amountOfColleteral
            amountOfCA
            premiumAmount
            colleteralAssetName
            counterAssetName
            premiumAssetName
          }
         
        }`,
        "variables": {}
    };
    
    axios
      // This is where the data is hosted
      .post(endpoint,graphqlQuery, headers)
      // Once we get a response and store data, let's change the loading state
      .then((response) => {
        console.log(response.data);
        this.setState({
          options: response.data.data.options,
          
        });
      });
     // errors if any



  }

  getOptionDetail(row)
  {
    let optionId = row.id
    console.log(optionId)
    const endpoint = "https://api.thegraph.com/subgraphs/name/berkeozerr/opwiz";
    const headers = {
      "content-type": "application/json",
    };
    const graphqlQuery = {
        "operationName": "fetchOption",
        "query": `query GetOptionDetail($optionId: ID!) {
          optionDetails(where: {id:$optionId})
          {
            id
            listAsset
            priceFeedAddress
            poolAddress
            offerEnd
            optionExpiry
            listAmount
            isListed
            exercised
          }
         
        }`,
        "variables": {optionId:optionId}

    };
    
    axios
      // This is where the data is hosted
      .post(endpoint,graphqlQuery, headers)
      // Once we get a response and store data, let's change the loading state
      .then((response) => {
        console.log(response.data);
        console.log(row);
        let participantId = response.data.data.optionDetails[0].id;
        let iter = 0;
        let Xparticipant = "Null";
        let Xinitiator = "Null";

        while (iter < this.state.options.length){
          if(this.state.options[iter].id == participantId){
            Xparticipant = this.state.options[iter].participant;
            Xinitiator = this.state.options[iter].initiator;

          }
          iter ++;
        }
        this.setState({
          assetName: row.colleteralAssetName,
          assetAmount: row.amountOfColleteral,
          counterAssetName: row.counterAssetName,
          counterAssetAmount: row.amountOfCA,
          premiumAssetName: row.premiumAssetName,
          PremiumAssetAmount: row.premiumAmount,
          offerEnd: response.data.data.optionDetails[0].offerEnd,
          optionExpiration: response.data.data.optionDetails[0].optionExpiry,
          isListed: response.data.data.optionDetails[0].isListed,
          id: response.data.data.optionDetails[0].id,
          priceFeedAddress: response.data.data.optionDetails[0].priceFeedAddress,
          participant: Xparticipant,
          initiator: Xinitiator,
          modalShow: true
        });
      })
      .catch((err => {console.log(err)}));
     // errors if any



  }
  
  componentDidMount() {
    this.getOptions();
  }
  
  render() {
    
    
    var options = {
      onRowClick: this.toogleDetailModal,
      alwaysShowAllBtns: true,
     }
    var setLoading = (x) => {
      this.setState({loading: x})
    }
    if(this.state.loading == true){
      return (
        <Loader setLoading={setLoading} />
      )
    }
    else{
   // this.addOption(50);
    return (
      <>
      <motion.div variants={itemMain} initial="hidden" animate="show" className = "pt-4">
      <MydModalWithGridForList assetname= {this.state.assetName} assetamount= {this.state.assetAmount} counterassetname = {this.state.counterAssetName} 
      counterassetamount = {this.state.counterAssetAmount} premiumassetamount= {this.state.PremiumAssetAmount} premiumassetname={this.state.premiumAssetName} 
      date={this.state.date} excersizedate={this.state.excersizeDate}  isOpen={this.state.modalShow} initiator={this.state.initiator} participant= {this.state.participant} 
      optionExpiration={this.state.optionExpiration} offerEnd={this.state.offerEnd} isListed = {this.state.isListed} id={this.state.id} priceFeedAddress= {this.state.priceFeedAddress} toggle={() => this.setState({modalShow: false})}></MydModalWithGridForList>
      
     <Card className = 'ml-8 mr-8 mb-8  pb-4' style={{background: "#282c34" , color:"white"}}>
      <BootstrapTable
      
      search
      hover
        ref="table"
        bordered={false}
        data={this.state.options}
        pagination
        trStyle={{textAlign:"center" }}
        options={options}
        scrollTop
      >
        <TableHeaderColumn
          dataField="colleteralAssetName"
          dataAlign="center"
          isKey={true}
          width="16%"
        >
          <h2 style={{ color: "#5e72e4" }}>Colleteral Asset</h2>
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField = "amountOfColleteral"
          dataAlign="center"
          width="16%"
        >
          <h2 style={{ color: "#5e72e4" }}>Colleteral Amount</h2>
        </TableHeaderColumn>
        <TableHeaderColumn dataField="counterAssetName"  dataAlign="center" width="16%">
          <h2 style={{ color: "#5e72e4" }}>Counter Asset</h2>
        </TableHeaderColumn>
        <TableHeaderColumn dataField="amountOfCA"  dataAlign="center" width="16%">
          {" "}
          <h2 style={{ color: "#5e72e4" }}> Counter Amount</h2>
        </TableHeaderColumn>
        <TableHeaderColumn dataField="premiumAssetName"  dataAlign="center" width="16%">
           
          <h2 style={{ color: "#5e72e4" }}> Premium Asset</h2>
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="premiumAmount"
          width="16%"
          dataAlign="center"
          style={{ color: "#5e72e4" }}
        >
          <h2 style={{ color: "#5e72e4" }}> Premium Amount</h2>
        </TableHeaderColumn>
       
      </BootstrapTable>
      </Card>
      </motion.div>
      </>
     
    );
  }
}
}
export default ListOptions;
