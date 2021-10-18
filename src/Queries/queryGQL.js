import gql from "graphql-tag";

export const queryGQL = gql`
  query search($query: String!, $cursor: String) {
    search(first: 15, query: $query, type: REPOSITORY, after: $cursor) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
              avatarUrl
            }
            description
            url
            stargazers {
              totalCount
            }
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;