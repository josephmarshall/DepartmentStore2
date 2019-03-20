import React from 'react'
import axios from 'axios'
import { Container, } from 'semantic-ui-react'
import { Link, } from 'react-router-dom'

class Department extends React.Component{
  state = {name: "",
          description: "",
          products: [], 
        }

  componentDidMount() {
    axios.get(`/api/departments/${this.props.match.params.id}`).then(
      res => this.setState({name: res.data.name, description: res.data.description}))            
    axios.get(`/api/departments/${this.props.match.params.id}/products`).then(
      res => this.setState({products: res.data}, () => this.getImages()))
  }

getImages = () => {
    this.state.products.map(p=> this.getImage(p.name, p.id))
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
      if (id === p.id)
        return {...p, image: urlComplete}
      return p
      })
    this.setState({products: prods})
    } 
  })  
}

  render(){
    return(
      <Container>
        <h1>{this.state.name}</h1>
        <h2>{this.state.description}</h2>
        <div style={styles.productsList}>
          {this.state.products.map(p=>
            <Link to={`/department/${this.props.match.params.id}/products/${p.id}`}>
              <div style={styles.product}>
                <img style={styles.productImage} src={p.image} />
                <h3 style={styles.productTitle}>{p.name}</h3>
                <p style={styles.productDescription}>{p.description}</p>
                <h4 style={styles.price}>${p.price}</h4>
              </div>
            </Link>
          )}
        </div>
      </Container>
    )
  }
}

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
    alignItems: "center"
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
  price: {
    width: "20%",
    textAlign: "right",
    marginRight: "10px"
  }

}
export default Department