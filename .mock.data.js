var fs = require("fs");

const mock = {
  "GET /api/fetch": (req, res) => {
    console.log(req.query);
    // const type = req.body.type;
    setTimeout(() => {
      if (req.query.type === "error") {
        res.status(200).json({
          errCode: "-1",
          errMsg: "连接数据库错误啦",
          data: ""
        });
      } else {
        res.status(200).json({
          errCode: "0",
          data: "hello 我是后端，注意，这里是mock数据，不是真实数据"
        });
      }
    }, 2000);
  },
  "GET /api/house/getPosition": (req, res) => {
    console.log(req.query);
    setTimeout(() => {
      if (req.query.type === "error") {
        res.status(200).json({
          errCode: "-1",
          errMsg: "连接数据库错误啦",
          data: ""
        });
      } else {
        var data = JSON.parse(
          fs.readFileSync("D:\\pro_gra_sample\\express_demo\\position.json")
        );
        res.status(200).json({
          errCode: "0",
          data: data
        });
      }
    }, 2000);
  },
  "GET /api/house/getData": (req, res) => {
    console.log(req.query);
    // const type = req.body.type;
    setTimeout(() => {
      if (req.query.type === "error") {
        res.status(200).json({
          errCode: "-1",
          errMsg: "连接数据库错误啦",
          data: ""
        });
      } else {
        var data = JSON.parse(
          fs.readFileSync("D:\\pro_gra_sample\\express_demo\\houses.json")
        );
        res.status(200).json({
          errCode: "0",
          data: data
        });
      }
    }, 2000);
  }
};
module.exports = mock;
