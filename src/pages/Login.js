import React, { useState } from 'react'
import { Dropdown, DropdownButton } from "react-bootstrap"
import { userSignup, userSignin } from "../api/auth";
import {useNavigate} from "react-router-dom";


function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const [message, setMessage] = useState("")
    const [userType, setUserType] = useState("CUSTOMER");
    const [userSignupData, setUserSignupData] = useState({});
    

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
            userTypes: userType,
            password: password
        }
        console.log("DATA", data);

        e.preventDefault();

        userSignup(data).then(function (response) {
            if (response.status === 201) {
                history(0);
            }
            if (response === 204) {
                history(0)
            }
        })
            .catch(function (error) {
                if (error.response.state === 400) {
                    setMessage(error.response.data.message)
                } else {
                    console.log(error);
                }
            })
    }


    let history = useNavigate()

    



    const loginFn = (e) => {
        const userId = document.getElementById("userId").value;
        const Password = document.getElementById("password").value;

        const data = {
            userId: userId,
            password: Password
        }

        e.preventDefault();
        console.log(data);

        userSignin(data).then(function (response) {
            console.log(response);
            if (response.status === 200) {

                if (response.data.message) {
                    setMessage(response.data.message)
                } else {
                    localStorage.setItem("name", response.data.name);
                    localStorage.setItem("userId", response.data.userId);
                    localStorage.setItem("email", response.data.email);
                    localStorage.setItem("userTypes", response.data.userTypes);
                    localStorage.setItem("userStatus", response.data.userStatus);
                    localStorage.setItem("token", response.data.accessToken);

                    if (response.data.userTypes === "CUSTOMER") {
                        history("/customer")
                    } else if (response.data.userTypes === "ENGINEER") {
                        history("/engineer")
                    } else {
                        history("/admin")
                    }
                }

            }

        }).catch(function (error) {
            if (error.response.state === 400) {
                setMessage(error.response.data.message)
            } else {
                console.log(error);
                setMessage(error.response.data.message)
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
                                        <div className="text-danger">{message}</div>
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

