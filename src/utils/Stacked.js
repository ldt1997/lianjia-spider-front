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

// *****堆叠条形图******
class Stacked extends React.Component {
  render() {
    const { dataSource = [] } = this.props;
    const data = [
      {
        State: "WY",
        小于5岁: 25635,
        "5至13岁": 1890,
        "14至17岁": 9314
      },
      {
        State: "DC",
        小于5岁: 30352,
        "5至13岁": 20439,
        "14至17岁": 10225
      },
      {
        State: "VT",
        小于5岁: 38253,
        "5至13岁": 42538,
        "14至17岁": 15757
      },
      {
        State: "ND",
        小于5岁: 51896,
        "5至13岁": 67358,
        "14至17岁": 18794
      },
      {
        State: "AK",
        小于5岁: 72083,
        "5至13岁": 85640,
        "14至17岁": 22153
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(dataSource);
    dv.transform({
      type: "fold",
      fields: [
        "<100万",
        "100-150万",
        "150-200万",
        "200-250万",
        "250-300万",
        ">300万"
      ],
      // 展开字段集
      key: "价格段",
      // key字段
      value: "房源数量",
      // value字段
      retains: ["State"] // 保留字段集，默认为除fields以外的所有字段
    });
    return (
      <div>
        <Chart height={400} data={dv} forceFit>
          <Legend />
          <Coord transpose />
          <Axis
            name="State"
            label={{
              offset: 12
            }}
          />
          <Axis name="房源数量" />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="State*房源数量"
            color={"价格段"}
          />
        </Chart>
      </div>
    );
  }
}

export default Stacked;
