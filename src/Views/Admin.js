import React from "react";

import { Gradient } from 'react-gradient';
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import {useState,useEffect} from "react"
import Sidebar from "./Sidebar";
import background from "../assets/img/space-bg.jpeg"
import routes from "../Routes.js";
import { zIndex } from "material-ui/styles";

const gradients = [
  ['#00b5ff', '#b800ff'],
  ['#8300ff', '#e34a39'],
];
class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }
  componentDidMount() {
    
  }
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Option Wizard Opwiz";
  };
  render() {
    return (
      <>
      
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/homepage",
            imgSrc: require("../assets/img/brand/argon-react.png"),
            imgAlt: "...",
          }}
        />
        <div  style={{width: "100%" ,height: "100vh"}}>
        <Gradient
        style={{height:"100%", zIndex: -20}}
    gradients={ gradients } // required
    property="background"
    duration={ 3000 }
    angle="45deg"
><Switch>{this.getRoutes(routes)}</Switch></Gradient>
          
        
        </div>
      </>
    );
  }
}

export default Admin;
