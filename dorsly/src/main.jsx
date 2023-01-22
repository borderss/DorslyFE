import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import UserContextProvider from "./contexts/userContext"
import CartContextProvider from "./contexts/cartContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </UserContextProvider>
  </React.StrictMode>
)
