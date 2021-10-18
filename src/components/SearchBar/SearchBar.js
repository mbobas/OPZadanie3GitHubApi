import React, { useState, useRef } from "react";
import styled from "styled-components";
import ReposWrapper from "../Repositories/ReposWrapper";
import Welcome from './../Avatar/Welcome';

const SerachbarWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;
  min-height: 11rem;
  background-color: #010409;
`;

const ResultsWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 8px rgba(255, 255, 255, 0.3);
  background-color: #0D1117;
  width: ${props => (props.barOpened ? "50rem" : "2rem")};
  cursor: ${props => (props.barOpened ? "auto" : "pointer")};
  padding: ${props => (props.barOpened ? "2rem" : "4rem")};
  height: 2rem;
  border-radius: 10rem;
  transition: width 1000ms cubic-bezier(0.645, 0.045, 0.355, 1.3);
  transition: padding 1000ms cubic-bezier(0.645, 0.045, 0.355, 1.3);
`;

const Input = styled.input`
  font-size: 20px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: ${props => (props.barOpened ? "1rem" : "1rem")};
  border: none;
  color: white;
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: white;
  }
`;

const Button = styled.button`
  margin-left: 15px;
  line-height: 2;
  pointer-events: ${props => (props.barOpened ? "auto" : "none")};
  cursor: ${props => (props.barOpened ? "pointer" : "none")};
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
`;

export default function SearchBar({ children }) {
  const [input, setInput] = useState("");
  const [barOpened, setBarOpened] = useState(false);
  const formRef = useRef();
  const inputFocus = useRef();

  const onFormSubmit = e => {
    e.preventDefault();
    setBarOpened(true);  
  };

  return (
    <div>
      <Welcome />  
      <SerachbarWrapperStyled>
      <Form
        barOpened={barOpened}
        onClick={() => {
          setBarOpened(true);
          inputFocus.current.focus();
        }}
        onFocus={() => {
          setBarOpened(true);
          inputFocus.current.focus();
        }}
        onBlur={() => {
          setBarOpened(false);
        }}
        onSubmit={onFormSubmit}
        ref={formRef}
      >
        <Button type="submit" barOpened={barOpened}>
          Start Search
        </Button>
        <Input
          onChange={e => setInput(e.target.value)}
          ref={inputFocus}
          value={input}
          barOpened={barOpened}
          placeholder="Search for a repository"
        />
      </Form>
      </SerachbarWrapperStyled>
      <ResultsWrapperStyled>
      {input.length >2 ? <ReposWrapper input={input} /> : <div></div>}
      </ResultsWrapperStyled>
    </div>
  );
}
