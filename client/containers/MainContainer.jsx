import React, { Component } from 'react';
import CoffeeCard from '../components/CoffeeCard'
import AddCoffee from '../components/AddCoffee'

// make fetch request then display for each row

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coffees: [],
    }
    this.clickHandler = this.clickHandler.bind(this)
  }
  clickHandler(e) {

    console.log('clicked, e: ',e) 
    fetch('/api', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        roaster_id: 34,
        "bean_name": "coffee from client side!",
        "bean_origin": "8080",
        "roast_date": "2020-11-19",
        "brew_details": "JSON in, output?? ",
        "rating": "unknown",
        "test": "testvalue"
    })})
      .then(res => {
        console.log('received response')
        console.log(res)
        return res.json()})
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log('err in mainContainer post ', err))
  }

  componentDidMount() {
    console.log('component mounted')
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        console.log('data from fetch request: ', data);
        this.setState({coffees: data})
      })
      .catch(err => console.log('err in mainContainer fetch ', err))
  }

  render() {
    const coffeeCards = this.state.coffees.map(el => {
      return <CoffeeCard 
      key={`coffee_id: ${el._id}`}
      name={el.bean_name}
      origin={el.origin}
      rating={el.rating}
      roastDate={el.roast_date}
      roasterId={el.roaster_id}
      />
    })
    return (

      <div>
        <h2>i'm a main container!</h2>
        <button onClick={this.clickHandler}>handleckick</button>
        <AddCoffee/>
        {coffeeCards}
    </div>
    );
  }


}


export default MainContainer;