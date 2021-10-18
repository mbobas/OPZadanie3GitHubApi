import React, { Component } from "react";
import styled from "styled-components";

const SerachbarWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60vw;
  @media only screen and (max-width: 850px) {
    width: 90vw;
}
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
  &:hover {
    color:  ${({theme}) => theme.yellow};
  }
`;

const TextDescriptionStyled = styled.p`
    color: ${({theme}) => theme.white};
`;

const TextStarsStyled = styled.div`
    color: ${({theme}) => theme.white};
  `;

const StarStyled = styled.div`
    margin-right: 10px;
    color: ${({theme}) => theme.yellow};
  `;

const LinkName = styled.a`
    &:link {
    color:  ${({theme}) => theme.white};
  }
    &:hover {
    color:  ${({theme}) => theme.yellow};
  }
text-decoration: none;
`;

const StarAndTextWrapper = styled.div`
  display: flex;
  flex-direction: row ;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 1vw;
  border: 1px solid ${({theme}) => theme.darkgray};
  border-radius: 10px;
  background-color: ${({theme}) => theme.darkgray2};
  color: white;
  max-width: 80px;
  margin-right: 1vw;
`;

const LinkAndStarsWrapper = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
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
     if (!this.props.entries && this.props.loading) return <TextNameStyled>Loading....</TextNameStyled>;
    const repos = this.props.entries.edges || [];
    return (
      <SerachbarWrapperStyled>
        {repos.map(({ node }, idx) => (
          <OneItemWrapperStyled key={idx}>

           <LinkAndStarsWrapper>
              <LinkName href={node.url} rel="noreferrer" target="_blank">
                <TextNameStyled>
                  {node.name} - {node.owner.login}
                </TextNameStyled>
              </LinkName>
              <StarAndTextWrapper>
                <StarStyled>★</StarStyled>
                <TextStarsStyled>{node.stargazers.totalCount}</TextStarsStyled>
              </StarAndTextWrapper>
            </LinkAndStarsWrapper>

            <TextDescriptionStyled>{node.description}</TextDescriptionStyled>
            <TextStarsStyled>{node.primaryLanguage && node.primaryLanguage.name}{" "}</TextStarsStyled>
          </OneItemWrapperStyled>
        ))}
        {this.props.loading && <TextNameStyled>Loading...</TextNameStyled>}
      </SerachbarWrapperStyled>
    );
  }
}

export default Repos;