import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchArtist: '',
      artistName: '',
      loading: false,
      artists: [],
      validAlbum: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value) {
    this.setState({
      searchArtist: value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { searchArtist } = this.state;

    this.setState({
      loading: true,
      artistName: searchArtist,
    });

    const result = await searchAlbumsAPI(searchArtist);

    this.setState({
      validAlbum: result.length === 0,
      searchArtist: '',
      artists: result,
      loading: false,
    });
  }

  render() {
    const { searchArtist, loading, artists, artistName, validAlbum } = this.state;

    return (
      <div data-testid="page-search">
        <Header />

        <section id="search-form-container">
          {loading ? <Carregando /> : (
            <form onSubmit={ (e) => this.handleSubmit(e) }>
              <input
                data-testid="search-artist-input"
                type="text"
                placeholder="Nome do Artista"
                name="search-artist-input"
                id="search-artist-input"
                onChange={ (e) => this.handleChange(e.target.value) }
                value={ searchArtist }
              />
              <button
                data-testid="search-artist-button"
                type="submit"
                id="search-artist-button"
                disabled={ searchArtist.length < 2 }
              >
                Pesquisar
              </button>
            </form>
          )}
        </section>

        <section id="search-albuns-container">
          {(artistName.length !== 0 && !loading) && (
            validAlbum === false ? (
              <>
                <h2>
                  Resultado de álbuns de:
                  { ` ${artistName}` }
                </h2>
                <div id="albuns-container">
                  {artists.map((artist) => (
                    <Link
                      className="albuns"
                      key={ artist.collectionId }
                      to={ `/album/${artist.collectionId}` }
                      data-testid={ `link-to-album-${artist.collectionId}` }
                    >
                      <div className="album-content">
                        <img
                          className="album-img"
                          src={ artist.artworkUrl100 }
                          alt={ artist.artistName }
                        />
                        <div className="album-info-content">
                          <h3>{ artist.collectionName }</h3>
                          <p>{ artist.artistName }</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : <h2>Nenhum álbum foi encontrado</h2>)}
        </section>
      </div>
    );
  }
}

export default Search;
