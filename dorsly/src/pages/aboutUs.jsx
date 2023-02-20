import React from 'react';

import "../static/css/general.css"
import style from "../static/css/aboutUs.module.css"

import Header from "../components/header";
import Card from "../components/informationCard.jsx";

import PeopleIllustration from "/assets/svg/peopleillustration.svg"

import TimeManagment from "/assets/svg/timeManagmentClock.svg"
import UserLogo from "/assets/svg/UserInteraction.svg"
import Search from "/assets/svg/SearchAccuracy.svg"
import MapLogo from "/assets/svg/mapLogo.svg"
import Security from "/assets/svg/securityFeatures.svg"
import Ligthweight from "/assets/svg/lightweightAppLogo.svg"
import Content from "/assets/svg/content-plus.svg"
import FaqContainer from "../components/faqContainer";


export default function AboutUs(){

    return(

        <>
            <Header/>
            <div className={style["main-container"]}>
                <div className={style["headerContent"]}>
                    <div>
                        <h1>
                            Privacy. Simplicity.
                            <br />
                            Ease of Reservation.
                        </h1>
                        <p>
                            We provide a simple, easy to use platform to make
                            <br />
                            all your reservations in advance
                        </p>
                    </div>

                    <img className={style["PeopleIllustration"]} src={PeopleIllustration}/>
                </div>

                <section className={style["provide-section"]}>
                    <h1>What do we provide?</h1>

                    <div className={style["provide-container"]}>

                        <Card
                            icon={TimeManagment}
                            title='Time manangement'
                            text='We know how important time is, so we do our best to use up the least ammount of time we can'
                        />

                        <Card
                            icon={UserLogo}
                            title='User interaction'
                            text='See what reviews other users have left on any particular restaurant or point of interest'
                        />

                        <Card
                            icon={Search}
                            title='Search accuracy'
                            text='We use industry standard tools to provide our users the best and most seamless experience'
                        />

                        <Card
                            icon={MapLogo}
                            title='User interaction'
                            text='See what reviews other users have left on any particular restaurant or point of interest'
                        />

                        <Card
                            icon={Security}
                            title='Accurate maps'
                            text='Our map interfaces give the user a way to see precisely where the nearest points of interest are'
                        />

                        <Card
                            icon={Ligthweight}
                            title='Security features'
                            text='Dorsly uses modern security features for it’s platform, ranging from hashing to encryption'
                        />



                    </div>
                </section>

                <section className={style["question-section"]}>
                    <h1>Frequently asked questions</h1>

                    <FaqContainer
                        title='What is the difference between a registered and unregistered user?'
                        text='An unregistered user can only View information, but cannot prepay or make a reservation'
                    />

                    <FaqContainer
                        title='How do I return money?'
                        text='You can easily write us on contact page with your problem'
                    />

                    <FaqContainer
                        title='How do I contact customer service?'
                        text='Contact us page'
                    />

                    <FaqContainer
                        title='How do I delete my account?'
                        text='You cant bozo  '
                    />

                </section>
            </div>
        </>
        )
}
