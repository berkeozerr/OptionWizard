import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import React, { Component } from "react";
import { Badge,Jumbotron,Card, CardTitle,Row,Col,Label,CardImg,CardBody} from "reactstrap";

class ListOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      isLoading: false,
      successModal: false,
      week_id: 1,
      fixture: [],
    };
  }
  
  
  addOption(quantity) {
    const startId = 0;
    for (let i = 1; i < quantity; i++) {
      const id = startId + i;
      this.state.players.push({
        id: id,
        
        colleteral: "BTC",
        amountOfColleteral: 2100 + i,
        counterAsset: "ETH",
        amountOfCA: 2100 + i,
        premiumAsset: "BTC",
        premiumAmount: 2100 + i
      });
    }
  }

  render() {
    this.addOption(50);
    console.log(this.state.players);
    return (
      <>
      <Card style= {{background:"transparent",width: "100%"}}>
     <Card className = 'ml-8 mr-8 mb-8 mt-4 pb-4'>
      <BootstrapTable
      
      search
      hover
        ref="table"
        bordered={false}
        data={this.state.players}
        pagination
        
        trStyle={{textAlign:"center" }}
      >
        <TableHeaderColumn
          dataField="colleteral"
          width="10%"
          dataAlign="center"
          isKey={true}
        >
          <h2 style={{ color: "#5e72e4" }}>Colleteral Asset</h2>
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField = "amountOfColleteral"
          dataAlign="center"
          width="20%"
        >
          <h2 style={{ color: "#5e72e4" }}>Colleteral Amount</h2>
        </TableHeaderColumn>
        <TableHeaderColumn dataField="counterAsset" width="15%" dataAlign="center">
          <h2 style={{ color: "#5e72e4" }}>Counter Asset</h2>
        </TableHeaderColumn>
        <TableHeaderColumn dataField="amountOfCA" width="10%" dataAlign="center">
          {" "}
          <h2 style={{ color: "#5e72e4" }}> Counter Amount</h2>
        </TableHeaderColumn>
        <TableHeaderColumn dataField="premiumAsset" width="10%" dataAlign="center">
          {" "}
          <h2 style={{ color: "#5e72e4" }}> Premium Asset</h2>
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="premiumAmount"
          width="10%"
          dataAlign="center"
          style={{ color: "#5e72e4" }}
        >
          {" "}
          <h2 style={{ color: "#5e72e4" }}> Premium Amount</h2>
        </TableHeaderColumn>
       
      </BootstrapTable>
      </Card>
      </Card>
      </>
     
    );
  }
}
export default ListOptions;
