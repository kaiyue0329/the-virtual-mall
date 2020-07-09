import {
  Image,
  Responsive,
  Menu,
  Segment,
  Button,
  Visibility
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopNav extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { handleClick, isLoggedIn, user } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            textAlign="center"
            style={{ minHeight: 100, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Menu.Item as={NavLink} exact to="/home">
                Home
              </Menu.Item>
              <Menu.Item as={NavLink} exact to="/products">
                Products
              </Menu.Item>
              <Menu.Item as={NavLink} exact to="/cart/view">
                Cart
              </Menu.Item>
              {isLoggedIn ? (
                <Menu.Item as={NavLink} exact to="/orders">
                  Orders
                </Menu.Item>
              ) : (
                ''
              )}
              {isLoggedIn ? (
                <Menu.Item position="right">
                  <Image src={user.profilePicture} size="mini" circular />{' '}
                  {user.firstName ? user.firstName : user.username}
                  <Button
                    primary
                    as={NavLink}
                    exact
                    to="#"
                    onClick={handleClick}
                  >
                    Log Out
                  </Button>
                </Menu.Item>
              ) : (
                <Menu.Item position="right">
                  <Button primary as={NavLink} exact to="/account">
                    Log in
                  </Button>
                  <Button
                    color="green"
                    as={NavLink}
                    exact
                    to="/signup"
                    primary={fixed}
                    style={{ marginLeft: '0.5em' }}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              )}
            </Menu>
          </Segment>
        </Visibility>
      </Responsive>
    );
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  };
};

export default connect(mapState)(DesktopNav);
