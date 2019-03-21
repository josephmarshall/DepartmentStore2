import React, { Component, } from 'react';
import './App.css';
import { Switch, Route, } from 'react-router-dom'
import About from './About'
import Home from './Home'
import NoMatch from './NoMatch'
import Navbar from './Navbar'
import Department from './Department'
import Product from './Product'
import { Container, } from 'semantic-ui-react'

class App extends Component {

  state = { editDepartments: false }

  toggleEditDepartments = () => {
    this.setState({ editDepartments: !this.state.editDepartments })
    console.log(this.state.editDepartments)
  }

  render() {
    return (
      <div style={{ width: "100%", background: "#212163", minHeight: "100vh" }} >
      <Container>
        <br />
        <h1 style={{ fontSize: "3em", color: "white", textAlign: "center", marginBottom: 0 }} >Gramble, Miller, & Bernanke</h1>
        <h2 style={{ fontFamily: "snell roundhand, cursive", color: "white", textAlign: "center", marginTop: 10 }} >Purveyor of Fine Merchandise</h2>
        <Navbar toggleEditDepartments={this.toggleEditDepartments} />
        <Switch>
          <Route exact path="/" render={() => <Home editDepartments={this.state.editDepartments} />} />
          <Route exact path="/about" component={About} />
          <Route exact path="/department/:department_id/products/:id" component={Product} />
          <Route exact path="/department/:id/products" component={Department} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
      </div>
    );
  }
}

export default App;
