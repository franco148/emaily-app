import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {

  renderContent() {
    switch(this.props.auth) {
      case null:
        // return 'Still deciding'; // To avoid the flashing (it was being displayed before changing to "I am logged in" for example)
        return;
      case false:
        // return 'Iam loggedout';
        return (
          <li><a href="/auth/google">Login with Google</a></li>
        );
      default:
        // return 'I am logged in.';
        return <li><a>Logout</a></li>
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">Emaily</a>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// function mapStateToProps(state) {
//   return { auth: state.auth };
// }

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
