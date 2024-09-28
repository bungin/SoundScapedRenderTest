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
      // CURRENTLY <Button> variant is not working. adding the bootstrap css to imports
      // breaks the index.css styles
  return (
    <div className="navBG">
      <h1>Authentication Review</h1>
      <div>
        {!loginCheck ? (
          <Button className="" variant="primary">
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
