import * as React from "react"
import { connect } from "react-redux"
import {Button, ButtonArea} from "react-weui"
import "./IntroPic.less"

@connect(state => state)
export default class IntroPic extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
  }

  componentWillMount() {
  }

  goEdit(){
    this.context.router.push({
      pathname: '/static/chapter/detail',
      query: { chapterId: this.props.location.query.chapterId, pageId: 1, courseId: this.props.location.query.courseId }
    })
  }


  render() {
    return (
      <div className="intro-pic">
        <div>
          <img style={{marginTop:'75px',width:'134px'}} src="http://www.iquanwai.com/images/signupSuccess.png"/>
        </div>
        <div>
          <img style={{marginTop:'60px',width:'212px'}} src="http://www.iquanwai.com/images/getClassMethod.png"/>
        </div>
        <div className="submit-button">
          <Button style={{width: '300px',fontSize:'16px'}}  onClick={()=>this.goEdit()}>探索训练营</Button>
        </div>
      </div>
    )
  }
}
