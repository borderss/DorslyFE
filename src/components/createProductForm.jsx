import React, { useContext, useRef, useState } from "react"
import { apiMethod } from "../static/js/util"

import style from "../static/css/createProductForm.module.css"
import LabeledInputField from "./labeledInputField"

import { PopupContext } from "../contexts/popupContext"
import { UserContext } from "../contexts/userContext"

export default function CreateProductForm(props) {
  const { createPopup } = useContext(PopupContext)
  const { user, token } = useContext(UserContext)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const formRef = useRef(null)

  const onSubmit = async (e) => {
    e.preventDefault()

    if (loading) {
      return
    }

    setLoading(true)

    const data = new FormData()
    data.append("name", name)
    data.append("description", description)
    data.append("ingredients", ingredients)
    data.append("price", price)
    data.append("image", image)
    data.append('_method', 'PUT');

    await apiMethod("/business/createProduct" , {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data
    })
      .then((data) => {
        createPopup("Product created", "success")
      })
      .catch((error) => {
        createPopup("Failed to create product", "error")
      })
    
    if (props.onClose) {
      props.onClose()
    }
    setLoading(false)
  }


  return (
    <div className={style['form']}>
      <h2>Create Product</h2>
      <hr />
      <form ref={formRef} onSubmit={onSubmit}>
        <LabeledInputField
          label="Name"
          inputName="name"
          handleInputChange={(name, value) => {
            if (value.length > 255) {
              return false
            }

            setName(value)
            return true
          }}
        />
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="7"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <LabeledInputField
          label="Ingredients"
          inputName="ingredients"
          handleInputChange={(name, value) => {
            if (value.length > 255) {
              return false
            }

            setIngredients(value)
            return true
          }}
        />
        <LabeledInputField
          label="Price"
          inputName="price"
          inputType="number"
          step="0.01"
          handleInputChange={(name, value) => {
            if (value < 0) {
              return false
            }

            setPrice((parseFloat(value)).toFixed(2))
            return true
          }}
        />

        <label htmlFor="image">Image</label>
        <div className={style['input_container']}>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {error && <p className={style['error_msg']}>{error}</p>}

        <button
          type="submit"
          disabled={
            name.length === 0 ||
            description.length === 0 ||
            ingredients.length === 0 ||
            price.length === 0 ||
            image.length === 0 ||
            loading
          }
        >Create</button>
      </form>
    </div>
  )
  
}