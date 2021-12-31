import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function HomePage() {
  const history = useHistory();
  const [createEnable, setcreateEnable] = useState(false);
  const [blogData, setblogData] = useState();
  const [showBlog, setshowBlog] = useState(false);
  const [allBlogs, setallBlogs] = useState([]);
  const [isBlog, setisBlog] = useState(false);
  const [user, setuser] = useState({});

  // const { id } = useParams();

  let state = useSelector((state) => state.handleChange);

  // useEffect(() => {
  //   if (state.payload) {
  //     setuser(state.payload);
  //   } else {
  //     history.push("/");
  //   }
  // }, []);

  useEffect(async () => {
    await axios
      .get("https://back-end-blogapp.herokuapp.com/allBlogs")
      .then((res) => {
        res.data.map((data) => {
          if (data.userID == state.payload.id) {
            allBlogs.push(res);
            setisBlog(true);
          }
        });
        setallBlogs(res);
        setshowBlog(true);
      });
  }, []);

  const logOutClick = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  const handleChange = (e) => {
    setblogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleCreateBlog = () => {
    setcreateEnable(true);
    setshowBlog(false);
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    setblogData({
      ...blogData,
      ["token"]: window.localStorage.getItem("token"),
      userID: user.id,
    });
    if (blogData.userID) {
      await axios
        .post("https://back-end-blogapp.herokuapp.com/saveBlog", blogData)
        .then((res) => {
          if (res.data.status === 1) {
            setcreateEnable(false);
            handleAllBlogs();
            console.log("Blog Submitted");
          }
        });
    }
  };

  const handleAllBlogs = async () => {
    let allBlogs = [];

    await axios
      .get("https://back-end-blogapp.herokuapp.com/allBlogs")
      .then((res) => {
        res.data.map((data) => {
          if (data.userId === user.id) {
            allBlogs.push(res);
          }
        });
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
            {createEnable ? (
              <>
                <h1 className="mt-3 mb-2 fs-1 fw-bold">Create Blog</h1>
                <form className="writeForm">
                  <div class="form-group fw-bold">
                    <label for="exampleFormControlTextarea2">
                      <strong>Title</strong>
                    </label>
                    <textarea
                      class="form-control rounded-0"
                      id="exampleFormControlTextarea2"
                      rows="3"
                      name="title"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div class="form-group fw-bold">
                    <label for="exampleFormControlTextarea1">
                      <strong>Description</strong>
                    </label>
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
              </>
            ) : (
              ""
            )}
            <br />
            {showBlog ? (
              <span>
                {allBlogs.data.length > 0 ? (
                  <>
                    <div>
                      <h1 className="fw-bold">
                        {isBlog ? "All Blogs" : "Oops, No Blog, Create now !"}
                      </h1>
                      {allBlogs.data.map((res) => {
                        if (user.id === res.userID) {
                          return (
                            <>
                              <br />
                              <div class="card">
                                <div class="card-header">
                                  Title : {res.title}
                                  <a className="float-right text-decoration-none capitalize">
                                    {user ? user.email : ""}
                                  </a>
                                </div>
                                <div class="card-body">
                                  <blockquote class="blockquote mb-0">
                                    <p>Description : {res.description}</p>
                                  </blockquote>
                                </div>
                              </div>
                            </>
                          );
                        }
                      })}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      <div class="d-flex justify-content-center d-flex align-items-center"></div>
    </>
  );
}

export default HomePage;
