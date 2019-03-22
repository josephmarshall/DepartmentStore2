import React from 'react'
import { Form, Icon, Button } from 'semantic-ui-react'

class EditDepartmentForm extends React.Component {
  state = { name: this.props.name,
            description: this.props.description,
            imageUrl: this.props.imageUrl }
  
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.editDepartment(this.props.id, this.state.name, this.state.description, this.state.imageUrl)
  }

  handleDelete = (e) => this.props.deleteDepartment(this.props.id)
  
  render(){
    return(
      <Form style={{width: "100%"}} onSubmit={this.handleSubmit}>
      <div style={{padding: "5px"}}>
        <input
          type="textField"
          style={styles.title}
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          />
        <div  style={{display: "flex", width: "100%"}}>
        <input
          type="textArea"
          style={styles.description}
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          />
          <div>
            <Form.Button inverted color="blue" style={styles.saveButton} ><Icon color="green" name="checkmark" />Save</Form.Button>
            <Button inverted color="red" style={styles.deleteButton} onClick={this.handleDelete}><Icon name="trash" />Delete</Button>
          </div>
        </div>
        <input
        name="imageUrl"
        placeholder="Image URL: Leave this field empty to auto-generate an image"
        value={this.state.imageUrl}
        onChange={this.handleChange}
        />
      </div>
      </Form>
    )
  }
}

const styles = {
  title: {
    padding: "10px",
    fontSize: "2em",
    width: "95%",
    border: "solid 1px lightgray",
    margin: "5px"
  },
  description: {
    width: "75%",
    padding: "10px",
    border: "solid 1px lightgray",
    margin: "5px",
  },
  saveButton: {
    width: "100%"
  },
  deleteButton: {
    width: "100%"
  }
}

export default EditDepartmentForm