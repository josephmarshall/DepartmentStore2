import React from 'react'
import { Button, Icon} from 'semantic-ui-react'

class Cart extends React.Component {

  // componentDidMount(){
  //   this.setState({cartData: this.props.cartData})
  // }

  render(){
    return(
    <div style={{width: "30%", display: "flex", flexDirection: "column"}}>
      <h3>Your Shopping Cart</h3>
      {(this.props.cartData.items.length > 0) && 
          this.props.cartData.items.map(i=>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span>{i.name}</span>
        <span>
          <span>${parseFloat(i.price).toFixed(2)}</span>
          <Icon name="delete" color="red"/>
        </span>
      </div>)}
      <div>
      <hr />
        <div style={{fontSize: "1.2em", marginRight: "20px", textAlign: "right"}}>Total: ${this.props.cartData.total}</div>
      </div>
      <br />
    <Button style={{background: "white", border: "solid grey 2px"}}><Icon color="green" name="money bill alternate" />Proceed to Checkout</Button>
    </div>
    )
  }
}

export default Cart
