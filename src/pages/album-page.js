import React, { Component, Fragment } from 'react';
import Album from '../components/album';


class AlbumPage extends Component {
  render() {
    return (
      <Fragment>
        <Album name={this.props.match.params.name} />
      </Fragment>
    );
  }
}

export default AlbumPage;