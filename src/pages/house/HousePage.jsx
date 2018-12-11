import React, { Component } from "react";
import { Table, Tabs } from "antd";
import { connect } from "dva";
import styles from "./HousePage.less";

const { TabPane } = Tabs;

const columns = [
  {
    title: "房源名称",
    dataIndex: "titleName",
    key: "titleName"
  },
  {
    title: "小区",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "户型",
    dataIndex: "layout",
    key: "layout"
  },
  {
    title: "大小",
    key: "size",
    dataIndex: "size"
  },
  {
    title: "朝向",
    key: "toward",
    dataIndex: "toward"
  },
  {
    title: "装修",
    key: "decoration",
    dataIndex: "decoration"
  },
  {
    title: "有无电梯",
    key: "elevator",
    dataIndex: "elevator"
  },
  {
    title: "位置",
    key: "positionInfo",
    dataIndex: "positionInfo"
  }
];

class HousePage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "house/getPositionData"
    });
    this.props.dispatch({
      type: "house/getHouseData"
    });
  }

  render() {
    const { houseData } = this.props;
    const { houses = [] } = houseData.list;
    const { position = [] } = houseData.positionData;
    const tem = position.map(item => (
      <TabPane tab={item.name} key={item.name}>
        <Table columns={columns} dataSource={houses} />
      </TabPane>
    ));

    return (
      <div className={styles.root}>
        <h5>广州房源信息</h5>
        <Tabs defaultActiveKey="1">{tem}</Tabs>
        {/* <Table columns={columns} dataSource={houses} /> */}
      </div>
    );
  }
}

export default connect(stores => ({
  houseData: stores.house
}))(HousePage);
