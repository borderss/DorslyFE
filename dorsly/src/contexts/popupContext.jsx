import React, { createContext, useEffect, useMemo, useState } from "react"

import style from "../static/css/popup.module.css"

import errorIcon from "/assets/svg/popupError.svg"
import infoIcon from "/assets/svg/popupInfo.svg"
import successIcon from "/assets/svg/popupSuccess.svg"
import warningIcon from "/assets/svg/popupWarning.svg"

export const PopupContext = createContext()

export default function PopupContextProvider(props) {
  const removeHandler = (index) => {
    let popupCard = document.querySelectorAll('.' + style['popup-card-container'])[0].querySelector('.' + style['popup-card'])

    popupCard.classList.add(style["remove"])

    setTimeout(() => {
      // popupCard.parentElement.remove()

      setPopupData((oldPopupData) => {
        let newPopupData = [...oldPopupData]

        console.log(newPopupData)
        newPopupData.shift()

        return newPopupData
      })
    }, 500)
  }

  const [popupData, setPopupData] = useState([])
  const [popupCards, setPopupCards] = useState([])

  useEffect(() => {
    var popupCardArr = popupData?.map((popup, i) => {
      var iconDecal

      if (popup.intonation == "warning") {
        iconDecal = warningIcon
      } else if (popup.intonation == "success") {
        iconDecal = successIcon
      } else if (popup.intonation == "error") {
        iconDecal = errorIcon
      } else {
        iconDecal = infoIcon
      }

      return (
        <div key={i} className={style["popup-card-container"]}>
          <div
            id={`popup-item-${popup.id}`}
            className={
              popupCards.length > 0
                ? style["popup-card"]
                : [style["popup-card"], style["float-in"]].join(" ")
            }>
            <div className={style["popup-card-header"]}>
              <div className={style["popup-card-icon"]}>
                <img src={iconDecal} />
              </div>
              <div className={style["popup-card-title"]}>{popup.title}</div>
            </div>
            <div className={style["popup-card-body"]}>{popup.description}</div>
            <div className={style["popup-card-footer"]}>
              {popup.buttons.map((btn, index) => {
                return (
                  <button
                    className={style[`popup-card-button ${btn?.style}`]}
                    key={index}
                    onClick={(e) => btn?.onClick(popup.id)}>
                    {btn?.text}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )
    })

    setPopupCards(popupCardArr)

    document.querySelectorAll('.' + style["popup-card-container"]).forEach((popupCardContainer) => {
      document.querySelectorAll('.' + style["popup-card-container"]).length > 1 && (
        popupCardContainer.querySelector('.' + style["popup-card"]).classList.remove(style["remove"])
      )
    })
  }, [popupData])

  const createPopup = (
    title,
    descriptionHTML,
    intonation,
    primaryButtonText,
    primaryButtonHandler,
    secondaryButtonText = null,
    secondaryButtonHandler = null
  ) => {
    var iconDecal

    if (intonation == "warning") {
      iconDecal = warningIcon
    } else if (intonation == "success") {
      iconDecal = successIcon
    } else if (intonation == "error") {
      iconDecal = errorIcon
    } else {
      iconDecal = infoIcon
    }

    const newPopup = {
      id: popupData.length,
      title: title,
      description: descriptionHTML,
      icon: iconDecal,
      intonation: intonation,
      buttons: [
        {
          text: primaryButtonText,
          style: "primary",
          onClick: (index) => {
            primaryButtonHandler()
            removeHandler(index)
          },
        },
      ],
    }

    if (secondaryButtonText && secondaryButtonHandler) {
      newPopup.buttons.push({
        text: secondaryButtonText,
        style: "secondary",
        onClick: (index) => {
          secondaryButtonHandler && secondaryButtonHandler()
          removeHandler(index)
        },
      })
    }

    setPopupData((oldPopupData) => {
      return [...oldPopupData, newPopup]
    })
  }

  const contextValue = useMemo(
    (e) => {
      return {
        popupData,
        createPopup,
        setPopupData,
      }
    },
    [popupData, createPopup, setPopupData]
  )

  return (
    <PopupContext.Provider value={contextValue}>
      <>
        {props.children}
        <div className={style["popup-container"]}>{popupCards}</div>
      </>
    </PopupContext.Provider>
  )
}
