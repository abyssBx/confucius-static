import * as React from "react";
import "./Login.less"
import { connect } from "react-redux"
import * as _ from "lodash";
import some = require("lodash/some");
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
const p = "login"

@connect(state => state)
export default class Login extends React.Component<any,any>{
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(){
    super();
    this.state={
      qrPicUrl:null
    }
    this.webSocket = null;
  }

  private webSocket:WebSocket;

  componentWillMount(){
    if("WebSocket" in window){
      console.log("支持");
    } else {
      alert("该浏览器不支持socket");
    }
    // 创建socket
    this.webSocket = new WebSocket("ws://127.0.0.1:8080/session");
    this.webSocket.onopen = e=>{console.log("链接打开!");};
    // 处理消息
    this.webSocket.onmessage = e=>{this.dispatchMessage(e);};
    this.webSocket.onerror = e=>{console.log(e)};
    this.webSocket.onclose = e=>{console.log("关闭链接")};

  }

  sendTextMessage(msg:String){
    this.webSocket.send(msg);
  }

  dispatchMessage(event){
    let {dispatch} = this.props;
    if(_.isEqual(event.type,"message")){
      console.log(event.data);
      let data = JSON.parse(event.data);
      switch (data.type){
        case "QR_CREATE":{
          console.log("获取二维码");
          this.setState({qrPicUrl:data.picUrl});
          break;
        }
        case "LOGIN_SUCCESS":{
          console.log("登录成功");
          console.log(data);
          this.webSocket.close();
          dispatch(set(`${p}.user`,data.data));
          // 跳转到主页
          this.context.router.push({ pathname: '/static/homepage'});
          break;
        }
        default:{
          console.log(data);
        }
      }
    } else {
      console.log(event);
    }
  }

  refreshQRCode(){
    let param = {"type":"REFRESH_CODE"};
    this.webSocket.send(JSON.stringify(param));
  }


  render(){
    return (
      <div className="loginContainer">
        <div className="frontContainer">
          <img src={this.state.qrPicUrl} className="qrPicUrl"/>
          <p className="operationTip">扫描二维码登录圈外</p>
          <p className="ads">圈外PC版，提供更多便捷操作</p>
          <button className="refreshQRCode" onClick={e=>this.refreshQRCode()}>刷新验证码</button>
        </div>
      </div>
    )
  }
}

