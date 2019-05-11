import React, { Component } from 'react';
import {TableRow } from '../TableRow';
import { connect } from 'react-redux';

import Pagination from '../Paginatioms'
import { todoActions } from '../../_actions';

class TodoListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageOfItems: 1,
      serchByAgain: false,
      prev_search: '',
      dir: 'desc',
      param: 'id',
    }
    this.updateTasks = this.updateTasks.bind(this)
  }
  search(query) {
    let again = this.state.serchByAgain
    if (this.state.prev_search === query) {
      again = !again
    } else {
      again = false
    }
    this.setState({
      prev_search: query,
      serchByAgain: again,
      param: query, 
      dir: (again) ? 'asc' : 'desc',
    })
    // console.log('component',this.state.pageOfItems, query, (again) ? 'asc' : 'desc');
    
    this.updateTasks(this.state.pageOfItems);
  }  

  
  
  updateTasks(val) {
    this.props.dispatch(todoActions.searchBy(val, this.state.param, this.state.dir));
    this.setState({ pageOfItems: val });
  }

  updateStatus(status, id) {
    let form = new FormData();
    form.append("status", status);
    this.props.dispatch(todoActions.changeStatus(form, id));
  }

  componentDidMount() {
    this.props.dispatch(todoActions.getAll(1));
}


  tabRow(items) {    
    const view = items.map((value, key) => {
      return <TableRow key={key} obj={value} parentMethod={this.updateStatus} />;
    })
    return view
  }

  render() {
    const { todos } = this.props;
    // console.log('list: ');
    // console.log(todos);
    // console.log('/list');
    
    return (
      <div  style={{ paddingTop: 60 }}>
        <h4 align="center">Todo List</h4>
        <table className="table table-dark table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th scope="col"
                style={{ textAlign: 'left', width:'6%'  }}>
               <i onClick={this.search.bind(this, 'id')} className="fa fa-fw fa-sort"></i>id
             </th>
             <th scope="col" style={{ textAlign: 'left', width:'10%'   }}>
               <i onClick={this.search.bind(this, 'status')} className="fa fa-fw fa-sort"></i>status
             </th>
             <th scope="col" style={{ textAlign: 'left', width:'14%'   }}>
               <i onClick={this.search.bind(this, 'username')} className="fa fa-fw fa-sort"></i>username
             </th>
             <th scope="col" style={{ textAlign: 'left', width:'14%'   }}>
               <i onClick={this.search.bind(this, 'email')} className="fa fa-fw fa-sort"></i>email
             </th>
             <th scope="col" style={{ width:'44%' }}>text</th>
             <th scope="col" style={{ textAlign: 'left'   }}>edit</th>
             {/**
              <th scope="col" style={{ textAlign: 'center'}}>delet</th>
            */}

            </tr>
          </thead>
          <tbody>
            {(todos.items.tasks.length !== 0) ? this.tabRow(todos.items.tasks) : null}
          </tbody>
        </table>
          <Pagination parentMethod={this.updateTasks} total={todos.items.total_task_count}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { todos } = state;
  return {
    todos,
  };
}

const connectedTodoListPage = connect(mapStateToProps)(TodoListPage);
export { connectedTodoListPage as TodoListPage };