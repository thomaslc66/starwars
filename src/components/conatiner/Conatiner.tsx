import React, { useState, useEffect, useContext } from 'react';
import { getNextPage, getNextSearchPage } from '../../utils/Axios';
import { Spin, List, Row, Col, Pagination, Empty, Descriptions } from 'antd';
import {
  getFormatedValue,
  parseResults,
  mergeArrayToItem,
} from '../../utils/Utils';
import 'antd/dist/antd.css';
import { Planet, Description } from '../planet/IPlanet';
import { RadarGraph } from '../graph/RadarGraph';
import './Style.css';
import { galaxyContext } from '../../context/galaxyContext';
import { ReactComponent as VirusSmall } from '../../assets/atom/icon/form/virus-small.svg';
import { ReactComponent as Close } from '../../assets/atom/icon/close.svg';
import { ReactComponent as Plus } from '../../assets/atom/icon/plus.svg';
import _ from 'lodash';

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
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [radarKeys, setRadarKeys] = useState([] as string[]);
  const [descriptionPlanet, setDescritpionPlanet] = useState([] as any);
  const [comparePlanet, setComparePlanet] = useState([] as Planet[]);
  const [radarData, setRadarData] = useState([] as any[]);

  useEffect(() => {
    next(); // call first page of planets
  }, []); // [] run only at mount and avoid loop

  function next(page: number = 1, pageSize?: number) {
    if (searchEnabled) {
      getNextSearchPage(searchValue, page).then((response) => {
        parseResults(response, (count: number, results: Planet[]) => {
          assignResults(count, results);
        });
      });
    } else {
      getNextPage(page).then((response) => {
        parseResults(response, (count: number, results: Planet[]) => {
          assignResults(count, results);
        });
      });
    }
  }

  function assignResults(count: number, planets: Planet[]) {
    setCount(count);
    setPlanets(planets);
    setLoading(false);
  }

  function prepareDataForGraph(item: Planet) {
    const exist = _.findIndex(comparePlanet, (planet: Planet) => {
      return item.name === planet.name;
    });

    if (exist === -1) {
      const planetList = mergeArrayToItem(comparePlanet, item);
      const keys = mergeArrayToItem(radarKeys, item.name);
      const data = constructGraphData(planetList);
      setAllValue(planetList, keys, data);
    }
  }

  function setAllValue(planetList: Planet[], keys: string[], data: any[]) {
    setComparePlanet(planetList);
    setRadarKeys(keys);
    setRadarData(data);
  }

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

  function removeFromGraphData(name: string) {
    const planetList = comparePlanet.filter(
      (planet: Planet) => planet.name !== name
    );
    const keys = radarKeys.filter((value: string) => value !== name);
    const data = constructGraphData(planetList);
    setAllValue(planetList, keys, data);
  }

  function openedPlanetDescription(name: string) {
    let planetList: any = [];
    planetList[name] = !descriptionPlanet[name];
    setDescritpionPlanet(planetList);
  }

  return (
    <div className='container'>
      <Spin size='large' spinning={loading}>
        <div>
          <Row>
            <Col span={20} offset={2}>
              {planets.length > 0 ? (
                <List
                  dataSource={planets}
                  split={true}
                  renderItem={(planet: any, index: number) => (
                    <List.Item
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
                        style={{ textAlign: 'left' }}
                        avatar={<VirusSmall />}
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
                            <Descriptions
                              bordered
                              title='Planet Information'
                              size='small'
                            >
                              <Descriptions.Item label='Population'>
                                {planet.population}
                              </Descriptions.Item>
                              <Descriptions.Item label='Diameter'>
                                {planet.diameter} km
                              </Descriptions.Item>
                              <Descriptions.Item label='Surface Water'>
                                {planet.surface_water} %
                              </Descriptions.Item>
                              <Descriptions.Item label='Climate'>
                                {planet.climate}
                              </Descriptions.Item>
                              <Descriptions.Item label='Gravity'>
                                {planet.gravity} G
                              </Descriptions.Item>
                              <Descriptions.Item label='Terrain'>
                                {planet.terrain}
                              </Descriptions.Item>
                              <Descriptions.Item label='Rotation period'>
                                {planet.rotation_period} hours
                              </Descriptions.Item>
                              <Descriptions.Item label='Orbital period'>
                                {planet.orbital_period} days
                              </Descriptions.Item>
                            </Descriptions>
                          )
                        }
                      />
                    </List.Item>
                  )}
                ></List>
              ) : (
                <Empty></Empty>
              )}
            </Col>
          </Row>
          <Row>
            <Col span={20} offset={2}>
              <Pagination
                className='pagination'
                defaultCurrent={1}
                total={count}
                showSizeChanger={false}
                onChange={(page, pageSize) => {
                  next(page);
                }}
              />
            </Col>
          </Row>
          <div className='radar'>
            <RadarGraph data={radarData} keys={radarKeys} />
          </div>
        </div>
      </Spin>
    </div>
  );
}
