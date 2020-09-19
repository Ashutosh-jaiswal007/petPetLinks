import React, { Component } from "react";
import axios from "axios";


import { host } from "./route.js";
import { SidecontainerRight } from "./timelinerightcontainer.js";

export class Timeline extends Component {
  getData;
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      id: "",
      usertimeline_array: [],
      myuploadarr: [],
      istoggle: true,
    };
    this.changetoggle = this.changetoggle.bind(this);
    this.upload = this.upload.bind(this);
  }

  upload(e) {
    e.preventDefault();
    e.persist();

    var imgobj = new FormData();
    imgobj.append("imagename", "multer-image" + Date.now());
    imgobj.append("imagedata", e.target.files[0]);
    imgobj.append("_id", this.state.id);
    imgobj.append("imagepath", document.getElementById("file").value);

    axios
      .post(`${host}/uploadphoto`, imgobj)
      .then((res) => {
        console.log(res.data, "hiii...");
        console.log("ashutosh", e.target.files[0]);
        this.setState({
          usertimeline_array: [...this.state.usertimeline_array, res.data],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  timeline(e) {
    e.preventDefault();
    axios
      .post(`${host}/timeline`)
      .then((res) => {
        console.log("response", res.data);
        this.setState({ usertimeline_array: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  myupload(e) {
    console.log("hii my uoloads", this.state.id);
    e.preventDefault();
    axios
      .post(`${host}/myuploads`, { id: this.state.id })
      .then((res) => {
        console.log(res.data);
        this.setState({ usertimeline_array: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  singlepost(e, userid) {
    e.preventDefault();
    console.log(userid, "hello userid");
    this.props.history.push(`/singlepost:${userid}`);
  }

  changetoggle() {
    console.log(this.state.istoggle, "toggle value");
    this.setState({ istoggle: !this.state.istoggle });
  }

  componentDidMount() {
    var _id = localStorage.getItem("data");
    console.log(_id, "idd...");
    if (_id === null) {
      this.props.history.push("/login");
    }
    this.setState({ id: _id });
    axios
      .post(`${host}/timeline_refreash`)
      .then((res) => {
        console.log(res.data, "data received");
        this.setState({ usertimeline_array: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
  }
}
export default Timeline;
