import React, { useRef } from "react"

import style from "../static/css/labeledInputField.module.css"

export default function labeledInputField(props) {
  let inputRef = useRef(null)

  const setInputStyle = (color = "#ffb82e") => {
    inputRef.current.parentElement.style.setProperty("--label-color", color)

    console.log(inputRef.current.parentElement.style)

    inputRef.current.style.cssText = `border-bottom: 2px solid ${color}`
  }

  const handleInput = (e) => {
    let valid = props.handleInputChange(props.inputType, e.target.value)

    if (valid) {
      setInputStyle()
    } else {
      setInputStyle("#f00")
    }
    console.log(valid)
  }

  return (
    <div className={style["labeled-text-input-box"]} input-name={props.label}>
      <input
        type="text"
        name={props.inputName}
        placeholder={props.placeholder ? props.placeholder : " "}
        ref={inputRef}
        onChange={(e) => handleInput(e)}
        {...(props.inputType ? { type: props.inputType } : {})}
      />
    </div>
  )
}
