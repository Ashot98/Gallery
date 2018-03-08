import React, { Component } from 'react';
import './albums-list.css';
import { Button, FormControl, FormGroup, Modal } from 'react-bootstrap';
import AlbumsListRow from './albums-list-row';
import  { connect } from 'react-redux';
import { getAlbums, addAlbum, changeAlbum } from '../actions/index';

class AlbumList extends Component {
  constructor(props) {
    super(props);

    this.handleAddNameChange = this.handleAddNameChange.bind(this);
    this.handleChangeNameChange = this.handleChangeNameChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.addAlbum = this.addAlbum.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveChanges = this.saveChanges.bind(this);

    this.state = { 
      albumName: '',
      modalOpened: false,
      changingValue: '',
      modalValue: ''
    }
  }

  componentDidMount() {
    this.props.getAlbums();
  }

  addAlbum(e) {
    this.props.addAlbum(this.state.albumName);
    this.setState({albumName: ''});
  }

  onAlbumChange(album) {
    this.setState({
      modalOpened: true,
      changingValue:album,
      modalValue: album
    });
  }
  
  closeModal() {
    this.setState({ modalOpened: false });
  }

  handleAddNameChange(e) {
    this.setState({albumName: e.target.value})
  }

  handleChangeNameChange(e) {
    this.setState({modalValue: e.target.value})
  }

  handleEnter(e) {
    if(e.keyCode === 13) {
      this.addAlbum(e);
    }
  }

  saveChanges() {
    this.setState({ modalOpened: false });
    this.props.changeAlbum(this.state.changingValue, this.state.modalValue);
  }

  render() {
    const uniqueError = this.props.errors.uniqueError;
    const modalUniqueError = this.props.errors.modalUniqueError;
    const validationState = (uniqueError ? "error" : null);
    const modalValidationState = (modalUniqueError ? "error" : null);
    return (
      <div className='albums-list'>
        <div className='add-album'>
          <FormGroup validationState={validationState}>
            <FormControl 
              type='text'
              value={this.state.albumName}
              placeholder='Add new album'
              onChange={this.handleAddNameChange}
              onKeyDown={this.handleEnter} />
          </FormGroup>
          <Button bsStyle='primary' onClick={this.addAlbum} disabled={this.state.albumName === ''}>Add</Button>
        </div>
        {uniqueError && <p className='unique-error'>{uniqueError}</p>}
        <div className='content'>
          {this.props.albums.map((album) => <AlbumsListRow key={album} album={album} onChange={() => this.onAlbumChange(album)} />)}
          {this.props.albums.length === 0 && <p className='info'>There are no albums to show</p>}
        </div>
        <Modal show={this.state.modalOpened || !!modalUniqueError}>
          <Modal.Header>
            <Modal.Title>Change Album Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup validationState={modalValidationState}>
              <FormControl 
                type='text'
                value={this.state.modalValue}
                onChange={this.handleChangeNameChange}
                onKeyDown={this.handleEnter} />
            </FormGroup>
            {modalUniqueError && <p className='unique-error'>{modalUniqueError}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
            <Button bsStyle="primary" onClick={this.saveChanges}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    albums: state.albums,
    errors: state.errors
  };
}

export default connect(mapStateToProps, { getAlbums, addAlbum, changeAlbum })(AlbumList);