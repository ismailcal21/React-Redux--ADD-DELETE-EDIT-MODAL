import React from "react";
import { Link } from "react-router-dom";
import "../style.css/style.css";

const Header = () => {
  return (
    <div
      className=""
      // style={{
      //   position: "relative",
      //   marginTop: "0",
      //   backgroundColor: "rgba(0, 150, 226, 0.9)",
      // }}
    >
      <nav
        className="navbar navbar-expand-lg bg-light navbarCss"
        // style={{
        //   position: "absolute",
        //   left: 0,
        //   width: "100%",
        //   backgroundColor: "rgba(0, 150, 226, 0.9)",
        // }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            ListBook
          </Link>
          <Link className="navbar-brand" to="/">
            Kitaplar
          </Link>
          <Link className="navbar-brand" to="/categories">
            Kategoriler
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
