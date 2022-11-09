import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState("")
  const [userid, setUserid] = useState(1)

  const fetchData = () => {
    fetch(`https://reqres.in/api/users/${userid}`)
      .then(response => response.json())
      .then(data => setData(data.data))
      .catch(error => console.log("pizdec: ", error))
  }

  useEffect(() => {
    fetchData()
  }, [userid]);

  return (
    <div className="App">
      {JSON.stringify(data)}<br/>
      <button onClick={() => {setUserid(userid + 1)}}>next user</button>
      <button onClick={() => {setUserid(userid - 1)}}>previous user</button>
      
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