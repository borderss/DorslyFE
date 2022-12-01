import React from "react"

import "../static/footer.css"
import dorslyLogo from "/assets/svg/dorslylogo.svg"

export default function footer() {
  return (
    <div className="footer-main">
      <div className="container">
        <div className="footer-right">
          <h2>Get in touch</h2>
          <p7>support@dorsly.com</p7>
          <p8>20001234</p8>
        </div>

        <div className="footer-middle-right">
          <h1>Follow us</h1>
          <p5>@Dorsly_</p5>
          <p6>@Dorsly_</p6>
        </div>

        <div className="footer-middle">
          <p3>
            Sign up to our newsletter to get to know about the newest deals and
            discounts!
          </p3>
          <form>
            <input
              type="text"
              className="email-text"
              placeholder="example@gmail.com"
            />
            <button type="submit" className="email-submit">
              Subscribe
            </button>
          </form>
        </div>

        <div className="footer-left">
          <img className="footer-logo" src={dorslyLogo} />
          <p2>We make reservation an easy ordeal for everyone involved.</p2>
        </div>

        <div className="bottom-line" />

        <div className="bottom-row">
          <p1>© 2022 Dorsly, Inc. - All rights reserved.</p1>
          <ul>
            <li>
              <a href="/termsofservices">Terms of Services</a>
              <a href="/privacypolicy">Privacy policy</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
