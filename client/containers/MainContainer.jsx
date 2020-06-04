import React, { Component } from 'react';
import CoffeeCard from '../components/CoffeeCard';
import AddCoffee from '../components/AddCoffee';
import AddCoffeeHooks from '../components/AddCoffeeHooks'
// make fetch request then display for each row

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coffees: [],
    };
    this.deleteCoffee = this.deleteCoffee.bind(this);
    
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



  deleteCoffee(el, e) {
    console.log('delete clicked', el.coffeeId)

    fetch('/api', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({coffeeId: el.coffeeId})
    })
      .then(res => {if (res.status === 204) alert('coffee has been deleted')})
      .then(() => {
        const newCoffees = this.state.coffees.filter(coffee => {
          if (coffee._id === el.coffeeId) return false;
          return true;
        }).reverse();
        this.setState({coffees: newCoffees})
        console.log(this.state.coffees)
      })
  }

  render() {
    const coffeeCards = this.state.coffees.reverse().map(el => {
      return <CoffeeCard 
      key={`coffee_id: ${el._id}`}
      name={el.bean_name}
      origin={el.bean_origin}
      rating={el.rating}
      roastDate={el.roast_date}
      roaster_id={el.roaster_id}
      brew_details={el.brew_details}
      deleteCoffee={this.deleteCoffee}
      coffeeId={el._id}
      />
    })
    return (

      <div>
        {/* <AddCoffee/> */}
        <AddCoffeeHooks/>
        {coffeeCards}
    </div>
    );
  }


}


export default MainContainer;