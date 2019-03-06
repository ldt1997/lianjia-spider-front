import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

class AreaChart extends React.Component {
  render() {
    const { dataSource = [] } = this.props;
    const data = [
      {
        item: 123,
        count: 15468
      },
      {
        item: 124,
        count: 16100
      },
      {
        item: 104,
        count: 15900
      }
    ];
    const cols = {
      count: {
        min: 0,
        max: 500
      },
      item: {
        range: [0, 1]
      }
    };
    return (
      <div>
        <Chart data={dataSource} scale={cols} forceFit>
          <Axis name="item" />
          <Axis
            name="count"
            label={{
              formatter: val => `${val}天`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "line"
            }}
          />
          <Geom type="area" position="item*count" />
          <Geom type="line" position="item*count" size={2} />
        </Chart>
      </div>
    );
  }
}

export default AreaChart;
