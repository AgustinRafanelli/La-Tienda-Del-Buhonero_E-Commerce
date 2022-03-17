import { StyledContainer } from "./style";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { Link } from "react-router-dom";

const DropDown = () => {
  const user = useSelector((state) => state.user);

  const [categories, setCategories] = useState([]);
  const [categoryCount, setCategoryCount] = useState("");
  const mostNewCategory = useInput("newCategory");
  const InputUpdateCategory = useInput("updateCategory");

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
  }, []);

  const deleteCategory = (id) => {
    if (!user.isAdmin) throw alert("You shoudn't be seeing this button");
    return axios
      .delete(`/api/category/${id}`)
      .then(() =>
        setCategories(categories.filter((category) => category.id !== id))
      )
      .catch((err) => console.log(err));
  };

  const newCategory = () => {
    if (!user.isAdmin) throw alert("You shoudn't be seeing this button");
    return axios
      .post("/api/category", {
        name: mostNewCategory.value,
      })
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
        variant="h6"
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
                    <input
                      type="text"
                      name={InputUpdateCategory.name}
                      value={InputUpdateCategory.value}
                      onChange={InputUpdateCategory.handleChange}
                      placeholder={category.name}
                    />
                    <button>send</button>
                  </form>
                ) : (
                  <>
                    <Link to="/home">{category.name}</Link>
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="button"
                    >
                      X
                    </button>
                  </>
                )}

                <button
                  onClick={
                    showButton
                      ? () => setShowButton(false)
                      : () => setShowButton(true)
                  }
                >
                  Edit
                </button>
              </li>
            ) : (
              categoryCount[i] > 0 && (
                <li key={i}>
                  <Link to="/home">{category.name}</Link>
                </li>
              )
            );
          })}
      </ul>

      {user.isAdmin && (
        <form onSubmit={newCategory}>
          <input
            type="text"
            name={mostNewCategory.name}
            value={mostNewCategory.value}
            onChange={mostNewCategory.handleChange}
            placeholder="Add category"
          />
          <button>+</button>
        </form>
      )}
    </StyledContainer>
  );
};

export default DropDown;
