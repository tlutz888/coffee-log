import React, { useState, Component } from 'react';

const AddCoffee = (props) => {

  const [details, setDetails] = useState({
    roaster_id: 1,
    bean_name: '',
    bean_origin: '',
    roast_date: Date.now(),
    brew_details: '',
    rating: '',
    add_roaster: '',
  });

  const handleChange = (e) => {
    const targetName = e.target.name;
    const value = e.target.value;
    setDetails({
      ...details,
      [targetName]: value
    });
  }

  const handleClick = (e) => {
    // do this
    console.log('clicked, e: ',e) ;
    // console.log('state: ', this.state)
    const {roaster_id, bean_name, bean_origin, brew_details, rating} = details;
    let { roast_date } = details;
    roast_date = new Date(roast_date);
    const reqData = {
      roaster_id, 
      bean_name, 
      bean_origin, 
      roast_date, 
      brew_details, 
      rating
    }

    fetch('/api', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(reqData)})
      .then(res => {
        console.log('received response')
        return res.json()})
      .then(data => {
        console.log(data);
        console.log(props)
        props.updateList();
      })
      .catch(err => console.log('err in mainContainer post ', err))
  }

  const addRoaster = (e) => {
    console.log(e.target.value)
    const newRoaster = e.target.value;
    if (newRoaster === '') return;
    fetch('/roasters', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({name: newRoaster})})
      .then(console.log('clicked'))
    
    
  }

  const {roaster_id, bean_name, bean_origin, brew_details, rating} = details;
  let { roast_date } = details;
  roast_date = new Date(roast_date)

  const roasterList = props.roasters.map(roaster => {
    return <option value={roaster._id}>{roaster.name}</option>
  })

  return (
    <div className="coffeeForm">
      <h2>Enter New Coffee: </h2>

      <div className="roaster-entry">
        <label htmlFor="roaster_id">Roaster: 
          <button onClick={addRoaster}>
            Add: 
            <label htmlFor="add_roaster"></label>
            <input name="add_roaster" type="text" onChange={handleChange} value={details.add_roaster}/>
          </button>
        </label>
        <select  name="roaster_id" value={details.roaster_id} onChange={handleChange}>
          {roasterList}
        </select>
      </div>

      <div className="bean_name-entry">
        <label htmlFor="bean_name">Bean Name: </label>
        <input name="bean_name" type="text" value={bean_name} onChange={handleChange}/>
      </div>

      <div className="bean_origin-entry">
        <label htmlFor="bean_origin">Bean Origin: </label>
        <input name="bean_origin" type="text" value={bean_origin} onChange={handleChange}/>
      </div>

      <div className="roast_date-entry">
        <label htmlFor="roast_date">Roast Date: </label>
        <input name="roast_date" type="text" value={roast_date.toLocaleDateString()} onChange={handleChange}/>
      </div>

      <div className="brew_details-entry">
        <label htmlFor="brew_details">Brew Parameters: </label>
        <input name="brew_details" type="text" value={brew_details} onChange={handleChange}/>
      </div>
      
      <div className="rating-entry">
        <label htmlFor="rating">Rating: </label>
        <input name="rating" type="text" value={rating} onChange={handleChange}/>
      </div>

        <button onClick={handleClick}>Add a Coffee</button>
    </div>
  );

}

export default AddCoffee;