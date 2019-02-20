import React, { Component } from "react";
import { Table, Tabs, Row, Col, Card, Spin } from "antd";
import { connect } from "dva";
import styles from "./HousePage.less";
import Donut from "../../utils/Donut";
import Labelline from "../../utils/Labelline";
import Basiccolumn from "../../utils/Basiccolumn";

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
    title: "单价",
    key: "unitPrice",
    dataIndex: "unitPrice"
  },
  {
    title: "挂牌总价",
    key: "listedPrice",
    dataIndex: "listedPrice"
  },
  {
    title: "成交总价",
    key: "totalPrice",
    dataIndex: "totalPrice"
  },
  {
    title: "成交日期",
    key: "dealDate",
    dataIndex: "dealDate"
  },
  {
    title: "成交周期",
    key: "dealPeriod",
    dataIndex: "dealPeriod"
  }
];

class HousePage extends Component {
  state = { loading: true };

  // 请求地区信息及初始信息
  componentDidMount() {
    this.props.dispatch({
      type: "house/getPosition"
    });
    this.props.dispatch({
      type: "house/getOverviewData",
      payload: {
        position: "tianhe"
      }
    });
    this.props
      .dispatch({
        type: "house/getTableData",
        payload: {
          position: "tianhe"
        }
      })
      .then(() =>
        this.setState({
          loading: false
        })
      );
    this.props.dispatch({
      type: "house/getDonutData",
      payload: {
        position: "tianhe",
        type: 1
      }
    });
    this.props.dispatch({
      type: "house/getDonutData",
      payload: {
        position: "tianhe",
        type: 2
      }
    });
    this.props.dispatch({
      type: "house/getBarChartData",
      payload: {
        position: "tianhe"
      }
    });
    this.props.dispatch({
      type: "house/getRankData",
      payload: {
        position: "tianhe"
      }
    });
  }

  selectPosition = key => {
    this.setState({
      loading: true
    });
    // 切换标签时请求图表和表格信息
    this.props.dispatch({
      type: "house/getPosition"
    });
    this.props.dispatch({
      type: "house/getOverviewData",
      payload: {
        position: key
      }
    });
    this.props
      .dispatch({
        type: "house/getTableData",
        payload: {
          position: key
        }
      })
      .then(() =>
        this.setState({
          loading: false
        })
      );
    this.props.dispatch({
      type: "house/getDonutData",
      payload: {
        position: key,
        type: 1
      }
    });
    this.props.dispatch({
      type: "house/getDonutData",
      payload: {
        position: key,
        type: 2
      }
    });
    this.props.dispatch({
      type: "house/getBarChartData",
      payload: {
        position: key
      }
    });
    this.props.dispatch({
      type: "house/getRankData",
      payload: {
        position: key
      }
    });
  };

  render() {
    const { houseData } = this.props;
    const {
      positionData = [],
      overviewData,
      list,
      DonutData1 = [],
      DonutData2 = [],
      barChartData = [],
      rankData = []
    } = houseData; // 概览数据
    const { houseList = [] } = list; // 表格数据
    const {
      houseNum = 0,
      avgUnitPrice = 0,
      avgListedPrice = 0,
      avgTotalPrice = 0
    } = overviewData;
    const tem = positionData.map(item => (
      <TabPane tab={item.name} key={item.code}>
        <Spin spinning={this.state.loading}>
          <Row>
            <Col span={6}>
              <Card title="房源数量" style={{ width: 220 }}>
                <p>
                  <strong>{houseNum}</strong> 套
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="平均单价" style={{ width: 220 }}>
                <p>
                  <strong>{Math.round(avgUnitPrice)}</strong> 元/平米
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="平均总价（挂牌）" style={{ width: 220 }}>
                <p>
                  <strong>{Math.round(avgListedPrice)}</strong> 万
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title="平均总价（成交）"
                style={{ width: 220, marginBottom: 20 }}
              >
                <p>
                  <strong>{Math.round(avgTotalPrice)}</strong> 万
                </p>
              </Card>
            </Col>
          </Row>
          <Table columns={columns} dataSource={houseList} />
          <Row>
            <Col span={12}>
              <Labelline dataSource={DonutData1} houseNum={houseNum} />
            </Col>
            <Col span={12}>
              <Donut dataSource={DonutData2} houseNum={houseNum} />
            </Col>
          </Row>
          <Basiccolumn dataSource={barChartData} houseNum={houseNum} />
        </Spin>
      </TabPane>
    ));

    return (
      <div className={styles.root}>
        <h5>广州房源信息</h5>
        <Tabs defaultActiveKey="1" onChange={this.selectPosition}>
          {tem}
        </Tabs>
      </div>
    );
  }
}

export default connect(stores => ({
  houseData: stores.house
}))(HousePage);
