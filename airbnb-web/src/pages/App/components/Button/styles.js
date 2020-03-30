import styled from 'styled-components';

export const Button = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  border: none;
  background-color: ${({ color }) => color};
  margin-top: 10px;
  color: #fff;
  i {
    font-size: 18px;
  }
  &:hover {
    filter: brightness(50%);
  }
  &:active {
    filter: brightness(70%);
  }
`;
