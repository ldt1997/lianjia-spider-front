import React from "react";
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from "bizcharts";
import DataSet from "@antv/data-set";

class Labelline extends React.Component {
  render() {
    const { dataSource = [] } = this.props;
    const { DataView } = DataSet;
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
          const temVal = `${(val * 100).toFixed(2)}%`;
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
          <Coord type="theta" radius={0.75} />
          <Axis name="percent" />
          {/* <Legend
            position="right"
            offsetY={-window.innerHeight / 2 + 120}
            offsetX={-100}
          /> */}
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              "item*percent",
              (item, percent) => {
                const temPercent = `${(percent * 100).toFixed(2)} %`;
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
              formatter={(val, item) => `${item.point.item} :  ${val}`}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Labelline;
