import React from "react"

import style from "../static/css/informationCard.module.css"

export default function InfoCard(props) {
    return (
        <div className={style["Card"]}>
            <img className={style["Logo"]} src={props.icon}/>

            <h3>{props.title}</h3>

            <p>{props.text}</p>

        </div>
    )
}
