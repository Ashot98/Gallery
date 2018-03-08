import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteAlbum } from '../actions/index';

import './albums-list-row.css'


class AlbumsListRow extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    this.props.deleteAlbum(this.props.album);
  }

  render() {
    return (
      <div className='albums-list-row'>
        <p>{this.props.album}</p>
        <div className='edit-and-remove'>
          <Button onClick={this.props.onChange}>
            <Glyphicon glyph='edit' />
          </Button>
          <Button onClick={this.onDelete}>
            <Glyphicon glyph='remove' />
          </Button>
        </div>
      </div>
    );
  }
}

AlbumsListRow.propTypes = {
  album: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default connect(null, { deleteAlbum })(AlbumsListRow);