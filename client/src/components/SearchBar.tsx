import { useState } from 'react';
import '../index.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ backgroundImage: 'linear-gradient(to right,#000000e0, #150f8006)' }}>
      <input
        className='searchBar'
        type="text"
        placeholder="Search for"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;