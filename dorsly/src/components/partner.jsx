import React from "react"

import style from "../static/css/partner.module.css"

import PartnerExample from "/assets/svg/partner_example.svg"

export default function partner() {
  return (
    <div className={style["partnerscontainer"]}>
      <h1 className={style["partnerstitle"]}> | Partners</h1>
      <div className={style["allpartners"]}>
        <div>
          <div>
            <img src={PartnerExample} alt="" />
          </div>
          <div>
            <img src={PartnerExample} alt="" />
          </div>
        </div>
        <div>
          <div>
            <img src={PartnerExample} alt="" />
          </div>
          <div>
            <img src={PartnerExample} alt="" />
          </div>
          <div>
            <img src={PartnerExample} alt="" />
          </div>
        </div>
        <div>
          <div>
            <img src={PartnerExample} alt="" />
          </div>
          <div>
            <img src={PartnerExample} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
