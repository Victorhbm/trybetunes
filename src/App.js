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
          <Route exact path="trybetunes/search" component={ Search } />
          <Route
            exact
            path="/trybetunes/album/:id"
            render={ (props) => <Album { ...props } /> }
          />
          <Route exact path="/trybetunes/favorites" component={ Favorites } />
          <Route exact path="/trybetunes/profile" component={ Profile } />
          <Route exact path="/trybetunes/profile/edit" component={ ProfileEdit } />
          <Route path="/trybetunes/">
            {logado ? <Redirect to="trybetunes/search" /> : (
              <Login changeState={ this.changeState } />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
