import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Pagination from "rc-pagination";
import Select from "react-select";
import axios from "axios";

function HomePage() {
  const history = useHistory();
  const [createEnable, setcreateEnable] = useState(false);
  const [blogData, setblogData] = useState();
  const [showBlog, setshowBlog] = useState(false);
  const [allBlogs, setallBlogs] = useState([]);
  const [isUser, setisUser] = useState(false)

  const { id } = useParams();

  const logOutClick = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      history.push("/login");
      window.location.reload();
    }, 1000);
  };

  const handleChange = (e) => {
    setblogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleCreateBlog = () => {
    setcreateEnable(true);
    setshowBlog(false);
  };

  const submitBlog = (e) => {
    e.preventDefault();
    setblogData({
      ...blogData,
      ["token"]: window.localStorage.getItem("token"),
    });
    setblogData({ ...blogData, userID: id.slice(1, id.length) });
    console.log(blogData);
    if (blogData.userID) {
      axios.post("https://back-end-blogapp.herokuapp.com/saveBlog", blogData).then((res) => {
        console.log(res);
        if (res.data.status === 1) {
          setcreateEnable(false);
          handleAllBlogs();
        }
      });
    }
  };

  useEffect(() => {
    let userid;
    if (id) {
      userid = id.slice(1, id.length);
    }

    axios.get("https://back-end-blogapp.herokuapp.com/allBlogs").then((res) => {
      res.data.map((data) => {
        console.log(data.userID, userid);
        if (data.userId === userid) {
          allBlogs.push(res);
        }
      });
      // console.log(res.data);

      setallBlogs(res);
      setshowBlog(true);
      if (res.data) {
        res.data.map(res => {
          if (res.userID === userid) {
            setisUser(true)
          }
        })
      }
      console.log(res,userid);
    });
  }, []);

  const handleAllBlogs = () => {
    let allBlogs = [];
    let userid;
    if (id) {
      userid = id.slice(1, id.length);
    }

    axios.get("https://back-end-blogapp.herokuapp.com/allBlogs").then((res) => {
      res.data.map((data) => {
        console.log(data.userID, userid);
        if (data.userId === userid) {
          allBlogs.push(res);
        }
      });
      // console.log(res.data);

      setallBlogs(res);
      setshowBlog(true);
    });
    setcreateEnable(false);
  };

  return (
    <>
      <div class="container" style={{ width: "20%" }}>
        <div class="row">
          <div class="col-sm"></div>
        </div>
      </div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div className="write">
            <button className="btn btn-success" onClick={handleAllBlogs}>
              All Blog
            </button>
            <span> </span>
            <button className="btn btn-dark" onClick={handleCreateBlog}>
              Create Blog
            </button>
            <span> </span>

            <button
              className="btn btn-primary float-right ml-3 "
              onClick={logOutClick}
            >
              {" "}
              Log Out
            </button>
            <br />
            {/* <img
              className="writeImg"
              src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            /> */}
            {createEnable ? (
              <form className="writeForm">
                <div class="form-group">
                  <label for="exampleFormControlTextarea2">Title</label>
                  <textarea
                    class="form-control rounded-0"
                    id="exampleFormControlTextarea2"
                    rows="3"
                    name="title"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Description</label>
                  <textarea
                    class="form-control rounded-0"
                    id="exampleFormControlTextarea1"
                    rows="10"
                    name="description"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={submitBlog}
                >
                  Submit
                </button>
              </form>
            ) : (
              ""
            )}
            <br />
            {showBlog ? (
              <span>
                {console.log(allBlogs.data)}
                {allBlogs.data.length > 0
                  ? allBlogs.data.map((res) => {
                      console.log(res.userID, id);
                      if (res.userID === id.slice(1, id.length)) {
                        return (
                          <>
                            <br />
                            <div class="card">
                              <div class="card-header">Title : {res.title}</div>
                              <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                  <p>Description : {res.description}</p>
                                  {/* <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> */}
                                </blockquote>
                              </div>
                            </div>
                          </>
                        );
                      }
                    })
                  : <><p>No Blogs, Create now</p></>}
              </span>
            ) : (
              ""
            )}
            {/* {isUser && showBlog ?'': <h3>No Blogs, Create now</h3>} */}
          </div>
        </div>
      </section>
      <div class="d-flex justify-content-center d-flex align-items-center"></div>
    </>
  );
}

export default HomePage;
