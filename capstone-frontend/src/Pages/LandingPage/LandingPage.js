import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./styles.css";
const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero_section">
        <div className="container">
          <div className="row ">
            <div className="col md-6 hero_left">
              <h1>Welcome to The NeoFin</h1>
              <p>
                Your Finance Hub: Accounts, Cards, and Transfers in Harmony.
                <br />
                Manage, Spend, and Transfer with Ease Across All Banks."
              </p>
              <Button href="/register" className="open_account_btn">
                Open an Account
              </Button>
            </div>
            <div className="col md-6 hero_right">
              <img
                src="https://i.pinimg.com/originals/c0/46/c9/c046c90de342ecaedb8d7305581cfb58.jpg"
                alt="Hero image here"
                className="hero_img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service tags */}
      <section className="service_tags">
        <div className="container tag justify-content-center">
          <h1>Our Services</h1>
          <div className="row justify-content-center">
            <div className="col d-flex justify-content-center">
              <div className="card tags info_tag">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/6054/6054280.png"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <b>Multiple Accounts</b>
                  </h5>
                  <p className="card-text">
                    Manage All Your Accounts, From All Banks, in One Place.
                    Simplify Your Finances with Our Multi-Bank Account
                    Management App
                  </p>
                </div>
              </div>
            </div>

            <div className="col d-flex justify-content-center">
              <div className="card tags info_tag">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/6418/6418361.png"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <b>Credit Card Management</b>
                  </h5>
                  <p className="card-text">
                    Unlock Credit Card Control: One App, Many Banks. Take Charge
                    of Your Credit Cards, Anytime, Anywhere.
                  </p>
                </div>
              </div>
            </div>
            <div className="col d-flex justify-content-center">
              <div className="card tags info_tag">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10617/10617404.png"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <b>Money Transfer</b>
                  </h5>
                  <p className="card-text">
                    Seamless Transfers Between Banks, Effortlessly Yours. Move
                    Money Across Accounts, No Boundaries.
                  </p>
                </div>
              </div>
            </div>
            <div className="col d-flex justify-content-center">
              <div className="card tags info_tag">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2706/2706950.png"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <b>Customer Support</b>
                  </h5>
                  <p className="card-text">
                    24/7 Support: Your Financial Partner for All Banking Needs.
                    Get Help and Answers, Anytime You Need, Across All Accounts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Multiple Accounts */}
      <section className="hero_section">
        <div className="container">
          <div className="row">
            <div className="col md-6 hero_right">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1990/1990568.png"
                alt="multiple banks here"
              />
            </div>
            <div className="col md-6 hero_left section">
              <h2>Manage Multiple Acconts</h2>
              <p className="section_p">
                Banking, Unbounded: All Your Accounts, One App.
                <br />
                Effortless Management Across Banks.
                <br />
                Your Financial World, Simplified.
              </p>
              <Button href="/register" className="section_btn">
                Manage Accounts
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Credit card  Management */}
      <section className="hero_section alternate">
        <div className="container">
          <div className="row">
            <div className="col md-6 hero_left alternate_section">
              <h2>Credit Card Management</h2>
              <p className="alternate_section_p">
                Credit Cards, Mastered.
                <br />
                All Your Cards, One Convenient App.
                <br />
                Effortless Control, Across Different Banks.
              </p>
              <Button href="/register" className="alternate_section_btn">
                Manage Cards
              </Button>
            </div>
            <div className="col md-6 hero_right">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1086/1086741.png"
                alt="credit card"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Money Transfer */}
      <section className="hero_section">
        <div className="container">
          <div className="row">
            <div className="col md-6 hero_right">
              <img
                src="https://cdn-icons-png.flaticon.com/128/9359/9359415.png"
                alt="Money Transfer"
              />
            </div>
            <div className="col md-6 hero_left section">
              <h2>Money Transfer</h2>
              <p className="section_p">
                Connecting Banks, One Transfer at a Time.
                <br />
                Move Money Swiftly Across Institutions.
                <br />
                Your Funds, Your Control, Anywhere You Need.
              </p>
              <Button href="/register" className="section_btn">
                Money Transfer
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section >
        <Footer/>
      </section>
    </div>
  );
};

export default LandingPage;
