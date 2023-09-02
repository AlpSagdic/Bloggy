import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  var currentTime = new Date();
  var year = currentTime.getFullYear();
  return (
    <footer>
      <div className="footer">
        <div className="first-row">
          <ul className="social-links">
            <Link className="footer-link" to={"/"}>
              <ion-icon name="logo-facebook"></ion-icon>
            </Link>
            <Link className="footer-link" to={"/"}>
              <ion-icon name="logo-instagram"></ion-icon>
            </Link>

            <Link className="footer-link" to={"/"}>
              <ion-icon name="logo-twitter"></ion-icon>
            </Link>
          </ul>
        </div>

        <div className="second-row">
          <ul className="footer-elements">
            <li>
              <Link className="footer-link" to={"/"}>
                Contact us
              </Link>
            </li>
            <li>
              <Link className="footer-link" to={"/"}>
                Our Services
              </Link>
            </li>
            <li>
              <Link className="footer-link" to={"/"}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="footer-link" to={"/"}>
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link className="footer-link" to={"/"}>
                Career
              </Link>
            </li>
          </ul>
        </div>

        <div className="third-row">
          <span className="copyright">
            Copyright © {year} ReakTech - All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
