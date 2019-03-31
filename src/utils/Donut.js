import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  Guide
} from "bizcharts";
import DataSet from "@antv/data-set";

class Donut extends React.Component {
  render() {
    const { dataSource = [], houseNum } = this.props;
    const { DataView } = DataSet;
    const { Html } = Guide;
    const dv = new DataView();
    dv.source(dataSource).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          const temVal = `${val * 100}%`;
          return temVal;
        }
      }
    };
    return (
      <div>
        <Chart
          // height={window.innerHeight}
          data={dv}
          scale={cols}
          padding={[40, 100, 40, 80]}
          forceFit
        >
          <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" title />
          {/* <Legend
            position="right"
            offsetY={-window.innerHeight / 2 + 120}
            offsetX={-100}
          /> */}
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Guide>
            <Html
              position={["50%", "50%"]}
              html={`<div style="color:#8c8c8c;font-size:1em;text-align: center;width: 10em;">二手房<br><span style="color:#262626;font-size:1.5em">${houseNum}</span>套</div>`}
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              "item*percent",
              (item, percent) => {
                const temPercent = `${percent * 100}%`;
                return {
                  name: item,
                  value: temPercent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => item.point.item}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Donut;
