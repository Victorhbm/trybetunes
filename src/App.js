import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      logado: false,
    };

    this.changeState = this.changeState.bind(this);
  }

  changeState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    const { logado } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {logado ? <Redirect to="/search" /> : (
              <Login changeState={ this.changeState } />
            )}
          </Route>
          <Route exact path="/search" component={ Search } />
          <Route
            exact
            path="/album/:id"
            render={ (props) => <Album { ...props } /> }
          />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
