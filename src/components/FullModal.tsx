import * as React from "react"
import "./FullModal.less"
import { Button } from "antd"

// var Button = require('antd/lib/Button');
import 'antd/dist/antd.css';

export default class FullModal extends React.Component<any,any> {
  constructor(props) {
    super(props)
    this.state = {show: props.show}

  }

  defaultProps = {
    show: false,
    title: '',
    zIndex: 1000,
    onOk: () => {},
    onCancel: () => {},
  }

  static propTypes = {
    title: React.PropTypes.string,
    zIndex: React.PropTypes.number,
    onOk: React.PropTypes.func,
    onCancel: React.PropTypes.func,
  }
  componentWillMount(){
    console.log("mount");
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    this.setState({show: nextProps.show})
  }

  test(){
    console.log("test");
  }

  render() {
    const { title, zIndex, onOk, onCancel } = this.props

    return (
      <div
        style={{
                    display: this.state.show ? null : 'none',
                }}
      >
        <div className="m-mask" style={{ zIndex: zIndex - 1 }}></div>
        <div className="m-dialog" style={{ zIndex: zIndex }}>
          <div className="md-dialog">
            <div className="md-dialog-title">
              <h4>{title}</h4>
              {/*<span className="btn">*/}
                                {/*<i className="iconfont" onClick={() => this.setState({ show: false })}>&times;</i>*/}
                            {/*</span>*/}
            </div>
            <div className="md-dialog-content">
              {this.props.children}
            </div>
            <div className="md-dialog-foot">
              <Button className="btns-blue" onClick={onCancel.bind(this)}>取消</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
