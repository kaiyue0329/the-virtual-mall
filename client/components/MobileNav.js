import {
  Responsive,
  Sidebar,
  Menu,
  Segment,
  Container,
  Button,
  Icon,
} from 'semantic-ui-react';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

export default class MobileNav extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });
  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { handleClick, isLoggedIn } = this.props;
    const { sidebarOpened } = this.state;

    if (isLoggedIn) {
      return (
        <Responsive
          as={Sidebar.Pushable}
          getWidth={getWidth}
          maxWidth={Responsive.onlyMobile.maxWidth}
        >
          <Sidebar
            as={Menu}
            animation="overlay"
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
            mobileTransition="overlay"
          >
            <Menu.Item
              as={NavLink}
              exact
              to="/"
              onClick={this.handleSidebarHide}
            >
              Home
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              exact
              to="/products"
              onClick={this.handleSidebarHide}
            >
              Products
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              exact
              to="/orders"
              onClick={this.handleSidebarHide}
            >
              Orders
            </Menu.Item>
            <Button as={NavLink} exact to="#" onClick={handleClick}>
              Log Out
            </Button>
          </Sidebar>
          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              textAlign="center"
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>
          </Sidebar.Pusher>
        </Responsive>
      );
    } else {
      return (
        <Responsive
          as={Sidebar.Pushable}
          getWidth={getWidth}
          maxWidth={Responsive.onlyMobile.maxWidth}
        >
          <Sidebar
            as={Menu}
            animation="overlay"
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
            mobileTransition="overlay"
          >
            <Menu.Item
              as={NavLink}
              exact
              to="/"
              onClick={this.handleSidebarHide}
            >
              Home
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              exact
              to="/products"
              onClick={this.handleSidebarHide}
            >
              Products
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              exact
              to="/login"
              onClick={this.handleSidebarHide}
            >
              Log in
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              exact
              to="/signup"
              onClick={this.handleSidebarHide}
            >
              Sign Up
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              textAlign="center"
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>
          </Sidebar.Pusher>
        </Responsive>
      );
    }
  }
}
