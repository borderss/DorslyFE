import React, { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

import ReservationBar from "../components/reservationBar"

import Checkmark from "/assets/svg/checkmark.svg"
import MouseArrow from "/assets/svg/mousearrow.svg"
import RatingLeft from "/assets/svg/ratingleft.svg"
import RatingLeftHollow from "/assets/svg/ratinglefthollow.svg"
import RatingRight from "/assets/svg/ratingright.svg"
import RatingRightHollow from "/assets/svg/ratingrighthollow.svg"
import Star from "/assets/svg/star.svg"

import style from "../static/css/place.module.css"

import Header from "../components/header"

export default function place(props) {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const ratingRef = useRef(null)
  const ratingResultRef = useRef(null)

  const [data, setData] = useState([])
  const [userRating, setUserRating] = useState(4)
  const [bgImage, setBgImage] = useState(
    `https://picsum.photos/1920/1080/?random&t=${new Date().getTime()}`
  )
  const [section, setSection] = useState("products")

  const productData = {
    data: {
      "kebabi": [
        {
          id: 1,
          name: "Veda Crist",
          description:
            "Nemo eum accusamus vero. Exercitationem deserunt dolores provident.",
          point_of_interest_id: 48,
          ingredients:
            "Pariatur doloremque rerum voluptate. Tenetur hic voluptas itaque aut natus vel.",
          image:
            "https://via.placeholder.com/1920x1080.png/003333?text=food+aut",
          price: "9.05",
        },
        {
          id: 2,
          name: "Rosamond Schowalter",
          description:
            "Non mollitia nesciunt veritatis cumque officia exercitationem sunt. Nulla nulla neque culpa occaecati. Hic aut ut corporis saepe exercitationem ut.",
          point_of_interest_id: 23,
          ingredients:
            "Optio voluptas tempore ducimus dignissimos tempora delectus. Sit dolor non beatae at.",
          image:
            "https://via.placeholder.com/1920x1080.png/00aa44?text=food+ut",
          price: "3.85",
        },
        {
          id: 3,
          name: "Prof. Donald Will",
          description:
            "Reprehenderit cumque id quia ducimus nihil quo. Quia voluptas quas earum rerum accusamus. Sit enim hic nulla. Eveniet sunt consequatur reiciendis architecto.",
          point_of_interest_id: 48,
          ingredients:
            "Consequatur odit fuga praesentium. Qui eos quae rerum. Voluptates dolores quaerat quo excepturi.",
          image:
            "https://via.placeholder.com/1920x1080.png/0066bb?text=food+qui",
          price: "1.58",
        },
        {
          id: 4,
          name: "Tremayne Pollich",
          description:
            "Voluptatem mollitia ut consequatur eligendi vitae. Aut et sint dolor non vel hic. Tempore iusto voluptas dolores facilis sit qui.",
          point_of_interest_id: 15,
          ingredients:
            "Laborum voluptatum labore quasi reprehenderit non. Qui ab mollitia nulla eos pariatur laudantium.",
          image:
            "https://via.placeholder.com/1920x1080.png/0000dd?text=food+blanditiis",
          price: "15.42",
        },
        {
          id: 5,
          name: "River Dicki",
          description:
            "Ex sunt porro dolorum cupiditate. Repellendus consequatur quis quaerat dolorem aut.",
          point_of_interest_id: 19,
          ingredients:
            "Provident ipsam voluptatem a odit numquam. Consectetur in qui reiciendis iure quo aut.",
          image:
            "https://via.placeholder.com/1920x1080.png/00ddbb?text=food+repellat",
          price: "11.23",
        },
        {
          id: 6,
          name: "Glen Mohr",
          description:
            "Eos commodi et similique aperiam ab. Impedit necessitatibus occaecati rerum dolorem iste. Sint nam tempore dolorum voluptas non. Libero repudiandae aliquam beatae dicta.",
          point_of_interest_id: 59,
          ingredients:
            "Quasi non sint dolorem ut dignissimos. Molestias ut ex vitae pariatur eum quis tempora.",
          image:
            "https://via.placeholder.com/1920x1080.png/00cc44?text=food+voluptatem",
          price: "7.03",
        },
      ],
      "pizza": [
        {
          id: 7,
          name: "Miss Imogene Runte Sr.",
          description:
            "Fuga incidunt perspiciatis ea et. Natus dolorem dolorem itaque veritatis labore. Vitae vel eius voluptate. Vitae odio ea inventore tempore.",
          point_of_interest_id: 2,
          ingredients:
            "Ipsam nulla ut accusamus qui. Et harum aut eum accusamus. Beatae non quis quo officiis.",
          image:
            "https://via.placeholder.com/1920x1080.png/00ff33?text=food+iure",
          price: "0.02",
        },
        {
          id: 8,
          name: "Eliane Predovic PhD",
          description:
            "Sed pariatur in necessitatibus nihil. Quidem fuga in nihil est.",
          point_of_interest_id: 45,
          ingredients:
            "Reprehenderit dolorem eveniet quasi voluptates minima quia est. Et eum nulla quam sit.",
          image:
            "https://via.placeholder.com/1920x1080.png/003300?text=food+repellendus",
          price: "16.48",
        },
        {
          id: 9,
          name: "Greyson Jerde V",
          description:
            "Officia dignissimos numquam laudantium ipsam. Exercitationem consequatur ut omnis. Voluptatum non qui odit esse a.",
          point_of_interest_id: 33,
          ingredients:
            "Deserunt officia necessitatibus quibusdam fugiat. Rem et exercitationem sint itaque a aut eum.",
          image:
            "https://via.placeholder.com/1920x1080.png/00aaaa?text=food+porro",
          price: "10.10",
        },
        {
          id: 10,
          name: "Dr. Monica Ankunding",
          description:
            "Est quia exercitationem quod ullam quam impedit tenetur ad. Rerum praesentium molestiae ipsa culpa asperiores saepe. Deleniti ipsa cupiditate sunt sit repudiandae quas nemo.",
          point_of_interest_id: 20,
          ingredients:
            "Distinctio eum doloremque dolores commodi. Nam dolor cum cumque est dolorum eum nobis.",
          image:
            "https://via.placeholder.com/1920x1080.png/00ff00?text=food+alias",
          price: "4.60",
        },
        {
          id: 11,
          name: "Viva Hartmann",
          description:
            "Odit adipisci voluptatibus eius occaecati quo est eos. Ut delectus incidunt aut maxime et quasi. Ex aut eum at omnis ipsum cupiditate.",
          point_of_interest_id: 40,
          ingredients:
            "Ipsam non nam est eius quo. Delectus doloribus sit fuga. Nam tempora nihil et modi optio harum ab.",
          image:
            "https://via.placeholder.com/1920x1080.png/004400?text=food+sed",
          price: "17.44",
        },
        {
          id: 12,
          name: "Prof. Dallin Hyatt",
          description:
            "Blanditiis magnam iste provident aut quia. Sit consequuntur harum laborum. Architecto delectus in et ea et.",
          point_of_interest_id: 33,
          ingredients:
            "Laborum consequatur omnis mollitia. Temporibus cupiditate eum quo ipsam fuga libero ipsa incidunt.",
          image:
            "https://via.placeholder.com/1920x1080.png/00dd99?text=food+sunt",
          price: "7.24",
        },
        {
          id: 13,
          name: "Myriam Schoen",
          description:
            "Quo ut libero commodi corporis odio. Molestiae ut possimus ea. Eligendi et voluptatem aut voluptatibus sint magnam. Odio qui pariatur velit.",
          point_of_interest_id: 45,
          ingredients:
            "Magnam a quisquam voluptatibus. Est est fugiat vel dicta vel.",
          image:
            "https://via.placeholder.com/1920x1080.png/00bbaa?text=food+libero",
          price: "15.36",
        },
        {
          id: 14,
          name: "Prof. Jennifer McGlynn",
          description:
            "Pariatur eos odit provident quia. Sunt minus ipsam dolor ipsa facilis ducimus quis et. Et sapiente voluptatem nesciunt consequatur distinctio nostrum minus. Totam earum blanditiis et amet.",
          point_of_interest_id: 9,
          ingredients:
            "Suscipit eum debitis omnis non ab nostrum fugit. Aut qui quo non. Commodi aut ut et a.",
          image:
            "https://via.placeholder.com/1920x1080.png/00cc00?text=food+quas",
          price: "18.98",
        },
        {
          id: 15,
          name: "Tamara Ward",
          description:
            "Officiis libero assumenda totam magni omnis. Vitae aut consectetur vel sit voluptas alias odio. Est tenetur temporibus et unde repudiandae in. Velit veniam aut quam ipsam vero labore.",
          point_of_interest_id: 20,
          ingredients:
            "Quia nulla facilis animi quisquam. Minus assumenda accusamus odit amet qui voluptatem.",
          image:
            "https://via.placeholder.com/1920x1080.png/002255?text=food+doloribus",
          price: "10.95",
        },
      ],
      "uzkodas": [
        {
          id: 16,
          name: "Mrs. Lacy Gibson V",
          description:
            "Id amet tempore tempora consectetur enim. Vitae magni et vel et. Explicabo aliquid eos dolor est quam omnis.",
          point_of_interest_id: 25,
          ingredients:
            "Sit in sint voluptas et delectus occaecati et. Eligendi neque dolores possimus cumque.",
          image:
            "https://via.placeholder.com/1920x1080.png/00ff99?text=food+aut",
          price: "4.19",
        },
        {
          id: 17,
          name: "Prof. Earl McKenzie",
          description:
            "Velit illo occaecati et possimus pariatur consequuntur asperiores. Et assumenda debitis voluptatibus incidunt ex fuga voluptates. Sit eum dolorum cum sint esse quis. Itaque ut in consectetur.",
          point_of_interest_id: 61,
          ingredients:
            "Officia esse quis quisquam maiores. Sit eos iste delectus saepe cum. Et itaque optio quibusdam.",
          image:
            "https://via.placeholder.com/1920x1080.png/002277?text=food+nostrum",
          price: "8.59",
        },
        {
          id: 18,
          name: "Myrtie Stark Sr.",
          description:
            "A magnam dolores dolores nam consequatur aut sapiente. In qui voluptate consequatur fugiat vel rerum. Officiis quia et consequatur consectetur. Doloremque possimus aut fuga.",
          point_of_interest_id: 55,
          ingredients:
            "Eligendi accusantium porro rem ut. Culpa autem iusto molestiae molestiae sit.",
          image:
            "https://via.placeholder.com/1920x1080.png/002255?text=food+reiciendis",
          price: "8.50",
        },
        {
          id: 19,
          name: "Moshe Funk Sr.",
          description:
            "Sunt quia provident voluptatem repellat. Neque qui nihil ut. Et maxime aspernatur enim aut ut explicabo.",
          point_of_interest_id: 54,
          ingredients:
            "Sed voluptatem ut nemo et eius hic totam. Laboriosam rem non vel aut.",
          image:
            "https://via.placeholder.com/1920x1080.png/00eecc?text=food+tempora",
          price: "4.42",
        },
        {
          id: 20,
          name: "Kailyn Pollich",
          description:
            "Voluptas vero rerum rerum voluptas earum iusto. Sunt doloremque dolorum quia eos ea corporis omnis. Voluptatum sint magni consequuntur quasi enim earum porro. Molestiae et omnis iusto et provident.",
          point_of_interest_id: 7,
          ingredients:
            "Aut expedita aut nihil incidunt cumque. Porro quia non quia autem.",
          image:
            "https://via.placeholder.com/1920x1080.png/0077dd?text=food+quo",
          price: "16.73",
        },
        {
          id: 21,
          name: "Chase Deckow",
          description:
            "Aut ad dolor consequatur sunt ut doloremque praesentium. Est et quae delectus deleniti. Totam possimus hic delectus hic est. Rerum quisquam cumque et totam repellendus.",
          point_of_interest_id: 19,
          ingredients:
            "Quo ut numquam alias possimus tempore. Rerum velit eligendi et ut ad sit soluta.",
          image:
            "https://via.placeholder.com/1920x1080.png/004477?text=food+facere",
          price: "5.11",
        },
        {
          id: 22,
          name: "Terence Willms",
          description:
            "Sit eum est est enim quis exercitationem. Pariatur ut illum qui nobis et sit culpa ullam. Et aut omnis repudiandae assumenda rem aut.",
          point_of_interest_id: 11,
          ingredients:
            "Porro saepe voluptas repellat. Fugit voluptas est laborum hic porro ex.",
          image:
            "https://via.placeholder.com/1920x1080.png/006666?text=food+sapiente",
          price: "11.03",
        },
        {
          id: 23,
          name: "Prof. Randal Walker",
          description:
            "Quam molestiae quam quam minima. Aliquam id vel perspiciatis architecto. Iure minima et ipsum vel non sint et aut. Corporis voluptate placeat tempora quo eaque aut.",
          point_of_interest_id: 19,
          ingredients:
            "Hic numquam aliquam cum. Ea ex omnis et nesciunt minima veritatis. Nobis et earum architecto.",
          image:
            "https://via.placeholder.com/1920x1080.png/00dd66?text=food+facilis",
          price: "16.28",
        },
      ],
      "Citi": [
        {
          id: 24,
          name: "Nia Simonis",
          description:
            "Ex laborum quis provident molestiae. Harum aut optio aperiam ut. Natus quia quia maiores repudiandae fugiat commodi.",
          point_of_interest_id: 61,
          ingredients:
            "Est dolor voluptatum similique dolorum est et corrupti. Id non enim ducimus dolorem.",
          image:
            "https://via.placeholder.com/1920x1080.png/00eeaa?text=food+ab",
          price: "8.93",
        },
        {
          id: 25,
          name: "Al Maggio",
          description:
            "Dolore veritatis nemo vero deleniti sunt. Odit non et ad quibusdam id. Et earum et quas sit voluptatem et sit. Accusantium voluptas velit dolores tenetur odit corporis.",
          point_of_interest_id: 63,
          ingredients:
            "Non cumque dicta doloribus autem. Quas voluptatum esse ea aut.",
          image:
            "https://via.placeholder.com/1920x1080.png/008811?text=food+mollitia",
          price: "18.77",
        },
        {
          id: 26,
          name: "Damion Kessler",
          description:
            "Aut voluptas cumque est tempora ut voluptates laudantium sint. Et eaque magnam animi est et perferendis. Error quod velit omnis velit.",
          point_of_interest_id: 16,
          ingredients:
            "Quos tenetur et omnis error. Assumenda aut est a iure dolor et inventore.",
          image:
            "https://via.placeholder.com/1920x1080.png/00ee22?text=food+dolorum",
          price: "14.45",
        },
        {
          id: 27,
          name: "Prof. Gregory Nitzsche MD",
          description:
            "Nulla rerum alias pariatur debitis. Eius aperiam omnis voluptatem facilis. Cumque voluptatem earum magnam quidem dolorum perferendis. Id iure sit incidunt quaerat velit et facere.",
          point_of_interest_id: 26,
          ingredients:
            "Odio eveniet quis esse labore omnis. Amet commodi esse non voluptates iste magni.",
          image:
            "https://via.placeholder.com/1920x1080.png/00aaee?text=food+consequatur",
          price: "15.09",
        },
        {
          id: 28,
          name: "Miss Gilda Bernhard V",
          description:
            "Autem animi saepe vitae. Facilis repellendus non nihil porro repellat voluptas aut. Sint temporibus necessitatibus aut qui exercitationem. Rerum vel earum et dolor numquam ut facere.",
          point_of_interest_id: 16,
          ingredients:
            "Necessitatibus incidunt unde laboriosam non dicta aperiam. Ducimus adipisci fugit quas.",
          image:
            "https://via.placeholder.com/1920x1080.png/0066ee?text=food+ad",
          price: "5.91",
        },
        {
          id: 29,
          name: "Tavares Schaden",
          description:
            "Dicta sit velit id itaque molestiae. Possimus vel in autem voluptates. Ut ea voluptatibus rerum est vero ad. Odio voluptas numquam sapiente repudiandae.",
          point_of_interest_id: 61,
          ingredients:
            "Est omnis officia maxime illo deserunt. Odio voluptatem laborum nam maiores.",
          image:
            "https://via.placeholder.com/1920x1080.png/00ffaa?text=food+quam",
          price: "18.80",
        },
        {
          id: 30,
          name: "Irma Osinski PhD",
          description:
            "Dolore suscipit incidunt non labore. Non autem aliquid ea. Id expedita voluptatem aliquam quia.",
          point_of_interest_id: 7,
          ingredients:
            "Et laborum labore quod quae quia minima soluta. Nesciunt qui autem rerum eum molestiae nam.",
          image:
            "https://via.placeholder.com/1920x1080.png/00dd55?text=food+enim",
          price: "6.60",
        },
        {
          id: 31,
          name: "Vinnie Stracke",
          description:
            "Repellat sed iure voluptate odit similique. Quam quo incidunt nam sed temporibus libero consequatur. Aliquid quos pariatur ducimus a aut. Quis est qui ab tempore.",
          point_of_interest_id: 43,
          ingredients:
            "Nam qui error et. Nisi aliquam quia quisquam ut iusto iusto. Rerum vel aut similique ipsum id sit.",
          image:
            "https://via.placeholder.com/1920x1080.png/00ffaa?text=food+sint",
          price: "13.54",
        },
        {
          id: 32,
          name: "Foster Hickle",
          description:
            "Placeat aut voluptatibus error incidunt sed a mollitia. Autem neque impedit et. Dolores eum fuga et.",
          point_of_interest_id: 29,
          ingredients:
            "Est aperiam molestias mollitia consequatur ipsam eum quo. Quos in cum dolore vitae.",
          image:
            "https://via.placeholder.com/1920x1080.png/0077ff?text=food+corporis",
          price: "6.37",
        },
        {
          id: 33,
          name: "Ryley Brakus",
          description:
            "Illum occaecati eum rerum. Cum at qui voluptatem est sit. Eaque architecto voluptatem vel voluptates. Neque adipisci dolore voluptatibus sit. Culpa dolorem quia labore corrupti.",
          point_of_interest_id: 17,
          ingredients:
            "Et quo minima animi omnis sed consequatur totam. Cumque aliquam inventore doloremque vero.",
          image:
            "https://via.placeholder.com/1920x1080.png/00dd99?text=food+ad",
          price: "10.66",
        },
        {
          id: 34,
          name: "Dereck Witting",
          description:
            "Corrupti similique quod aut quam corrupti aut voluptas. Iusto vel aliquam incidunt magni eum. Deleniti dolor deleniti rerum dolore et dolor. Sunt aut aut odit sint.",
          point_of_interest_id: 4,
          ingredients:
            "Itaque enim nulla animi tempore quaerat eligendi. Vel et corporis incidunt numquam.",
          image:
            "https://via.placeholder.com/1920x1080.png/005533?text=food+aliquid",
          price: "10.84",
        },
        {
          id: 35,
          name: "Haylee Hettinger",
          description:
            "Et asperiores sapiente nam et suscipit ratione quod similique. Qui est ducimus id sint doloremque reiciendis. Et quae qui voluptatum est et.",
          point_of_interest_id: 23,
          ingredients:
            "Voluptatibus a in odio facere. Eum illum cupiditate molestiae voluptatem.",
          image:
            "https://via.placeholder.com/1920x1080.png/0022aa?text=food+sit",
          price: "12.25",
        },
        {
          id: 36,
          name: "Mrs. Reanna Stiedemann DDS",
          description:
            "Dolorum similique error et recusandae. Voluptate odio sit placeat numquam. Omnis sapiente eos aut esse nisi.",
          point_of_interest_id: 62,
          ingredients:
            "Ut minus sunt suscipit quas assumenda possimus. Sapiente voluptate unde officia.",
          image:
            "https://via.placeholder.com/1920x1080.png/006688?text=food+et",
          price: "3.29",
        },
        {
          id: 37,
          name: "Vaughn Williamson",
          description:
            "Odit et ut odio. Voluptate animi et quia consequuntur quo dolorem maxime ea. Neque ducimus delectus corporis reprehenderit voluptate. Totam quibusdam optio qui.",
          point_of_interest_id: 57,
          ingredients:
            "Rerum fuga enim accusamus sunt in neque ut. Ea labore assumenda accusamus voluptatum.",
          image:
            "https://via.placeholder.com/1920x1080.png/008800?text=food+sequi",
          price: "19.68",
        },
        {
          id: 38,
          name: "Pedro Schumm",
          description:
            "Velit voluptas est expedita deserunt illo est. Voluptate totam cumque quasi quisquam ut fuga perferendis. Error nam iusto qui. Iusto unde repudiandae voluptate.",
          point_of_interest_id: 63,
          ingredients:
            "Molestiae aut assumenda provident necessitatibus. Quia deserunt et id.",
          image:
            "https://via.placeholder.com/1920x1080.png/00eeee?text=food+aut",
          price: "2.06",
        },
        {
          id: 39,
          name: "Sienna Torphy",
          description:
            "Minus quae ut nihil nesciunt architecto illum hic. Officia ullam assumenda ipsam ea unde saepe aut. Non sequi impedit autem.",
          point_of_interest_id: 65,
          ingredients:
            "Ipsa molestias aut dignissimos. Aut impedit sapiente dolorum qui.",
          image:
            "https://via.placeholder.com/1920x1080.png/000044?text=food+eos",
          price: "18.94",
        },
        {
          id: 40,
          name: "Arlene Mitchell",
          description:
            "Dignissimos nihil animi quis corporis quia. Accusantium eos dolore voluptas enim animi consequatur. Labore vel autem et ullam numquam laboriosam quia.",
          point_of_interest_id: 23,
          ingredients:
            "Nisi velit accusantium est quia amet voluptatem et. In et ut perspiciatis maiores.",
          image:
            "https://via.placeholder.com/1920x1080.png/002299?text=food+cupiditate",
          price: "16.97",
        },
        {
          id: 41,
          name: "Joannie Herzog",
          description:
            "Laudantium magnam tempore sed. Consequuntur aperiam facilis natus recusandae. Ad molestias voluptatum enim rem consequatur saepe veritatis. Mollitia ut est exercitationem eum nulla.",
          point_of_interest_id: 58,
          ingredients:
            "Corrupti autem neque nostrum aut libero temporibus sed. Id commodi suscipit sapiente pariatur.",
          image:
            "https://via.placeholder.com/1920x1080.png/001166?text=food+quam",
          price: "18.33",
        },
        {
          id: 42,
          name: "Letitia Swift",
          description:
            "Delectus dolorem dolores nobis blanditiis qui modi quam fugit. Ex accusamus et vel quas a unde. Exercitationem aut et sed quaerat aspernatur. Vel quia molestiae deserunt occaecati enim qui provident.",
          point_of_interest_id: 41,
          ingredients: "Sapiente nobis rem ut sed. Itaque repellat enim dolor.",
          image:
            "https://via.placeholder.com/1920x1080.png/00ccaa?text=food+consequatur",
          price: "6.04",
        },
        {
          id: 43,
          name: "Ladarius McCullough",
          description:
            "Repudiandae vero veniam expedita non suscipit distinctio explicabo. Quis quia magni quasi voluptas odio sunt enim. Et autem rem et reprehenderit consectetur est.",
          point_of_interest_id: 28,
          ingredients:
            "Aut numquam eligendi ex. Voluptas modi ea aut dolorem. Nisi ipsam quaerat eius tempora accusamus.",
          image:
            "https://via.placeholder.com/1920x1080.png/000044?text=food+sed",
          price: "7.86",
        },
        {
          id: 44,
          name: "Mr. Jamarcus Yundt",
          description:
            "Qui dolorem velit laboriosam non. Cumque placeat sed ad sunt unde quas. Ut numquam cumque quae veniam quibusdam voluptas.",
          point_of_interest_id: 10,
          ingredients:
            "Sint molestiae voluptas vel et aut repellendus praesentium. Et debitis fugit quo ducimus.",
          image:
            "https://via.placeholder.com/1920x1080.png/00ff88?text=food+minima",
          price: "10.35",
        },
        {
          id: 45,
          name: "Amara Schmidt",
          description:
            "Debitis laboriosam eos eum cupiditate. Voluptas voluptatum labore qui fuga. Impedit dolores rerum minus ex porro a.",
          point_of_interest_id: 20,
          ingredients:
            "Animi optio repellat animi. Eos sit culpa aliquam ut. Molestias excepturi pariatur dicta omnis.",
          image:
            "https://via.placeholder.com/1920x1080.png/0055cc?text=food+provident",
          price: "19.28",
        },
        {
          id: 46,
          name: "Brooks Wunsch",
          description:
            "Quo maiores itaque illum ipsum dolore est excepturi. Porro unde et est nihil quia molestias. Ullam nesciunt ducimus aut velit incidunt rerum.",
          point_of_interest_id: 50,
          ingredients:
            "Aliquid harum quae quaerat sed vel porro. Expedita corrupti illo aut omnis inventore eos.",
          image:
            "https://via.placeholder.com/1920x1080.png/0033bb?text=food+maxime",
          price: "17.52",
        },
        {
          id: 47,
          name: "Ms. Lilly Purdy",
          description:
            "Labore mollitia doloremque tempore rerum qui perspiciatis. Aut consequatur aliquam similique tenetur repellat. Veniam aut aut eligendi eos cupiditate officia sit et.",
          point_of_interest_id: 32,
          ingredients:
            "Ratione est quia et. Labore enim voluptatibus id. Iste sit id in distinctio.",
          image:
            "https://via.placeholder.com/1920x1080.png/00ee99?text=food+possimus",
          price: "16.06",
        },
        {
          id: 48,
          name: "Loren Maggio",
          description:
            "Ipsam vero delectus est consectetur sequi. Dolor maiores quisquam facere modi mollitia a vel sequi. Qui et ea tempore explicabo sed rerum fugit.",
          point_of_interest_id: 30,
          ingredients:
            "Nam quasi vel id dolor ea quo nihil reiciendis. Praesentium quia est aut consequatur voluptas.",
          image:
            "https://via.placeholder.com/1920x1080.png/0077ee?text=food+quis",
          price: "6.63",
        },
        {
          id: 49,
          name: "Mya Kuhic",
          description:
            "Odio voluptate saepe optio repellat porro molestiae quas. Ipsa ut molestiae explicabo est et velit. At necessitatibus explicabo neque omnis mollitia. Expedita enim debitis ut quaerat facere rem.",
          point_of_interest_id: 16,
          ingredients:
            "Et sit est aut officia. Officia fuga error nihil. Voluptas nesciunt at natus enim.",
          image:
            "https://via.placeholder.com/1920x1080.png/005555?text=food+sequi",
          price: "17.37",
        },
        {
          id: 50,
          name: "Kira Ankunding",
          description:
            "Et quaerat ab est sit esse perspiciatis perferendis. Non autem explicabo vitae et beatae qui praesentium. Sed repellendus accusantium facilis et qui.",
          point_of_interest_id: 12,
          ingredients:
            "Architecto fuga maxime nobis et aut laborum. Quibusdam expedita ea facere alias.",
          image:
            "https://via.placeholder.com/1920x1080.png/002200?text=food+omnis",
          price: "18.04",
        },
      ],
    },
  }

  useEffect(() => {
    if (
      searchParams.get("p") == null ||
      searchParams.get("p") == "undefined" ||
      searchParams.get("p") == "null" ||
      searchParams.get("p") == "NaN" ||
      searchParams.get("p") == "false" ||
      searchParams.get("p") == "0" ||
      searchParams.get("p") == "[]"
    ) {
      navigate("/products")
    }
  }, [navigate])

  useEffect(() => {
    if (ratingRef.current != null) {
      ratingRef.current.childNodes.forEach((star) => {
        star?.childNodes.forEach((icon) => {
          icon.addEventListener("click", (e) => {
            console.log(e.target.getAttribute("selectionindex"))
            setUserRating(e.target.getAttribute("selectionindex"))

            ratingResultRef.current.classList.add(style["result-active"])

            setTimeout(() => {
              ratingResultRef.current.classList.remove(style["result-active"])
            }, 1500)
          })
        })
      })
    }

    setData({
      id: 30,
      name: "Luella Frami",
      description:
        "Rem laboriosam dignissimos voluptates ut. Officiis libero veritatis impedit quae delectus voluptas. Consequatur occaecati et et sit est.",
      gps_lng: "-146.048615",
      gps_lat: "42.816474",
      country: "British Virgin Islands",
      images:
        "https://api.dorsly.com/api/point_of_interest/images/30?signature=7ef48ed2203d5c5b438e5c61d9d1abf105e1be65f49168775e7161da70c8f923",
      opens_at: "11:25:22",
      closes_at: "22:04:15",
      is_open_round_the_clock: false,
      is_takeaway: true,
      is_on_location: false,
      available_seats: 6,
      review_count: 7,
      avg: 5.894736842105263,
    })
  }, [])

  useEffect(() => {
    ratingRef.current.childNodes.forEach((star) => {
      star.childNodes.forEach((half) => {
        if (half.getAttribute("selectionindex") == userRating) {
          half.classList.add(half.classList.item(0), style["active"])
        } else {
          half.classList.remove(half.classList.item(1))
        }
      })
    })
  }, [userRating])

  const renderProducts = () => {

    const renderSectionProducts = (section) => {
      return productData.data[section].map((product, id) => {
        return (
          <div key={id} className={style["product"]}>
            <div className={style["product-image"]}style={{"--product-image": "url(" + product.image + ")"}}></div>
            <div className={style["product-info"]}>
              <p className={style["product-name"]}>{product.name}</p>
              <p className={style["product-description"]}>{product.description}</p>
              <p className={style["product-price"]}>${product.price}</p>
            </div>
          </div>
        )
      })
    }

    let returnData = Object.keys(productData.data).map((section, id) => {
      console.log(section)
      return (
        <div key={id} className={style["product-section"]}>
          <h2 className={style["section-title"]}>{section}</h2>
          <div className={style["section-products"]}>
          {renderSectionProducts(section)}
          </div>
        </div>
      )
    })

    return returnData
  }

  return (
    <>
      <Header />
      <div className={style["container"]}>
        <div
          className={style["top-section"]}
          style={{
            "--background-image": `url(${bgImage})`,
          }}>
          <div className={style["content"]}>
            <div className={style["rating"]}>
              <img src={Star} />
              <p>{data.avg && Math.round(data.avg * 10) / 10}</p>
              <div
                ref={ratingRef}
                className={style["place-rating"]}
                style={{
                  "--rating-left-icon-filled": `url(${RatingLeft})`,
                  "--rating-left-icon-hollow": `url(${RatingLeftHollow})`,
                  "--rating-right-icon-filled": `url(${RatingRight})`,
                  "--rating-right-icon-hollow": `url(${RatingRightHollow})`,
                }}>
                <div className={style["star"]}>
                  <div
                    selectionindex={9}
                    className={[style["left"], style["active"]].join(" ")}
                  />
                  <div selectionindex={10} className={style["right"]} />
                </div>
                <div className={style["star"]}>
                  <div selectionindex={7} className={style["left"]} />
                  <div selectionindex={8} className={style["right"]} />
                </div>
                <div className={style["star"]}>
                  <div selectionindex={5} className={style["left"]} />
                  <div selectionindex={6} className={style["right"]} />
                </div>
                <div className={style["star"]}>
                  <div selectionindex={3} className={style["left"]} />
                  <div selectionindex={4} className={style["right"]} />
                </div>
                <div className={style["star"]}>
                  <div selectionindex={1} className={style["left"]} />
                  <div selectionindex={2} className={style["right"]} />
                </div>
              </div>

              <img
                ref={ratingResultRef}
                className={style["rating-result"]}
                src={Checkmark}
              />
            </div>
          </div>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <ReservationBar />
          <div className={style["scroll-encouragement"]}>
            Scroll down to see more
            <img src={MouseArrow} />
          </div>
        </div>

        <div className={style["main-content"]}>
          <div className={style["lower-navbar"]}>
            <div className={style["left"]}>
              <div onClick={(_) => setSection("products")}>Products</div>
              <div onClick={(_) => setSection("info")}>Info</div>
              <div onClick={(_) => setSection("reviews")}>
                <p>Reviews</p>
                <div className={style["info-display"]}>243</div>
              </div>
            </div>

            <div className={style["right"]}>
              <div onClick={(_) => setSection("cart")}>
                <p>Cart</p>
                <div className={style["info-display"]}>3</div>
              </div>
              <div onClick={(_) => setSection("pay")}>
                <div>Pay</div>
                <div className={style["info-display"]}>€13,24</div>
              </div>
            </div>
          </div>
          <div className={style["content"]}>
            { section == "products" && renderProducts()}
            <br />
          </div>
        </div>
      </div>
    </>
  )
}
