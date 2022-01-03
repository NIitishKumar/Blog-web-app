import axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserDataFunc } from "./action/index";

function Register() {
  let history = useHistory();
  const [userData, setUserData] = useState({});

  const dispatch = useDispatch();
  let state = useSelector((state) => state.handleChange);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (userData["name"] && userData["email"] && userData["password"]) {
      axios
        .post("https://back-end-blogapp.herokuapp.com/register", userData)
        .then((res) => {
          if (res.data.status == 1) {
            const token = window.localStorage.setItem("token", res.data.token);
            dispatch(getUserDataFunc({ ...userData, id: res.data.userId }));
            setTimeout(() => {
              history.push(`/userBlog`);
            }, 1000);
          } else {
            alert(res.data.message);
          }
        });
    } else {
      alert("Please enter all field !");
    }
  };

  return (
    <div>
      <div className="" style={{ margin: "50px" }}>
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="col col-lg-6">
              <h1>Signup to Continue</h1>
              <br />
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
                <br />
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
                <br />
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
              <br />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <br />
              <a href="/">Already have account ?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
