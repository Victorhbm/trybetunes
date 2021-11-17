import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
    };

    this.renderMusic = this.renderMusic.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.renderMusic(id);
  }

  async renderMusic(id) {
    const arrMusics = await getMusics(id);

    this.setState({
      musics: arrMusics,
    });
  }

  render() {
    const { musics } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {musics.length !== 0 && (
          <div id="album-container">
            <div id="musics-info">
              <img src={ musics[0].artworkUrl100 } alt={ musics[0].artistName } />
              <h3 data-testid="album-name">{ musics[0].collectionName }</h3>
              <p data-testid="artist-name">{ musics[0].artistName }</p>
            </div>

            <div id="musics-container">
              {musics.map((music, i) => (
                <MusicCard key={ i } { ...music } />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
