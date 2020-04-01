import React from "react";
import Navbar from "../Navbar/Navbar";

const PrivateLayout = ({ children, ...rest }) => (
  <>
    <Navbar />
    <br />
    {children}
  </>
);
export default PrivateLayout;
