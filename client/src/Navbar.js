import React from 'react'
import { Link, } from 'react-router-dom'
import { Menu, Dropdown, Button } from 'semantic-ui-react'

class Navbar extends React.Component {
  render (){
    return(
      <Menu>
        <Menu.Item as={Link} to="/">Home
        </Menu.Item>
        <Menu.Item as={Link} to="/about">About
        </Menu.Item>
        <Menu.Menu position="right">
        <Dropdown item text='More'>
          <Dropdown.Menu>
            <Dropdown.Item as={Button} icon='edit' text='Edit Departments' onClick={() => this.props.toggleEditDepartments()} />
            <Dropdown.Item icon='settings' text='App Settings' />
          </Dropdown.Menu>
        </Dropdown>  
        </Menu.Menu>     
      </Menu>
    )
  }
}

export default Navbar