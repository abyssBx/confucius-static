import * as React from "react"
import { connect } from "react-redux"
import "./Personal.less"
import * as _ from "lodash"

@connect(state=>state)
export default class Personal extends React.Component<any,any>{
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.picHeight = window.innerWidth / 2.5;
    this.marginTop = (this.picHeight-170)/2>0?(this.picHeight-170)/2:0;
  }


  render(){
    const renderHeader = ()=>{
      return (
        <div className="personal-head" style={{marginTop:this.marginTop+"px"}}>
          <div className="personal-head-pic" style={{background:'url(' + window.ENV.headImage + ')  no-repeat  center center/100% auto'}}/>
          <div className="personal-name">
            {window.ENV.userName}
          </div>
        </div>
      )
    }

    const renderContainer= ()=>{
      return (
        <div>
          <div className="personal-item" onClick={()=>{this.context.router.push('/personal/profile')}}><span>个人信息</span></div>
          <div className="personal-item" onClick={()=>{this.context.router.push('/personal/accountset')}}><span>账户设置</span></div>
          <div className="personal-item" onClick={()=>{this.context.router.push('/personal/rise')}} ><span>RISE</span></div>
          <div className="personal-item" onClick={()=>{this.context.router.push('/personal/confucius')}} ><span>训练营</span></div>
          <div className="personal-item" onClick={()=>{this.context.router.push('/personal/feedback')}} ><span>意见反馈</span></div>

        </div>
      )
    }
    return (
      <div className="personal">
        <div className="personal-header"  style={{height:this.picHeight}}>
          {renderHeader()}
          <div className="personal-mask" style={{background:'url(' + window.ENV.headImage + ')  no-repeat  center center/100% auto'}}/>
        </div>
        <div className="personal-container">
          {renderContainer()}
        </div>
      </div>
    )
  }
}
