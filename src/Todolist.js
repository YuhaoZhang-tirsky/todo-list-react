import React, { Fragment, Component } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios'
import './style.css';

class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      list: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this)
  }

  render() {
    console.log('rerender')
    return (
      
      <Fragment>
        <div>
          <label htmlFor="insertArea">Input your list</label>
          <input
            id="insertArea"
            className="input"
            value={this.state.inputValue}
            onChange={this.handleInputChange}      
          />
          <button onClick={this.handleBtnClick}>submit</button>
        </div>
        <ul ref={(ul) => {this.ul = ul}}>
          {this.getTodoItem()}
        </ul>
      </Fragment>
    )
  }

  componentWillMount() {
    axios.get('Todolist.json')
      .then((res) => {
        console.log(res.data);
        this.setState(() => ({
          list: [...res.data]
        }));      
      })
      .catch(() => {alert('err')})
  }

  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <li key={index}>
          <TodoItem 
            content={item} 
            index={index} 
            deleteItem={this.handleItemDelete}  
          />
        </li>
      )
    })
  }

  handleInputChange(e) {
    const value = e.target.value
    this.setState(() => ({
        inputValue: value
    }));
  }

  handleBtnClick() {
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ""
    }));
  }

  handleItemDelete(index) {
    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return {list}
    })
  }
}
export default Todolist;
