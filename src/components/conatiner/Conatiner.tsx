import React, { useState, useEffect, useContext } from 'react';
import { getNextPage, getNextSearchPage } from '../../utils/Axios';
import { Spin, List, Row, Col, Pagination, Empty } from 'antd';
import {
  getFormatedValue,
  parseResults,
  mergeArrayToItem,
} from '../../utils/Utils';
import 'antd/dist/antd.css';
import { Planet } from '../planet/IPlanet';
import { AxiosResponse } from 'axios';
import { RadarGraph } from '../graph/RadarGraph';
import './Style.css';
import { galaxyContext } from '../../context/galaxyContext';
import { VirusIcon } from '../../utils/Icons';
import _ from 'lodash';
import { Description } from '../description/Description';
import { notification } from 'antd';

export function Container(props: any) {
  const attributes = [
    'rotation_period',
    'orbital_period',
    'diameter',
    'gravity',
    'surface_water',
    'population',
  ];

  const labels = [
    'Rotation period\n(in h)',
    'Orbital period\n(in week)',
    'Diameter\n(per 1000km)',
    'Gravity ',
    'Surface Water',
    'Population\n(in million)',
  ];

  const {
    setCount,
    setPlanets,
    planets,
    count,
    searchEnabled,
    searchValue,
  } = useContext(galaxyContext);
  const [loading, setLoading] = useState(true);
  const [radarKeys, setRadarKeys] = useState([] as string[]);
  const [descriptionPlanet, setDescritpionPlanet] = useState([] as any);
  const [comparePlanet, setComparePlanet] = useState([] as Planet[]);
  const [radarData, setRadarData] = useState([] as any[]);

  useEffect(() => {
    next(); // call first page of planets
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // [] run only at mount and avoid loop

  function next(page: number = 1, pageSize?: number) {
    if (searchEnabled) {
      // request made when a search was mad
      getNextSearchPage(searchValue, page).then(
        (response: AxiosResponse<any>) => {
          parseResults(response, (count: number, results: Planet[]) => {
            assignResults(count, results);
          });
        }
      );
    } else {
      // normal request with full planet list
      getNextPage(page).then((response: AxiosResponse<any>) => {
        parseResults(response, (count: number, results: Planet[]) => {
          assignResults(count, results);
        });
      });
    }
  }

  // used in next() method to avoid duplicate
  function assignResults(count: number, planets: Planet[]) {
    // set count, planet array and stop loading animation
    setCount(count);
    setPlanets(planets);
    setLoading(false);
  }

  // prepare all data for radar graph
  function prepareDataForGraph(item: Planet) {
    // findIndex return index or -1
    const exist = _.findIndex(comparePlanet, (planet: Planet) => {
      return item.name === planet.name;
    });

    if (exist === -1) {
      const planetList = mergeArrayToItem(comparePlanet, item);
      const keys = mergeArrayToItem(radarKeys, item.name);
      const data = constructGraphData(planetList);
      setAllValue(planetList, keys, data);
    } else {
      notification.info({
        message: 'Look at the radar graph',
        description: `${item.name} is already added`,
      });
    }
  }

  // Set / Save in state all values for Radar graph comparaison
  function setAllValue(planetList: Planet[], keys: string[], data: any[]) {
    setComparePlanet(planetList);
    setRadarKeys(keys);
    setRadarData(data);
  }

  // Radar graph data are tricky and needs to be formated
  function constructGraphData(planetList: Planet[]) {
    return attributes.map((label: string, index: number) => {
      let json: any = { info: labels[index] };
      // TODO edit Planet type to be able to accept planet[label]
      planetList.forEach((planet: any) => {
        json[planet.name] = getFormatedValue(label, planet[label]);
      });
      return json;
    });
  }

  // Planet can also be remove from radar grph
  function removeFromGraphData(name: string) {
    const planetList = comparePlanet.filter(
      (planet: Planet) => planet.name !== name
    );
    const keys = radarKeys.filter((value: string) => value !== name);
    const data = constructGraphData(planetList);
    setAllValue(planetList, keys, data);
  }

  // display on click more information/details on the planet
  function openedPlanetDescription(name: string) {
    let planetList: any = [];
    planetList[name] = !descriptionPlanet[name];
    setDescritpionPlanet(planetList);
  }

  return (
    <div className='container' data-testid='container'>
      <Spin size='large' spinning={loading}>
        <div>
          <Row>
            <Col span={20} offset={2}>
              {planets.length > 0 ? (
                <List
                  data-testid='planet-list'
                  dataSource={planets}
                  split={true}
                  renderItem={(planet: any, index: number) => (
                    <List.Item
                      // inline style to override antd default style
                      style={{
                        borderBottom: '1px solid rgba(218, 218, 218, 0.7)',
                        padding: '15px 0',
                      }}
                      key={planet.name}
                      actions={[
                        <button
                          className='btn orange'
                          onClick={() => {
                            prepareDataForGraph(planet);
                          }}
                        >
                          <div className='btn-text'>Compare</div>
                        </button>,
                        <button
                          className='btn blue'
                          onClick={() => {
                            removeFromGraphData(planet.name);
                          }}
                        >
                          <div className='btn-text'>Remove</div>
                        </button>,
                      ]}
                    >
                      <List.Item.Meta
                        style={{
                          textAlign: 'left',
                        }}
                        avatar={<VirusIcon />}
                        title={
                          <span
                            className='fake-link'
                            onClick={() => openedPlanetDescription(planet.name)}
                          >
                            {planet.name}
                          </span>
                        }
                        description={
                          descriptionPlanet[planet.name] && (
                            <Description planet={planet} />
                          )
                        }
                      />
                    </List.Item>
                  )}
                ></List>
              ) : (
                <Empty
                  // inline style to override antd's style
                  style={{ marginTop: '30px' }}
                  data-testid='empty-component'
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col span={20} offset={2}>
              <Pagination
                // See if pagination can be added directly into antd's List component
                className='pagination'
                data-testid='pagination'
                defaultCurrent={1}
                total={count}
                showSizeChanger={false}
                onChange={(page: number, pageSize?: number) => {
                  next(page);
                }}
              />
            </Col>
          </Row>
          <div className='radar' data-testid='radargraph'>
            <RadarGraph data={radarData} keys={radarKeys} />
          </div>
        </div>
      </Spin>
    </div>
  );
}
