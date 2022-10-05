import { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 30)}>
          count is {count}
        </button>
        <p>
          Testing
        </p>
      </div>
      <p className="read-the-docs">
        This is a student group project, still a work in progress. <strong>All current and future listed products, services, etc, ARE NOT REAL PRODUCTS OR SERVICES</strong>, all listed products, services, etc, are example products intended to showcase the payment system for the purposes of a school project, without exceptions. We seriously suggest that you <strong>do not make payments through our system unless you are informed of the purpose of the project.</strong>
        <br/>
        <br/>
        This warning has been added to comply with <span style={{'fontWeight': 550, 'color': '#6772E5'}}>Stripe</span> payment gateway terms of use.
      </p>
    </div>
  )
}

export default App