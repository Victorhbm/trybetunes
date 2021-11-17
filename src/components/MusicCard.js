import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };

    this.addFavoriteSong = this.addFavoriteSong.bind(this);
  }

  componentDidMount() {
    this.checkFavoritesSongs();
  }

  async addFavoriteSong(checked, props) {
    this.setState({ loading: true });
    const { renderFavoriteMusics } = this.props;

    if (checked) {
      await addSong(props);
      this.setState({
        loading: false,
        checked: true,
      });
    } else {
      await removeSong(props);
      this.setState({
        loading: false,
        checked: false,
      });
      if (renderFavoriteMusics) renderFavoriteMusics();
    }
  }

  async checkFavoritesSongs() {
    this.setState({ loading: true });
    const { trackId } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    const check = favoriteSongs.some((song) => song.trackId === trackId);

    this.setState({
      checked: check,
      loading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;

    if (loading) return <Carregando />;

    return (
      <div className="music-content">
        {previewUrl !== '' && (
          <>
            <span className="music-title">{ trackName }</span>
            <span>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ trackName }>
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  name={ trackName }
                  id={ trackName }
                  className="input-music"
                  checked={ checked }
                  onChange={ (e) => this.addFavoriteSong(e.target.checked, this.props) }
                />
                Favorita
              </label>
            </span>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  renderFavoriteMusics: PropTypes.func,
};

MusicCard.defaultProps = {
  trackName: '',
  previewUrl: '',
  trackId: 0,
  renderFavoriteMusics: null,
};
