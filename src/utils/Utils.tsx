import { AxiosResponse } from 'axios';
import { notification } from 'antd';
import { Planet } from '../components/planet/IPlanet';

// Parse result from api call to /planets or /planets/search
export function parseResults(
  response: AxiosResponse<any>,
  callback: (count: number, results: Planet[]) => void
) {
  if (response.status === 200) {
    const {
      data: { count, results },
    } = response;
    callback(count, results);
  } else {
    notification.error({
      message: 'Erreur lors de la récupération de la galaxie',
      description: 'Le côté obscur doit y être pour quelque chose !',
    });
  }
}

// Convert string from API to int for Graph
export function toInt(value: string) {
  const number = parseInt(value, 10);
  if (isNaN(number)) {
    return 0;
  }
  return number;
}

// Format text to get better view on radar graph
export function getFormatedValue(label: string, value: string) {
  switch (label) {
    case 'orbital_period':
      return toInt(value) / 7;
    case 'population':
      return toInt(value) / 100000;
    default:
      return toInt(value);
  }
}

export function mergeArrayToItem(array1: any[], item: any) {
  return [...array1, item];
}
