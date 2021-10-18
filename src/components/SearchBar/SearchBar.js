import React, { useState, useRef } from "react";
import styled from "styled-components";
import ReposWrapper from "../Repositories/ReposWrapper";

const SerachbarWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;
  min-height: 11rem;
 // border: 1px solid red;
`;

const ResultsWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  //border: 1px solid red;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  //background-color: #37474f;
  background-color: #0D1117;
  /* Change width of the form depending if the bar is opened or not */
  width: ${props => (props.barOpened ? "50rem" : "2rem")};
  /* If bar opened, normal cursor on the whole form. If closed, show pointer on the whole form so user knows he can click to open it */
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
      <SerachbarWrapperStyled>
      <Form
        barOpened={barOpened}
        onClick={() => {
          // When form clicked, set state of baropened to true and focus the input
          setBarOpened(true);
          inputFocus.current.focus();
        }}
        // on focus open search bar
        onFocus={() => {
          setBarOpened(true);
          inputFocus.current.focus();
        }}
        // on blur close search bar
        onBlur={() => {
          setBarOpened(false);
        }}
        // On submit, call the onFormSubmit function
        onSubmit={onFormSubmit}
        ref={formRef}
      >
        <Button type="submit" barOpened={barOpened}>
          Click Search Engine
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
      {input.length >2 ? <ReposWrapper input={input} /> : <div>Put minimum 3 characters</div>}
      </ResultsWrapperStyled>
    </div>
  );
}
