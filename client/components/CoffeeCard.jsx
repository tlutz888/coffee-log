import React from 'react';

// const CoffeeCard = ({name, origin, rating, roastDate, roasterId}) => {
const CoffeeCard = (props) => {
  const details = Object.entries(props).map(el => {
    if (el[0] === 'roastDate') {
      el[1] = new Date(el[1])
      el[1] = el[1].toLocaleDateString()
    }
    if (el[0] === 'deleteCoffee') return;
    return <li key={`coffee ${props._id} ${el[0]}`}>{`${el[0]}: ${el[1]}`}</li>
  })


  return (
    <div className="CoffeeCard">
      <ul>
        {details}
      </ul>
      <button onClick={(e) => {
        props.deleteCoffee(props, e)}}>Delete Coffee</button>
    </div>
  )
}

export default CoffeeCard;