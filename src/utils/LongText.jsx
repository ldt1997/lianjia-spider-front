import React, { Component } from "react";
import { Input, Tooltip } from "antd";

/** 长文本组件 */
class LongText extends Component {
  render() {
    const { value, max } = this.props;
    let isLongText;
    let text;
    if (value && value.length > max) {
      isLongText = true;
      text = `${value.slice(0, max)}...`;
    } else {
      isLongText = false;
      text = value;
    }

    return isLongText ? (
      <Tooltip title={value}>
        <span>{text}</span>
      </Tooltip>
    ) : (
      <span>{value}</span>
    );
  }
}

export default LongText;
