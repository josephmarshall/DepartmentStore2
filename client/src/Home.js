import React from 'react'
import axios from 'axios'
import { Link, } from 'react-router-dom'
import { Container, Modal, Button, Icon } from 'semantic-ui-react'
import NewDepartmentForm from './NewDepartmentForm'
import EditDepartmentForm from './EditDepartmentForm'

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
      this.state.departments.map(d => {
        if (d.imageUrl === null) this.getImage(d.name, d.id)
        })
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
      if (id === d.id) {
        axios.put(`/api/departments/${d.id}`, { imageUrl: urlComplete }).then(res => console.log(res)) 
        return {...d, imageUrl: urlComplete}
      } else {  
      return d
      }
      
    })
    this.setState({departments: deps})
    })  
}

addDepartment = ({name, description}) => {
  axios.post('/api/departments', { name, description }).then(
    res => {
      this.setState({ departments: [...this.state.departments, res.data] }, () =>
      this.getImage(name, res.data.id))
    })
}

editDepartment = (id, name, description, imageUrl) => {
  axios.put(`/api/departments/${id}`, { name, description, imageUrl })
    .then(res => { let departments = 
      this.state.departments.map(d => {
        if (d.id === id)
          return {id: res.data.id, name: res.data.name, description: res.data.description, imageUrl: res.data.imageUrl }
        return d
      })
      this.setState({departments: departments})
      this.props.toggleEditDepartments()
    })
}

deleteDepartment = (id) => {
  axios.delete(`/api/departments/${id}`).then(
    res => {
      this.setState({departments: this.state.departments.filter(d => d.id !== id)})
    }
  )
}

  render() {
    return(

      <Container>
        {this.state.departments.map(d => {
          if (this.props.editDepartments) {
            return (
            <div style={styles.departments}>
              <img style={styles.departmentImages} src={d.imageUrl} />
              <EditDepartmentForm id={d.id} name={d.name} description={d.description} imageUrl={d.imageUrl} editDepartment={this.editDepartment} deleteDepartment={this.deleteDepartment} /> 
            </div>
            )
          } else {
            return(
            <Link key={d.id} to={`/department/${d.id}/products`}>
              <div style={styles.departments}>
                <img style={styles.departmentImages} src={d.imageUrl} />
                <h1 style={styles.title}>{d.name}</h1>
              </div>
            </Link>
            )  
          }
        })}
        <Button style={{borderRadius: 0, background: "white", color: "#212163", marginLeft: "10px"}} onClick={this.openModal}><Icon name="add" />New Department</Button>
        <Modal open={this.state.modalOpen} >
          <Modal.Header>
            New Department
          </Modal.Header>
          <Modal.Content>
            <NewDepartmentForm closeModal={this.closeModal} addDepartment={this.addDepartment} />
          </Modal.Content>
        </Modal>
        <hr />
        <br />
        <br />
        <br />
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
    background: "white"
  },
  departmentImages: {
    height: "100%",
    borderRight: "solid lightgrey 30px"
  },
  title: {
    fontSize: "4em",
    marginLeft: "20px"
  }
}

export default Home