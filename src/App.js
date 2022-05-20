import logo from "../src/assets/img/fifa-logo.svg";
import "./App.css";

import { Route, Redirect } from "react-router-dom";
import Admin from "./Views/Admin";
import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("localStorage");
ReactSession.set("userAddress", "Not logged in");

function App() {
  return (
    <>
    <Route path="/admin" render={(props) => <Admin {...props} />} />
    <Redirect from="/" to="/admin/createoption" /></>
  );
}

export default App;
