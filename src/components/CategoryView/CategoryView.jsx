import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GridCard from "../../commons/GridProducts/GridCard";
import { StyledContainer } from "./style";
import axios from "axios";

export default function CategoryView() {
  const [products, setProducts] = useState([]);

  const { name } = useParams();

  useEffect(() => {
    return axios
      .get(`/api/category/${name}`)
      .then((res) => setProducts(res.data));
  }, [name]);

  return (
    <StyledContainer>
    <h1 className="title">{name[0].toUpperCase() + name.slice(1)}</h1>
     <div className="products">
      {products.length ? (
        products.map((product) => (
          <div className="product" key={product.id}>
            <GridCard product={product} />
          </div>
        ))
      ) : (
        <h1>There are no products</h1>
      )}
      </div>
    </StyledContainer>
  );
}
