import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import {
  faYoutube,
  faTwitter,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import "./footer.scss";

const Footer = () => {
  const history = useHistory();

  return (
    <footer className="footer-container">
      <div className="main-footer widgets-dark typo-light">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-4">
              <div className="widget subscribe no-box">
                <h5 className="widget-title">
                  spaceX<span></span>
                </h5>
                <p>
                  SpaceX has gained worldwide attention for a series of historic
                  milestones. It is the only private company ever to return a
                  spacecraft from low-Earth orbit, which it first accomplished
                  in December 2010. The company made history again in May 2012
                  when its Dragon spacecraft attached to the International Space
                  Station, exchanged cargo payloads, and returned safely to
                  Earth — a technically challenging feat previously accomplished
                  only by governments. Since then Dragon has delivered cargo to
                  and from the space station multiple times, providing regular
                  cargo resupply missions for NASA.
                </p>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-4">
              <div className="widget no-box">
                <h5 className="widget-title">
                  Our Space<span></span>
                </h5>
                <ul className="thumbnail-widget">
                  <li>
                    <div className="thumb-content">
                      <span onClick={() => history.push("/spaces")}>List</span>
                    </div>
                  </li>
                  <li>
                    <div className="thumb-content">
                      <span onClick={() => history.push("/gallery")}>
                        gallery
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-4">
              <div className="widget no-box">
                <h5 className="widget-title">
                  Contact Us<span></span>
                </h5>

                <p>
                  <a
                    href="mailto:kld.najjar@gmail.com"
                    title="glorythemes"
                    rel="noreferrer"
                  >
                    kld.najjar@gmail.com
                  </a>
                </p>
                <ul className="social-footer2">
                  <li className="">
                    <a
                      title="youtube"
                      target="_blank"
                      href="https://www.youtube.com/watch?v=KzpVUXxdc68&ab_channel=SpaceX"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="https://www.facebook.com/spacextechnologies/"
                      target="_blank"
                      title="Facebook"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      title="Twitter"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>
                  <li className="">
                    <a
                      title="instagram"
                      target="_blank"
                      href="https://www.instagram.com/"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <p>Copyright spaceX © 2022. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
