import * as React from "react";
import * as _ from "lodash";
import some = require("lodash/some");
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import "./Login.less"
const p = "login"

export default class Login extends React.Component<any,any>{

  constructor(){
    super();
    this.state={
      qrPicUrl:null,
      userName:null
    }
    this.webSocket = null;
  }

  private webSocket:WebSocket;

  openSocket(){
    if("WebSocket" in window){
      console.log("支持");
    } else {
      alert("该浏览器不支持socket");
    }
    // 创建socket www.confucius.mobi
    this.webSocket = new WebSocket("ws://127.0.0.1:8080/session");
    this.webSocket.onopen = e=>{console.log("链接打开!");};
    console.log(this.webSocket.readyState);
    // 处理消息
    this.webSocket.onmessage = e=>{this.dispatchMessage(e);};
    this.webSocket.onerror = e=>{console.log(e)};
    this.webSocket.onclose = e=>{console.log("关闭链接")};
  }
  closeSocket(){
    this.webSocket.close();
    console.log("关闭socket")
  }

  componentWillMount(){

  }

  componentWillUnmount(){
    console.log("unmount");
    this.webSocket.close();
  }

  sendTextMessage(msg:String){
    this.webSocket.send(msg);
  }

  dispatchMessage(event){
    let {dispatch} = this.props;
    const close = this.props.closeSocket;
    if(_.isEqual(event.type,"message")){
      console.log(event.data);
      let data = JSON.parse(event.data);
      switch (data.type){
        case "QR_CREATE":{
          console.log("获取二维码");
          this.setState({qrPicUrl:data.picUrl});
          // 获取二维码后60秒刷新
          setTimeout(()=>this.refreshQRCode(),60000);
          break;
        }
        case "LOGIN_SUCCESS":{
          console.log("登录成功");
          console.log(data);
          dispatch(set(`${p}.user`,data.data));
          // 登录成功
          // 从外层调用close
          // 显示用户头像和名字，1秒后消失
          this.setState({"userName":data.data.user})
          close();
          break;
        }
        case "PERMISSION_DENIED":{
          dispatch(alertMsg("您没有权限打开该页面"));
          close();
          break;
        }
        case "ERROR":{
          dispatch(alertMsg(data.msg));
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
      <div className="login">
        <img src={this.state.qrPicUrl}/>
        <p>{this.state.userName}</p>
      </div>
    )
  }
}

