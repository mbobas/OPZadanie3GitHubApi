import ApolloClient from "apollo-boost";
import ENV from './../env';

export const Client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: operation => {
    const token = ENV.GITHUB_CLIENT_ID;
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${ENV.GITHUB_CLIENT_SECRET}`
        }
      });
    }
  }
});

