import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Header = ({ isLoggedIn, isStaff }) => {
  return (
    <header className="header-wrapper">
      <div>
        <Link to="/" className="link-top">
          Forsteri
        </Link>
      </div>
      {isLoggedIn ? (
        <>
          <div>
            <Link to="/logout" className="links">
              Logout
            </Link>
          </div>
          <div>
            <Link to="/theme" className="links">
              Theme
            </Link>
          </div>
          {isStaff && (
          <div>
            <Link to="/staff" className="links">
              Staff
            </Link>
          </div>
          )}
        </>
      ) : (
        <>
          <div>
            <Link to="/signup" className="links">
              Signup
            </Link>
          </div>
          <div>
            <Link to="/login" className="links">
              Login
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;