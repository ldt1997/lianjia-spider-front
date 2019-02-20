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
    // const data = {
    //   name: "root",
    //   children: [
    //     {
    //       name: "分类 1",
    //       value: 560
    //     },
    //     {
    //       name: "分类 2",
    //       value: 500
    //     },
    //     {
    //       name: "分类 3",
    //       value: 150
    //     },
    //     {
    //       name: "分类 4",
    //       value: 140
    //     },
    //     {
    //       name: "分类 5",
    //       value: 115
    //     },
    //     {
    //       name: "分类 6",
    //       value: 95
    //     },
    //     {
    //       name: "分类 7",
    //       value: 90
    //     },
    //     {
    //       name: "分类 8",
    //       value: 75
    //     },
    //     {
    //       name: "分类 9",
    //       value: 98
    //     },
    //     {
    //       name: "分类 10",
    //       value: 60
    //     },
    //     {
    //       name: "分类 11",
    //       value: 45
    //     },
    //     {
    //       name: "分类 12",
    //       value: 40
    //     },
    //     {
    //       name: "分类 13",
    //       value: 40
    //     },
    //     {
    //       name: "分类 14",
    //       value: 35
    //     },
    //     {
    //       name: "分类 15",
    //       value: 40
    //     },
    //     {
    //       name: "分类 16",
    //       value: 40
    //     },
    //     {
    //       name: "分类 17",
    //       value: 40
    //     },
    //     {
    //       name: "分类 18",
    //       value: 30
    //     },
    //     {
    //       name: "分类 19",
    //       value: 28
    //     },
    //     {
    //       name: "分类 20",
    //       value: 16
    //     }
    //   ]
    // };
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
      '<span style="padding-left: 16px">浏览人数：{count}</span><br/>' +
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
