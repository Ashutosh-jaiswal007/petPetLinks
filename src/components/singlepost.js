import React from 'react'
import axios from 'axios'


import { Host } from  './route.js';


export class Singlepost extends  React.Component
{
constructor(props)
{
    super(props)
    this.state=
    {
        likes:0,
        comment_array:[],
        singlepost_array:[],
        istoggle:false,
        istogglecommentbox:false
    }
  

}

submitcomment(e,userid)
{
    e.preventDefault()
    var singlecomment = document.getElementById('commentbox').value
    if(singlecomment==="" || singlecomment===" " || singlecomment==="  ")
    {
      return 
    }
    axios.post(`${Host}/updatecomment`,{singlecomment:singlecomment,userid:userid})
    .then(res=>
        {
          console.log(res.data)
          this.setState({comment_array:[...this.state.comment_array,res.data]})
          document.getElementById('commentbox').value = ""
        })
    .catch(error=>
        {
          console.log(error)
        })

}

gototimeline(e)
{
  this.props.history.push('/home')
}

componentDidMount()
{
  console.log('hello single timeline')
  var _id = localStorage.getItem('data')
  if(_id===null)
      {
        this.props.history.push('/')
      }
    const {userid} = this.props.match.params
    console.log(this.userid,"hii new userid",typeof this.userid)
    var newuserid = userid.slice(1)
    axios.post(`${Host}/singlepost`,{newuserid:newuserid})
    .then(res=>
        {
            console.log(res.data)
            this.setState({singlepost_array:res.data})
            console.log(this.state.singlepost_array[0].date)

        })
        .catch(error=>
            {
                console.log(error)
            })
    axios.post(`${Host}/pagerefreash_likes`,{newuserid:newuserid})        
    .then(res=>
        {
            if(res.data===1)
            this.setState({likes:res.data})
        }) 
        axios.post(`${Host}/pagerefreash_comment`,{newuserid: newuserid})        
        .then(res=>
            {
                console.log(res.data)
                this.setState({comment_array:res.data})
                
            })              
}

like(e,onreactuserid)
{
    e.preventDefault()
     
    var currentloginuserid = localStorage.getItem('data')
    console.log(currentloginuserid,onreactuserid,"hello user")
    axios.post(`${Host}/like`,{currentloginuserid:currentloginuserid,onreactuserid:onreactuserid})
    .then(res=>
        {
            console.log(res.data)

                this.setState({singlepost_array:res.data},()=>{console.log(this.state.singlepost_array,"state like")})
        })
        .catch(error =>
            {
                console.log(error)
            })
}

comment(e)
{
     this.setState({istoggle:!this.state.istoggle})
     this.setState({istogglecommentbox:!this.state.istogglecommentbox})
}

logout(e)
{
  this.props.history.push('/login')
  localStorage.removeItem('data')
}  

render() 
{
    return (
      <div>
      
      <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="navbar-inner">
          <div className="container">
            <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
            <a className="brand" href>PPL</a>
            <div className="pro_info pull-right">
              <div className="pro_icn"><img src="images/pic_small.png" /></div>
              <div className="pro_txt">Me<b className="caret" /></div>
              <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                <li><a tabIndex={-1} href="#">My Profile</a></li>
                <li><a tabIndex={-1} href="#">Message Box</a></li>
                <li><a tabIndex={-1} href="#">Change Language</a></li>
                <li className="divider" />
                <li><a tabIndex={-1} href="#">
                    <input type="text" placeholder="search" />
                  </a></li>
              </ul>
            </div>
            <div className="nav-collapse collapse">
              <ul className="nav">
                <li className="active"> <a href>Home</a> </li>
                <li className> <a href>E-Coupons</a> </li>
                <li className> <a href>E-Brands</a> </li>
                <li className> <a href>Resuse Market</a> </li>
                <li className> <a href>Lost and Found</a> </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#">Upload Post</a> </div>
            <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#">Invite Friends</a> </div>
            <div className="rght_cate">
              <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
              <div className="rght_list">
                <ul>
                  <li><a href="#"><span className="list_icon"><img src="images/icon_01.png" alt="up" /></span> CATS</a></li>
                  <li><a href="#"><span className="list_icon"><img src="images/icon_02.png" alt="up" /></span> Dogs</a></li>
                  <li><a href="#"><span className="list_icon"><img src="images/icon_03.png" alt="up" /></span> Birds</a></li>
                  <li><a href="#"><span className="list_icon"><img src="images/icon_04.png" alt="up" /></span> Rabbit</a></li>
                  <li><a href="#"><span className="list_icon"><img src="images/icon_05.png" alt="up" /></span> Others</a></li>
                </ul>
              </div>
            </div>
            <div className="rght_cate">
              <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
              <div className="sub_dwn">
                <div className="feat_sec">
                  <div className="feat_sec_img"><img src="images/feat_img1.png" alt="image" /></div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                </div>
                <div className="feat_sec">
                  <div className="feat_sec_img"><img src="images/feat_img2.png" alt="image" /></div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Dogs</div>
                  </div>
                </div>
                <div className="feat_sec">
                  <div className="feat_sec_img"><img src="images/feat_img3.png" alt="image" /></div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Rabbits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.singlepost_array.map(user=>(<div className="content_lft">
            <div className="contnt_2">
              <div className="div_a">
                <div className="div_title">User Interface PSD Source files Web Designing for web</div>
                <div className="btm_rgt">
                  <div className="btm_arc">Cats</div>
                </div>
                <div className="div_top">
                  <div className="div_top_lft"><img src="images/img_6.png" />{user.fullname}</div>
                  <div className="div_top_rgt"><span className="span_date">{user.date}</span><span className="span_time">{user.time}</span></div>
                </div>
                <div className="div_image"><img src={"http://127.0.0.1:8000/uploads/"+user.imagepath} alt="pet" /></div>
                <div className="div_btm">
                  <div className="btm_list">
                    <ul>
                      <li><a href><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                      <li><a href><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                      <li  ><a href><span className="btn_icon" ><img src="images/icon_003.png" alt="share" onClick={e=>{this.like(e,user._id)}}/></span>{user.like.length+" "+"Likes"}</a></li>
                      <li onClick={e=>{this.comment(e)}}><a href><span className="btn_icon" ><img src="images/icon_004.png" alt="share" /></span>comments</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> 
            {this.state.istoggle && <div className="contnt_3">
               <ul>
                {this.state.comment_array.map(comments=>(<li>
                  <div>
                  <div className="list_image">
                    <div className="image_sec"><img src="images/post_img.png" /></div>
                    <div className="image_name">{user.fullname}</div>
                  </div>
                  <div className="list_info">
                    {comments}
                  </div>
                  <input type="button" defaultValue="Reply" className="black_btn" />
                  </div>
                </li>))}
                <li>
                  {this.state.istogglecommentbox && <div className="cmnt_div1">
                    <input type="text" defaultValue="" className="cmnt_bx1" id="commentbox"/>
                    <input type="submit" className="sub_bttn1" defaultValue="Submit Comment" onClick={e=>{this.submitcomment(e,user._id)}}/>
                  </div>}
                </li>
              </ul>
              <div className="view_div"><a href>View more</a></div>
            </div>}
          </div>))}
        </div>
        <div className="clear" />
      </div>
    </div>
        
          
    )}
 
}
 