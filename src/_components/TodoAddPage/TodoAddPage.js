import React, { Component } from 'react';
import {connect} from 'react-redux';
import { todoActions } from '../../_actions';

class TodoAddPage extends Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      text: '',
      status: '0',
      username: 'Guest',
      email: '',
      error: ''
    }
  }
  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    let form = new FormData();
    form.append("username", this.state.username);
    form.append("email", this.state.email);
    form.append("text", this.state.text);
    form.append("status", this.state.status);
    
    this.props.dispatch(todoActions.addTodo(form));
  }
 
  render() {
    return (
      <div className={'col-md-6 col-md-offset-3'} style={{ paddingTop: 60 }}>
            <h2>Add New Todo</h2>
        
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                 <label>email: </label>
                <input 
                   type="email" 
                   className="form-control"
                   placeholder="example@example.com"
                   value={this.state.email}
                   onChange={this.onChangeEmail}
              />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>

                </div>
          
                <div className="form-group">
                    <label>text:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.text}
                      onChange={this.onChangeText}
                      placeholder="Your Text"
                      />
               </div>
            <div className={["alert alert-danger alert-dismissible fade", (this.state.error === "") ? 'hide' : 'show'].join(' ')} role="alert"
            style={{
              marginTop: '-10px',
              marginBottom: '10px',
                height: '30px',
                lineHeight:'30px',
                padding: '0px 15px',
              }}
            >
                {this.state.error}
              </div>
              <div className="form-group">
                <input type="submit" 
                  value="Add todo" 
                  className="btn btn-primary"/>
              </div>
            </form>
        </div>
    )
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const { todos } = state;

  return {
      todos,
      loggingIn
  };
}

const connectedTodoAddPage = connect(mapStateToProps)(TodoAddPage);
export { connectedTodoAddPage as TodoAddPage }; 