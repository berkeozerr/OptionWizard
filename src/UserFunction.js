import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export const register = (newUser) => {
  return axios
    .post("http://127.0.0.1:5000/auth/register", {
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      password: newUser.password,
      username: newUser.username,
      teamname: newUser.teamname,
      password_confirm: newUser.password_confirm,
    })
    .then((response) => {
      console.log("Registered");
    });
};

export const login = (user) => {
  return axios
    .post("http://127.0.0.1:5000/auth/login", {
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("Access_Token", res.data.Access_Token);
      var accessTokenObj = localStorage.getItem("Access_Token");
      console.log(accessTokenObj);
      console.log(res.data.Message);
      return res.data;
    });
};

export const LogOut = () => {
  const history = useHistory();
  var accessTokenObj = localStorage.getItem("Access_Token");
  const url = "http://127.0.0.1:5000/auth/logout";
  const config = {
    headers: { Authorization: `Bearer ${accessTokenObj}` },
  };
  console.log(config);

  axios
    .delete(url, config)
    .then((response) => {
      console.log(response);
      console.log("Status Changed");

      history.push("/auth/login");
      window.location.reload(false);
    })
    .catch((err) => {
      console.log(err.response);
    });
};
