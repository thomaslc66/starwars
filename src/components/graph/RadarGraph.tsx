import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

export function RadarGraph(props: any) {
  return (
    <ResponsiveRadar
      data={props.data}
      indexBy='info'
      keys={props.keys}
      legends={[
        {
          anchor: 'top-left',
          direction: 'column',
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: '#999',
          symbolSize: 12,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      curve='cardinalClosed'
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [] }}
      gridLevels={8}
      gridShape='circular'
      gridLabelOffset={18}
      enableDots={true}
      dotSize={10}
      dotColor={{ theme: 'background' }}
      dotBorderWidth={2}
      dotBorderColor={{ from: 'color' }}
      enableDotLabel={true}
      dotLabel='value'
      dotLabelYOffset={-12}
      colors={{ scheme: 'category10' }}
      fillOpacity={0.25}
      blendMode='normal'
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      isInteractive={true}
    ></ResponsiveRadar>
  );
}
