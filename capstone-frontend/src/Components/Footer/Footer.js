import React from "react";
import "./styles.css";
export default function Footer() {
  return (
    <section className="footer_container">
      <footer className="">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="">
              <img
                src="https://cdn-icons-png.flaticon.com/128/733/733547.png"
                className="social social_img"
                alt=""
              />
            </a>
            <a href="">
              <img
                src="https://cdn-icons-png.flaticon.com/128/5968/5968830.png"
                className="social social_img"
                alt=""
              />
            </a>
            <a href="">
              <img
                src="https://cdn-icons-png.flaticon.com/128/174/174855.png"
                className="social social_img"
                alt=""
              />
            </a>
            <a href="">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png"
                className="social social_img"
                alt=""
              />
            </a>
            <a href="">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3291/3291695.png"
                className="social social_img"
                alt=""
              />
            </a>
          </div>
        </section>

        <section className="">
          <div className="text-center p-4">
            © 2023 Copyright: 
            <a className="text-reset fw-bold p-2" href="#">
             NeoFin
            </a>
          </div>
        </section>
      </footer>
    </section>
  );
}
