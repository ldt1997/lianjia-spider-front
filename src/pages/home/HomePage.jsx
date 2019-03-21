import React, { Component } from "react";
import { Row, Col, Card, Spin, Tabs, Statistic, Icon } from "antd";
import { connect } from "dva";
import styles from "./HomePage.less";
import Donut from "../../utils/Donut";
import Labelline from "../../utils/Labelline";
import Stacked from "../../utils/Stacked";
import Treemap from "../../utils/Treemap";
import Basic from "../../utils/Basic";
import Basiccolumn from "../../utils/Basiccolumn";
import BoxPlot from "../../utils/BoxPlot";

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
      type: "home/getDonutData",
      payload: {
        type: 5
      }
    });
    this.props.dispatch({
      type: "home/getDonutData",
      payload: {
        type: 6
      }
    });
    this.props.dispatch({
      type: "home/getDonutData",
      payload: {
        type: 7
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
    this.props.dispatch({
      type: "home/getDecorPriceData",
      payload: {}
    });
    this.props.dispatch({
      type: "home/getDecorBoxData",
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
      donutData5 = [],
      donutData6 = [],
      donutData7 = [],
      treemapData = {},
      stackedData = [],
      lineChartData = [],
      decorPriceData = [],
      decorBoxData = []
    } = homeData;
    const {
      houseNum = 0,
      avgUnitPrice = 0,
      avgListedPrice = 0,
      avgTotalPrice = 0,
      avgSize = 0,
      avgDealPeriod = 0
    } = overviewData;

    // 概览响应式栅格
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 8,
      xl: 8,
      marginBottom: 20
    };
    return (
      <div className={styles.root}>
        <h5>广州房源信息</h5>
        <Spin spinning={this.state.loading}>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <Card>
                <Statistic
                  title="房源数量"
                  value={houseNum}
                  prefix={<Icon type="home" />}
                  suffix="套"
                />
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card>
                <Statistic
                  title="平均单价"
                  value={avgUnitPrice.toFixed(2)}
                  prefix={<Icon type="money-collect" />}
                  suffix="元/平米"
                />
              </Card>
            </Col>
            <Col {...topColResponsiveProps} style={{ marginBottom: 20 }}>
              <Card>
                <Statistic
                  title="平均总价（挂牌）"
                  value={avgListedPrice.toFixed(2)}
                  prefix={<Icon type="money-collect" />}
                  suffix="万元"
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <Card>
                <Statistic
                  title="平均总价（成交）"
                  value={avgTotalPrice.toFixed(2)}
                  prefix={<Icon type="dollar" />}
                  suffix="万元"
                />
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card>
                <Statistic
                  title="平均面积"
                  value={avgSize.toFixed(2)}
                  prefix={<Icon type="shop" />}
                  suffix="平米"
                />
              </Card>
            </Col>
            <Col {...topColResponsiveProps} style={{ marginBottom: 20 }}>
              <Card>
                <Statistic
                  title="平均成交天数"
                  value={avgDealPeriod.toFixed(2)}
                  prefix={<Icon type="schedule" />}
                  suffix="天"
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Card title="房源数量对比（按区块）">
                <Labelline dataSource={donutData1} houseNum={houseNum} />
              </Card>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Card title="价格需求占比">
                <Donut dataSource={donutData3} houseNum={houseNum} />
              </Card>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Card title="广州买家需求占比-户型">
                <Labelline dataSource={donutData2} houseNum={houseNum} />
              </Card>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Card title="广州买家需求占比-面积">
                <Donut dataSource={donutData4} houseNum={houseNum} />
              </Card>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Card title="广州买家需求占比-朝向">
                <Donut dataSource={donutData6} houseNum={houseNum} />
              </Card>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Card title="广州买家需求占比-电梯">
                <Labelline dataSource={donutData5} houseNum={houseNum} />
              </Card>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Card title="装修-价格关系">
                <Basiccolumn
                  dataSource={decorPriceData}
                  houseNum={houseNum}
                  titleName="装修-价格关系"
                />
              </Card>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Card title="装修-价格箱型图">
                <BoxPlot dataSource={decorBoxData} houseNum={houseNum} />
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
