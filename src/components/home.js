import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";
import {
  Link,
  Route,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";

import { Host } from "./route.js";
import { toggleTimelineDiv, toggleMyuploadDiv } from "../reduxcomponent/action";

export function HooksTimeline() {
  const [timelineArray, setTimelineArray] = useState([]);

  const history = useHistory();
  const id = localStorage.getItem("data");

  const ShowTimeline = async (e) => {
    const response = await axios.post(`${Host}/timeline`);
    try {
      setTimelineArray(response.data);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  const ShowProfile = async (e) => {
    const id = localStorage.getItem("data");
    const response = await axios.post(`${Host}/myuploads`, { id: id });
    try {
      setTimelineArray(response.data);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  const uploadSinglePost = async (e) => {
    e.preventDefault();
    e.persist();
    const {
      target: { files },
    } = e;

    var imgobj = new FormData();
    imgobj.append("imagename", "multer-image" + Date.now());
    imgobj.append("imagedata", files[0]);
    imgobj.append("_id", id);
    imgobj.append("imagepath", document.getElementById("file").value);

    const response = await axios.post(`${Host}/uploadphoto`, imgobj);
    try {
      console.log("in upload post function.........", timelineArray);
      setTimelineArray((timelineArray) => [...timelineArray, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getData() {
      console.log("hell useeffect");
      const response = await axios.post(`${Host}/timeline_refreash`);
      try {
        setTimelineArray(response.data);
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }
    }
    getData();
  }, []);

  return (
    <div>
      <meta charSet="utf-8" />
      <title>Home</title>
      <div className="container">
        <div>
          <div className="content">
            <RightSideContainer upload={uploadSinglePost} />
            <div className="content_lft">
              <div className="contnt_1">
                <div className="list_1">
                  <ul>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Friends
                    </li>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Flaged
                    </li>
                  </ul>
                </div>

                <HandelHomeDiv />
                <div className="timeline_div2">
                  <ul>
                    <li>
                      <Router>
                        <Link
                          to={{
                            pathname: "/home/timeline",
                            state: { onClick: "timeline" },
                          }}
                        >
                          <a>
                            <TimelineButton onClick={ShowTimeline} />
                          </a>
                        </Link>
                      </Router>
                    </li>
                    <li>
                      <Router>
                        <Link to="/home/about">
                          <a>About</a>
                        </Link>
                        <Route path="/home/about" component={About} />
                      </Router>
                    </li>
                    <li>
                      <Router>
                        <Link
                          to={{
                            pathname: "/home/album",
                            state: { name: "ashutosh" },
                          }}
                        >
                          <a>Album</a>
                        </Link>
                        <Route path="/home/album" component={Albums} />
                      </Router>
                    </li>
                    <li>
                      <Router>
                        <Link to="/home/pets">
                          <a>Pets</a>
                        </Link>
                        <Route path="/home/pets" component={Pets} />
                      </Router>
                    </li>
                    <li>
                      <ProfileButton onClick={ShowProfile} />
                    </li>
                  </ul>
                </div>
              </div>

              <ShowTimelinePost
                timelineArray={timelineArray}
                history={history}
              />
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
}

const HandelHomeDiv = memo(() => {
  const toggle = useSelector((state) => state.toggle);
  localStorage.setItem("isToggle", toggle);
  const isToggle = localStorage.getItem("isToggle");
  console.log(isToggle, "hii toggle ...------...-----");
  return <>{toggle ? <PostList /> : <UserBio />}</>;
});

const PostList = memo(() => {
  return (
    <>
      <div className="post_div">
        <div className="post_list">
          <ul>
            <li>
              <a href="#">
                <span className="list_img">
                  <img src="images/img_1.png" />
                </span>
                Latest First
              </a>
            </li>
            <li>
              <a href="#">
                <span className="list_img">
                  <img src="images/img_2.png" />
                </span>
                Oldest First
              </a>
            </li>
            <li>
              <a href="#">
                <span className="list_img">
                  <img src="images/img_3.png" />
                </span>
                Most Pet
              </a>
            </li>
            <li>
              <a href="#">
                <span className="list_img">
                  <img src="images/img_4.png" />
                </span>
                Most Clicks
              </a>
            </li>
            <li>
              <a href="#">
                <span className="list_img">
                  <img src="images/img_5.png" />
                </span>
                Most Commented
              </a>
            </li>
          </ul>
        </div>
        <div className="post_txt">4 New Post Updates</div>
      </div>
    </>
  );
});

const UserBio = memo(() => {
  return (
    <>
      <div className="timeline_div1">
        <div className="profile_pic">
          <img src="images/timeline_img1.png" />
          <div className="profile_text">
            <a href="#">Change Profile Pic</a>
          </div>
        </div>
        <div className="profile_info">
          <div className="edit_div">
            <a href="#">
              Edit <img src="images/timeline_img.png" />
            </a>
          </div>
          <div className="profile_form">
            <ul>
              <li>
                <div className="div_name1">Name :</div>
                <div className="div_name2">Stefiney Gibbs</div>
              </li>
              <li>
                <div className="div_name1">Sex :</div>
                <div className="div_name2">Female</div>
              </li>
              <li>
                <div className="div_name1">Description :</div>
                <div className="div_name3">
                  This is an example of a comment. You can create as many
                  comments like this one or sub comments as you like and manage
                  all of your content inside Account.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
});

const ProfileButton = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const HandelProfileButton = (e) => {
    dispatch(toggleMyuploadDiv());
    // location.state.onClick(e);
  };

  return (
    <a href="#" onClick={HandelProfileButton}>
      {" "}
      My Uploads{" "}
    </a>
  );
};

const TimelineButton = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location, "timeline locatopn");
  const HandelTimelineButton = () => {
    dispatch(toggleTimelineDiv());
    // location.state.onClick();
  };
  return (
    <>
      <a href="#" className="active" onClick={HandelTimelineButton}>
        Timeline
      </a>
    </>
  );
};

const About = () => {
  return <></>;
};

const Albums = () => {
  const location = useLocation();
  console.log(location, "unnn");
  return <></>;
};

const Pets = () => {
  return <></>;
};

const ShowTimelinePost = (props) => {
  console.log(props);
  const gotoSinglepost = (e, userid) =>
    props.history.push(`/singlepost:${userid}`);

  return (
    <>
      {props?.timelineArray?.map((user) => (
        <div>
          <div className="contnt_2">
            <div className="div_a">
              <div className="div_title">
                User Interface PSD Source files Web Designing for web
              </div>
              <div className="btm_rgt">
                <div className="btm_arc">Cats</div>
              </div>
              <div className="div_top">
                <div className="div_top_lft">
                  <img src="images/img_6.png" />
                  {user.fullname}
                </div>
                <div className="div_top_rgt">
                  <span className="span_date">{user.date}</span>
                  <span className="span_time">{user.time}</span>
                </div>
              </div>
              <div className="div_image">
                <a onClick={(e) => gotoSinglepost(e, user._id)} href="">
                  <img src={`${Host}/uploads/` + user.imagepath} alt="pet" />
                </a>
              </div>
              <div className="div_btm">
                <div className="btm_list">
                  <ul>
                    <li>
                      <a href>
                        <span className="btn_icon">
                          <img src="images/icon_001.png" alt="share" />
                        </span>
                        Share
                      </a>
                    </li>
                    <li>
                      <a href>
                        <span className="btn_icon">
                          <img src="images/icon_002.png" alt="share" />
                        </span>
                        Flag
                      </a>
                    </li>
                    <li>
                      <a href>
                        <span className="btn_icon">
                          <img src="images/icon_003.png" alt="share" />
                        </span>
                        {user.like.length + " " + "Likes"}
                      </a>
                    </li>
                    <li>
                      <a href>
                        <span className="btn_icon">
                          <img src="images/icon_004.png" alt="share" />
                        </span>
                        {user.comment.length + " " + "comment"}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const RightSideContainer = (props) => {
  const [popupUploadpostToggle, setPopupUploadpostToggle] = useState(false);

  const popup = useCallback((e) => {
    setPopupUploadpostToggle(!popupUploadpostToggle);
  });

  const uploadSinglePost = useCallback((e) => {
    props.upload(e);
  });

  return (
    <>
      <div>
        <div className="content_rgt">
          <div className="rght_btn">
            {" "}
            <span className="rght_btn_icon">
              <img src="images/btn_iconb.png" alt="up" />
            </span>{" "}
            <span className="btn_sep">
              <img src="images/btn_sep.png" alt="sep" />
            </span>{" "}
            <a href="#" onClick={popup}>
              Upload Post
            </a>{" "}
          </div>
          <div className="rght_btn">
            {" "}
            <span className="rght_btn_icon">
              <img src="images/btn_icona.png" alt="up" />
            </span>{" "}
            <span className="btn_sep">
              <img src="images/btn_sep.png" alt="sep" />
            </span>{" "}
            <a href="#">Invite Friends</a>{" "}
          </div>
          <div className="rght_cate">
            <div className="rght_cate_hd" id="rght_cat_bg">
              Categories
            </div>
            <div className="rght_list">
              <ul>
                <li>
                  <a href="#">
                    <span className="list_icon">
                      <img src="images/icon_01.png" alt="up" />
                    </span>{" "}
                    CATS
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="list_icon">
                      <img src="images/icon_02.png" alt="up" />
                    </span>{" "}
                    Dogs
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="list_icon">
                      <img src="images/icon_03.png" alt="up" />
                    </span>{" "}
                    Birds
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="list_icon">
                      <img src="images/icon_04.png" alt="up" />
                    </span>{" "}
                    Rabbit
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="list_icon">
                      <img src="images/icon_05.png" alt="up" />
                    </span>{" "}
                    Others
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="rght_cate">
            <div className="rght_cate_hd" id="opn_cat_bg">
              Featured
            </div>
            <div className="sub_dwn">
              <div className="feat_sec">
                <div className="feat_sec_img">
                  <img src="images/feat_img1.png" alt="image" />
                </div>
                <div className="feat_txt">Lorem Ipusum Text</div>
              </div>
              <div className="feat_sec">
                <div className="feat_sec_img">
                  <img src="images/feat_img2.png" alt="image" />
                </div>
                <div className="feat_txt">Lorem Ipusum Text</div>
                <div className="btm_rgt">
                  <div className="btm_arc">Dogs</div>
                </div>
              </div>
              <div className="feat_sec">
                <div className="feat_sec_img">
                  <img src="images/feat_img3.png" alt="image" />
                </div>
                <div className="feat_txt">Lorem Ipusum Text</div>
                <div className="btm_rgt">
                  <div className="btm_arc">Rabbits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {popupUploadpostToggle && (
            <div className="popup_sec" id="pop_forgt">
              <div className="clos_btn">
                <img
                  src="images/clos.png"
                  alt=""
                  id="clos_pop"
                  onClick={popup}
                />
              </div>
              <div className="man_contnt">
                <span>Please Select a photo to Upload!</span>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={uploadSinglePost}
                />
                <br />
                <br />
                <br />
                <br />
                <input
                  type="button"
                  value="submit"
                  id="submit"
                  onClick={popup}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HooksTimeline;
