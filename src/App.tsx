import React from 'react';
import { Container } from './components/conatiner/Conatiner';
import { SearchBar } from './components/searchbar/SearchBar';
import { GalaxyContextProvider } from './context/galaxyContext';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>Star wars galaxy</h1>
      <GalaxyContextProvider>
        <header className='header'>
          <SearchBar />
        </header>
        <Container />
      </GalaxyContextProvider>
    </div>
  );
}

export default App;
