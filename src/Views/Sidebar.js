/*eslint-disable*/
import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import pic from "../assets/img/wizard_hat.svg";
import { ethers } from "ethers";
import { ReactSession }  from 'react-client-session';
import {motion} from "framer-motion";
import Homepage from "./Homepage";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

const textMotion = {
  rest: {
    opacity: 0,
    y:-85,
    x:35,
    color: "grey",
    transition: {
      duration: 2,
      type: "tween",
      ease: "easeIn"
    }
  },
  hover: {
    color: "blue",
    y: -100,
    opacity:1,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut"
    }
  }
};
const textMotion2 = {
  rest: {
    opacity: 1,
    y:-30,
    color: "grey",
    transition: {
      duration: 2,
      type: "tween",
      ease: "easeIn"
    }
  },
  hover: {
    rotateZ:20,
    color: "blue",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut"
    }
  }
};
const textMotion4 = {
  rest: {
    opacity: 1,
    y:-30,
    color: "grey",
    transition: {
      duration: 2,
      type: "tween",
      ease: "easeIn"
    }
  },
  hover: {
    color: "blue",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut"
    }
  }
};
const textMotion3 = {
  rest: {
    opacity: 0,
    y:-25,
    x:8,
    pathLength: 0,
    color: "grey",
    transition: {
      duration: 2,
    }
  },
  hover: {
    pathLength:1,
    color: "blue",
    opacity:1,
    transition: {
      duration: 0.4,
    }
  }
};
var provider = new ethers.providers.Web3Provider(window.ethereum, "any");
// Prompt user for account connections
var signer;

class Sidebar extends React.Component {
  
  state = {
    collapseOpen: false,
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.state = {walletConnecting: new String(" Connect Wallet")};
  }
  
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false,
    });
  };

  handleLogout = () => () => {
    localStorage.remove("loggedIn");
    console.log("you have been logged out. boo!");
  };
  // creates the links that appear in the left menu / Sidebar
  createLinks = (routes) => {
    {
      this.handler(routes);
    }
    return routes.map((prop, key) => {
      if (prop.visible === true) {
        if(prop.name == "Create Option"){
          return (
            <NavItem key={key} >
              <NavLink
                to={prop.layout + prop.path}
                tag={NavLinkRRD}
                activeClassName="active"
              >
                <Col><div style={{ color: "#C0C0C0" }}>{prop.name}
                </div><Row className={"d-flex justify-content-center"} ><motion.svg width={50} height={60}>
                  <motion.path strokeWidth={1}
                  
                      fill="#fff"d={prop.iconData}>
  
                  </motion.path>
                  </motion.svg ></Row></Col>
                  <div ></div>
                <motion.svg variants = {textMotion}
                  initial="rest"
                  whileHover="hover" width={100} height ={100}  style={{position:"absolute"}}> 
                <motion.path initial={{x:28,y:37}}fill="#fff" d={prop.iconData2}></motion.path > 
                <motion.path initial={{x:18,y:36}} fill="#fff" d={prop.iconData3}></motion.path>
                <motion.path initial={{x:5,y:15}}fill="#fff" d={prop.iconData4}></motion.path></motion.svg>
                
              </NavLink>
            </NavItem>
          );
        }
        else if(prop.name == "List Options"){
          return (
            <NavItem key={key} >
              <NavLink
                to={prop.layout + prop.path}
                tag={NavLinkRRD}
                activeClassName="active"
              >
                <Col><div style={{ color: "#C0C0C0" }}>{prop.name}
                </div><Row className={"d-flex justify-content-center"} >
                <motion.svg variants = {textMotion2} initial="rest"
                  whileHover="hover" width={100} height={100} style={{position:"absolute"}}>
                  <motion.path initial={{x:25,y:35}}strokeWidth={1}
                  
                      fill="#fff"d={prop.iconData}>
  
                  </motion.path>
                  <motion.path initial={{x:25,y:35}} strokeWidth={1}
                  
                      fill="#fff"d={prop.iconData3}>
  
                  </motion.path>
                  <motion.path initial={{x:25,y:35}} strokeWidth={1}
                  
                      fill="#fff"d={prop.iconData4}>
  
                  </motion.path>
                  <motion.path initial={{x:25,y:35}} strokeWidth={1}
                  
                      fill="#fff"d={prop.iconData5}>
  
                  </motion.path>
                  </motion.svg >
                  </Row></Col>
                  <div ></div>
                
              </NavLink>
            </NavItem>
          );
        }
        else{
          return (
            <NavItem key={key} >
              <NavLink
                to={prop.layout + prop.path}
                tag={NavLinkRRD}
                activeClassName="active"
              >
                <Col><div style={{ color: "#C0C0C0" }}>{prop.name}
                </div><Row className={"d-flex justify-content-center"} >
                <motion.svg variants = {textMotion4} initial="rest"
                  whileHover="hover" width={100} height={100} style={{position:"absolute"}}>
                  <motion.path initial={{x:25,y:35}}strokeWidth={1}
                  
                      fill="#fff"d={prop.iconData}>
  
                  </motion.path>
                  <motion.path initial={{x:25,y:35}} strokeWidth={1}
                  
                      fill="#fff"d={prop.iconData2}>
  
                  </motion.path>
                  <motion.path initial={{x:25,y:35}} strokeWidth={1}
                  
                      fill="#fff"d={prop.iconData3}>
  
                  </motion.path>
                 
                  </motion.svg >
                  </Row></Col>
                  <div ></div>
                  <motion.svg variants = {textMotion3}
                  initial="rest"
                  whileHover="hover" width={100} height ={100}  style={{position:"absolute"}}> 
                <motion.path  initial={{x:24,y:32}} fill="#fff" d={prop.iconData4}></motion.path > 
                <motion.path initial={{x:24,y:32}} fill="#fff" d={prop.iconData5}></motion.path>
                <motion.path initial={{x:24,y:32}} fill="#fff" d={prop.iconData6}></motion.path>
                <motion.path initial={{x:24,y:32}} fill="#fff" d={prop.iconData7}></motion.path></motion.svg>
                
              </NavLink>
            </NavItem>
          );
        }
        
      }
    });
  };

  handleClick(item) {
    this.setState((prevState) => ({ [item]: !prevState[item] }));
  }
  // if the menu item doesn't have any child, this method simply returns a clickable menu item that redirects to any location and if there is no child this method uses recursion to go until the last level of children and then returns the item by the first condition.
  handler(children) {
    return children.map((subOption) => {
      if (subOption.name === "Leagues") {
        console.log(subOption);
        return (
          <div key={subOption.name}>
            <NavItem onClick={() => this.handleClick(subOption.name)}>
              <NavLink inset primary={subOption.name}>
                {console.log("BERKE")}
              </NavLink>
            </NavItem>

            <Collapse
              in={subOption.name}
              timeout="auto"
              unmountOnExit
            ></Collapse>
          </div>
        );
      }
    });
  }
  async login(){
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    ReactSession.set("userAddress", await signer.getAddress());
    this.setState({walletConnecting:" Connected"});
    
  }
  render() {
    
    const { bgColor, routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link,
        
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank",
      };
    }
    return (
      <div style={{ backgroundColor: "#3c0173" }}>

    
      <Navbar
        
        expand="sm"
        id="sidenav-main"
      >
          {/* Toggler */}

          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img style={{ width: 260, height: 60 }} alt="..." src={pic} />
            </NavbarBrand>
          ) : null}

          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            
            {/* Navigation */}
            <Nav navbar>{this.createLinks(routes)}</Nav>

            {/* Divider */}
            <hr className="my-3" />
            {/* Heading */}

            {/* Divider */}
            <hr className="my-3" />
            {/* Heading */}

            {/* Navigation */}
            <Button onClick={()=>{
              this.login();
            }}>
            <div style={{ color: "#8140fb" }}>
                    <i className="ni ni-single-02" />
                     {this.state.walletConnecting}
                  </div>
            </Button>
          </Collapse>
      </Navbar>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
