import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

import '../../css/App.css';
import {Route, Link, Switch} from "react-router-dom";
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';
import {
    CssBaseline,
    withStyles,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
} from '@material-ui/core';
import PrivateRoute from '../materials/PrivateRoute';
import { withRouter } from 'react-router';

import Login from './Login';
import Home from './Home';
import Register from './Register';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
      return (
              <CssBaseline />
          <div className="App">
            <TopNav />
            <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard} user={this.props.user} />
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/" component={Home}/>
            </Switch>
          </div>
    );
  }
}

const TopNav = (user) => (
      <AppBar position="static">
      <Toolbar>
      <IconButton color="inherit" aria-label="Menu">
      <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit">
    Brigaid
</Typography>
        <div className="flex" />
        {!user ? <IconButton><AccountCircle /></IconButton> : (
            <Fragment>
    <Button color="inherit" component={Link} to={"/login"}>Login</Button>
                <Button color="inherit" component={Link} to={"/register"}>Register</Button>
</Fragment>
        )}
    </Toolbar>
        </AppBar>
)

const AppContainer = connect(
    (state, ownProps) => {
        return {
            user: state.users.user
        };
    },
    (dispatch, ownProps) => {
        return {
        }
    },
)(App);


export default withRouter(AppContainer);
