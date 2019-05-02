import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
 }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }


  
  render() {
    const collapsed = this.state.collapsed;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    return (
            <nav className="navbar navbar-expand-sm navbar-dark transparent-nav fixed-top">
                <div className="container">
                    <Link to={'/'} className="navbar-brand">React CRUD Test</Link>
                    <button
                        onClick={this.toggleNavbar}
                        className={`${classTwo}`}
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
              
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className={`${classOne}`} id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link" onClick={this.toggleNavbar}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/create'} className="nav-link" onClick={this.toggleNavbar}>Create</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/List'} className="nav-link" onClick={this.toggleNavbar}>List</Link>
                            </li>
                        </ul>
                    </div>
                </div>
          </nav>
    );
  }
}


export default Nav;
