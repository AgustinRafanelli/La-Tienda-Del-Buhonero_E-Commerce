import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import InputBase from "@mui/material/InputBase";
// import SearchIcon from "@mui/icons-material/Search";
//import { styled, alpha } from "@mui/material/styles";

const Search = function () {
  const [value, setValue] = useState("");
  const navigate = useNavigate()

  const handleChange = (e)=>{
    setValue(e.target.value)
    
  }
  const handleSearch = () => {
    navigate(`/search/${value}`)
    setValue("")
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
    <div >
    <input   name="search"
          placeholder="Search…"
          value = {value}
            onChange = {handleChange} />
     <button type= "submit" onClick={handleSearch}> Search </button>       

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
    </div>
  );
};

export default Search;
