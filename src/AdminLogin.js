import React from 'react';
import { useHistory } from "react-router";
import { useState } from 'react'
import axios from 'axios';

function AdminLogin() {

  const history = useHistory()
  const [showForm, setshowForm] = useState(false)
  const [email, setemail] = useState('')
  const [adminData, setadminData] = useState({})

  const loginClick = () => {
        history.push('/login')
  }

  const adminLoginClick = () => {
    setshowForm(true)
  }

  const handleChange = async (e) => {
    setadminData({ ...adminData, [e.target.name]: e.target.value })
  }

  const login = () => {
    axios.post('https://back-end-blogapp.herokuapp.com/adminLogin', adminData).then(res => {
      console.log(res);
      if (res.data.status === 1) {
        let token = res.data.token
        window.localStorage.setItem('token' ,token)
        history.push('/allData')
      } else {
        alert('Unauthrized Access !')
      }
      })
  }

    return (
      <div className='' style={{margin : '50px'}} >
        <div class="container">
            <div class="row justify-content-md-center" >
              <div class="col col-lg-6">
              <h1>Please Login to Continue</h1>
              <br/>
                <button className='btn btn-info mb-3' style={{'margin-botttom' : '10px'}} onClick={loginClick} > USER LOGIN </button> <span> </span>
                <button className='btn btn-info mb-3' style={{'margin-botttom' : '10px'}} onClick={adminLoginClick} > ADMIN LOGIN </button>
                <br/>
                <br />
                {showForm ?
                  <>
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
                          >
                                      
                          </input>
                        </div>
                    <button className='btn btn-secondary mt-3' style={{ 'margin-botttom': '10px' }} onClick={login} >  LOGIN </button>
                  </>
                  : ''}
              </div>
            </div>
          </div>
         </div>
    )
}

export default AdminLogin
