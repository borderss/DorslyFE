import React from "react";
import '../static/css/labeledInputField.css'

export default function labeledInputField(props) {
  return (
    <div className="labeled-text-input-box" input-name={props.label}>
      <input type="text" name={props.inputName} placeholder={props.placeholder ? props.placeholder : " "}/>
    </div>
  )
}
