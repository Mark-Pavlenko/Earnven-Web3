import React from 'react';
import GridLayout from 'react-grid-layout';
import Chart from '../components/tokenDetails/cubicleChartDetails';

export default function ChartsCubicle() {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 10, h: 8, static: true },
    { i: 'b', x: 10, y: 0, w: 10, h: 8, static: true },
    { i: 'c', x: 0, y: 8, w: 10, h: 8, static: true },
    { i: 'd', x: 10, y: 8, w: 10, h: 8, static: true },
  ];

  return (
    <div>
      {/* <Chart/> */}
      <GridLayout className="layout" layout={layout} cols={24} rowHeight={30} width={1200}>
        <div key="a">
          <Chart />
        </div>
        <div key="b">
          <Chart />
        </div>
        <div key="c">
          <Chart />
        </div>
        <div key="d">
          <Chart />
        </div>
      </GridLayout>
    </div>
  );
}
