import React from 'react'
import axios from 'axios'
import { Container, Button, Icon} from 'semantic-ui-react'

class Product extends React.Component {
state = { id: "",
          name: "",
          description: "",
          price: "",
          imageUrl: "" }

  componentDidMount(){
    axios.get(`/api/departments/${this.props.match.params.department_id}/products/${this.props.match.params.id}`).then(
      res => this.setState({id: res.data.id, name: res.data.name, description: res.data.description, price: res.data.price, imageUrl: res.data.imageUrl}))  
  }

  deleteProduct = (id, department_id) => {
    axios.delete(`/api/departments/${department_id}/products/${id}`)
    .then(
      //redirect
    ) 
  }

  render(){
    return(
      <Container style={{background: "white", minHeight: "90vh", padding: "20px"}}>
        <h1>{this.state.name}</h1>
        <img src={this.state.imageUrl} />
        <h3>{this.state.description}</h3>
        <h2>${this.state.price}</h2>
        <div>
          <Button><Icon color="blue" name="edit" />Edit</Button>
          <Button onClick={this.deleteProduct(this.state.id, this.props.match.params.department_id)}><Icon color="red" name="trash" />Delete</Button>
        </div>
      </Container>
    )
  }
}

export default Product