import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import axios from "../../Services/axios";
import "./swiper.css";
import { FreeMode, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";

function AccountsSlider() {
  const [accounts, setAccount] = useState(null);
  const user = useSelector((state) => state.userReducer.user);
  useEffect(() => {
    // Replace with your API endpoint
    axios
      .get("accounts/" + user.customerId)
      .then((response) => {
        console.log(response.data);
        setAccount(response.data);
      })
      .catch((error) => {
        console.error("Error fetching account data:", error);
      });
  }, []);
  return (
    <div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
      >
        {accounts?.map((account) => (
          <SwiperSlide
            key={account.accountId}
            className="card border rounded l-bg-blue-dark"
            style={{ borderColor: "green" }}
          >
            <div className="card-body">
              <img
                src={account.bank.bankLogo}
                alt="bank logo"
                style={{ width: "40px", height: "40px", marginRight: "20vw" }}
              />
              <p>XXXX-XXXX-{account.accountNo.slice(-4)}</p>
              <h5 className="card-title">{account.bank.bankName}</h5>
              <p className="card-text" style={{ fontSize: "25px" }}>
                Balance:{" "}
                <span>
                  <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
                  &nbsp;
                </span>
                {account.balance}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AccountsSlider;
