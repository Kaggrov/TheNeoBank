import React, { useEffect, useRef, useState } from "react";
import "./CardComponent.css";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "../../Services/axios";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const CardComponent = ({ setCreditCardDetails, creditCardDetails,cardLinked }) => {
  const user = useSelector((state) => state.userReducer.user);

  const [allCardsDetails, setAllCardDetails] = useState([]);
  const swiperRef = useRef(null);
  const [view, setView] = useState({});

  const handleSlideChange = () => {
    const currentIndex = swiperRef.current?.swiper?.realIndex;
    setCreditCardDetails(allCardsDetails[currentIndex]);
    console.log("Slide changed, Current Index:", currentIndex);
  };

  const getAllCardDetails = () => {
    axios.get("creditCards/"+ user.customerId).then((res) => {
      console.log(res.data);
      setAllCardDetails(res.data);
      // setCreditCardDetails(res.data[0]);
    });
  };

  const getCardDetailsForNewLinked = () => {
    axios.get("creditCards/"+ user.customerId).then((res) => {
      console.log(res.data);
      // setAllCardDetails(res.data);
      setCreditCardDetails(res.data[res.data.length - 1]);
    });
  }

  useEffect(()=>{
    axios.get("creditCards/"+ user.customerId).then((res) => {
      console.log(res.data);
      // setAllCardDetails(res.data);
      setCreditCardDetails(res.data[0]);
    });
  },[])

  useEffect(() => {
    getAllCardDetails();
  }, [creditCardDetails]);

  useEffect(()=>{
    getCardDetailsForNewLinked();
  },[cardLinked])


  return (
    <div className="SwipeCardContainer">
      <Swiper
        ref={swiperRef}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={false}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
        onSlideChange={handleSlideChange}
      >
        {allCardsDetails?.map((val, ind) => {
          return (
            <SwiperSlide
              onClick={() => {
                setView((prev) => ({
                  ...prev,
                  [ind]: prev[ind] == "name" ? "cvc" : "name",
                }));
              }}
            >
              <Cards
                number={"************"+val?.cardNumber?.slice(-4)}
                expiry={val?.expiry}
                cvc={val?.cvc}
                name={val?.holderName}
                focused={view[ind] ?? "name"}
                preview={true}
                issuer="visa"
                className="card"
              />{" "}
            </SwiperSlide>
          );
        })}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <FontAwesomeIcon icon={faArrowCircleLeft} size="sm" />
          </div>
          <div className="swiper-button-next slider-arrow">
            <FontAwesomeIcon icon={faArrowCircleRight} size="sm" />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default CardComponent;
