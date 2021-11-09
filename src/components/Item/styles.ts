import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 10px;
  height: 100%;

  button {
    border-radius: 0 0 10px 10px;
    background-color: #000;
    color: #fff;
  }

  button:hover {
    background-color: #ccc;
    color: #000;
  }

  img {
    max-height: 250px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;

    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transition: 0.3s ease-in-out;
    transition: 0.3s ease-in-out;
  }

  img:hover {
    border-radius: 10px;
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
  }
`;
