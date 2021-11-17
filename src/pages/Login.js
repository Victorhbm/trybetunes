import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import logoTrybeTunes from '../img/logo-positiva-1.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      image: 'https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png',
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value) {
    this.setState({
      name: value,
    });
  }

  // Obtive a referência da resolução usando async após
  // visualizar o código do colega Léo na mentoria
  async handleSubmit(e, callback) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    await createUser(this.state);

    this.setState({
      name: '',
      loading: false,
    });

    return callback('logado', true);
  }

  render() {
    const { name, loading } = this.state;
    const { changeState } = this.props;
    const minLengthName = 3;

    return (
      <div id="login-container" data-testid="page-login">
        <div id="logo-container">
          <img id="logo" src={ logoTrybeTunes } alt="Logo Trybe Tunes" />
        </div>
        {loading ? <Carregando /> : (
          <form
            id="form-login"
            onSubmit={ (e) => this.handleSubmit(e, changeState) }
          >
            <label htmlFor="name">
              <input
                data-testid="login-name-input"
                type="text"
                id="name"
                name="name"
                placeholder="Nome"
                onChange={ (e) => this.handleChange(e.target.value) }
                value={ name }
              />
            </label>

            <button
              className="login-btn"
              data-testid="login-submit-button"
              disabled={ name.length < minLengthName }
              type="submit"
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  changeState: PropTypes.func.isRequired,
};

export default Login;
