import React from 'react'
import axios from 'axios'
import { Link, } from 'react-router-dom'
import { Container, Modal, Button, Icon } from 'semantic-ui-react'
import NewDepartmentForm from './NewDepartmentForm'

class Home extends React.Component {
  state = { departments: [],
            modalOpen: false,
          }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  openModal = () => {
    this.setState({modalOpen: true})
  }

  componentDidMount() {
    axios.get("/api/departments").then(
      res=> this.setState({departments: res.data}, () => this.getImages()))
  }

  getImages = () => {
      this.state.departments.map(d=> this.getImage(d.name, d.id))
    }

  getImage = (keyword, id) => {
    let parser = new DOMParser()  
    axios.get('https://cors-anywhere.herokuapp.com/http://www.flickr.com/search/?text=' + keyword).then(res => {
    let htmlDoc = parser.parseFromString(res.data, "text/html")
    let elementsArray = htmlDoc.getElementsByClassName("view photo-list-photo-view requiredToShowOnServer awake")
    let randElement = elementsArray[Math.floor(Math.random() * elementsArray.length)]
    let urlNoQuotes = randElement.style.backgroundImage.split(/"/)[1]  
    let urlComplete = "https:" + urlNoQuotes
    console.log(urlComplete)
    let deps = this.state.departments.map(d => {
      if (id === d.id)
        return {...d, image: urlComplete}
      return d
      })
    this.setState({departments: deps}) 
    })  
}

  render() {
    return(
      <Container>
        {this.state.departments.map(d => (
        <Link to={`/department/${d.id}/products`}>
          <div key={d.id} style={styles.departments}>
            <img style={styles.departmentImages} src={d.image} />
            <h1 style={styles.title}>{d.name}</h1>
          </div>
        </Link>))}
        <Button style={{marginLeft: "10px"}} onClick={this.openModal}><Icon name="add" />New Department</Button>
        <Modal open={this.state.modalOpen} >
          <Modal.Header>
            New Department
          </Modal.Header>
          <Modal.Content>
            <NewDepartmentForm closeModal={this.closeModal} />
          </Modal.Content>
        </Modal>
      </Container>
    )
  }
}

const styles = {
  departments: {
    display: "flex",
    alignItems: "center",
    border: "solid 2px black",
    margin: "10px",
    height: "200px",
  },
  departmentImages: {
    height: "100%",
    borderRight: "solid grey 30px"
  },
  title: {
    fontSize: "4em",
    marginLeft: "20px"
  }
}

export default Home