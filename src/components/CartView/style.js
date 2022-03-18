import styled from 'styled-components/macro';

export const StyledContainer = styled.div`
  .cart {
    .cart__title {
      text-align: left;
      margin-left: 20px;
    }
  }
  .checkout{
    float: center;
  }
  .btn-checkout{
    font-weight: bold;
                font-size: 18px;
                color: white;
                border: none;
                padding: 10px;
                border-radius: 5px;
                background-color: #1976d2;

                &:hover{
                    transition: all 0.2s ease-in-out;
                    background-color: rgba(0, 0, 0, 0.7);
                    cursor: pointer;
                }
  }
`;
