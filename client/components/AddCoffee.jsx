import React, { useState, Component } from 'react';

class AddCoffee extends Component {
  constructor(props){
    super(props);
    this.state = {
      roaster: 1,
      bean_name: '',
      bean_origin: '',
      roast_date: '',
      brew_details: '',
      rating: '',
    }
    this.handleChange= this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e){
    const targetName = e.target.name;
    const value = e.target.value;
    this.setState({[targetName]: value});
  }
  handleClick(e){
    // do this
    console.log('state: ', this.state)
  }

  render(){
    const {roaster, bean_name, bean_origin, roast_date, brew_details, rating} = this.state;
    return (
      <div className="coffeeForm">

        <div className="roaster-entry">
        <label htmlFor="roaster">Roaster: </label>
        <select  name="roaster" value={this.state.roaster} onChange={this.handleChange}>
            <option value="1">Vesta</option>
            <option value="2">Mothership</option>
            <option value="3">Dark Moon</option>
          </select>

          {/* <input name="roaster" type="text" value={roaster}/> */}
        </div>
        <div className="bean_name-entry">
          <label htmlFor="bean_name">Bean Name: </label>
          <input name="bean_name" type="text" value={bean_name} onChange={this.handleChange}/>
        </div>
        <div className="bean_origin-entry">
          <label htmlFor="bean_origin">Bean Origin: </label>
          <input name="bean_origin" type="text" value={bean_origin} onChange={this.handleChange}/>
        </div>
        <div className="roast_date-entry">
          <label htmlFor="roast_date">Roast Date: </label>
          <input name="roast_date" type="text" value={roast_date} onChange={this.handleChange}/>
        </div>
        <div className="brew_details-entry">
          <label htmlFor="brew_details">Brew Parameters: </label>
          <input name="brew_details" type="text" value={brew_details} onChange={this.handleChange}/>
        </div>
        <div className="rating-entry">
          <label htmlFor="rating">Rating: </label>
          <input name="rating" type="text" value={rating} onChange={this.handleChange}/>
        </div>

          <button onClick={this.handleClick}>Add a Coffee</button>
      </div>
    );
  
  }
}

// const AddCoffee = (props) => {
//   const formData = 
//   return (
//     <div>
//       <input type="text" value={''}/>
//       <select multiple={true} >
//         <option value="grapefruit">Grapefruie</option>
//         <option value="pineapple">pineapple</option>
//         <option value="banana">banana</option>
//         <option value="banana">apple</option>
//       </select>
//       <button>Add a Coffee</button>
//     </div>
//   );
// }

export default AddCoffee;