import "./App.css";
import axios from "axios";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [userData, setuserData] = useState({});
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [userId, setuserId] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
      window.location.reload();
    }
  }, []);

  // if (token) {
  //   axios.post("http://localhost:5000/token_login", { token }).then((res) => {
  //     if (res.data.email) {
  //     }
  //   });
  // }

  const handleSubmit = (e) => {
    // e.preventDefault();
    axios.post("http://localhost:5000/login", userData).then((res) => {
      console.log("dsfffffff", res, e);
      if (res.data.status == 1) {
        console.log(res.data);
        setuserId(res.data.userId);
        const token = window.localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          history.push(`/:${res.data.userId}`);
          window.location.reload();
        }, 1000);
      } else {
        alert("Email Not Registered !");
      }
    });
  };

  const handleChange = (e) => {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="form-group">
          <label for="inputEmail">Email address</label>
          <input
            type="email"
            id="inputEmail"
            aria-describedby="emailHelp"
            name="email"
            onChange={handleChange}
            class="form-control"
            placeholder="Enter Email"
          ></input>
        </div>
        <br />
        <div className="form-group">
          <label for="inputPassword">Enter Password</label>
          <input
            className="form-control"
            type="password"
            id="inputPassword"
            name="password"
            onChange={handleChange}
            placeholder="Enter Password"
          ></input>
        </div>
        <br />
        <button type="submit" className="btn btn-primary  ">
          Submit
        </button>
      </form>
      <br />
      <a href="/register">
        <button type="submit" className="btn btn-primary  ">
          Register
        </button>
      </a>
    </div>
  );
}

export default App;
