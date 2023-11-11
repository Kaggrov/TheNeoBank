import React from 'react'
import "./styles.css"
export default function Footer() {
  return (
    <section className="footer_container" >
       <footer className='' >
          <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <div className="me-5 d-none d-lg-block">
              <span>Get connected with us on social networks:</span>
            </div>

            <div>
              <a href="">
                <img src="https://cdn-icons-png.flaticon.com/128/733/733547.png" className="social social_img" alt="" />
              </a>
              <a href="">
                <img src="https://cdn-icons-png.flaticon.com/128/5968/5968830.png" className="social social_img" alt="" />
              </a>
              <a href="">
                <img src="https://cdn-icons-png.flaticon.com/128/174/174855.png" className="social social_img" alt="" />
              </a>
              <a href="">
                <img src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png" className="social social_img" alt="" />
              </a>
              <a href="">
                <img src="https://cdn-icons-png.flaticon.com/128/3291/3291695.png" className="social social_img" alt="" />
              </a>
            </div>
          </section>

          <section className="">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-gem me-3 text-secondary"></i>Natwest Bank
                  </h6>
                  <p>
                    Natwest is building the future of how we experience our
                    finance.
                    <br />
                    Made with ❤️ all over the 🌎
                    <br />
                    Natwest Inc.
                    <br />
                    RBS,82 Nassau St #60351 London, UK 10038
                  </p>
                </div>

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Cities</h6>
                  <p>
                    <a href="#!" className="text-reset">
                      New York
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      London
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Paris
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Sydney
                    </a>
                  </p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Natwest</h6>
                  <p>
                    <a href="#!" className="text-reset">
                      About
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Help
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Travel Blog
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Career
                    </a>
                  </p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Services</h6>
                  <p>
                    <a href="#!" className="text-reset">
                      Accounts
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Credit Card
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Money Transfer
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                     Support
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div
            className="text-center p-4"
            
          >
            © 2023 Copyright:
            <a className="text-reset fw-bold" href="#">
              Natwest.com
            </a>
          </div>
        </footer>
    </section>
  )
}
