import React from "react";

//Styles and component
import { BiCopyright } from "react-icons/bi";
import './Footer.css'

export default function Footer() {
  return (
    <div className="container">
      <div className="copyright">
        Copyright <BiCopyright /> Ecommerce
      </div>
    </div>
  );
}
