import React from "react"

import style from "../static/css/footer.module.css"

import dorslyLogo from "/assets/svg/dorslylogo.svg"

export default function footer() {
  return (
    <div className={style["footer-main"]}>
      <div className={style["container"]}>
        <div className={style["footer-right"]}>
          <h2>Get in touch</h2>
          <p7>support@dorsly.com</p7>
          <p8>20001234</p8>
        </div>

        <div className={style["footer-middle-right"]}>
          <h1>Follow us</h1>
          <p5>@Dorsly_</p5>
          <p6>@Dorsly_</p6>
        </div>

        <div className={style["footer-middle"]}>
          <p3>
            Sign up to our newsletter to get to know about the newest deals and
            discounts!
          </p3>
          <form>
            <input
              type="text"
              className={style["email-text"]}
              placeholder="example@gmail.com"
            />
            <button type="submit" className={style["email-submit"]}>
              Subscribe
            </button>
          </form>
        </div>

        <div className={style["footer-left"]}>
          <img className={style["footer-logo"]} src={dorslyLogo} />
          <p2>We make reservation an easy ordeal for everyone involved.</p2>
        </div>

        <div className={style["bottom-line"]} />

        <div className={style["bottom-row"]}>
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
