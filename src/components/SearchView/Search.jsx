import React, { useState, useEffect } from 'react';
import GridProducts from '../../commons/GridProducts/GridProducts';
import axios from 'axios';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = function () {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const query = useQuery();
  const [products, setProducts] = useState([]);

  const buscar = query.get('search');

  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleSearch = () => {
    navigate(`/search/${value}`);
    setValue('');
  };

  return (
    <div>
      <input
        name='search'
        placeholder='Search…'
        value={value}
        onChange={handleChange}
      />
      <button type='submit' onClick={handleSearch}>
        {' '}
        Search{' '}
      </button>
    </div>
  );
};

export default Search;
