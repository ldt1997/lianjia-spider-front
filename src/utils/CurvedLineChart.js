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
import DataSet from "@antv/data-set";

class CurvedLineChart extends React.Component {
  render() {
    const { dataSource = [] } = this.props;
    // const data = [
    //   {
    //     item: "Jan",
    //     listedPrice: 7.0,
    //     totalPrice: 3.9
    //   },
    //   {
    //     item: "Feb",
    //     listedPrice: 6.9,
    //     totalPrice: 4.2
    //   },
    //   {
    //     item: "Mar",
    //     listedPrice: 9.5,
    //     totalPrice: 5.7
    //   }
    // ];
    const ds = new DataSet();
    const dv = ds.createView().source(dataSource);
    dv.transform({
      type: "fold",
      fields: ["listedPrice", "totalPrice"],
      // 展开字段集
      key: "city",
      // key字段
      value: "temperature" // value字段
    });
    const cols = {
      item: {
        range: [0, 1]
      }
    };
    return (
      <div>
        <Chart data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name="item" />
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}万元`
            }}
          />
          {/* <Tooltip
            crosshairs={{
              type: "y"
            }}
          /> */}
          <Geom
            type="line"
            position="item*temperature"
            size={2}
            color={"city"}
            shape={"smooth"}
          />
          <Geom
            type="point"
            position="item*temperature"
            size={2}
            shape={"circle"}
            color={"city"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default CurvedLineChart;
