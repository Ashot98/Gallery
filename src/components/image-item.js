import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class ImageItem extends Component {
  render() {
    return (
      <div className='image-item'>
        <img src={this.props.image.path} alt={this.props.image.id} />
        <Button>
          <Glyphicon glyph='remove' />
        </Button>
      </div>
    );
  }
}

export default ImageItem;