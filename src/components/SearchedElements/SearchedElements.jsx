import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledContainer } from './style';
import GridCard from '../../commons/GridProducts/GridCard';

export default function SearchedElements() {
  const [data, setData] = useState([]);
  const { title } = useParams();

  useEffect(() => {
    return axios
      .get(`/api/products/search/${decodeURI(title)}`)
      .then(res => setData(res.data));
  }, [title]);
  return (
    <StyledContainer>
      <h1 className='title'> Results for your search: {title} </h1>
      <div className='products'>
        {' '}
        {data.length ? (
          data.map(product => (
            <div className='product' key={product.id}>
              <GridCard product={product} />
            </div>
          ))
        ) : (
          <h1>Product Not Found</h1>
        )}
      </div>
    </StyledContainer>
  );
}
