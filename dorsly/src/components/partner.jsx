import React from 'react'
import "../static/partner.css"
import PartnerExample from "/assets/svg/partner_example.svg"

export default function partner() {
  return (
    <div className='partnerscontainer'>
        <h1 className='partnerstitle'> | Partners</h1>
        <div className='allpartners'>
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
