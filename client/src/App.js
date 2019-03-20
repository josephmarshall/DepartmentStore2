import React, { Component, Fragment } from 'react';
import './App.css';
import { Switch, Route, } from 'react-router-dom'
import About from './About'
import Home from './Home'
import NoMatch from './NoMatch'
import Navbar from './Navbar'
import Department from './Department'
import Product from './Product'

class App extends Component {

  render() {
    return (
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/department/:department_id/products/:id" component={Product} />
          <Route exact path="/department/:id/products" component={Department} />
          <Route component={NoMatch} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
