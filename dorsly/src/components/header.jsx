import React from 'react'
import '../static/header.css'

export default function header() {
  return (

    <div className='navbar'>
      <div>
        <div className='dorsly-logo'>
          <img src="/assets/svg/dorslyheader.svg" alt="Dorsly" /> 
        </div>
        <div>
          About us 
        </div>
        <div>
          Contact
        </div>
        <div>
          Reserve now
        </div>
        <div>
          <img src="/assets/svg/search.svg" alt="Search" />
        </div>
      </div>
      <div>
        <div>
          Log in
        </div>
        <div>
          Register
        </div>
        <div>
          <img src="/assets/svg/gps.svg" alt="GPS" />
        </div>
      </div>
    </div>
  )
}
