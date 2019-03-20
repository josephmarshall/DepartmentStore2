import React from 'react'
import { Form, Button, Icon} from 'semantic-ui-react'

class NewDepartmentForm extends React.Component {
  state = { name: "",
            description: ""}
  
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log("success")
    this.props.closeModal()
  }

  render(){
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label="Department Name"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <Form.TextArea
          label="Description"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <Form.Button><Icon color="green" name="checkmark" />Save</Form.Button>
      </Form>
    )
  }
}

export default NewDepartmentForm