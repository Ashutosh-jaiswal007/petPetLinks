import React, { useState, useCallback ,memo} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {useDispatch} from "react-redux";

import { Host } from "./route.js";
import { userlogin } from "../reduxcomponent/action.js";

export function Userlogin(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleOnChangeEmail = useCallback((e) => {
    const {
      target: { value },
    } = e;
    setEmail(value);
  }, []);

  const handleOnChangePassword = useCallback((e) => {
    const {
      target: { value },
    } = e;
    setPassword(value);
  }, []);

  return (
    <div className="container">
      <div className="content">
        <div className="content_rgt">
          <div className="login_sec">
            <h1>Log In</h1>
            <ul>
              <li>
                <span>Email-ID</span>
                <input
                  type="text"
                  style={{ color: "blue" }}
                  placeholder="Enter your email"
                  id="email"
                  onChange={handleOnChangeEmail}
                />
              </li>
              <li>
                <span>Password</span>
                <input
                  type="text"
                  style={{ color: "blue" }}
                  placeholder="Enter your password"
                  id="password"
                  onChange={handleOnChangePassword}
                />
              </li>
              <li>
                <input type="checkbox" id="checked" />
                <Rememberme email={email} password={password} />
              </li>
              <li>
                <Login email={email} password={password} />
              </li>
              <Forgot />
            </ul>
            <h6 style={{ color: "red" }}></h6>
            <div className="addtnal_acnt">
              <Toregisterpage />
            </div>
          </div>
        </div>
        <LoginTimeline />
      </div>
    </div>
    // <div className="clear" />
  );
}

const Login = (props) => {
  const [error, setError] = useState();
  const dispatch = useDispatch()

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(props.email);
    if (!props.email) {
      setError("enter email!");
      return;
    }

    if (!props.password) {
      setError("enter password!");
      return;
    }

    try {
      const response = await axios.post(`${Host}/login`, {
        email: props.email,
        password: props.password,
      });

      if (response.data.length) {
        dispatch(userlogin())
        localStorage.setItem("data", response?.data[0]?._id);
        localStorage.setItem('isToggle',true)
        history.push("/home");
      }
      if (!response.data.length) {
        setError("invalid user!");
      }
    } 
    catch (error) {
      console.log(error);
      setError("invalid user!");
    }
  };

  return (
    <>
      <div style={{ color: "red" }}>{error}</div>
      <input
        type="submit"
        value="Log In"
        onClick={(e) => {
          handleLogin(e);
        }}
      />
    </>
  );
};

const Forgot = () => {
  return (
    <>
      <a href>Forgot Password</a>
    </>
  );
};

const Rememberme = () => {
  return <>Remember me</>;
};

const Toregisterpage = (props) => {
  const history = useHistory();
  const toregisterpage = (e) => {
    console.log(props);
    e.preventDefault();
    history.push("/");
  };

  return (
    <>
      I do not have any account yet.
      <a
        href=""
        onClick={(e) => {
          toregisterpage(e);
        }}
      >
        Create My Account Now !
      </a>
    </>
  );
};

const LoginTimeline = memo(() => {
  return (
  <>
    <div className="content_lft">
      <h1>Welcome from PPL!</h1>
      <p className="discrptn">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don't look even slightly believable. If you are
        going to use a passage of Lorem Ipsum, you need to be sure there isn't
        anything embarrassing hidden in the middle of text.{" "}
      </p>
      <img src="images/img_9.png" alt="" />
    </div>
  </>
  )
  })
export default Userlogin;
