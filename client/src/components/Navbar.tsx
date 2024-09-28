import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";

import Button from "react-bootstrap/Button";

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);
  // tried to use <Button href: '/login'> to replace login/out buttons but ran in to hook(?) issue.
  return (
    <div className="navBG">
      <h1>Authentication Review</h1>
      <div>
        {!loginCheck ? (
          <Button variant="primary" type="button">
            <Link to="/login">Login</Link>
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => {
              auth.logout();
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
