import React, { useRef } from "react"

import style from "../static/css/labeledInputField.module.css"

export default function labeledInputField(props) {
  let inputRef = useRef(null)

  const setInputStyle = (color = "#ffb82e") => {
    inputRef.current.parentElement.style.setProperty("--label-color", color)
    inputRef.current.style.cssText = `border-bottom: 2px solid ${color}`
  }

  const handleInput = (e) => {
    let valid = props.handleInputChange(props.inputName, e.target.value)

    if (valid) {
      setInputStyle()
    } else {
      setInputStyle("#f00")
    }
  }

  return (
    <div
      className={style["labeled-text-input-box"]}
      input-name={props.label}
      {...(props.style && { style: props.style })}>
      <input
        type="text"
        name={props.inputName}
        placeholder={props.placeholder ? props.placeholder : " "}
        ref={inputRef}
        defaultValue={props.defaultValue}
        onChange={(e) => handleInput(e)}
        {...(props.value && { value: props.value })}
        {...(props.inputType && { type: props.inputType })}
        {...(props.inputType == "password" && {
          autoComplete: "current-password",
        })}
      />
    </div>
  )
}
