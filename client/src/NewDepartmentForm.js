import React from 'react'
import { Form, Icon, Button } from 'semantic-ui-react'

class NewDepartmentForm extends React.Component {
  state = { name: "",
            description: "",
            imageUrl: ""}
  
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addDepartment(this.state)
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
          required
        />
        <Form.TextArea
          label="Description"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Image URL"
          name="imageUrl"
          placeholder="Leave this field empty to auto-generate an image"
          value={this.state.imageUrl}
          onChange={this.handleChange}
        />
        <div style={{display: "flex", justifyContent: "flex-end"}}>
        <Form.Button><Icon color="green" name="checkmark" />Save</Form.Button>
        <Form.Button onClick={this.props.closeModal}><Icon color="red" name="close" />Cancel</Form.Button>
        </div>
      </Form>
    )
  }
}

export default NewDepartmentForm