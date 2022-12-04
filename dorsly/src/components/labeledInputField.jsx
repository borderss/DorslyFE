import React from "react"

import style from "../static/css/labeledInputField.module.css"

export default function labeledInputField(props) {
  return (
    <div className={style["labeled-text-input-box"]} input-name={props.label}>
      <input
        type="text"
        name={props.inputName}
        placeholder={props.placeholder ? props.placeholder : " "}
      />
    </div>
  )
}
