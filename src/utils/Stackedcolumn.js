import React from "react";
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import DataSet from "@antv/data-set";

class Stackedcolumn extends React.Component {
  render() {
    const { dataSource = [] } = this.props;
    const data = [
      {
        name: "London",
        "Jan.": 18.9,
        "Feb.": 28.8,
        "Mar.": 39.3,
        "Apr.": 81.4,
        May: 47,
        "Jun.": 20.3,
        "Jul.": 24,
        "Aug.": 35.6
      },
      {
        name: "Berlin",
        "Jan.": 12.4,
        "Feb.": 23.2,
        "Mar.": 34.5,
        "Apr.": 99.7,
        May: 52.6,
        "Jun.": 35.5,
        "Jul.": 37.4,
        "Aug.": 42.4
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(dataSource);
    dv.transform({
      type: "fold",
      fields: [
        "100万以下",
        "100-120万",
        "120-150万",
        "150-200万",
        "200-300万",
        "300万以上"
      ],
      // 展开字段集
      key: "价格区间",
      // key字段
      value: "二手房数量" // value字段
    });
    return (
      <div>
        <Chart height={400} data={dv} forceFit>
          <Legend />
          <Axis name="价格区间" />
          <Axis name="二手房数量" />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="价格区间*二手房数量"
            color={"name"}
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

export default Stackedcolumn;
