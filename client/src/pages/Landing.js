import React from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      {/* info, img two column grid on wide */}
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby paleo meh distillery, beard cornhole mlkshk cronut chia
            succulents echo park twee tumeric. +1 vegan dreamcatcher shoreditch
            meggings normcore austin beard. Gochujang fanny pack taiyaki,
            cold-pressed drinking vinegar
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>

        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
