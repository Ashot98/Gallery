import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Glyphicon, Button, Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getImages, saveImage } from '../actions/index';
import ImageItem from './image-item';
import './album.css';

class Album extends Component {
  constructor(props) {
    super(props);

    this.onImgAdd = this.onImgAdd.bind(this);
  }

  componentDidMount() {
    this.props.getImages(this.props.name);
    this.fileInput.addEventListener('change', () => {
      const image = this.fileInput.files[0];

      this.props.saveImage(this.props.name, image);
    })
  }

  onImgAdd() {
    this.fileInput.click();
  }

  render() {
    return (
      <div className='album'>
        <div className='header'>
          <Link className='back-btn' to='/'><Glyphicon glyph='chevron-left' />Back</Link>
          <h1>{this.props.name}</h1>
          <div className='file-upload'>
            <input type='file' id='file-input' accept='image/*' ref={input => { this.fileInput = input } } />
            <Button bsStyle='primary' onClick={this.onImgAdd}>Add image</Button>
          </div>
        </div>
        {this.props.images.data.length === 0 && <p className='info'>There are no images to show</p>}
        <Grid>
          <Row>
            {this.props.images.data.map((image) => <Col lg={4} md={4}><ImageItem key={image.id} image={image}/></Col>)}
          </Row>
        </Grid>
      </div>
    );
  }
}

Album.propTypes = {
  name: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    images: state.images
  }
}

export default connect(mapStateToProps, { getImages, saveImage })(Album);