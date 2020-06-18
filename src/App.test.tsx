import React from 'react';
import { shallow, mount } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { Container } from './components/conatiner/Conatiner';
import { SearchBar } from './components/searchbar/SearchBar';

describe('Component rendering', () => {
  // Tests will go here using `it` blocks
  it('renders App', () => {
    shallow(<App />);
  });

  it('renders Container', () => {
    shallow(<Container />);
  });

  it('renders SearchBar', () => {
    shallow(<SearchBar />);
  });
});

describe('List test', () => {
  it('display list of planet', () => {
    const { getByTestId, getByText } = render(<SearchBar />);
    const input = getByTestId('search-input');
    input.value = 'Tatouine';
    //fireEvent.click(getByText('Search'));
    expect(input.value).toBe('Tatouine');
  });

  it('display list of planet', () => {
    const { getByTestId, getByText } = render(<Container />);
    const input = getByTestId('search-input');
    input.value = 'Tatouine';
    //fireEvent.click(getByText('Search'));
    expect(input.value).toBe('Tatouine');
  });
});
