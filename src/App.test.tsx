import React from 'react';
import { shallow } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';
import { Container } from './components/conatiner/Conatiner';
import { SearchBar } from './components/searchbar/SearchBar';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('Component rendering', () => {
  // Tests will go here using `it` blocks
  it('renders App', () => {
    const appWrapper = shallow(<App />);
    const h1 = appWrapper.find('h1');
    expect(h1.text()).toBe('Star wars galaxy');
  });

  it('renders Container', () => {
    const { getByTestId } = render(<Container />);
    const container = getByTestId('container');
    expect(container).toBeInTheDocument();
  });

  it('renders search bar', () => {
    const { getByTestId } = render(<SearchBar />);
    const searchbar = getByTestId('searchbar');
    expect(searchbar).toBeInTheDocument();
  });

  it('renders pagination', () => {
    const { getByTestId } = render(<Container />);
    const pagination = getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
  });

  it('renders radar', () => {
    const { getByTestId } = render(<Container />);
    const radargraph = getByTestId('radargraph');
    expect(radargraph).toBeInTheDocument();
  });
});

describe('App tests', () => {
  it('Searchbar input should accept text', () => {
    const { getByTestId } = render(<SearchBar />);
    const input = getByTestId('search-input');
    input.value = 'Tatooine';
    expect(input.value).toBe('Tatooine');
  });

  // TODO see why fireEvent.click is not working
  it('Searchbar should reset on click', () => {
    const { getByTestId } = render(<SearchBar />);
    const input = getByTestId('search-input');
    const resetBtn = getByTestId('reset-btn');
    input.value = 'Tatooine';
    fireEvent.click(resetBtn); // not working
    expect(input.value).toBe('');
  });

  it('Should display empty component when planet list is empty', () => {
    const { getByTestId } = render(<Container />);
    const empty = getByTestId('empty-component');
    expect(empty).toBeInTheDocument();
  });

  // Started test to get API value
  /*   
    it('display list of planet', (done) => {
      const mock = new MockAdapter(Axios);
      mock.onGet(`${process.env.REACT_APP_API_URL}`).reply(200, response.data);
      const component = mount(<Container />);
      setImmediate(() => {
        component.update();
        console.log(component.debug());
        done();
      });
    }); 
  */
});
