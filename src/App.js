import "./App.css";
import axios from "axios";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserDataFunc } from "./action/index";

function App() {
  const [userData, setuserData] = useState({});
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [userId, setuserId] = useState("");

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     history.push("/");
  //     window.location.reload();
  //   }
  // }, []);

  // if (token) {
  //   axios.post("https://back-end-blogapp.herokuapp.com/token_login", { token }).then((res) => {
  //     if (res.data.email) {
  //     }
  //   });
  // }

  const dispatch = useDispatch();
  let state = useSelector((state) => state.handleChange);

  const handleSubmit = (e) => {
    // e.preventDefault();
    axios
      .post("https://back-end-blogapp.herokuapp.com/login", userData)
      .then((res) => {
        // console.log("dsfffffff", res, e);
        if (userData["email"] && userData["password"]) {
          if (res.data.status == 1) {
            dispatch(getUserDataFunc({ ...userData, id: res.data.userId }));
            setuserId(res.data.userId);
            const token = window.localStorage.setItem("token", res.data.token);
            setTimeout(() => {
              history.push(`/userBlog`);
              // window.location.reload();
            }, 1000);
          } else {
            alert("Not Registered !");
          }
        } else {
          alert("Please enter enter all field !");
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
    <div className="" style={{ margin: "50px" }}>
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col col-lg-6">
            <br />
            <h1>Signin to Continue</h1>
            <br />
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
            <button
              type="submit"
              className="btn btn-secondary  "
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
            <a href="/register">
              <button type="submit" className="btn btn-info float-right ">
                Register
              </button>
            </a>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
