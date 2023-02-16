import React from "react"

import "../static/css/general.css"
import style from "../static/css/instruction.module.css"

import Header from "../components/header"

export default function instruction() {
  return (
    <>
      <Header />

      <div className={style["container"]}>
        <div>
        <h1>
        Administrācijas lapas navigācijas aile
        </h1>
        <p> Admina lapa ir 5 opcijas kuras atrodas kreseja ekrāna pusē, users, 
    points of intrest, reservation, pre-purchases, review.
    Kad rediģē kādu no irekastiem tā aile iedegas orandža.
    points of intrest pašlaik nestrādā.</p>
      </div>
        <br/>

    <h1>Admin lapas datu izvade</h1>
    <p>Users opcijā var redzēt lietotāju id, vārdus(name), 
    telefona numurus, e-pastus, vai ir admins, reģistrācijas laiku, pēdējas izmaiņas
    reservation opcijā ir redzams id, account id, reservācijas datumu, 
    rezervācijas laiku, cik cilvēki ieradīsies uz rezervāciju, 
    pre-purchases opcijā var redzēt id, account id, reservation id, 
    pre-purchases date, pre-purchases time,
    reviews opcijā var redzēt id, name, surname, account id, poi id, text
    Visām šis opcijas arī var gan editot gan izdzēst.</p>

    <br/>
    <h1>Profila lapas esošais progress</h1>
    <p>Profila lapa ir redzmas rezervāciju skaits, cik daudz review esat ielikuši un cik naudu jūs esat iztērējuši.
    Zem vārda un uzvārda ir redzamas rezervācijas, reviews ratings un settingu ailes, lai zinātu kurā jūs atrodaties zem ieietās ailes iedegas orandža līnija, un poga logout ar kuru varat izrakstīties no konta.</p>
    <br/>

    <h1>
      RATING
        </h1>
        <p>  Ieejot restorānā mājas lapiņa , jūs ieraudzisiet 6-šu zvaigžņu reitinga skalu  , ar kuru palīdzību jūs varat ērti novērtēt restorānu , gan vienkārši uzvilkot ar peli uz jūsu vērtējumu , gan uzklikšķinot uz atbilstoša zvaigznīša </p>
        <br/>

        <h1>
        RESERV
        </h1>
        <p> Izvēlējāmies nepieciešamo datumu , vai uzklikšķinot uz kalendāra, vai paši ierakstot nepieciešamos datus , laiku un cilvēku skaitu . Uzspiežam reserve podziņu , un mēs esam veiksmīgi rezervējuši galdiņu </p>
        <br/> 

        <h1>
        REST. INFO
        </h1>
        <p> Izvēlējāmies info sadaļu , un tur mēs ieraudzam : restorāna aprakstu un restorāna lokaciju , kuru mēs karti varam apskatīt precīzāk </p>
        <br/>

        <h1>
        REV. COMMENTS 
        </h1>
        <p> Ieejot komentāra/reitinga sadaļu , varam atstāt savu komentāru , kurām jābūt vismaz 10 simboliem un ne vairāk par 255 simboliem , arī varam apskatīt jau esošu komentārus vai izdzēst savējo</p>
        <br/>

        <h1>
        PRODUCT PURCHASE  
        </h1>
        <p> Produktu sadaļā , varam apskatīt un  izvēlēties pārtiku , uzspiežot uz tā mes viņu uzreiz pievienojam grozā . Grozā iekšā varam ieraudzīt kopējo summu , kā arī izvēlēties pārtikas daudzumu , izņemot produktu no groza , viņš automātiski arī noņemas no summas kā arī noņemas no galvenās lapas Uzspiežot "Pay now" pogu , mūs uzreiz aizsūtīt uz online apmaksu. Teksts ko likt tajā aprakstā ^</p>
        <br/>

      </div>
    </>
  )
}
