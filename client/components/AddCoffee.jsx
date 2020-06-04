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
  }

  render(){
    return (
      <div>
        <input type="text" value={''}/>
        <select multiple={true} >
          <option value="grapefruit">Grapefruie</option>
          <option value="pineapple">pineapple</option>
          <option value="banana">banana</option>
          <option value="banana">apple</option>
        </select>
        <button>Add a Coffee</button>
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