import React from 'react'
import axios from 'axios'
import { Container, Button, Icon} from 'semantic-ui-react'

class Product extends React.Component {
state = { name: "",
          description: "",
          price: "",
          image: "" }

  componentDidMount(){
    axios.get(`/api/departments/${this.props.match.params.department_id}/products/${this.props.match.params.id}`).then(
      res => this.setState({name: res.data.name, description: res.data.description, price: res.data.price}))  
  }
  render(){
    return(
      <Container>
        <h1>{this.state.name}</h1>
        <h3>{this.state.description}</h3>
        <h2>${this.state.price}</h2>
        <div>
          <Button><Icon color="blue" name="edit" />Edit</Button>
          <Button><Icon color="red" name="trash" />Delete</Button>
        </div>
      </Container>
    )
  }
}

export default Product