import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.getUserData();
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
    });
  }

  render() {
    const { loading, name, email, description, image } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        <section id="profile">
          {loading ? <Carregando /> : (
            <div id="profile-container">
              <div id="image-container">
                <img
                  id="profile-image"
                  data-testid="profile-image"
                  src={ image }
                  alt={ name }
                />
                <Link id="edit-btn" to="/profile/edit">Editar perfil</Link>
              </div>
              <div id="profile-info-container">
                <div className="profile-info-content">
                  <h2>Nome</h2>
                  <p>{ name }</p>
                </div>
                <div className="profile-info-content">
                  <h2>E-mail</h2>
                  <p>{ email }</p>
                </div>
                <div className="profile-info-content">
                  <h2>Descrição</h2>
                  <p>{ description }</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default Profile;
