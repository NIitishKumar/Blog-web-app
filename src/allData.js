import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';

function AllData() {

    const [allBlogs, setallBlogs] = useState([])
    const [users, setusers] = useState([])
    const [showUser, setshowUser] = useState(false)

    const loginClick = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }

    useEffect(() => {
        
        axios.get('https://back-end-blogapp.herokuapp.com/allusers').then(res => {
            setusers(res.data)
            console.log(res.data);
        })

        axios.get("https://back-end-blogapp.herokuapp.com/allBlogs").then((res) => {
          
          console.log(res.data);
    
          setallBlogs(res.data);
        });
    }, []);
    
    const userClick = () => {
        setshowUser(true)
    }
    const blogClick = () => {
        setshowUser(false)
    }

    return (
        <div>
        <div class="container mt-5">
        <button className='btn btn-info mb-3 float-right mr-2' style={{'margin-botttom' : '10px'}} onClick={blogClick} >  All Blogs</button> {' '}<span> </span>
        <button className='btn btn-info mb-3 float-right mr-2' style={{'margin-botttom' : '10px'}} onClick={userClick} >  All Users</button><span> </span>
        <button className='btn btn-info mb-3 float-right mr-2' style={{'margin-botttom' : '10px'}} onClick={loginClick} >  Log Out</button>
        <div class="row justify-content-md-center" >
                    {
                        showUser
                            ? 
                            ''
                            :
          <div class="col col-lg-10">
            <span>
                <h1>
                  <strong><i>All Blogs</i></strong>
                </h1>
                {allBlogs.length > 0
                  ? allBlogs.map((res) => {
                        return (
                          <>
                            <br />
                            <div class="card">
                              <div class="card-header">Title : {res.title}
                                    {
                                        users ? users.map(userData => {
                                                if (userData._id === res.userID) {
                                                    return <span className='float-right' >Name : {userData.name}</span>
                                                }
                                        }) : ''
                                        }
                                </div>
                              <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                  <p>Description : {res.description}</p>
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
            }
        </div>
            </div>
            <div class="container mt-5">
                {
                    showUser ?
                        <div class="row justify-content-md-center" >
                            <div class="col col-lg-4">
                                <span>
                                    <h1>
                                        <strong><i>All Users</i></strong>
                                    </h1>
                                    {users.length > 0
                                        ? users.map((res) => {
                                            return (
                                                <>
                                                    <br />
                                                    <div class="card">
                                                        <div class="card-header"><strong>Name : </strong>{res.name}</div>
                                                        <div class="card-body">
                                                            <blockquote class="blockquote mb-0">
                                                                <p><strong>Email : </strong>{res.email}</p>
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
                        </div> : ''}
        </div>
        </div>
    )
}

export default AllData
