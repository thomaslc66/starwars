import React, { useState } from 'react';
import { Descriptions } from 'antd';

export function Description(props: any) {
  const [planet] = useState(props.planet);
  return (
    <Descriptions bordered title='Planet Information' size='small'>
      <Descriptions.Item label='Population'>
        {planet.population}
      </Descriptions.Item>
      <Descriptions.Item label='Diameter'>
        {planet.diameter} km
      </Descriptions.Item>
      <Descriptions.Item label='Surface Water'>
        {planet.surface_water} %
      </Descriptions.Item>
      <Descriptions.Item label='Climate'>{planet.climate}</Descriptions.Item>
      <Descriptions.Item label='Gravity'>{planet.gravity} G</Descriptions.Item>
      <Descriptions.Item label='Terrain'>{planet.terrain}</Descriptions.Item>
      <Descriptions.Item label='Rotation period'>
        {planet.rotation_period} hours
      </Descriptions.Item>
      <Descriptions.Item label='Orbital period'>
        {planet.orbital_period} days
      </Descriptions.Item>
    </Descriptions>
  );
}
