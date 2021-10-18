import React from 'react';
import styled from 'styled-components';
import { Query } from "react-apollo";
import {GET_AVATAR} from '../../Queries/queryAvatar'

const WraperWelcomeStyled = styled.div`
    color: ${({theme}) => theme.white};
    font-size: 0.8rem;
`;

const ImageStyled =styled.img`
width: 3rem;
height: 3rem;
`;

function Welcome() {
  return (
    <div>
      
      <Query query={GET_AVATAR}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;

          return (
            <div>
            <ImageStyled src={data.viewer.avatarUrl} />
            <WraperWelcomeStyled>Welcome {data.viewer.name}</WraperWelcomeStyled></div>
            
            );
        }}
      </Query>
    </div>
  );
}


export default Welcome;