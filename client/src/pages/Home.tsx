import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from "../components/Users";
import SearchBar from "../components/SearchBar";
import auth from "../utils/auth";

import SampleCard from "../components/SampleCard";

const Home = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  

  useEffect(() => {
    if (loginCheck) {
      fetchUsers();
    }
  }, [loginCheck]);

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to retrieve tickets:", err);
      setError(true);
    }
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {!loginCheck ? (
        <div className="login-notice">
          <h1>Please Login</h1>
        </div>
      ) : (
        <>
          <div>
            <SearchBar></SearchBar>
          </div>
          <div style={{ marginTop: "-20px" }}>
            <UserList users={users} />
          </div>
          <div className="container">
            <div className="container containerBG"
                 style={{margin:'0 10px'}}>
              <SampleCard />
            </div>
            <div className="container containerBG"
                 style={{margin:'0 10px'}}>
              <SampleCard />
            </div>
            <div className="container containerBG"
                 style={{margin:'0 10px'}}>
              <SampleCard />
            </div>
            <div className="container containerBG"
                 style={{margin:'0 10px'}}>
              <SampleCard />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
