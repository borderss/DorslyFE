import React, { createContext, useEffect, useMemo, useState } from "react"

import style from "../static/css/popup.module.css"

import errorIcon from "/assets/svg/popupError.svg"
import infoIcon from "/assets/svg/popupInfo.svg"
import successIcon from "/assets/svg/popupSuccess.svg"
import warningIcon from "/assets/svg/popupWarning.svg"

export const PopupContext = createContext()

export default function PopupContextProvider(props) {
  const removeHandler = (index) => {
    let popupCard = document.querySelector(`#popup-item-${index}`)

    popupCard.classList.add(style["remove"])

    setTimeout(() => {
      popupCard.remove()

      setPopupCards((oldPopupCards) => {
        return oldPopupCards.filter((popup) => popup.id !== index-1)
      })
    }, 500)
  }

  const defaultPopupData = [
    {
      id: 1,
      title: "React Popup Title 1",
      description: (
        <p>
          A short description of the popup, <b>this is a test</b> popup. Here's
          a <a>link.</a>
        </p>
      ),
      icon: "success",
      intonation: "success",
      buttons: [
        {
          text: "Close",
          style: "primary",
          onClick: (index) => {
            removeHandler(index)
          },
        },
      ],
    },
    {
      id: 2,
      title: "React Popup Title 2",
      description: (
        <p>
          A short description of the popup, <b>this is a test</b> popup. Here's
          a <a>link.</a>
        </p>
      ),
      icon: "success",
      intonation: "success",
      buttons: [
        {
          text: "Close",
          style: "primary",
          onClick: (index) => {
            removeHandler(index)
          },
        },
      ],
    },
    {
      id: 3,
      title: "React Popup Title 3",
      description: (
        <p>
          A short description of the popup, <b>this is a test</b> popup. Here's
          a <a>link.</a>
        </p>
      ),
      icon: "success",
      intonation: "success",
      buttons: [
        {
          text: "Close",
          style: "primary",
          onClick: (index) => {
            removeHandler(index)
          },
        },
      ],
    },
  ]

  const [popupData, setPopupData] = useState(defaultPopupData)
  const [popupCards, setPopupCards] = useState([])

  useEffect(() => {
    console.log("popupData changed")

    var popupCardArr = popupData?.map((popup, index) => {
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
        <div id={`popup-item-${popup.id}`} className={style["popup-card"]} key={index}>
          <div className={style["popup-card-header"]}>
            <div className={style["popup-card-icon"]}>
              <img src={iconDecal}/>
            </div>
            <div className={style["popup-card-title"]}>{popup.title}</div>
          </div>
          <div className={style["popup-card-body"]}>{popup.description}</div>
          <div className={style["popup-card-footer"]}>
            {popup.buttons.map((button, index) => {
              return (
                <button
                  className={style[`popup-card-button ${button.style}`]}
                  key={index}
                  onClick={(e) => button.onClick(popup.id)}>
                  {button.text}
                </button>
              )
            })}
          </div>
        </div>
      )
    })

    setPopupCards(popupCardArr)
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
      id: 1,
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
        secondaryButtonText && {
          text: secondaryButtonText,
          style: "secondary",
          onClick: (index) => {
            secondaryButtonHandler && secondaryButtonHandler()
            removeHandler(index)
          },
        }
      ],
    }
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
