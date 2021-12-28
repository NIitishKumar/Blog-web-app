import axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Register() {
  let history = useHistory();
  const [userData, setUserData] = useState({});
  const [userId, setuserId] = useState("");

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:5000/register", userData).then((res) => {
      if (res.data.status == 1) {
        const token = window.localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          history.push(`/:${res.data.userId}`);
          window.location.reload();
        }, 1000);
      } else {
        alert(res.data.message);
      }
    });
  };

  return (
    <div>
      <div className="form-group">
        <label for="fullName">Full Name</label>
        <input
          name="name"
          type="email"
          id="fullName"
          aria-describedby="emailHelp"
          class="form-control"
          onChange={handleChange}
          placeholder="Enter Full Name"
        ></input>
        <small id="emailHelp" class="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label for="inputEmail">Email address</label>
        <input
          name="email"
          type="email"
          id="inputEmail"
          aria-describedby="emailHelp"
          class="form-control"
          onChange={handleChange}
          placeholder="Enter Email"
        ></input>
        <small id="emailHelp" class="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label for="inputPassword">Enter Password</label>
        <input
          className="form-control"
          type="password"
          id="inputPassword"
          onChange={handleChange}
          name="password"
          placeholder="Enter Password"
        ></input>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
      <br />
      <a href="/">Already have account ?</a>
    </div>
  );
}

export default Register;
