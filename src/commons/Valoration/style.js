import styled from 'styled-components/macro';

export const StyledContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 15px;

  .star {
    &:hover {
      transition: all 0.2s ease-in-out;
      transform: scale(1.2);
      cursor: pointer;
    }
  }
`;
