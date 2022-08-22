import React, { Component } from "react";
import { ReactSession } from "react-client-session";

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
  InputGroupText,
} from "reactstrap";
import Select, { components } from "react-select";
import pic from "../assets/img/brand/argon-react.png";
import opWizchainlinkAbi from "../assets/abis/OpWizChainlinkCompatible.json";
import opWiz from "../assets/abis/OpWiz.json";
import erc20 from "../assets/abis/ERC20.json";
import erc721 from "../assets/abis/ERC721.json";
import erc1155 from "../assets/abis/ERC1155.json";

import { motion } from "framer-motion";
import { Link, NavLink, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { allTokenOptions } from "./AllPossibleTokens";
import { ethers } from "ethers";
import { userAddress } from "./globals";
const typeOptions = [
  { value: 1, label: "Day" },
  { value: 7, label: "Week" },
  { value: 30, label: "Month" },
];
const numOptions = [];
for (var i = 0; i < 366; i += 1) {
  numOptions.push({ value: i, label: i });
}
const customStyles = {
  control: (base) => ({
    ...base,
    height: 45,
  }),
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
    this.offerprofessional = this.offerprofessional.bind(this);
    this.offerfriendly = this.offerfriendly.bind(this);
    this.state = {
      userFriendly: new Boolean(),
      loading: new Boolean(true),
      colleteral: new String(""),
      counterAsset: new String(""),
      premiumAsset: new String(""),
      colleteralAmount: new Number(0),
      counterAmount: new Number(0),
      premiumAmount: new Number(0),
      indexofcollateral: new Number(0),
      indexofcounter: new Number(0),
      indexofpremium: new Number(0),
      offerEndType: new Number(0),
      optionExpiryType: new Number(0),
      offerEndNumber: 1,
      optionExpiryNumber: 1,
    };
  }
  handleChangeOfferEndType = (e) => {
    console.log(e);
    this.setState({
      offerEndType: e.value,
    });
  };
  handleChangeOptionEndType = (e) => {
    console.log(e);
    this.setState({
      optionExpiryType: e.value,
    });
  };
  handleChangeOfferEndNumber = (e) => {
    console.log(e);
    this.setState({
      offerEndNumber: e.value,
    });
  };
  handleChangeOptionExpiryNumber = (e) => {
    console.log(e);
    this.setState({
      optionExpiryNumber: e.value,
    });
  };

  handleSubmit = (e) => {
    this.props.history.push("/admin/searchplayer");
    /*this.setState({
          error: err.response.data.Message,
        });*/
    //this.togglewarningModal();
  };

  async offerprofessional() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    const signer = provider.getSigner();
    console.log(signer);
    const WAIT_CONFIRMATION = 6;
    const OpWiz = new ethers.Contract(opWiz.address, opWiz.abi, signer);
    console.log(OpWiz.address);
    console.log(opWiz.address);
    console.log(this.state.colleteral);
    console.log(this.state.indexofcounter);
    console.log(this.state.colleteralAmount);

    const offerTx = await OpWiz.offerOption(
      this.state.colleteral,
      this.state.counterAsset,
      this.state.premiumAsset,
      this.state.indexofcollateral,
      this.state.indexofcounter,
      this.state.indexofpremium
    );
    console.log(offerTx);
    console.log(this.state.offerEndType);
    const expiry = this.state.offerEndType * this.state.offerEndNumber;
    console.log(expiry);
    const offer_end =
      this.state.optionExpiryNumber * this.state.optionExpiryType;
    const offerTxReceipt = await offerTx.wait(WAIT_CONFIRMATION);
    const offerEvent = offerTxReceipt.events.pop();
    console.log(
      `Event name: ${offerEvent.event}\nOptionId: ${offerEvent.args[1]}`
    );

    const optionId = offerEvent.args[1];
    const assetType = (await OpWiz.optionDetails(parseInt(optionId)))
      .colleteralType;
    console.log(assetType);
    const abicoder = ethers.utils.defaultAbiCoder;
    switch (assetType) {
      case 0:
        const Erc20 = new ethers.Contract(
          this.state.colleteral,
          erc20.abi,
          signer
        );
        const approveTx = await Erc20.approve(
          OpWiz.address,
          this.state.colleteralAmount
        );
        const setParamsTx = await OpWiz.connect(signer).setOptionParams(
          //option id offeroption eventini oku ordan burda yolla
          offerEvent.args[1],
          this.state.colleteralAmount,
          this.state.counterAmount,
          this.state.premiumAmount,
          expiry,
          offer_end,{gasLimit:800000,gasPrice:1000000000}
        );

        await setParamsTx.wait(WAIT_CONFIRMATION);
        console.log(setParamsTx);

        break;
      //ERC20
      //approve and call setOptionParams
      case 1: //ERC721
        const Erc721 = new ethers.Contract(
          this.state.colleteral,
          erc721.abi,
          signer
        );
        console.log(Erc721);
        const setOptionParamsInfo721 = abicoder.encode(
          ["uint8", "uint", "uint", "uint", "uint", "uint"],
          [
            1,
            optionId,
            this.state.counterAmount,
            this.state.premiumAmount,
            expiry,
            offer_end,
          ]
        );
        console.log(Erc721.functions);

        let safetx = await Erc721[
          "safeTransferFrom(address,address,uint256,bytes)"
        ](
          signer.address,
          OpWiz.address,
          this.state.indexofcollateral,
          setOptionParamsInfo721
        );
        console.log(safetx);
        await safetx.wait(WAIT_CONFIRMATION);
        break;

      //create respective byte params and transer with erc721 safetransferfrom
      case 2: //ERC1155
        const Erc1155 = new ethers.Contract(
          this.state.colleteral,
          erc1155.abi,
          signer
        );
        let setOptionParamsInfo = abicoder.encode(
          ["uint8", "uint", "uint", "uint", "uint", "uint"],
          [
            1,
            optionId,
            this.state.counterAmount,
            this.state.premiumAmount,
            expiry,
            offer_end,
          ]
        );
        const safetx1155 = await Erc1155.safeTransferFrom(
          signer.address,
          OpWiz.address,
          this.state.indexofcollateral,
          this.state.colleteralAmount,
          setOptionParamsInfo
        );
        await safetx1155.wait(WAIT_CONFIRMATION);
        break;
      //create respective byte params and transer with erc1155 safetransferfrom
      default:
        break;
    }
  }
  async offerfriendly() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    const signer = provider.getSigner();
    console.log(signer);
    const WAIT_CONFIRMATION = 6;

    //address does not exist, add that.
    const OpWizChainLinkCompatible = new ethers.Contract(
      opWizchainlinkAbi.address,
      opWizchainlinkAbi.abi,
      signer
    );

    console.log(this.state.colleteral);
    console.log(this.state.indexofcounter);
    console.log(this.state.colleteralAmount);
    const expiry = this.state.offerEndType * this.state.offerEndNumber;
    const offer_end =
      this.state.optionExpiryNumber * this.state.optionExpiryType;

    const offerTx = await OpWizChainLinkCompatible.offerOption(
      this.state.colleteral,
      this.state.counterAsset,
      this.state.premiumAsset,
      this.state.colleteralAmount,
      this.state.counterAmount,
      this.state.premiumAmount,
      expiry,
      offer_end
    );

    //hacı bunları biri yazmış zaten ???
    console.log(offerTx);
    console.log(this.state.offerEndType);
    const offerTxReceipt = await offerTx.wait(WAIT_CONFIRMATION);
    const offerEvent = offerTxReceipt.events.pop();
    console.log(
      `Event name: ${offerEvent.event}\nOptionId: ${offerEvent.args[1]}`
    );

    const Erc20 = new ethers.Contract(this.state.colleteral, erc20.abi, signer);
    const approveTx = await Erc20.approve(
      OpWizChainLinkCompatible.address,
      this.state.colleteralAmount
    );

    //ERC20
    //approve and call setOptionParams
  }

  render() {
    //handlers:
    const colleteralSetter = (e) => {
      this.setState({ colleteral: e.SingleValue });
    };
    const colleteralSetterForProffessional = (e) => {
      this.setState({ colleteral: e.SingleValue });
    };
    const colleteralAmountSetter = (e) => {
      this.setState({ colleteralAmount: e.SingleValue });
    };
    const premiumAssetSetter = (e) => {
      this.setState({ premiumAsset: e.SingleValue });
    };
    const premiumAssetSetterForProffessional = (e) => {
      this.setState({ premiumAsset: e.SingleValue });
    };
    const premiumAmountSetter = (e) => {
      this.setState({ premiumAmount: e.SingleValue });
    };
    const counterAssetSetter = (e) => {
      this.setState({ counterAsset: e.SingleValue });
    };
    const counterAssetSetterForProffessional = (e) => {
      this.setState({ counterAsset: e.SingleValue });
    };
    const counterAmountSetter = (e) => {
      this.setState({ counterAmount: e.SingleValue });
    };
    const indexofcollateralSetter = (e) => {
      this.setState({ indexofcollateral: e.SingleValue });
    };
    const indexofcounterSetter = (e) => {
      this.setState({ indexofcounter: e.SingleValue });
    };
    const indexofpremiumSetter = (e) => {
      this.setState({ indexofpremium: e.SingleValue });
    };

    var options = [];
    const keys = Object.keys(allTokenOptions);
    const values = Object.values(allTokenOptions);
    let i = 0;
    while (i < 59) {
      var obj = { value: keys[i], label: keys[i], icon: values[i] };
      options.push(obj);
      i++;
    }
    console.log(keys + values);
    var setLoading = (x) => {
      this.setState({ loading: x });
    };
    const { Option } = components;
    const IconOption = (props) => (
      <Option {...props}>
        <img
          src={props.data.icon}
          style={{ width: 18 }}
          alt={props.data.label}
        />
        {props.data.label}
      </Option>
    );
    const IconValue = (props) => (
      <div>
        <img
          src={props.data.icon}
          style={{ width: 18 }}
          alt={props.data.label}
        />
        {props.data.label}
      </div>
    );

    let dataFile = require("../assets/mainnetAddresses.json");
    let pairData = dataFile.ethereumAddresses.networks[1].proxies;
    const pairs = [];
    pairData.forEach((element) => {
      pairs.push({ value: element.proxy, label: element.pair });
    });
    console.log(pairs);
    const spring = {
      type: "spring",
      stiffness: 700,
      damping: 30,
    };
    if (this.state.loading == true) {
      return <Loader setLoading={setLoading} />;
    } else {
      if (this.state.userFriendly == true) {
        return (
          <motion.div variants={itemMain} initial="hidden" animate="show">
            <Card
              className="m-auto py-2"
              style={{
                width: "40%",
                height: "40%",
                float: "center",
                background: "#282c34",
              }}
            >
              <CardHeader style={{ border: "none", background: "#282c34" }}>
                <Row>
                  <div
                    className="switch ml-5"
                    data-isOn={this.state.userFriendly}
                    onClick={() => this.setState({ userFriendly: false })}
                    style={{ float: "right" }}
                  >
                    <motion.div className="handle" layout transition={spring} />
                  </div>
                  <h1 class="ml-auto mr-5" style={{ color: "white" }}>
                    Professional
                  </h1>
                </Row>
              </CardHeader>
              <CardBody style={{ background: "#282c34" }} className="px-lg-5 ">
                <Form role="form">
                  <Row className="mb-3">
                    <Col sm={6}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-paper-diploma" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Collateral Asset"
                            type="text"
                            onChange={(e) =>
                              colleteralSetterForProffessional(e)
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-money-coins" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Amount"
                            type="text"
                            onChange={(e) => colleteralAmountSetter(e)}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-align-left-2" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="If NFT, Index"
                            type="text"
                            onChange={(e) => indexofcollateralSetter(e)}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={6}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-paper-diploma" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Counter Asset"
                            type="text"
                            onChange={(e) =>
                              counterAssetSetterForProffessional(e)
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-money-coins" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Amount"
                            type="text"
                            onChange={(e) => counterAmountSetter(e)}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-align-left-2" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="If NFT, Index"
                            type="text"
                            onChange={(e) => indexofcounterSetter(e)}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col sm={6}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-paper-diploma" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Premium Asset"
                            type="text"
                            onChange={(e) =>
                              premiumAssetSetterForProffessional(e)
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-money-coins" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Amount"
                            type="text"
                            onChange={(e) => premiumAmountSetter(e)}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-align-left-2" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="If NFT, Index"
                            type="text"
                            onChange={(e) => indexofpremiumSetter(e)}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3}>Offer ends in:</Col>
                    <Col sm={3}>
                      <FormGroup>
                        <div style={{ width: "13vh" }}>
                          <Select
                            value={this.state.day}
                            id="offerEndType"
                            options={typeOptions}
                            onChange={(options) =>
                              this.handleChangeOfferEndType(options)
                            }
                            className="align-right"
                            defaultValue={{ label: "Day", value: 0 }}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <div style={{ width: "13vh" }}>
                          <Select
                            className="align-right"
                            options={numOptions}
                            id="offerEndNumber"
                            onChange={(e) => this.handleChangeOfferEndNumber(e)}
                            defaultValue={{ label: "1", value: 1 }}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <div className="custom-control custom-checkbox my-auto">
                          <input
                            className="custom-control-input float-right"
                            id="customCheck1"
                            type="checkbox"
                          />
                          <label
                            style={{ color: "white" }}
                            className="custom-control-label"
                            htmlFor="customCheck1"
                          >
                            Auto Excercise
                          </label>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3}>Option expires in:</Col>
                    <Col sm={3}>
                      <FormGroup>
                        <div style={{ width: "13vh" }}>
                          <Select
                            options={typeOptions}
                            className="align-right"
                            id="optionExpiryType"
                            onChange={(e) => this.handleChangeOptionEndType(e)}
                            defaultValue={{ label: "Day", value: 0 }}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <div style={{ width: "13vh" }}>
                          <Select
                            className="align-right"
                            options={numOptions}
                            id="optionExpiryNumber"
                            onChange={(e) =>
                              this.handleChangeOptionExpiryNumber(e)
                            }
                            defaultValue={{ label: "1", value: 1 }}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>

                  <div className="text-center">
                    <Button
                      style={{
                        background: "#6a04c9",
                        color: "white",
                        border: "none",
                      }}
                      type="button"
                      onClick={() => this.offerprofessional()}
                    >
                      Create
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </motion.div>
        );
      } else {
        return (
          <motion.div variants={itemMain} initial="hidden" animate="show">
            <Card
              className="m-auto py-2"
              style={{
                width: "40%",
                height: "30%",
                float: "center",
                background: "#282c34",
              }}
            >
              <CardHeader style={{ border: "none", background: "#282c34" }}>
                <Row>
                  <div
                    className="switch ml-5"
                    data-isOn={this.state.userFriendly}
                    onClick={() => this.setState({ userFriendly: true })}
                    style={{ float: "right" }}
                  >
                    <motion.div className="handle" layout transition={spring} />
                  </div>
                  <h1 class="ml-auto mr-5" style={{ color: "white" }}>
                    User friendly
                  </h1>
                </Row>
              </CardHeader>
              <CardBody className="px-lg-5 ">
                <Form role="form">
                  <Row className="mb-3">
                    <Col sm={6}>
                      <FormGroup className="mb-3">
                        <Select
                          options={options}
                          placeholder={<div>Type to search</div>}
                          components={{
                            Option: IconOption,
                            SingleValue: IconValue,
                          }}
                          onChange={(e) => colleteralSetter(e)}
                          styles={customStyles}
                          className="align-right"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={6}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-money-coins" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Amount"
                            type="text"
                            onChange={(e) => colleteralAmountSetter(e)}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={6}>
                      <FormGroup className="mb-3">
                        <Select
                          options={options}
                          placeholder={<div>Type to search</div>}
                          components={{
                            Option: IconOption,
                            SingleValue: IconValue,
                          }}
                          onChange={(e) => counterAssetSetter(e)}
                          styles={customStyles}
                          className="align-right"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={6}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-money-coins" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Amount"
                            type="text"
                            onChange={(e) => counterAmountSetter(e)}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col sm={6}>
                      <FormGroup className="mb-3">
                        <Select
                          options={options}
                          placeholder={<div>Type to search</div>}
                          components={{
                            Option: IconOption,
                            SingleValue: IconValue,
                          }}
                          onChange={(e) => premiumAssetSetter(e)}
                          styles={customStyles}
                          className="align-right"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={6}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-money-coins" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Amount"
                            type="text"
                            onChange={(e) => premiumAmountSetter(e)}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3}>Offer ends in:</Col>
                    <Col sm={3}>
                      <FormGroup>
                        <div style={{ width: "13vh" }}>
                          <Select
                            options={typeOptions}
                            id="offerEndType"
                            className="align-right"
                            onChange={(options) =>
                              this.handleChangeOfferEndType(options)
                            }
                            defaultValue={{ label: "Day", value: 0 }}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <div style={{ width: "13vh" }}>
                          <Select
                            className="align-right"
                            options={numOptions}
                            id="offerEndNumber"
                            onChange={(e) => this.handleChangeOfferEndNumber(e)}
                            defaultValue={{ label: "1", value: 1 }}
                          />
                        </div>
                      </FormGroup>
                    </Col>

                    <Col sm={3}>
                      <FormGroup>
                        <div className="custom-control custom-checkbox my-auto">
                          <input
                            className="custom-control-input float-right"
                            id="customCheck1"
                            type="checkbox"
                          />

                          <label
                            style={{ color: "white" }}
                            className="custom-control-label"
                            htmlFor="customCheck1"
                          >
                            Auto Excercise
                          </label>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3}>Option expires in:</Col>
                    <Col sm={3}>
                      <FormGroup>
                        <div style={{ width: "13vh" }}>
                          <Select
                            options={typeOptions}
                            id="optionExpiryType"
                            onChange={(e) => this.handleChangeOptionEndType(e)}
                            className="align-right"
                            defaultValue={{ label: "Day", value: 0 }}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <div style={{ width: "13vh" }}>
                          <Select
                            className="align-right"
                            options={numOptions}
                            id="optionExpiryNumber"
                            onChange={(e) =>
                              this.handleChangeOptionExpiryNumber(e)
                            }
                            defaultValue={{ label: "1", value: 1 }}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>

                  <div className="text-center">
                    <Button
                      style={{
                        background: "#6a04c9",
                        color: "white",
                        border: "none",
                      }}
                      type="button"
                      onClick={() => this.offerfriendly()}
                    >
                      Create
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </motion.div>
        );
      }
    }
  }
}

export default CreateOption;
