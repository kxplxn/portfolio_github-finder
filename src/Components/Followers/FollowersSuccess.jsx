import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import FollowersSingle from './FollowersSingle';

const FollowersSuccess = ({ followers }) => (
  <ListGroup className="GistsSuccess">
    {followers.map((follower) => (
      <FollowersSingle follower={follower} />
    ))}
  </ListGroup>
);

FollowersSuccess.propTypes = {
  followers: PropTypes.arrayOf(
    PropTypes.objectOf({
      login: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default FollowersSuccess;
