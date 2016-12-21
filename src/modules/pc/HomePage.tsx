import * as React from "react"
import "./HomePage.less"
import { connect } from "react-redux"
import { set, startLoad, endLoad } from "redux/actions"
import { Msg } from "react-weui"
import Icon from "../../components/Icon"
import * as _ from "lodash";
const P = "detail"

@connect(status=>status)
export default class Main extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render() {
    const {login} = this.props;
    console.log(login);
    const user = _.get(login,'user',{});
    const buttons = [{
      label: '确定',
      onClick: () => {
      }
    }];

    return (
      <div className="homePageContainer">
        <div className="headImage">
          <img src={user.headimgUrl} height="300px" width="300px"/>
        </div>
        <p className="tip">登录成功!</p>
        <p className="tip">用户名:{user.weixinName}</p>
        <p className="tip">OpenId:{user.openId}</p>
      </div>
    )
  }
}
