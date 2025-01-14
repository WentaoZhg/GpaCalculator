import {signInWithEmailAndPassword} from "firebase/auth";
import React, {useState} from "react";
import {auth} from "../../firebase";
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                alert("Please check your email and password and try again");
            });
    };

    return (
        <div className="loginPage">
            <form onSubmit={signIn}>
               

              <div class="row" 
                style={{
                    margin: '100px 2px 2px 2px',
                }}> 
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input type="email" class="form-control" placeholder="Enter your email" value={email}
                                aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setEmail(e.target.value)}>
                         </input>
                    </div>
                </div>
                <div class="col-sm-4"></div>
              </div>

              <div class="row" 
                style={{
                    margin: '1px 2px 2px 2px',
                }}> 
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input type="password" class="form-control" placeholder="Enter your password" value={password}
                                aria-label="Password" aria-describedby="Password" onChange={(e) => setPassword(e.target.value)}>
                         </input>
                    </div>
                </div>
                <div class="col-sm-4"></div>
              </div>

              <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                    &nbsp;&nbsp;&nbsp;
                    <button class="btn btn-success btn-lg mr-1" style={{float: "right", marginleft: "3px"}} 
                        type="submit">
                     Log In 
                    </button>
                </div>
                <div class="col-sm-4"></div>
              </div>
              <div 
                style={{
                    margin: '30px 2px 2px 2px',
                }}
               >
                <h6>If you have not registered, please click <a href="/signup"> here.</a></h6>
            </div>
            </form>
        </div>
    );
};

export default SignIn;