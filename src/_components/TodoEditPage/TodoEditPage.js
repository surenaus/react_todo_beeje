import React, { Component } from 'react';
import {connect} from 'react-redux';

export default class TodoEditPage extends Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeRadio = this.onChangeRadio.bind(this)
    this.strcmp = this.strcmp.bind(this)
    this.state = {
        obj: {},
        username: '',
        email: '',
        text: '',
        status: '0'
    }
  }

  componentDidMount() {
    const { obj } = this.props.location.state
    console.log(obj.status)
    this.setState({
      obj: obj,
      username: obj.username,
      email: obj.email,
      status: obj.status,
    })
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }
  onChangeRadio(e) {
    this.setState({
      status: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('Something is wrong with an encoding and hashing(((');
    
  }
  strcmp(a, b)
  {   
      return (a<b?-1:(a>b?1:0));  
  }
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h4 align="center">Update Todo</h4>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Text:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.text}
                      placeholder={this.state.obj.text}
                      onChange={this.onChangeText}
                      />
                </div>
                <div className="form-group" onChange={this.onChangeStatus}>
                  <label>status: </label>
                  <div>
                    <input type="radio" value="01" checked={(this.strcmp(this.state.status, "01")) ? true : false}  onChange={this.onChangeRadio} name="status"/> Yes
                  </div>
                  <div>
                    <input type="radio" value="0" checked={(this.strcmp(this.state.status, "0")) ? true : false} onChange={this.onChangeRadio} name="status"/> No    
                  </div>
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Confirm" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}

function mapStateToProps(state) {
  const { todos } = state;
  return {
    todos,
  };
}

const connectedTodoEdit = connect(mapStateToProps)(TodoEditPage);
export { connectedTodoEdit as TodoEditPage };