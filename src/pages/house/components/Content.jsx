import React from "react";
import { Table, Spin } from "antd";
import LongText from "../../../utils/LongText";
import styles from "./Content.less";

class Content extends React.Component {
  state = {
    loading: false,
    current: 1
  };

  // 分页
  onChange = current => {
    this.setState({
      current
    });
    this.setState({
      loading: true
    });
    this.props
      .dispatch({
        type: "house/getTableData",
        payload: {
          position: this.props.position,
          currentPage: current,
          pageSize: 10
        }
      })
      .then(() =>
        this.setState({
          loading: false
        })
      );
  };

  render() {
    // 分页
    const pagination = {
      current: this.state.current,
      total: this.props.houseNum,
      pagesize: 10,
      onChange: this.onChange
    };

    const columns = [
      {
        title: "房源名称",
        dataIndex: "titleName",
        key: "titleName",
        render: item => <LongText value={item} max={12} />
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
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <Spin spinning={this.state.loading}>
            <Table
              columns={columns}
              dataSource={this.props.houseList}
              pagination={pagination}
            />
          </Spin>
        </div>
      </div>
    );
  }
}

export default Content;
