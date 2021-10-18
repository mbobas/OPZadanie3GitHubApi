import React, { Component } from "react";
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './components/theme/theme';
import SearchBar from './components/SearchBar/SearchBar';


class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
          <SearchBar />
      </ThemeProvider>
    );
  }
}

export default App;