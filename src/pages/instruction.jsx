import React, { useContext } from "react"

import "../static/css/general.css"
import style from "../static/css/instruction.module.css"

import Header from "../components/header"

import { UserContext } from "../contexts/userContext"

export default function instruction() {
  const { user } = useContext(UserContext)

  return (
    <>
      <Header />

      <div className={style["container"]}>
        <div className={style["button_container"]}>
          {user?.is_admin == true && (
            <>
              <a href="#admin nav">Administrācijas lapas navigācijas aile </a>
              <a href="#admin lapa">Admin lapas datu izvade </a>
            </>
          )}
          <a href="#register">Reģistrēšanās </a>
          <a href="#login">Autorizēšanās (login) </a>
          <a href="#profila">Profila lapas esošais progress </a>
          <a href="#reitngs">Reitngs </a>
          <a href="#rezervacija">Rezervacija </a>
          <a href="#restorans">Restorāna informācija </a>
          <a href="#rezervacijas-kommenti">Rezervācijas kommenti </a>
          <a href="#produkt">Produktu lapa </a>
        </div>
        <div>
          {user?.is_admin == true && (
            <>
              <h1 id="admin nav">Administrācijas lapas navigācijas aile</h1>
              <p>
                Admina lapa ir 5 opcijas kuras atrodas kreseja ekrāna pusē,
                users, points of intrest, reservation, pre-purchases, review.
                Kad rediģē kādu no irekastiem tā aile iedegas orandža. points of
                intrest pašlaik nestrādā.
              </p>
              <br />

              <h1 id="admin lapa">Admin lapas datu izvade</h1>
              <p>
                Users opcijā var redzēt lietotāju id, vārdus(name), telefona
                numurus, e-pastus, vai ir admins, reģistrācijas laiku, pēdējas
                izmaiņas reservation opcijā ir redzams id, user id,
                reservācijas datumu, rezervācijas laiku, cik cilvēki ieradīsies
                uz rezervāciju, pre-purchases opcijā var redzēt id, user id,
                reservation id, pre-purchases date, pre-purchases time, reviews
                opcijā var redzēt id, name, surname, user id, poi id, text
                Visām šis opcijas arī var gan editot gan izdzēst.
              </p>
              <br />
            </>
          )}

          <h1 id="register">Reģistrēšanās</h1>
          <p>
            Reģistrēšanās ir ļoti vienkārša, jums ir jāievada vārds, uzvārds,
            e-pasts, telefona numurs, parole un jāapstiprina paroles. Kad
            reģistrējāties jūs tiekiet novirzīti uz login lapu, kur jums ir
            jāievada e-pasts un parole, lai ielogotos. Jāņem vērā:
            <ul>
              <li>Jūsu parolei jābūt vismaz 9 simbolu garai</li>
              <li>
                Jūsu e-pastam jābūt unikālam šajā sistēmā. Ja jums jau ir
                reģistrēts konts ar šādu e-pastu, tad jums ir jāizmanto tas
                e-pasts, lai ielogotos.
              </li>
              <li>
                Telefona numuram ir jāsastāv no divām daļām: <br />
                valsts kods numurs, piemēram <b>+371 12345678</b>
              </li>
            </ul>
          </p>
          <br />

          <h1 id="login">Autorizēšanās (login)</h1>
          <p>
            Autorizēšanās, jeb logins ir ļoti vienkāršs, jums ir jāievada
            e-pasts un parole, lai ielogotos. Jāņem vērā:
            <ul>
              <li>
                Jūsu e-pastam jābūt unikālam šajā sistēmā. Ja jums jau ir
                reģistrēts konts ar šādu e-pastu, tad jums ir jāizmanto tas
                e-pasts, lai ielogotos.
              </li>
            </ul>
          </p>
          <br />

          <h1 id="profila">Profila lapas esošais progress</h1>
          <p>
            Profila lapa ir redzmas rezervāciju skaits, cik daudz review esat
            ielikuši un cik naudu jūs esat iztērējuši. Zem vārda un uzvārda ir
            redzamas rezervācijas, reviews ratings un settingu ailes, lai zinātu
            kurā jūs atrodaties zem ieietās ailes iedegas orandža līnija, un
            poga logout ar kuru varat izrakstīties no konta.
          </p>
          <br />

          <h1 id="reitngs">Reitngs</h1>
          <p>
            {" "}
            Ieejot restorānā mājas lapiņa , jūs ieraudzisiet 6-šu zvaigžņu
            reitinga skalu , ar kuru palīdzību jūs varat ērti novērtēt restorānu
            , gan vienkārši uzvilkot ar peli uz jūsu vērtējumu , gan
            uzklikšķinot uz atbilstoša zvaigznīša.
          </p>
          <br />

          <h1 id="rezervacija">Rezervacija</h1>
          <p>
            {" "}
            Izvēlējāmies nepieciešamo datumu , vai uzklikšķinot uz kalendāra,
            vai paši ierakstot nepieciešamos datus , laiku un cilvēku skaitu .
            Uzspiežam reserve podziņu , un mēs esam veiksmīgi rezervējuši
            galdiņu.
          </p>
          <br />

          <h1 id="restorans">Restorāna informācija</h1>
          <p>
            {" "}
            Izvēlējāmies info sadaļu , un tur mēs ieraudzam : restorāna aprakstu
            un restorāna lokaciju , kuru mēs karti varam apskatīt precīzāk.
          </p>
          <br />

          <h1 id="rezervacijas-kommenti">Rezervācijas kommenti</h1>
          <p>
            {" "}
            Ieejot komentāra/reitinga sadaļu , varam atstāt savu komentāru ,
            kurām jābūt vismaz 10 simboliem un ne vairāk par 255 simboliem , arī
            varam apskatīt jau esošu komentārus vai izdzēst savējo.
          </p>
          <br />

          <h1 id="produkt">Produktu lapa</h1>
          <p>
            {" "}
            Produktu sadaļā , varam apskatīt un izvēlēties pārtiku , uzspiežot
            uz tā mes viņu uzreiz pievienojam grozā . Grozā iekšā varam
            ieraudzīt kopējo summu , kā arī izvēlēties pārtikas daudzumu ,
            izņemot produktu no groza , viņš automātiski arī noņemas no summas
            kā arī noņemas no galvenās lapas Uzspiežot "Pay now" pogu , mūs
            uzreiz aizsūtīt uz online apmaksu. Teksts ko likt tajā aprakstā.
          </p>
          <br />
        </div>
      </div>
    </>
  )
}
