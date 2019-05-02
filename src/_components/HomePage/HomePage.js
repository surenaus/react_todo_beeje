import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends React.Component {

    render() {
        const { user } = this.props;
        return (
            <div className="container" style={{ textAlign: 'center', paddingTop: '60px'}}>
                <h1>Hi {user.username}!</h1>
                <p>You're logged in with React!!</p>
                <p>
                    <Link to="/login" style={{color: 'pink'}}>Logout</Link>
                </p>
            </div>
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };