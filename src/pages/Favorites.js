import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favoriteMusics: [],
      loading: false,
    };

    this.renderFavoriteMusics = this.renderFavoriteMusics.bind(this);
  }

  componentDidMount() {
    this.renderFavoriteMusics();
  }

  async renderFavoriteMusics() {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();

    this.setState({
      loading: false,
      favoriteMusics: favoriteSongs,
    });
  }

  render() {
    const { loading, favoriteMusics } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {loading
          ? <div className="favorites-container"><Carregando /></div>
          : (
            <div className="favorites-container">
              {favoriteMusics.map((music, i) => (
                <MusicCard
                  key={ i }
                  { ...music }
                  renderFavoriteMusics={ this.renderFavoriteMusics }
                />
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default Favorites;
