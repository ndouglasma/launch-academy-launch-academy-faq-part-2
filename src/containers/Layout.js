import React from "react";
import { Link } from "react-router";

const Layout = (props) => {
  return (
    <div className="page">
    <h1>Launch Academy FAQ</h1>
    <ul className="menu">
      <li><Link to="/"><i className="fa fa-bars"></i> <span>Home</span></Link></li>
      <li><Link to="/"><i className="fa fa-bars"></i> <span>FAQs</span></Link></li>
      <li><Link to="/launchers"><i className="fa fa-bars"></i> <span>Launchers</span></Link></li>
    </ul>
    { props.children }
    </div>
  );
}

export default Layout;
