import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (song: string, artist?: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");

  const handleSearch = () => {
    onSearch(song, artist);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter song title"
        value={song}
        onChange={(e) => setSong(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter artist name (optional)"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <button onClick={handleSearch}>Search Lyrics</button>
    </div>
  );
};

export default SearchBar;
