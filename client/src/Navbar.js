import React from 'react'
import { Link, } from 'react-router-dom'
import { Menu, Dropdown, Button, Icon} from 'semantic-ui-react'

class Navbar extends React.Component {
  state = {home: true}

  render (){
    return(
      <Menu>
        <Menu.Item as={Link} to="/departments"><Icon name="home" />Home
        </Menu.Item>
        <Menu.Item as={Link} to="/about"><Icon name="question" />About
        </Menu.Item>
        <Menu.Menu position="right">
        <Dropdown item text='More' icon="tasks">
          <Dropdown.Menu>
            <Dropdown.Item as={Button} icon='edit' text='Edit Departments' onClick={() => this.props.toggleEditDepartments()} />
            <Dropdown.Item icon='settings' text='App Settings' disabled/>
          </Dropdown.Menu>
        </Dropdown>  
        </Menu.Menu>     
      </Menu>
    )
  }
}

export default Navbar