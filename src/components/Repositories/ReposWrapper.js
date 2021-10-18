import React, { Component } from "react";
import { Query } from "react-apollo";
import Repos from "./Repos";
import { queryGQL } from "./../../Queries/queryGQL";
import styled from "styled-components";

const ReposWprapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;


class ReposWrapper extends Component {
  render() {
    const query = this.props.input; 
    return (
      <ReposWprapperStyled>
        
        <h1>The best repositories from all GitHub</h1>
        <Query
          notifyOnNetworkStatusChange={true}
          query={queryGQL}
          variables={{
            query
          }}
        >
          {({ data, loading, error, fetchMore }) => {
            if (error) return <p>{error.message}</p>;
            const search = data.search;

            return (
              <Repos
                loading={loading}
                entries={search}
                onLoadMore={() =>
                  fetchMore({
                    variables: {
                      query,
                      cursor: search.pageInfo.endCursor
                    },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                      const newEdges = fetchMoreResult.search.edges;
                      const pageInfo = fetchMoreResult.search.pageInfo;
                      return newEdges.length
                        ? {
                            search: {
                              __typename: prevResult.search.__typename,
                              edges: [...prevResult.search.edges, ...newEdges],
                              pageInfo
                            }
                          }
                        : prevResult;
                    }
                  })
                }
              />
            );
          }}
        </Query>
      </ReposWprapperStyled>
    );
  }
}

export default ReposWrapper;