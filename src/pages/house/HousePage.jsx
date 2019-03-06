import React, { Component } from "react";
import { Tabs, Row, Col, Card, Spin } from "antd";
import { connect } from "dva";
import styles from "./HousePage.less";
import Donut from "../../utils/Donut";
import Labelline from "../../utils/Labelline";
import Basiccolumn from "../../utils/Basiccolumn";
import AreaChart from "../../utils/AreaChart";
import CurvedLineChart from "../../utils/CurvedLineChart";
import Basic from "../../utils/Basic";
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
      type: "house/getCurvedLineChartData",
      payload: {
        position: "tianhe"
      }
    });
    this.props
      .dispatch({
        type: "house/getAreaChartData",
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
      type: "house/getCurvedLineChartData",
      payload: {
        position: key
      }
    });
    this.props
      .dispatch({
        type: "house/getAreaChartData",
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
      barChartData = [],
      rankData = [],
      curvedLineChartData = [],
      areaChartData = []
    } = houseData; // 概览数据
    const { houseList = [] } = list; // 表格数据
    const {
      houseNum = 0,
      avgUnitPrice = 0,
      avgListedPrice = 0,
      avgTotalPrice = 0
    } = overviewData;
    // 概览响应式栅格
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 6,
      xl: 6
    };
    const tabContent = positionData.map(item => (
      <TabPane tab={item.name} key={item.code}>
        <Spin spinning={this.state.loading}>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <Card title="房源数量" style={{ width: 220 }}>
                <p>
                  <strong>{houseNum}</strong> 套
                </p>
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card title="平均单价" style={{ width: 220 }}>
                <p>
                  <strong>{avgUnitPrice.toFixed(2)}</strong> 元/平米
                </p>
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card title="平均总价（挂牌）" style={{ width: 220 }}>
                <p>
                  <strong>{avgListedPrice.toFixed(2)}</strong> 万
                </p>
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card
                title="平均总价（成交）"
                style={{ width: 220, marginBottom: 20 }}
              >
                <p>
                  <strong>{avgTotalPrice.toFixed(2)}</strong> 万
                </p>
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
              <Card title="房源数量对比（按小区）">
                <Labelline dataSource={DonutData1} houseNum={houseNum} />
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
            <Col span={24}>
              <Card title="成交周期随面积变化趋势">
                <AreaChart dataSource={areaChartData} />
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
