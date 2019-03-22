import React from 'react'
import { NavLink, } from 'react-router-dom'
import { Button, } from 'semantic-ui-react'

const Splashpage = () => (
  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100vw", background: "#212163", minHeight: "100vh" }}>
    <hr style={{width: "80%"}}/>
    <h1 style={{ fontSize: "8em", color: "white", textAlign: "center", marginBottom: 0 }} >Gramble, Miller, & Bernank</h1>
    <h2 style={{ fontSize: "6em", fontFamily: "snell roundhand, cursive", color: "white", textAlign: "center", marginTop: 10 }} >Purveyor of Fine Merchandise</h2>
    <hr style={{width: "80%"}}/>
    <br />
    <br />
    <br />
    <Button style={{background: "white", border: "solid grey 2px"}} as={NavLink} to="/departments" >Begin Your Adventure</Button>
  </div>
)

export default Splashpage
