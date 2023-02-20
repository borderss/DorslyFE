import React,{useRef} from "react";

import style from "../static/css/faqContainer.module.css";
import Content from "../../public/assets/svg/content-plus.svg";

export default function FaqContainer(props) {
    let faqAnswer = useRef(null)
    const toggleFaq = () => {
        faqAnswer.current.classList.toggle(style['active'])
    }

    return (
        <div ref={faqAnswer} className={style["faq"]} onClick={(e)=>{
            toggleFaq()
            console.log(faqAnswer.current.classList)
        }}>
            <div  className={style["question"]}>
                <h3>{props.title}</h3>
                <img className={style["ContentIllustration"]} src={Content}/>
            </div>
            <div className={style["answer"]}>
                <p>{props.text}</p>
            </div>
        </div>
    )
}