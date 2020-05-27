import React from 'react';
import propTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';

const AuthLayout = ({ children, ...rest }) => (
  <>
    <Navbar />
    <div>{children}</div>
  </>
);
export default AuthLayout;
AuthLayout.propTypes = {
  children: propTypes.element.isRequired,
};
