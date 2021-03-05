/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { getReposForUser, handleReposFound, handleReposNotFound } from '../../API/ReposAPI';
import { requestFollowing, handleFollowingFound, handleFollowingNotFound } from '../../API/FollowingAPI';

const UserInfo = ({
  user,
  setRepos,
  setReposFound,
  setFollowingUsers,
  setFollowingUsersFound,
}) => (
  <Card className="bg-light" style={{ border: '3px solid #343a40', marginBottom: '1rem' }}>
    <Row noGutters style={{ height: '100%' }}>
      <Col xs={4} style={{ height: '100%' }}>
        <Card.Img variant="left" src={user.avatar} style={{ width: '100%', height: '100%' }} />
      </Col>
      <Col xs={8} style={{ paddingRight: '5rem', paddingLeft: '5rem' }}>
        <Card.Body style={{ height: '100%', width: '100%' }}>
          <Card.Text style={{ height: '100%', width: '100%', display: 'flex' }}>
            <div style={{ display: 'block', padding: 0, margin: 'auto' }}>
              <Card.Title style={{ textAlign: 'center' }}>
                <h2>{user.name}</h2>
              </Card.Title>
              <p style={{ fontSize: '14pt', textAlign: 'center' }}>{user.bio}</p>
              <Row className="mb-2" style={{ margin: 'auto' }}>
                <Col xs={6} style={{ textAlign: 'center' }}>
                  {
                    user.numberOfPublicRepos > 0 ? (
                      <Link
                        to={`/${user.login}/repos`}
                        onClick={() => (
                          getReposForUser(
                            user.reposUrl,
                            handleReposFound(setRepos, setReposFound),
                            handleReposNotFound(setRepos, setReposFound),
                          )
                        )}
                      >
                        Public Repos: {user.numberOfPublicRepos}
                      </Link>
                    ) : (
                      <h6>Public Repos: {user.numberOfPublicRepos}</h6>
                    )
                  }
                </Col>
                <Col xs={6} style={{ textAlign: 'center' }}>
                  <h6>Public Gists: {user.numberOfPublicGists} </h6>
                </Col>
                <Col xs={6} style={{ textAlign: 'center' }}>
                  <h6>Followers: {user.numberOfFollowers}</h6>
                </Col>
                <Col xs={6} style={{ textAlign: 'center' }}>
                  {
                    user.numberOfFollowing > 0 ? (
                      <h6
                        className="text-primary"
                        style={{ cursor: 'pointer' }}
                        onClick={() => (
                          requestFollowing(
                            user.followingUrl,
                            handleFollowingFound(setFollowingUsers, setFollowingUsersFound),
                            handleFollowingNotFound(setFollowingUsers, setFollowingUsersFound),
                          )
                        )}
                      >
                        Following: {user.numberOfFollowing}
                      </h6>
                    ) : (
                      <h6>Following: {user.numberOfFollowing} </h6>
                    )
                  }
                </Col>
              </Row>
              <h5 style={{ width: '100%', textAlign: 'center' }}>
                <FontAwesomeIcon icon={faMapMarkedAlt} size="md" className="mr-2" />
                {user.location}
              </h5>
            </div>
          </Card.Text>
        </Card.Body>
      </Col>
    </Row>
  </Card>
);

UserInfo.propTypes = {
  user: PropTypes.objectOf({
    login: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    numberOfFollowing: PropTypes.number.isRequired,
  }).isRequired,
  setRepos: PropTypes.func.isRequired,
  setReposFound: PropTypes.func.isRequired,
  setFollowingUsers: PropTypes.func.isRequired,
  setFollowingUsersFound: PropTypes.func.isRequired,
};

export default UserInfo;