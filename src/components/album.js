import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Glyphicon, Button, Grid, Row, Col, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getImages, saveImage, saveInStore } from '../actions/index';
import ImageItem from './image-item';
import './album.css';

class Album extends Component {
  constructor(props) {
    super(props);

    this.onImgAdd = this.onImgAdd.bind(this);
    this.savePreview = this.savePreview.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.state = {show: false}
  }

  componentDidMount() {
    this.props.getImages(this.props.name);
    this.fileInput.addEventListener('change', () => {
      const image = this.fileInput.files[0];

      this.props.saveImage(this.props.name, image);
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.images.status === 'fetched' });
  }

  hideModal() {
    this.setState({show: false});
  }

  savePreview() {
    this.props.saveInStore(this.props.name, this.props.images.newImg);
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
            {this.props.images.data.map((image) => <Col key={image.id} lg={3} md={3} sm={6} smOffset={0} xs={10} xsOffset={1}><ImageItem albumname={this.props.name} image={image}/></Col>)}
          </Row>
        </Grid>
        <Modal show={this.props.images.status === "fetching"}>
          <Modal.Body>Uplodaing image...</Modal.Body>
        </Modal>
        <Modal id='preview' show={ this.state.show}>
          <Modal.Body>
            {!!this.props.images.newImg && <img src={this.props.images.newImg.path}/>}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Close</Button>
            <Button onClick={this.savePreview} bsStyle='primary'>Save</Button>
          </Modal.Footer>
        </Modal>
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

export default connect(mapStateToProps, { getImages, saveImage, saveInStore })(Album);