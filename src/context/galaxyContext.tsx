import React, { createContext, useState } from 'react';
import { Planet } from '../components/planet/IPlanet';
import { GalaxyContext } from '../components/galaxy/IGalaxy';

// generate initial context
const initialContext: GalaxyContext = {
  planets: [],
  count: 0,
  searchEnabled: false,
  searchValue: '',
  setCount: (value: number) => {},
  setPlanets: (data: Planet[]) => {},
  toggleSearch: () => {},
  setSearchValue: (value: string) => {},
};

// galaxy context creation
export const galaxyContext = createContext(initialContext);

// galaxy context provider
export function GalaxyContextProvider(props: any) {
  const [results, setResults] = useState([] as Planet[]);
  const [count, setCount] = useState(0);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchValue, setValue] = useState('');

  // toggle the search variable
  function toggleSearch() {
    setSearchEnabled(!searchEnabled);
  }

  // set the new array of planets
  function setPlanets(planets: Planet[]) {
    setResults(planets);
  }

  // set the new total of planets
  function setTotal(count: number) {
    setCount(count);
  }

  // save the search value of from input
  // search value is saved for futher requests
  function setSearchValue(value: string) {
    setValue(value);
  }

  return (
    <galaxyContext.Provider
      value={{
        planets: results,
        count,
        searchEnabled,
        searchValue,
        setCount: (value: number) => setTotal(value),
        setPlanets: (data: Planet[]) => setPlanets(data),
        toggleSearch,
        setSearchValue: (value: string) => setSearchValue(value),
      }}
    >
      {props.children}
    </galaxyContext.Provider>
  );
}
