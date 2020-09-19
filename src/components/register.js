import React from 'react';
import axios from 'axios'



import { withRouter } from "react-router-dom";
import {  Host } from  './route.js';



export class Register extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state=
        {
            username:'',
            password:'',
            email:'',
            firstname:'',
            lastname:'',
            placeholder_user:'',
            placeholder_email:'',
            checkboxstatus:''
        }
        console.log("this.props",this.props)
        this.sendsignupData = this.sendsignupData.bind(this)
        this.textValidate = this.textValidate.bind(this)
        this.loginfunction = this.loginfunction.bind(this)
    }

    sendsignupData(e)
    {
        e.preventDefault()
        if(document.getElementById('username').value===""||document.getElementById('password').value===""||document.getElementById('email').value==="")
        {
          window.alert("plise fill the require field")
          console.log("req")
          return 
        }
        if(document.getElementById('checkbox').checked){
          axios.post(`${Host}/validatedata`,this.state)
          .then(res=>
           {
            console.log("hello then console",res.data)
            if(res.data==='username already exists'){
            this.setState({placeholder_user:'username already exist'})
            return
          
            }
            if(res.data==="email already exists"){
                this.setState({placeholder_email:res.data})
                return
                }
            if(res.data){
                this.setState({checkboxstatus:"user register succesful"})
                console.log(res.data,"registerrrr....")
                localStorage.setItem('data',res.data._id)
              this.props.history.push("/home")
              }    
           })
        .catch(error=>
            {
                console.log(error)
            })
       }
     else{
          this.setState({checkboxstatus:"please agree the terms or condition!"})
     }  
}
    textValidate(e)
    {
       if(e.target.name==="username"){this.setState({username:e.target.value})}
       if(e.target.name==="password"){this.setState({password:e.target.value})}
       if(e.target.name==="email"){this.setState({email:e.target.value})}
       if(e.target.name==="firstname"){this.setState({firstname:e.target.value})}
       if(e.target.name==="lastname"){this.setState({lastname:e.target.value})}

    }
    loginfunction(e)
    {
      e.preventDefault()
      this.props.history.push("/login")
    }

    componentDidMount()
    {
      if(localStorage.getItem('data')!=null)
      {
        localStorage.removeItem('data')
      }
      console.log(this.props,"props")
    } 
    render()
    {
    return(
      <div>
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Create An Account</h1>
                <ul>
                  <li><span>Username</span><input type="text" style={{color:"blue"}} placeholder="username" name='username'id="username" onChange={this.textValidate}/></li>
                  <label style={{color:"red"}}>{this.state.placeholder_user}</label>
                  <li><span>Password</span><input type="text"style={{color:"blue"}} placeholder="Enter your password" name='password' id="password" onChange={this.textValidate}/></li>
                  <li><span >Email</span><input type="text" style={{color:"blue"}} placeholder = 'email' name='email'id="email" onChange={this.textValidate}/></li>
                  <label style={{color:"red"}}>{this.state.placeholder_email}</label>
                  <li ><span>First Name</span><input type="text" style={{color:"blue"}}placeholder="Enter your first name" name='firstname' onChange={this.textValidate}/></li>
                  <li ><span>Last Name</span><input type="text" style={{color:"blue"}}placeholder="*optional" name='lastname' onChange={this.textValidate}/></li>
                  <li><input type="checkbox" id="checkbox" name="checkbox"/>I agree to Term &amp; Conditions</li>
                  <li><input type="submit" defaultValue="Register" onClick={this.sendsignupData}/></li>
                </ul>
                <h6 style={{color:'red'}}>{this.state.checkboxstatus}</h6>
                <div className="addtnal_acnt">I already have an account.<a  onClick={this.loginfunction}href>Login My Account !</a></div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
              <img src="images/img_9.png" alt="" /> </div>
          </div>
        </div>
        <div className="clear" />
      </div>
)
    }
}
 

export default withRouter(Register);