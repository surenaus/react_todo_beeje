import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class TableRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authed: false,
    }

    this.delete = this.delete.bind(this);    

  }

  delete() {

  }
  
  componentDidMount() {
    const { user, obj } = this.props;
    
    if (user !== undefined) {
      this.setState({
        authed: true,
      })
    }
  }

  strcmp(a, b)
  {   
      return (a<b?-1:(a>b?1:0));  
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.id}
        </td>
        <td >
          <input
          style={{ marginLeft: '40px' }}
            className="form-check-input"
            type="checkbox"
            checked={this.props.obj.status}
            disabled
            id="inlineFormCheck" />
          </td>
        <td>
          <span
          style={{ marginLeft: '10px' }}
          >
          {this.props.obj.username}

          </span>
          </td>
          <td>
          <span
          style={{ marginLeft: '10px'}}
          >
          {this.props.obj.email}

          </span>
          </td>
        <td>
          <div className='container' style={{ margin: '0', padding: '0', marginRight: '20px', maxWidth: "100%", width: "100%" }}>
              {this.props.obj.text}
            </div>
          </td>
          <td>
          {this.state.authed ? (
            <Link to={{
              pathname: "/edit/" + this.props.obj.id,
              state: {
                obj: this.props.obj
              }
            }} className="btn btn-primary">Edit</Link>
            ) : (<p>No content</p>)}
            </td>
            {/**
             <td>
          {this.state.authed ? (
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          ) : (<p>No content</p>) }
          </td>
            */}
        </tr>
    );
  }
}
function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
      user,
  };
}
const connectedTodoList = connect(mapStateToProps)(TableRow);
export { connectedTodoList as TableRow }; 