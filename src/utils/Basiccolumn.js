import React from "react";
import { Chart, Geom, Axis, Tooltip } from "bizcharts";

class Basiccolumn extends React.Component {
  render() {
    const { dataSource = [] } = this.props;
    const cols = {
      num: {
        tickInterval: 20
      }
    };
    return (
      <div>
        <Chart height={400} data={dataSource} scale={cols} forceFit>
          <Axis name="item" />
          <Axis name="count" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="interval" position="item*count" />
        </Chart>
      </div>
    );
  }
}

export default Basiccolumn;
