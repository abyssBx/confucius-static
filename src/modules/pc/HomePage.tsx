import * as React from "react"
import "./HomePage.less"
import { connect } from "react-redux"
import { set, startLoad, endLoad } from "redux/actions"
import { Msg } from "react-weui"
import NavigationBar from "../../components/NavigationBar"
import * as _ from "lodash";
import Icon from "../../components/Icon";
const P = "detail"

interface IModule {
  moduleName:String,
  moduleDescribe:String
}

@connect(status=>status)
export default class Main extends React.Component<any, any> {



  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(){
    super();
    this.state={
      navList:[
        {
          url:'/static/homepage',
          name:'首页',
          icon:'home'
        },
        {
          url:'/static/fragment',
          name:'碎片化课程',
          icon:'fragment'
        }
      ]
    }
    console.log(this.state);
  }

  componentWillMount(){

  }

  render() {
    const {login} = this.props;
    const user = _.get(login,'user',{});


    const pageModule = ()=>{
      return (
        <div className="page-module">
          <span className="module-title">
            模块标题
          </span>
          <span className="module-describe">
            模块描述
          </span>
          <div className="module-item">
            模块内容
          </div>
        </div>
      )
    }

    return (

      <div className="homePageContainer">
        <div className="top-banner">
          <Icon style={{"margin-right":"60px"}} size="50" type={"logo"}/>
          <div className="nav-container">
            <NavigationBar navList={this.state.navList}/>
          </div>
          <div className="user-container">
            <div className="img-box">
              <img></img>
            </div>
          </div>
        </div>
        <div className="module-container">
          {pageModule()}
        </div>
      </div>
    )
  }
}
