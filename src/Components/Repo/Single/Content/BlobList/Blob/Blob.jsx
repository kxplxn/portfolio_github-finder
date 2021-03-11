import React from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';
import './Blob.sass';

const Blob = ({ blob }) => (
  <Link to={blob.url} className="BlobLink">
    <ListGroup.Item className="Blob text-center mb-2">
      <h5 className="ItemName">{`(${blob.type}) ${blob.name}`}</h5>
    </ListGroup.Item>
  </Link>
);

Blob.propTypes = {
  blob: PropTypes.objectOf({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
  }).isRequired,
};

export default Blob;
