import React, { Component } from 'react';
import {connect} from 'react-redux';
import { todoActions } from '../../_actions';

export default class TodoEditPage extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeRadio = this.onChangeRadio.bind(this)
    this.strcmp = this.strcmp.bind(this)
    this.state = {
        obj: {},
        username: '',
        email: '',
        text: '',
        status: false
    }
  }

  componentDidMount() {
    const { obj } = this.props.location.state
    //console.log(obj.status)
    this.setState({
      obj: obj,
      username: obj.username,
      email: obj.email,
      text: obj.text,
      status: (obj.status == '10') ? true : false,
    })
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }
  onChangeRadio(e) {
    this.setState({
      status: !this.state.status
    }); 
  }

  onSubmit(e) {
    
    e.preventDefault();
    let form = new FormData();
    form.append("username", this.state.username);
    form.append("email", this.state.email);
    //console.log(this.state.text);
    
    form.append("text", this.state.text);
    form.append("status", (this.state.status === true) ? '10' : '0');
    //console.log('please: ',form.get('username'));
    //console.log((this.state.status === true) ? '10' : '0');
    
    this.props.dispatch(todoActions.editTodo(form, this.state.obj.id));
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
                  <label>Email:  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={this.state.email}
                    placeholder={this.state.obj.email}
                    onChange={this.onChangeEmail}
                    />
                </div>
                <div className="form-group">
                  <label>Username:  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={this.state.username}
                    placeholder={this.state.obj.username}
                    onChange={this.onChangeUsername}
                    />
                </div>
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
                    <input type="radio" checked={this.state.status} onChange={this.onChangeRadio} name="status"/> Yes
                  </div>
                  <div>
                    <input type="radio" checked={!this.state.status} onChange={this.onChangeRadio} name="status"/> No    
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