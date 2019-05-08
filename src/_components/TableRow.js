import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import axios from 'axios';

class TableRow extends Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.state = {
      authed: false,
      stat: false
    }
    this.onStatusChange = this.onStatusChange.bind(this)
  }

  delete() {
      // axios.delete(process.env.REACT_APP_API_MOVIES + this.props.obj._id)
      //     .then(console.log('Deleted'))
      //     .catch(err => console.log(err))
  }

  componentDidMount() {
    const { user } = this.props;

    if (user !== undefined) {
      this.setState({
        authed: true
      })
    }
    let stat = this.props.obj.status
    let val = false
    if (stat === '01') val = true 
    this.setState({
      stat: val
    })
  }
  onStatusChange() {
    this.setState({
      stat: !this.state.stat
    })
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.id}
        </td>
        <td style={{ textAlign: 'center' }}>
          <input className="form-check-input" type="checkbox" checked={this.state.stat} onChange={this.onStatusChange} id="inlineFormCheck"/>
          </td>
          <td>
            {this.props.obj.username}
          </td>
          <td>
            {this.props.obj.email}
          </td>
        <td>
          <div className='container' style={{ margin: '0', padding: '0', marginRight: '20px',paddingRight: '20px', maxWidth: "10px", width: "10px" }}>
            <p style={{ fontSize: '1vw' }}>{(this.props.obj.text.length < 20) ? this.props.obj.text : 'null' }</p>
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
        <td>
          {this.state.authed ? (
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          ) : (<p>No content</p>) }
          </td>
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