import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteImage } from '../actions/index';

import "./image-item.css";

class ImageItem extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    this.props.deleteImage(this.props.image.id, this.props.albumname);
  }

  render() {
    return (
      <div className='image-item'>
        <img src={this.props.image.path} alt={this.props.image.id} />
        <Button onClick={this.onDelete}>
          <Glyphicon glyph='remove' />
        </Button>
      </div>
    );
  }
}

ImageItem.propTypes = {
  albumname: PropTypes.string.isRequired,
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired
  }).isRequired
}

export default connect(null, { deleteImage })(ImageItem);