import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import UserContextProvider from "./contexts/userContext"
import CartContextProvider from "./contexts/cartContext"
import PopupContextProvider from "./contexts/popupContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <CartContextProvider>
        <PopupContextProvider>
          <App />
        </PopupContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  </React.StrictMode>
)
