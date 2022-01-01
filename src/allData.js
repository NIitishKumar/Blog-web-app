import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function AllData() {
  const [allBlogs, setallBlogs] = useState([]);
  const [users, setusers] = useState([]);
  const [showUser, setshowUser] = useState(false);

  const history = useHistory();

  const logOutClick = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  useEffect(() => {
    axios.get("https://back-end-blogapp.herokuapp.com/allusers").then((res) => {
      setusers(res.data);
    });

    axios.get("https://back-end-blogapp.herokuapp.com/allBlogs").then((res) => {
      setallBlogs(res.data);
    });
  }, []);

  const getAllBlogs = () => {
    axios.get("https://back-end-blogapp.herokuapp.com/allBlogs").then((res) => {
      setallBlogs(res.data);
    });
  };

  const userClick = () => {
    setshowUser(true);
  };
  const blogClick = () => {
    setshowUser(false);
  };

  const deleteBlog = async (id) => {
    if (id) {
      await axios
        .post("https://back-end-blogapp.herokuapp.com/removeBlog", { id: id })
        .then((res) => {
          if (res.data.status === 1) {
            getAllBlogs();
            alert("Blog deleted !");
          }
        });
    }
  };

  const deleteUser = async (id) => {
    if (id) {
      await axios
        .post("https://back-end-blogapp.herokuapp.com/removeUser", { id: id })
        .then((res) => {
          if (res.data.status === 1) {
            getAllBlogs();
            alert("User deleted !");
          }
        });
    }
  };

  return (
    <div>
      <div class="container mt-5">
        <button
          className="btn btn-info mb-3 float-right mr-2"
          style={{ "margin-botttom": "10px" }}
          onClick={blogClick}
        >
          {" "}
          All Blogs
        </button>{" "}
        <span> </span>
        <button
          className="btn btn-info mb-3 float-right mr-2"
          style={{ "margin-botttom": "10px" }}
          onClick={userClick}
        >
          {" "}
          All Users
        </button>
        <span> </span>
        <button
          className="btn btn-info mb-3 float-right mr-2"
          style={{ "margin-botttom": "10px" }}
          onClick={logOutClick}
        >
          {" "}
          Log Out
        </button>
        <div class="col justify-content-md-center">
          {showUser ? (
            ""
          ) : (
            <div class="col col-lg-10">
              <span>
                <h1>
                  <strong>
                    <i>All Blogs</i>
                  </strong>
                </h1>
                {allBlogs.length > 0
                  ? allBlogs.map((res) => {
                      return (
                        <>
                          <br />
                          <div class="card">
                            <div class="card-header">
                              <strong>Title</strong> : {res.title}
                              <button
                                className="btn btn-secondary float-right"
                                onClick={() => deleteBlog(res._id)}
                              >
                                Delete Blog
                              </button>
                              {users
                                ? users.map((userData) => {
                                    if (userData._id === res.userID) {
                                      return (
                                        <span className="float-right mr-3 mt-2">
                                          <strong>
                                            {" "}
                                            <span> </span> Writer
                                          </strong>{" "}
                                          : {userData.name}
                                        </span>
                                      );
                                    }
                                  })
                                : ""}
                            </div>
                            <div class="card-body">
                              <blockquote class="blockquote mb-0">
                                <p>
                                  <strong>Description</strong> :{" "}
                                  {res.description}
                                </p>
                              </blockquote>
                            </div>
                          </div>
                        </>
                      );
                    })
                  : ""}
              </span>
            </div>
          )}
        </div>
      </div>
      <div class="container mt-5">
        {showUser ? (
          <div class="col justify-content-md-center">
            <div class="col col-lg-8">
              <span>
                <h1>
                  <strong>
                    <i>All Users</i>
                  </strong>
                </h1>
                {users.length > 0
                  ? users.map((res) => {
                      return (
                        <>
                          <br />
                          <div class="card">
                            <div class="card-header">
                              <strong>Name : </strong>
                              {res.name}
                              <button
                                className="btn btn-secondary float-right"
                                onClick={() => deleteUser(res._id)}
                              >
                                Delete User
                              </button>
                            </div>
                            <div class="card-body">
                              <blockquote class="blockquote mb-0">
                                <p>
                                  <strong>Email : </strong>
                                  {res.email}
                                </p>
                                {/* <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> */}
                              </blockquote>
                            </div>
                          </div>
                        </>
                      );
                    })
                  : ""}
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AllData;
