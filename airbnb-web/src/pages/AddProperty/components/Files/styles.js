import styled from 'styled-components';

export const Dropzone = styled.section`
  border: 2px dashed #f33;
  width: 100%;
  max-width: 660px;
  font-size: 16px;
  color: #777;
  text-align: center;
  cursor: pointer;

  background-color: #fff;
  color: #444;

  &.without-files {
    display: flex;
  }

  img {
    width: 100px;
  }

  p {
    margin-top: 15px;
    border: none !important;
  }
`;
