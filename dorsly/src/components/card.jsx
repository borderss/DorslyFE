import React from 'react'
import style from "../static/css/card.module.css"

export default function card(props) {
  return (
    <>

    {props.data.map((item) => ( 
        <div className='conteiner'>
            <div>
                {item.star}
            </div>
         <img src={item.imgurl} alt="" />
            <div>
                {item.hastags.map((text) =>(
                    <p>{text}</p>
                ))}
            </div>
    <div>
        {item.name}
    </div> 
    <div>
        {item.desc}
    </div>
    <div>
        <svg></svg>
        <p>{item.time}</p>
    </div>
    <div>
        {item.place}
    </div>
    <div>
        {item.seats}
    </div>
    <div>
        {item.gps}
    </div>
    <div>
        {item.comments}
    </div>
        </div>
))}
    </>
  )
}