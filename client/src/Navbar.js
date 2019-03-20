import React from 'react'
import { Link, } from 'react-router-dom'
import { Menu, } from 'semantic-ui-react'

class Navbar extends React.Component {
  render (){
    return(
      <Menu>
        <Menu.Item as={Link} to="/">Home
        </Menu.Item>
        <Menu.Item as={Link} to="/about">About
        </Menu.Item>.     
      </Menu>
    )
  }
}

export default Navbar