import Axios from 'axios';

export function searchPlanet(name: string) {
  return Axios.get(`${process.env.REACT_APP_API_URL}?search=${name}`);
}

export function getNextPage(next: number = 1) {
  return Axios.get(`${process.env.REACT_APP_API_URL}?page=${next}`);
}

export function getNextSearchPage(name: string, next: number = 1) {
  return Axios.get(
    `${process.env.REACT_APP_API_URL}?search=${name}&page=${next}`
  );
}
