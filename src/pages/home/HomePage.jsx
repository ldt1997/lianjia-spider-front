import React, { Component } from "react";
import { Row, Col, Card, Spin } from "antd";
import { connect } from "dva";
import styles from "./HomePage.less";
import Donut from "../../utils/Donut";
import Labelline from "../../utils/Labelline";
import Stacked from "../../utils/Stacked";
import Treemap from "../../utils/Treemap";
import Basic from "../../utils/Basic";

const data = [
  {
    item: "事例一",
    count: 40
  },
  {
    item: "事例二",
    count: 21
  },
  {
    item: "事例三",
    count: 17
  },
  {
    item: "事例四",
    count: 13
  },
  {
    item: "事例五",
    count: 9
  }
];
const data1 = [
  {
    price: "事例一",
    num: 40
  },
  {
    price: "事例二",
    num: 21
  },
  {
    price: "事例三",
    num: 17
  }
];
class HomePage extends Component {
  render() {
    console.log(this.props);

    return (
      <div className={styles.root}>
        <h5>广州房源信息</h5>
        <Row>
          <Col span={6}>
            <Card title="房源数量" style={{ width: 220 }}>
              <p>
                <strong>{12312}</strong> 套
              </p>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="平均单价" style={{ width: 220 }}>
              <p>
                <strong>{13123}</strong> 元/平米
              </p>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="平均总价（挂牌）" style={{ width: 220 }}>
              <p>
                <strong>{345}</strong> 万
              </p>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="平均总价（成交）"
              style={{ width: 220, marginBottom: 20 }}
            >
              <p>
                <strong>{234}</strong> 万
              </p>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Labelline dataSource={data} houseNum={12343} />
          </Col>
          <Col span={12}>
            <Donut dataSource={data} houseNum={12343} />
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Labelline dataSource={data} houseNum={12343} />
          </Col>
          <Col span={12}>
            <Donut dataSource={data} houseNum={12343} />
          </Col>
        </Row>
        <Treemap />
        <Stacked />
        <Basic />
      </div>
    );
  }
}

export default HomePage;
