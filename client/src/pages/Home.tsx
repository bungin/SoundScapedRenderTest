import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from "../components/Users";
import SearchBar from "../components/SearchBar";
import auth from "../utils/auth";
import axios from "axios";
import SampleCard from "../components/SampleCard";
import Auth from "../utils/auth";

const Home = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [lyrics, setLyrics] = useState<string | null>(null); // State to hold song lyrics
  const [searchError, setSearchError] = useState(false); // State to track search errors

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
      console.error("Failed to retrieve users:", err);
      setError(true);
    }
  };

  // Function to handle searching for a song's lyrics
  const handleSearchLyrics = async (song: string, artist?: string) => {
    try {
      const response = await axios.get("/api/music/search", {
        params: { song, artist },
        headers: { 
          'Content-Type':'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      });

      const { trackId } = response.data;

      // Fetch the lyrics using the trackId
      const lyricsResponse = await axios.get("/api/lyrics", {
        params: { trackId }
      });

      setLyrics(lyricsResponse.data.lyrics_body);
      setSearchError(false);
    } catch (err) {
      console.error("Failed to retrieve song lyrics:", err);
      setSearchError(true);
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
            <SearchBar onSearch={handleSearchLyrics} />
          </div>

          {searchError && (
            <div>
              <p>Failed to retrieve song lyrics. Please try again.</p>
            </div>
          )}

          {lyrics && (
            <div className="lyrics-display">
              <h2>Song Lyrics:</h2>
              <pre>{lyrics}</pre>
            </div>
          )}

          <div style={{ marginTop: "-20px" }}>
            <UserList users={users} />
          </div>

          <div className="container">
            <div
              className="container containerBG"
              style={{ margin: "0 10px" }}
            >
              <SampleCard />
            </div>
            <div
              className="container containerBG"
              style={{ margin: "0 10px" }}
            >
              <SampleCard />
            </div>
            <div
              className="container containerBG"
              style={{ margin: "0 10px" }}
            >
              <SampleCard />
            </div>
            <div
              className="container containerBG"
              style={{ margin: "0 10px" }}
            >
              <SampleCard />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
