import React, { Component } from "react";
import styled from "styled-components";

const SerachbarWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  //border: 1px solid green;
  width: 60vw;
  //border: 1px solid red;
`;

const OneItemWrapperStyled = styled.div`
  border: 2px solid ${({theme}) => theme.darkgray2};
  margin: 10px;
  border-radius: 10px;
  padding: 16px;
  background-color: ${({theme}) => theme.lightblack};
  color: white;
`;

const TextNameStyled = styled.h3`
  color: ${({theme}) => theme.white};
  //font-size: 1rem;

`;

const TextDescriptionStyled = styled.p`
  color: ${({theme}) => theme.white};
  //font-size: 1rem;
`;

const TextStarsStyled = styled.p`
  color: ${({theme}) => theme.white};
  //font-size: 1rem;
`;




class Repos extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  handleOnScroll = () => {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
      this.props.onLoadMore();
    }
  };

  render() {
     if (!this.props.entries && this.props.loading) return <p>Loading....</p>;
    const repos = this.props.entries.edges || [];
    return (
      <SerachbarWrapperStyled>
        {repos.map(({ node }, idx) => (
          <OneItemWrapperStyled key={idx}>
            <TextNameStyled>
              {node.name} - {node.owner.login}
            </TextNameStyled>
            <TextDescriptionStyled>{node.description}</TextDescriptionStyled>
            <TextStarsStyled>
              ★ {node.stargazers.totalCount} -{" "}
              {node.primaryLanguage && node.primaryLanguage.name}{" "}
              
            </TextStarsStyled>
          </OneItemWrapperStyled>
        ))}
        {this.props.loading && <h2>Loading...</h2>}
      </SerachbarWrapperStyled>
    );
  }
}

export default Repos;