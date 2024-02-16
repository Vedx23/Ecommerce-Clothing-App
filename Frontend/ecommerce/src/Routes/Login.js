import "./Login.css";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {toast} from "react-toastify"

function Login() {

    let [icreds, setICreds] = useState({email : "", password : ""});
    const navigate = useNavigate();

    const signIn = () => {
        console.log("in signin")
        axios.post("http://127.0.0.1:7070/auth/signin", icreds)
             .then(res => {
                  console.log(res.data)
                  sessionStorage.setItem("userId", res.data.userId);
                  sessionStorage.setItem("jwt", res.data.jwt);
                  sessionStorage.setItem("isValidUser", "true");
                  sessionStorage.setItem("role", res.data.role);
                  sessionStorage.setItem("status", res.data.status);
                  if(res.data.role === "SELLER")
                  {
                    if(res.data.status === "PENDING") {
                      toast.error("Wait for Admin Approval");
                      sessionStorage.clear();
                      setICreds({email : "", password : ""});
                    }
                    else {
                      navigate("/seller/products")
                      toast.success("Logged In Successfully")
                    }
                  }
                  else if(res.data.role === "CUSTOMER") {
                    navigate("/")
                    toast.success("Logged In Successfully")
                  }
                  else navigate("/adminhome")
               
             }).catch(error => {
                if (error.response && error.response.status === 404) {
                  toast.error("Invalid credentials")
                  setICreds({email : "", password : ""})
                  sessionStorage.setItem("isValidUser", "false");
                } else {
                  toast.error("Invalid credentials");
                  setICreds({email : "", password : ""})
                  sessionStorage.setItem("isValidUser", "false");
                }
              });  
    }


    const onInputChange = (event) => {
        let copyOfICreds = { ...icreds }
        copyOfICreds[event.target.name] = event.target.value;
        setICreds(copyOfICreds);
    }


    return (
        <div className="center">
          <form className="form">
            <p className="title">Login</p>
            <div className="form-group">
              <label>Email</label>
              <input
                required
                name="email"
                value={icreds.email}
                onChange={onInputChange}
                type="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                required
                name="password"
                value={icreds.password}
                onChange={onInputChange}
                type="password"
                className="form-control"
              />
            </div>
            <button type="button" onClick={signIn} className="btn btn-primary">
              Submit
            </button>
            <p className="signup">
              Create an account? <a href="/registration" >Sign Up</a>
            </p>
          </form>
          <button className="btn btn-primary seller">
            <a className="text" onClick={() => navigate("/sellerRegistration")}>
              Become a Seller
            </a>
          </button>
        </div>
      );
}

export default Login;