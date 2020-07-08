import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../store';
import { DesktopNav, MobileNav } from './index';
import { Container } from 'semantic-ui-react';

const Navbar = ({ handleClick, isLoggedIn, children, firstName }) => (
  <Container>
    <DesktopNav
      handleClick={handleClick}
      isLoggedIn={isLoggedIn}
      firstName={firstName}
    >
      {children}
    </DesktopNav>
    <MobileNav
      handleClick={handleClick}
      isLoggedIn={isLoggedIn}
      firstName={firstName}
    >
      {children}
    </MobileNav>
  </Container>
);

Navbar.propTypes = {
  children: PropTypes.node,
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
