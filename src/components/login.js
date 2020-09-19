import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Host } from "./route.js";
import { Footer } from "./footer.js";
import { Header } from "./header.js";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      responsebybackend: "",
    };
    this.validateuser = this.validateuser.bind(this);
    this.validateinput = this.validateinput.bind(this);
  }

  createaccountpage = (e) => {
    this.props.history.push("/");
  };

  validateuser(e) {
    e.preventDefault();
    if (document.getElementById("email").value === "") {
      this.setState({ responsebybackend: "please fill email id" });
      return;
    }

    if (document.getElementById("password").value === "") {
      this.setState({ responsebybackend: "please fill password" });
      return;
    }

    console.log("hello checked");
    axios
      .post(`${Host}/login`, this.state)
      .then((res) => {
        console.log(res.data, "byyy.......");
        if (res.data.length === 1) {
          this.setState({ responsebybackend: "Login sucessfull" });
          localStorage.setItem("data", res.data[0]._id);
          this.props.history.push("/timeline");
        }
        if (res.data.length === 0) {
          this.setState({ responsebybackend: "invalid user!" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  validateinput(e) {
    const {
      target: { id, value },
    } = e;

    if (id === "email") {
      this.setState({ email: value });
    }
    if (id === "password") {
      console.log(value, "password");
      this.setState({ password: value });
    }
  }

  render() {
    return (
      <div>
        <Header />
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
                      onChange={this.validateinput}
                    />
                  </li>
                  <li>
                    <span>Password</span>
                    <input
                      type="text"
                      style={{ color: "blue" }}
                      placeholder="Enter your password"
                      id="password"
                      onChange={this.validateinput}
                    />
                  </li>
                  <li>
                    <input type="checkbox" id="checked" />
                    Remember Me
                  </li>
                  <li>
                    <input
                      type="submit"
                      value="Log In"
                      onClick={this.validateuser}
                    />
                    <a href>Forgot Password</a>
                  </li>
                </ul>
                <h6 style={{ color: "red" }}>{this.state.responsebybackend}</h6>
                <div className="addtnal_acnt">
                  I do not have any account yet.
                  <a href="" onClick={this.createaccountpage}>
                    Create My Account Now !
                  </a>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text.{" "}
              </p>
              <img src="images/img_9.png" alt="" />
            </div>
          </div>
        </div>
        <div className="clear" />
        <Footer />
      </div>
    );
  }
}
export default withRouter(Login);
