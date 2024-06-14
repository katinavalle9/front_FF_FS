import { MDBContainer, MDBInputGroup } from "mdb-react-ui-kit";
import { useSearch } from "../../context/SearchContex";
import { useState, useEffect } from 'react';

const Search = () => {
  const { setSearchQuery } = useSearch();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500); // Debounce por 500 ms

    return () => clearTimeout(timer);
  }, [inputValue, setSearchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  return (
    <MDBContainer>
      <MDBInputGroup tag="form" className="d-flex w-auto" onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-control"
          placeholder="Search..."
          aria-label="Search"
          type="Search"
          onChange={handleSearch}
          value={inputValue}
        />
      </MDBInputGroup>
    </MDBContainer>
  );
};

export default Search;