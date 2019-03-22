import React from 'react'
import axios from 'axios'
import { Container, Button, Icon, Modal} from 'semantic-ui-react'
import EditProductForm from './EditProductForm'
import Cart from './Cart'

class Product extends React.Component {
state = { id: "",
          name: "",
          description: "",
          price: "",
          imageUrl: "",
          modalOpen: false,
          }

  openModal = () => {
    this.setState({modalOpen: true})
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  componentDidMount(){
    axios.get(`/api/departments/${this.props.match.params.department_id}/products/${this.props.match.params.id}`)
    .then(res => this.setState({id: res.data.id, name: res.data.name, description: res.data.description, price: res.data.price, imageUrl: res.data.imageUrl}))  
  }

  deleteProduct = (id, department_id) => {
    axios.delete(`/api/departments/${department_id}/products/${id}`)
    .then( res => {let path = `/department/${department_id}/products`
    this.props.history.push(path)}) 
  }

  editProduct = ({name, description, price, imageUrl}) => {
    axios.put(`/api/departments/${this.props.match.params.department_id}/products/${this.props.match.params.id}`, 
    {name, description, price, imageUrl})
    .then( res => this.setState({name, description, price, imageUrl}))
  }

  updateCart = () => {
    let { items, total } = this.props.cartData
    let newTotal = (parseFloat(total) + parseFloat(this.state.price)).toFixed(2)
    let item = {name: this.state.name, price: this.state.price}
    let updatedCartData = {items: [...items, item], total: newTotal} 
    this.props.updateCartData(updatedCartData)
  }

  render(){
    return(
      <Container style={{background: "white", minHeight: "90vh", padding: "20px"}}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button style={{background: "white", border: "solid grey 2px"}} onClick={() => this.props.history.push(`/department/${this.props.match.params.department_id}/products`)}><Icon name="arrow left" />Back</Button>
          <div>
            <Button style={{background: "white", border: "solid grey 2px"}} onClick={()=>this.openModal()} ><Icon color="blue" name="edit" />Edit</Button>
            <Button style={{background: "white", border: "solid grey 2px"}} onClick={()=>this.deleteProduct(this.state.id, this.props.match.params.department_id)}><Icon color="red" name="trash" />Delete</Button>
          </div>
        </div>
          <h1>{this.state.name}</h1>
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <div style={{width: "70%", textAlign: "center", padding: "10px"}}>
            <img style={{width: "90%"}} src={this.state.imageUrl} />
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <h3>{this.state.description}</h3>
              <div style={{width: "50%"}}>
                <h2 style={{textAlign: "center"}}>${this.state.price}</h2>
                <Button onClick={() => this.updateCart()} style={{background: "white", border: "solid grey 2px"}}><Icon color="blue" name="shopping basket" />Add To Cart</Button>
              </div>
            </div>
          </div>
          <Cart cartData={this.props.cartData} />
        </div>
        <div>
          Product Reviews
        </div>
        <br />
        <br />
        <br />
        <Modal open={this.state.modalOpen} >
          <Modal.Header>
            Edit Product
          </Modal.Header>
          <Modal.Content>
            <EditProductForm closeModal={this.closeModal} editProduct={this.editProduct} product={this.state} />
          </Modal.Content>
        </Modal>
      </Container>
    )
  }
}

export default Product