import React, { useState, useEffct } from "react";
import GridProducts from "../../commons/GridProducts/GridProducts";
import axios from "axios";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";

function useQuery(){
    return new URLSearchParams(useLocation().search) 
  }



const Search = function () {
  const [search, setSearch] = useState("");
  const navigate = useNavigate()
  const query = useQuery()
  const [products, setProducts] = useState([])
  
  
  const buscar= query.get("search")
  

  useEffect(()=>{
    const searchUrl = buscar ? `api/products/search?query=${buscar}`
    :  axios.get(searchUrl)
      .then(res => setProducts(res.data))
  }, [buscar]) 


  const handleChange = (e)=>{
    setSearch(e.target.value)
    
  }
  const handleSubmit = (e) => {
    
    e.preventeDefault();
    navigate.push(`/?search=${search}`)

  };

 /*  const Searchh = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled("input")(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "20ch",
        "&:focus": {
          width: "30ch",
        },
      },
    },
  })); */
  return (
    <form onSubmit={handleSubmit}>
    <input   name="search"
          placeholder="Search…"
          value = {search}
            onChange = {handleChange} />
     {/*  <Searchh>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        
        <StyledInputBase
            name="search"
            //inputProps={{"aria-label":"search"}}    
          placeholder="Search…"
          value = {search}
            onChange = {handleChange}
        />
      </Searchh> */}
    </form>
  );
};

export default Search;
