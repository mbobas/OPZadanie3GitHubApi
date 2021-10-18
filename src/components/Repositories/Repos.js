import React, { Component } from "react";


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
      <ul>
        {repos.map(({ node }, idx) => (
          <li key={idx}>
            <h3>
              {node.name} - {node.owner.login}
            </h3>
            <p>{node.description}</p>
            <p>
              ★ {node.stargazers.totalCount} -{" "}
              {node.primaryLanguage && node.primaryLanguage.name}{" "}
            </p>
          </li>
        ))}
        {this.props.loading && <h2>Loading...</h2>}
      </ul>
    );
  }
}

export default Repos;