import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Homepage } from '.';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { email, firstName } = props;

  return (
    <Container>
      <h3>
        Welcome, {firstName} {email}
      </h3>
      <Homepage />
    </Container>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
};
