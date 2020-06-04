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
  }

  componentDidMount() {
    console.log('component mounted')
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        console.log('data from get all coffees request: ', data);
        this.setState({coffees: data})
      })
      .catch(err => console.log('err in mainContainer fetch ', err))
  }

  render() {
    const coffeeCards = this.state.coffees.reverse().map(el => {
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
        <AddCoffee/>
        {coffeeCards}
    </div>
    );
  }


}


export default MainContainer;