import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import logoTrybeTunes from '../img/logo-trybe-2.png';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      name: '',
    };

    this.getTheUser = this.getTheUser.bind(this);
  }

  componentDidMount() {
    this.getTheUser();
  }

  async getTheUser() {
    this.setState({ loading: true });
    const getName = await getUser();

    this.setState({
      loading: false,
      name: getName.name,
    });
  }

  render() {
    const { name, loading } = this.state;

    return (
      <header id="header-container" data-testid="header-component">
        <div id="header-info">
          <img src={ logoTrybeTunes } alt="logo trybe tunes" />
          {loading ? <Carregando /> : (
            <p data-testid="header-user-name">{ name }</p>
          )}
        </div>

        <div id="header-menu">
          <ul id="menu-list">
            <Link data-testid="link-to-search" to="/trybetunes/search">
              <li>
                Pesquisa
              </li>
            </Link>
            <Link data-testid="link-to-favorites" to="/trybetunes/favorites">
              <li>
                Favoritas
              </li>
            </Link>
            <Link data-testid="link-to-profile" to="/trybetunes/profile">
              <li>
                Perfil
              </li>
            </Link>
          </ul>
        </div>
      </header>
    );
  }
}
