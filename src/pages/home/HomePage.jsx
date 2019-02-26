import React, { Component } from "react";
import { Row, Col, Card, Spin, Tabs } from "antd";
import { connect } from "dva";
import styles from "./HomePage.less";
import Donut from "../../utils/Donut";
import Labelline from "../../utils/Labelline";
import Stacked from "../../utils/Stacked";
import Treemap from "../../utils/Treemap";
import Basic from "../../utils/Basic";

const { TabPane } = Tabs;

class HomePage extends Component {
  state = { loading: true };

  // 请求地区信息及初始信息
  componentDidMount() {
    this.props.dispatch({
      type: "home/getOverviewData",
      payload: {}
    });

    this.props.dispatch({
      type: "home/getDonutData1",
      payload: {
        type: 1
      }
    });
    this.props.dispatch({
      type: "home/getDonutData2",
      payload: {
        type: 2
      }
    });
    this.props.dispatch({
      type: "home/getDonutData3",
      payload: {
        type: 3
      }
    });
    this.props.dispatch({
      type: "home/getDonutData4",
      payload: {
        type: 4
      }
    });
    this.props.dispatch({
      type: "home/getTreemapData",
      payload: {}
    });
    this.props.dispatch({
      type: "home/getStackedData",
      payload: {}
    });
    this.props
      .dispatch({
        type: "home/getLineChartData",
        payload: {}
      })
      .then(() =>
        this.setState({
          loading: false
        })
      );
  }

  render() {
    const { homeData } = this.props;
    const {
      overviewData,
      donutData1 = [],
      donutData2 = [],
      donutData3 = [],
      donutData4 = [],
      treemapData = {},
      stackedData = [],
      lineChartData = []
    } = homeData;
    const {
      houseNum = 0,
      avgUnitPrice = 0,
      avgListedPrice = 0,
      avgTotalPrice = 0
    } = overviewData;
    return (
      <div className={styles.root}>
        <h5>广州房源信息</h5>
        <Spin spinning={this.state.loading}>
          <Row>
            <Col span={6}>
              <Card title="房源数量" style={{ width: 240 }}>
                <p>
                  <strong>{houseNum}</strong> 套
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="平均单价" style={{ width: 240 }}>
                <p>
                  <strong>{avgUnitPrice.toFixed(2)}</strong> 元/平米
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="平均总价（挂牌）" style={{ width: 240 }}>
                <p>
                  <strong>{avgListedPrice.toFixed(2)}</strong> 万
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title="平均总价（成交）"
                style={{ width: 240, marginBottom: 20 }}
              >
                <p>
                  <strong>{avgTotalPrice.toFixed(2)}</strong> 万
                </p>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Card title="房源数量对比（按区块）">
                <Labelline dataSource={donutData1} houseNum={houseNum} />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="广州买家需求占比-户型">
                <Donut dataSource={donutData2} houseNum={houseNum} />
              </Card>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Card title="价格需求占比">
                <Labelline dataSource={donutData3} houseNum={houseNum} />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="广州买家需求占比-面积">
                <Donut dataSource={donutData4} houseNum={houseNum} />
              </Card>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1">
            <TabPane tab="广州各区块二手房价对比" key="1">
              <Treemap dataSource={treemapData} />
            </TabPane>
          </Tabs>
          <Tabs defaultActiveKey="1">
            <TabPane tab="各区块房价区间一览" key="1">
              <Stacked dataSource={stackedData} />
            </TabPane>
          </Tabs>
          <Tabs defaultActiveKey="1">
            <TabPane tab="成交房源趋势" key="1">
              <Basic
                dataSource={
                  lineChartData && lineChartData.sort((x, y) => x.item - y.item)
                }
              />
            </TabPane>
          </Tabs>
        </Spin>
      </div>
    );
  }
}

export default connect(stores => ({
  homeData: stores.home
}))(HomePage);
