import * as React from "react"
import { connect } from "react-redux"
import { Row, Col,Menu, Icon} from "antd"
import * as _ from "lodash"
import 'antd/dist/antd.css';
import "./Home.less"
import "../../components/FullModal"
import FullModal from "../../components/FullModal";
import Login from "../../components/Login";

@connect(state=>state)
export default class Home extends React.Component<any,any>{
  constructor(){
    super();
    this.state = {
      current: 'home',
      loginModalVisible:false,
    }
  }

  /**
   * 显示报名页面二维码
   */
  showCourseQRModal(){

  }

  /**
   * 显示关注二维码
   */
  showFollowQRModal(){

  }

  /**
   * 显示登录二维码
   */
  showLoginQRModal(){
    this.setState({loginModalVisible:true});
    // 打开socke
    this.refs.getLoginSocket.openSocket();
  }

  /**
   * 关闭登录二维码
   */
  closeLoginQRModal(){
    this.setState({loginModalVisible:false});
    this.refs.getLoginSocket.closeSocket();
  }

  handleMenuClick(e){
    console.log('click',e);
    const {login} = this.props;
    const user = _.get(login,'user',{});
    switch (e.key){
      case "fragment":{
        // 点击碎片化，判断用户是否有的登录
        if(!_.isEmpty(user)){
          // 判断用户权限是否符合
          /**
           * 步骤：
           * 1.获取用户的班级信息
           * 2.判断是否报过碎片化
           */
          let fragments = user.activeClasses.filter((item)=>item.courseId==2);
          if(_.isEmpty(fragments)){
            // 没有报过碎片化,弹出报名二维码

          } else {
            // 报过碎片化,内容页显示消息

          }
        } else {
          // 没有登录，弹出登录dialog
          this.showLoginQRModal();
        }
      }
    }
  }

  render(){
    const {dispatch,login} = this.props;
    const user = _.get(login,'user',{});
    const loginQRModal = ()=>{
      const modalChildren = ()=>{
        return (
          <div>
            <Login closeSocket={this.closeLoginQRModal.bind(this)} ref="getLoginSocket" dispatch={dispatch}/>
          </div>
        )
      }

      return (
        <FullModal ref="test" children={modalChildren()}
                 show={this.state.loginModalVisible}
                 zIndex={1000}
                 onCancel={()=>this.closeLoginQRModal()}
                 title={"请扫描二维码登录圈外"} />
      )
    }

    return (
      <div className="container">
        <Row  className="ant-row top-banner">
          <Col span={2} offset={4}>
            <img width="60px" height="64px" style={{"backgroundColor":"red"}}/>
          </Col>
          <Col span={6} offset={2}>
            <Menu style={{lineHeight: '64px'}} theme="dark" onClick={(e)=>this.handleMenuClick(e)} selectedKeys={[this.state.current]}
                  mode="horizontal">
              <Menu.Item key="home">
                <Icon type="home" />首页
              </Menu.Item>
              <Menu.Item key="fragment" >
                <Icon type="appstore"/>碎片化
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={4} offset={6}>
            <div className="user-info">
              <img className="head-img"  src={user.headimgUrl}></img>
              <div className="user-name">{user.weixinName}</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
        <Row>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>

        {loginQRModal()}
      </div>
    )
  }
}
