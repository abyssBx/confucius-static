import * as React from "react"
import "./NavigationBar.less"
import Icon from "./Icon"

export default class NavigationBar extends React.Component<any,any>{
  constructor(){
    super();
  }

  propTypes:{
    navList:React.PropTypes.array.isRequired
  }

  componentWillMount(){
    //
  }

  navigate = (e)=>{
    console.log(e.target.id);
  }

  render(){
    const {navList} = this.props;
    return (
      <ul className="nav-list">
        {navList.map((item,index,arr)=>{
          return (
            <li className="nav-item" key={index}>
                <Icon  size={"30px"} type={item.icon}></Icon>
                <span id = {item.url} onClick={(e)=>{this.navigate(e);}} className="nav-text">{item.name}</span>
            </li>
          )
        })}
      </ul>
    )
  }
}
