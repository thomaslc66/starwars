import React, { createContext, useState } from 'react';
import { Planet } from '../components/planet/IPlanet';
import { GalaxyContext } from '../components/galaxy/IGalaxy';

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

export const galaxyContext = createContext(initialContext);

export function GalaxyContextProvider(props: any) {
  const [results, setResults] = useState([] as Planet[]);
  const [count, setCount] = useState(0);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchValue, setValue] = useState('');

  function toggleSearch() {
    setSearchEnabled(!searchEnabled);
  }

  function setPlanets(planets: Planet[]) {
    setResults(planets);
  }

  function setTotal(count: number) {
    setCount(count);
  }

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
