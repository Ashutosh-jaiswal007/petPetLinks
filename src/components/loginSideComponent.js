import React from 'react'
import {Route,BrowserRouter as Router, useHistory} from 'react-router-dom'
import Userlogin from './hookslogin'
import { Register } from './register'

export const LoginSideComponent = ()=>
{
    console.log('in loginsidecomponent')
return (
    <>
    <div className="container">
      <div className="content">
        <div className="content_rgt">
    <Router>
        <Route exact path='/' component={Register}/>
        <Route exact path='/login' component={Userlogin}/>
        </Router>
        </div>
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
    </div>
    </div>
    </>
)
}
