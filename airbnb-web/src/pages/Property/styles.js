import styled from 'styled-components';

export const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    border-radius: 8px;
    background-color: #fff;
    display: inline-block;
    padding: 13px;
  }

  h1,
  span {
    text-align: center;
    display: block;
  }
`;

export const Images = styled.div`
  width: 100%;
  max-width: 660px;
  font-size: 16px;
  color: #777777;
  text-align: center;
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-gap: 5px;
  background-color: #fff;
  color: #444;

  &.without-images {
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;

  p {
    margin-bottom: 15px;
    padding: 10px;
    width: 100%;
  }

  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }

  span {
    color: #fc6963;
    font-size: 20px;
  }
`;
