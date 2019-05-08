import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../_components/HomePage';
import { LoginPage } from '../_components/LoginPage';
import { RegisterPage } from '../_components/RegisterPage';

import { TodoAddPage } from '../_components/TodoAddPage';
import { TodoEditPage } from '../_components/TodoEditPage';
import { TodoListPage } from '../_components/TodoListPage';

import Header from '../_components/Header'

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

  
    render() {
        const { alert } = this.props;
      return (
        <Router history={history}>
            <Header />
            <div className="container" style={{marginTop: '60px'}}>
                <div>
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <div>
                            <PrivateRoute exact path="/" component={ HomePage } />
                            <Route path="/login" component={ LoginPage } />
                            <Route path="/register" component={ RegisterPage } />
                            <Route exact path='/create' component={ TodoAddPage } />
                            <Route path='/edit/:id' component={ TodoEditPage } />
                            <Route path='/list' component={ TodoListPage } />
                        </div>
                </div>
            </div>
        </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 