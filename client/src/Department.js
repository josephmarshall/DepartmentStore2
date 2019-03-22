import React from 'react'
import axios from 'axios'
import { Container, Modal, Icon, Button } from 'semantic-ui-react'
import { Link, } from 'react-router-dom'
import NewProductForm from './NewProductForm'
import Styled from 'styled-components'

class Department extends React.Component{
  state = {
          id: "",
          name: "",
          description: "",
          imageUrl: "",
          products: [],
          modalOpen: false, 
        }
  
  openModal = () => {
    this.setState({modalOpen: true})
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  componentDidMount() {
    axios.get(`/api/departments/${this.props.match.params.id}`).then(
      res => this.setState({id: res.data.id, name: res.data.name, description: res.data.description, imageUrl: res.data.imageUrl}))            
    axios.get(`/api/departments/${this.props.match.params.id}/products`).then(
      res => this.setState({products: res.data}, () => this.getImages()))
  }

getImages = () => {
    this.state.products.map(p => {
      if (p.imageUrl === null) this.getImage(p.name, p.id)
    })
  }

getImage = (keyword, id) => {
  let parser = new DOMParser()  
  axios.get('https://cors-anywhere.herokuapp.com/http://www.flickr.com/search/?text=' + keyword).then(res => {
  let htmlDoc = parser.parseFromString(res.data, "text/html")
  let elementsArray = htmlDoc.getElementsByClassName("view photo-list-photo-view requiredToShowOnServer awake")
  let randElement = elementsArray[Math.floor(Math.random() * elementsArray.length)]
  if (randElement) {
    let urlNoQuotes = randElement.style.backgroundImage.split(/"/)[1]  
    let urlComplete = "https:" + urlNoQuotes
    console.log(urlComplete)
    let prods = this.state.products.map(p => {
      if (id === p.id) {
      axios.put(`/api/departments/${this.state.id}/products/${p.id}`, { imageUrl: urlComplete }).then(res => console.log(res)) 
        return {...p, imageUrl: urlComplete}
      } else {
      return p
      }
      })
    this.setState({products: prods})
    } 
  })  
}

addProduct = ({name, description, price, imageUrl}) => {
  const department_id = this.state.id
  axios.post(`/api/departments/${department_id}/products`, { department_id, name, description, price, imageUrl }).then(
    res => {
      this.setState({ products: [...this.state.products, res.data] }, () =>
      this.getImage(name, res.data.id))
    })
}

  render(){
    return(
      <Container style={{background: "white", padding: "20px"}}>
        <Button style={{background: "white", border: "solid grey 2px"}} onClick={() => this.props.history.push(`/departments`)}><Icon name="arrow left" />Back</Button>
        <h1>{this.state.name}</h1>
        <h2>{this.state.description}</h2>
        <Button style={{border: "solid 2px", borderRadius: 0, background: "white", color: "#212163"}} onClick={this.openModal}><Icon name="add" />New Product</Button>
        <div style={styles.productsList}>
          {this.state.products.map(p=>
            <Link to={`/department/${this.props.match.params.id}/products/${p.id}`}>
              <div style={styles.product}>
                <img style={styles.productImage} src={p.imageUrl} />
                <h3 style={styles.productTitle}>{p.name}</h3>
                <p style={styles.productDescription}>{p.description.substring(0, 200)}</p>
                <MyH4>${p.price}</MyH4>
              </div>
            </Link>
          )}
        </div>
        <Modal open={this.state.modalOpen} >
          <Modal.Header>
            New Product
          </Modal.Header>
          <Modal.Content>
            <NewProductForm closeModal={this.closeModal} addProduct={this.addProduct} />
          </Modal.Content>
        </Modal>
        <br />
        <br />
        <br />
      </Container>
    )
  }
}

const MyH4 = Styled.h4`
  width: 20%;
  text-align: right;
  margin-right: 10px;
`
const styles = {
  productsList: {
    display: "flex",
    flexDirection: "column",
  },
  product: {
    display: "flex",
    height: "70px",
    border: "solid black 2px",
    width: "100%",
    marginTop: "5px",
    alignItems: "center",
    background: "white"
  },
  productTitle: {
    width: "30%",
    marginLeft: "5px"
  },
  productDescription: {
    width: "50%",
    margin: "0 10px 0 10px"
  },
  productImage: {
    borderRight: "solid grey 15px",
    height: "100%"
  },
  // price: {
  //   width: "20%",
  //   textAlign: "right",
  //   marginRight: "10px"
  //}

}
export default Department