import React from "react";
import { Chart, Geom, Tooltip, Coord, Legend } from "bizcharts";

class Colorrose extends React.Component {
  render() {
    const { dataSource = [] } = this.props;
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={dataSource}
          padding="auto"
          forceFit
        >
          <Coord type="polar" />
          <Tooltip />
          {/* <Legend
            position="right"
            offsetY={-window.innerHeight / 2 + 180}
            offsetX={-160}
          /> */}
          <Geom
            type="interval"
            color="item"
            position="item*count"
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Colorrose;
