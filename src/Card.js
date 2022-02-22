import React from 'react'
import "./Card.css"

function Card({_item}) {
  return (
    <div className='card'>
        <img src={_item?.images[0]?.url} alt="" />
        <h4>{_item?.name}</h4>
    </div>
  );
}
export default Card