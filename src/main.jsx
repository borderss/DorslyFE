import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import CartContextProvider from "./contexts/cartContext"
import PopupContextProvider from "./contexts/popupContext"
import UserContextProvider from "./contexts/userContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <CartContextProvider>
      <PopupContextProvider>
        <App />
      </PopupContextProvider>
    </CartContextProvider>
  </UserContextProvider>
)
