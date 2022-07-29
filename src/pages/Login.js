import React, { useState } from 'react'
import { Dropdown, DropdownButton } from "react-bootstrap"
import {userSignup, userSignin} from "../api/auth";


function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const [userType, setUserType] = useState("CUSTOMER");
    const [userSignupData, setUserSignupData] = useState({});
    const [message, setMessage] = useState("")

    const toggleSignup = () => {
        setShowSignup(!showSignup)
    }

    const handleSelect = (e) => {
        setUserType(e)
    }

    const updateSignupData = (e) => {
        userSignupData[e.target.id] = e.target.value;
        console.log(userSignupData);
    }

    const signupFn = (e) => {
        const username = userSignupData.username;
        const userId = userSignupData.userId;
        const email = userSignupData.email;
        const password = userSignupData.password;

        const data = {
            name: username,
            userId: userId,
            email: email,
            userType: userType,
            password: password
        }
        console.log("DATA", data);
        
        e.preventDefault();

        userSignup(data).then(function(response){
            if(response.status===201) {
                window.location.href = "/"
            }
        })
        .catch(function(error){
            if(error.response.state===400) {
                setMessage(error.response.data.message)
            } else {
                console.log(error);
            }
        })
    }



    const loginFn = (e) => {
        const userId = document.getElementById("userId").value;
        const Password = document.getElementById("password").value;

        const data = {
            userId: userId,
            password: Password
        }

        userSignin(data).then(function(response){
            if(response.status===200){
                // userId, email, userType, userStatus, token
                localStorage.setItem("name", response.data.name);
            }
            if(response.data.userType==="CUSTOMER"){
                window.location.href = "/customer"
            }
        }).catch(function(error){
            if(error.response.state===400) {
                setMessage(error.response.data.message)
            } else {
                console.log(error);
            }
        })

    }



    return (
        <div className='bg-primary d-flex justify-content-center align-items-center vh-100'>
            <div className="card m-5 p-5">
                <div className="row">
                    <div className="col">

                        {
                            !showSignup ? (
                                <div className="login">
                                    <form onSubmit={loginFn}>
                                        <div className="input-group m-1">
                                            <input type="text" className='form-control' placeholder='User ID' id='userId' />
                                        </div>
                                        <div className="input-group m-1">
                                            <input type="password" className='form-control' placeholder='Password' id='password' />
                                        </div>
                                        <div className="input-group m-1">
                                            <input type="submit" className='form-control btn btn-primary' value="LogIn" />
                                        </div>
                                        <div className="text-info text-center" onClick={toggleSignup}>Don't have an account ? SignUP
                                        </div>
                                    </form>
                                </div>

                            ) : (
                                <div className="signup">
                                    <form onSubmit={signupFn}>
                                        <div className="input-group m-1">
                                            <input type="text" className='form-control' placeholder='User ID' id='userId' onChange={updateSignupData} />
                                        </div>
                                        <div className="input-group m-1">
                                            <input type="text" className='form-control' placeholder='User Name' id='username' onChange={updateSignupData} />
                                        </div>
                                        {/* div not working for email, so applied without <div> */}
                                        <input type="email" className='form-control m-1' placeholder='Email' id='email' onChange={updateSignupData} />

                                        <div className="input-group m-1">
                                            <input type="password" className='form-control' placeholder='Password' id='password' onChange={updateSignupData} />
                                        </div>

                                        {/* dropdown button  */}
                                        <div className="input-group m-1">
                                            <span className='text-muted'>Uset Type</span>
                                            <DropdownButton
                                                align="end"
                                                title={userType}
                                                variant="light"
                                                className='mx-1'
                                                onSelect={handleSelect} >
                                                <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                                <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                                            </DropdownButton>
                                        </div>

                                        <div className="input-group m-1">
                                            <input type="submit" className='form-control btn btn-primary' value="SignUp" />
                                        </div>
                                        <div className="text-info text-center" onClick={toggleSignup}>Already have an account ? LogIn
                                        </div>
                                        <div className="text-danger">{message}</div>
                                    </form>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login;
