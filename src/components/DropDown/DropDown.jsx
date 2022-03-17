import { StyledContainer } from "./style";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const DropDown = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [categoryCount, setCategoryCount] = useState("");
  const mostNewCategory = useInput("newCategory");
  const InputUpdateCategory = useInput("updateCategory");
  const [reset, setReset] = useState(1);

  useEffect(() => {
    axios
      .get("/api/category")
      .then((res) => res.data)
      .then((data) => {
        setCategories(data);
        return Promise.all(
          data.map((category) => {
            return axios
              .get(`/api/category/${category.name}/count`)
              .then((res) => res.data);
          })
        );
      })
      .then((data) => setCategoryCount(data));
  }, [reset]);

  const deleteCategory = (id) => {
    if (!user.isAdmin) throw alert("You shoudn't be seeing this button");
    return axios
      .delete(`/api/category/${id}`)
      .then(() =>
        setCategories(categories.filter((category) => category.id !== id))
      )
      .catch((err) => console.log(err));
  };

  const newCategory = (e) => {
    e.preventDefault();
    if (!user.isAdmin) throw alert("You shoudn't be seeing this button");
    axios
      .post("/api/category", {
        name: mostNewCategory.value,
      })
      .then(() => setReset(reset + 1))
      .then(() => navigate(`/addToCategory?${mostNewCategory.value}`))
      .then(() => mostNewCategory.reset())
      .catch((err) => console.log(err));
  };

  const updateCategory = (category) => {
    if (!user.isAdmin) throw alert("You shoudn't be seeing this button");
    return axios
      .put(`/api/category/${category}`, { name: InputUpdateCategory.value })
      .catch((err) => console.log(err));
  };

  const [showButton, setShowButton] = useState(false);

  return (
    <StyledContainer>
      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1 }}
        className="leftSide__title"
      >
        Categories:
      </Typography>

      <ul>
        {categories.length &&
          categories.map((category, i) => {
            return user.isAdmin ? (
              <li key={i}>
                {showButton ? (
                  <form onSubmit={() => updateCategory(category.name)}>
                    <TextField
                      size="small"
                      id="outlined-basic"
                      label={category.name}
                      variant="outlined"
                      type="text"
                      name={InputUpdateCategory.name}
                      value={InputUpdateCategory.value}
                      onChange={InputUpdateCategory.handleChange}
                      placeholder={category.name}
                    />
                    <Button
                      variant="contained"
                      href="#contained-buttons"
                      size="small"
                    >
                      send
                    </Button>
                  </form>
                ) : (
                  <>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1 }}
                      className="leftSide__title"
                    >
                      <Link to="/home">{category.name}</Link>
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => deleteCategory(category.id)}
                      className="button"
                    >
                      <DeleteIcon/>
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() =>
                        navigate(`/addToCategory?${category.name}`)
                      }
                    >
                      <AddIcon/>Add product
                    </Button>
                  </>
                )}

                <Button
                  size="small"
                  variant="contained"
                  onClick={
                    showButton
                      ? () => setShowButton(false)
                      : () => setShowButton(true)
                  }
                >
                  <EditIcon />
                </Button>
              </li>
            ) : (
              categoryCount[i] > 0 && (
                <li key={i}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                    className="leftSide__title"
                  >
                    <Link to="/home">{category.name}</Link>
                  </Typography>
                </li>
              )
            );
          })}
      </ul>

      {user.isAdmin && (
        <form onSubmit={newCategory}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            type="text"
            name={mostNewCategory.name}
            value={mostNewCategory.value}
            onChange={mostNewCategory.handleChange}
            placeholder="Add category"
          />
          <Button variant="contained" size="small">
          <AddIcon/>
          </Button>
        </form>
      )}
    </StyledContainer>
  );
};

export default DropDown;