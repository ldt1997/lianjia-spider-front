import React, { Component } from "react";
import { Tabs, Row, Col, Card, Spin, Statistic, Icon } from "antd";
import { connect } from "dva";
import styles from "./HousePage.less";
import Donut from "../../utils/Donut";
import Labelline from "../../utils/Labelline";
import Basiccolumn from "../../utils/Basiccolumn";
import AreaChart from "../../utils/AreaChart";
import CurvedLineChart from "../../utils/CurvedLineChart";
import BoxPlot from "../../utils/BoxPlot";
import Content from "./components/Content";
import LongText from "../../utils/LongText";

const { TabPane } = Tabs;

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
    this.props.dispatch({
      type: "house/getTableData",
      payload: {
        position: "tianhe"
      }
    });
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
      type: "house/getDonutData",
      payload: {
        position: "tianhe",
        type: 3
      }
    });
    this.props.dispatch({
      type: "house/getDonutData",
      payload: {
        position: "tianhe",
        type: 4
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
    this.props.dispatch({
      type: "house/getDecorPriceData",
      payload: {
        position: "tianhe"
      }
    });
    this.props.dispatch({
      type: "house/getDecorBoxData",
      payload: {
        position: "tianhe"
      }
    });
    this.props
      .dispatch({
        type: "house/getCurvedLineChartData",
        payload: {
          position: "tianhe"
        }
      })
      .then(() =>
        this.setState({
          loading: false
        })
      );
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
    this.props.dispatch({
      type: "house/getTableData",
      payload: {
        position: key
      }
    });
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
      type: "house/getDonutData",
      payload: {
        position: key,
        type: 3
      }
    });
    this.props.dispatch({
      type: "house/getDonutData",
      payload: {
        position: key,
        type: 4
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
    this.props.dispatch({
      type: "house/getDecorPriceData",
      payload: {
        position: key
      }
    });
    this.props.dispatch({
      type: "house/getDecorBoxData",
      payload: {
        position: key
      }
    });
    this.props
      .dispatch({
        type: "house/getCurvedLineChartData",
        payload: {
          position: key
        }
      })
      .then(() =>
        this.setState({
          loading: false
        })
      );
  };

  render() {
    const { houseData, dispatch } = this.props;
    const {
      positionData = [],
      overviewData,
      list,
      DonutData1 = [],
      DonutData2 = [],
      DonutData3 = [],
      DonutData4 = [],
      barChartData = [],
      rankData = [],
      curvedLineChartData = [],
      decorPriceData = [],
      decorBoxData = []
    } = houseData; // 概览数据
    const { houseList = [] } = list; // 表格数据
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
    const tabContent = positionData.map(item => (
      <TabPane tab={item.name} key={item.code}>
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
            <Col {...topColResponsiveProps}>
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
          <Content
            houseList={houseList}
            position={item.code}
            dispatch={dispatch}
            houseNum={houseNum}
          />
          <Row gutter={24}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Card title="广州买家需求占比-户型">
                <Donut dataSource={DonutData2} houseNum={houseNum} />
              </Card>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Card title="广州买家需求占比-电梯">
                <Labelline dataSource={DonutData1} houseNum={houseNum} />
              </Card>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Card title="广州买家需求占比-朝向">
                <Donut dataSource={DonutData3} houseNum={houseNum} />
              </Card>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Card title="广州买家需求占比-装修">
                <Labelline dataSource={DonutData4} houseNum={houseNum} />
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
          <Row gutter={24}>
            <Col span={24}>
              <Card title="房价（总价）随面积变化趋势">
                <CurvedLineChart dataSource={curvedLineChartData} />
              </Card>
            </Col>
          </Row>
          <Row gutter={24}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="房源价格区间" key="1">
                <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                  <Basiccolumn
                    dataSource={barChartData}
                    houseNum={houseNum}
                    titleName="价格区间数量"
                  />
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <ul className={styles.rankingList}>
                    <strong>最贵小区排名</strong>
                    {rankData &&
                      rankData[0] &&
                      rankData.slice(0, 8).map((item1, i) => (
                        <li key={i}>
                          <span className={i < 3 ? styles.active : ""}>
                            {i + 1}
                          </span>
                          <LongText value={item1.titleName} max={12} />
                          <span>{`${item1.totalPrice}万元`}</span>
                        </li>
                      ))}
                  </ul>
                </Col>
              </TabPane>
            </Tabs>
          </Row>
        </Spin>
      </TabPane>
    ));

    return (
      <div className={styles.root}>
        <h5>广州房源信息</h5>
        <Tabs defaultActiveKey="1" onChange={this.selectPosition}>
          {tabContent}
        </Tabs>
      </div>
    );
  }
}

export default connect(stores => ({
  houseData: stores.house
}))(HousePage);
