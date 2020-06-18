import { Planet } from '../planet/IPlanet';

// typescript context galaxy
export interface GalaxyContext {
  planets: Planet[];
  count: number;
  searchEnabled: boolean;
  searchValue: string;
  setCount: (value: number) => void;
  setPlanets: (data: Planet[]) => void;
  toggleSearch: () => void;
  setSearchValue: (value: string) => void;
}
