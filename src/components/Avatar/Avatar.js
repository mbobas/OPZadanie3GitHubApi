import React from "react";
import { Avatar } from "gitstar-components";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import styled from 'styled-components';

const GET_AVATAR = gql`
  query {
    viewer {
      avatarUrl
      name
    }
  }
`;

const WrapperAvatar = styled.div`
  background-color: #010409;
`;


class UserAvatar extends React.Component {
  render() {
    return (
      <Query query={GET_AVATAR}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;

          return (<div>Welcome <Avatar url={data.viewer.avatarUrl} /><div>{data.viewer.name}</div></div>);
        }}
      </Query>
    );
  }
}

export default UserAvatar;