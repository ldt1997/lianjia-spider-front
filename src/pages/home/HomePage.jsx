import React, { Component } from "react";
import { Row, Col, Card, Spin } from "antd";
import { connect } from "dva";
import styles from "./HomePage.less";
import Donut from "../../utils/Donut";
import Labelline from "../../utils/Labelline";
import Stacked from "../../utils/Stacked";
import Treemap from "../../utils/Treemap";
import Basic from "../../utils/Basic";

class HomePage extends Component {
  state = { loading: true };

  // 请求地区信息及初始信息
  componentDidMount() {
    this.props.dispatch({
      type: "home/getOverviewData",
      payload: {}
    });

    this.props.dispatch({
      type: "home/getDonutData",
      payload: {
        type: 1
      }
    });
    this.props.dispatch({
      type: "home/getDonutData",
      payload: {
        type: 2
      }
    });
    this.props.dispatch({
      type: "home/getDonutData",
      payload: {
        type: 3
      }
    });
    this.props.dispatch({
      type: "home/getDonutData",
      payload: {
        type: 4
      }
    });
    this.props.dispatch({
      type: "home/getTreemapData",
      payload: {}
    });
    this.props
      .dispatch({
        type: "home/getStackedData",
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
      stackedData = []
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

          <Row>
            <Col span={12}>
              <Labelline dataSource={donutData1} houseNum={houseNum} />
            </Col>
            <Col span={12}>
              <Donut dataSource={donutData2} houseNum={houseNum} />
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Labelline dataSource={donutData3} houseNum={houseNum} />
            </Col>
            <Col span={12}>
              <Donut dataSource={donutData4} houseNum={houseNum} />
            </Col>
          </Row>
          <Treemap dataSource={treemapData} />
          <Stacked dataSource={stackedData} />
          <Basic />
        </Spin>
      </div>
    );
  }
}

export default connect(stores => ({
  homeData: stores.home
}))(HomePage);
