import logo from "../src/assets/img/fifa-logo.svg";
import "./App.css";

import { Route, Redirect } from "react-router-dom";
import Admin from "./Views/Admin";
function App() {
  
  return (
    <>
    <Route path="/admin" render={(props) => <Admin {...props} />} />
    <Redirect from="/" to="/admin/createoption" /></>
  );
}

export default App;
