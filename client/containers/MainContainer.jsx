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
    this.updateList = this.updateList.bind(this);
  }

  componentDidMount() {
    console.log('component mounted')
    this.updateList()
  }

  updateList () {
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
      .then(this.updateList())
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
        <AddCoffeeHooks updateList={this.updateList}/>
        {coffeeCards}
    </div>
    );
  }


}


export default MainContainer;