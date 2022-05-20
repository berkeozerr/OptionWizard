/*eslint-disable*/
import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import pic from "../assets/img/fifa-logo.svg";
import { ethers } from "ethers";
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

var ps;
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
    this.state = {walletConnecting: new String("Connect Wallet")};
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
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              activeClassName="active"
            >
              <div style={{ color: "#C0C0C0" }}>{prop.name}</div>
            </NavLink>
          </NavItem>
        );
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
    this.setState({walletConnecting:"Connected"});
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
      <div style={{ backgroundColor: "#25274c" }}>

    
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
            <div style={{ color: "#fb6340" }}>
                    <i className="ni ni-spaceship" />
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
