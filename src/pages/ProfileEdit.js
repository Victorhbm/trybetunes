import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
      validForm: true,
      profileEdited: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
  }

  componentDidMount() {
    this.getUserData();
  }

  handleChange(key, value) {
    this.setState({
      [key]: value,
    }, this.checkInputs);
  }

  async handleClick() {
    const { name, email, description, image } = this.state;
    this.setState({ loading: true });
    await updateUser({
      name,
      email,
      description,
      image,
    });
    this.setState({ loading: false, profileEdited: true });
  }

  async getUserData() {
    this.setState({ loading: true });
    const { name, email, description, image } = await getUser();

    this.setState({
      loading: false,
      name,
      email,
      description,
      image,
    }, this.checkInputs);
  }

  checkInputs() {
    const { name, email, description, image } = this.state;
    const checkInputs = [
      name.length > 0,
      email.length > 0,
      description.length > 0,
      image.length > 0,
    ];
    const checkEmail = /\S+@\S+\.\S+/.test(email);
    const checkAll = checkInputs.every((check) => check) && checkEmail;
    this.setState({
      validForm: checkAll,
    });
  }

  render() {
    const {
      loading,
      name,
      email,
      description,
      image,
      validForm,
      profileEdited,
    } = this.state;

    if (profileEdited) return <Redirect to="/profile" />;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <section id="profile-edit">
          {loading ? <Carregando /> : (
            <div>
              <label htmlFor="input-name">
                Nome:
                <input
                  data-testid="edit-input-name"
                  type="text"
                  id="input-name"
                  name="input-name"
                  className="inputs-profile-edit"
                  onChange={ (e) => this.handleChange('name', e.target.value) }
                  value={ name }
                />
              </label>

              <label htmlFor="email">
                E-mail:
                <input
                  data-testid="edit-input-email"
                  type="text"
                  id="email"
                  name="email"
                  className="inputs-profile-edit"
                  onChange={ (e) => this.handleChange('email', e.target.value) }
                  value={ email }
                />
              </label>

              <label htmlFor="image">
                Imagem (URL):
                <input
                  data-testid="edit-input-image"
                  type="text"
                  id="image"
                  name="image"
                  className="inputs-profile-edit"
                  onChange={ (e) => this.handleChange('image', e.target.value) }
                  value={ image }
                />
              </label>

              <label htmlFor="description">
                Descrição:
                <textarea
                  data-testid="edit-input-description"
                  id="description"
                  name="description"
                  maxLength="150"
                  onChange={ (e) => this.handleChange('description', e.target.value) }
                  value={ description }
                />
              </label>

              <button
                id="profile-edit-btn"
                data-testid="edit-button-save"
                type="button"
                disabled={ !validForm }
                onClick={ this.handleClick }
              >
                Salvar alterações
              </button>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default ProfileEdit;
