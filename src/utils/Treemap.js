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

class Treemap extends React.Component {
  render() {
    const { dataSource = {} } = this.props;
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(dataSource, {
      type: "hierarchy"
    }).transform({
      field: "value",
      type: "hierarchy.treemap",
      tile: "treemapResquarify",
      as: ["x", "y"]
    });
    const nodes = dv.getAllNodes();
    nodes.map(node => {
      const tem = node;
      tem.name = node.data.name;
      tem.value = node.data.value;
      // node.name = node.data.name;
      // node.value = node.data.value;
      return tem;
    });
    const scale = {
      value: {
        nice: false
      }
    };
    const htmlStr =
      "<li data-index={index}>" +
      '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
      "{name}<br/>" +
      '<span style="padding-left: 16px">平均单价：{count}元/平米</span><br/>' +
      "</li>";
    return (
      <div>
        <Chart
          data={nodes}
          forceFit={true}
          height={window.innerHeight}
          scale={scale}
        >
          <Tooltip showTitle={false} itemTpl={htmlStr} />
          <Geom
            type="polygon"
            position="x*y"
            color="name"
            tooltip={[
              "name*value",
              (name, count) => {
                const tem = {
                  name,
                  count
                };
                return tem;
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="name"
              offset={0}
              textStyle={{
                textBaseline: "middle"
              }}
              formatter={val => {
                if (val !== "root") {
                  return val;
                }
                return true;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Treemap;
