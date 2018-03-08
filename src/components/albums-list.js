import React, { Component } from 'react';
import './albums-list.css';
import { Button, FormControl } from 'react-bootstrap';
import AlbumsListRow from './albums-list-row';
import  { connect } from 'react-redux';
import { getAlbums, setAlbum } from '../actions/index';

class AlbumList extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.addAlbum = this.addAlbum.bind(this);

    this.state = { albumName: ''}
  }

  componentDidMount() {
    this.props.getAlbums();
  }

  addAlbum(e) {
    console.log(this.state.albumName);
    this.props.setAlbum(this.state.albumName);
    this.setState({albumName: ''});
  }

  handleChange(e) {
    this.setState({albumName: e.target.value})
  }

  render() {
    return (
      <div className='albums-list'>
        <div className='add-album'>
          <FormControl 
            type='text'
            value={this.state.albumName}
            placeholder='Add new album'
            onChange={this.handleChange} />
          <Button bsStyle='primary' onClick={this.addAlbum} disabled={this.state.albumName === ''}>Add</Button>
        </div>
        {this.props.albums.map((album) => <AlbumsListRow key={album} album={album} />)}
        {this.props.albums.length === 0 && <p className='info'>There are no albums to show</p>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { albums: state.albums };
}

export default connect(mapStateToProps, { getAlbums, setAlbum })(AlbumList);