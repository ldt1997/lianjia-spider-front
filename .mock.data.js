var MongoClient = require("mongodb").MongoClient;
var urldb = "mongodb://localhost:27017/runoob";
var fs = require("fs");

function DealChartData(data) {
  var arr = data.slice();
  var name = [];
  name = arr
    .map(item => item.name)
    .filter((element, index, self) => self.indexOf(element) === index); //不重复小区名
  var res = [];
  for (let i = 0; i < name.length; i++) {
    let tem = {};
    tem.item = name[i];
    let cnt = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].name === name[i]) {
        cnt++;
      }
    }
    tem.count = cnt;
    res.push(tem);
  }
  return res;
}
function DealChartData1(data) {
  var arr = data.slice();
  var name = [];
  name = arr
    .map(item => item.layout)
    .filter((element, index, self) => self.indexOf(element) === index); //不重复户型
  var res = [];
  for (let i = 0; i < name.length; i++) {
    let tem = {};
    tem.item = name[i];
    let cnt = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].layout === name[i]) {
        cnt++;
      }
    }
    tem.count = cnt;
    res.push(tem);
  }
  return res;
}
function DealColumnData(data) {
  var arr = data.slice();
  var res = [
    {
      price: "100万以下",
      num: 0
    },
    {
      price: "100-120万",
      num: 0
    },
    {
      price: "120-150万",
      num: 0
    },
    {
      price: "150-200万",
      num: 0
    },
    {
      price: "200-300万",
      num: 0
    },
    {
      price: "300万以上",
      num: 0
    }
  ];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].totalPrice < 100) res[0].num++;
    else if (arr[i].totalPrice >= 100 && arr[i].totalPrice < 120) res[1].num++;
    else if (arr[i].totalPrice >= 120 && arr[i].totalPrice < 150) res[2].num++;
    else if (arr[i].totalPrice >= 150 && arr[i].totalPrice < 200) res[3].num++;
    else if (arr[i].totalPrice >= 200 && arr[i].totalPrice < 300) res[4].num++;
    else res[5].num++;
  }
  return res;
}

function Avg(arr) {
  var res = 0;
  for (let i = 0; i < arr.length; i++) {
    res += Number(arr[i]);
  }
  res /= arr.length;
  return res.toFixed(2);
}

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
    setTimeout(() => {
      if (req.query.type === "error") {
        res.status(200).json({
          errCode: "-1",
          errMsg: "连接数据库错误啦",
          data: ""
        });
      } else {
        // var data = JSON.parse(
        //   fs.readFileSync("D:\\pro_gra_sample\\express_demo\\position.json")
        // );
        //从数据库取出数据
        MongoClient.connect(
          urldb,
          function(err, db) {
            if (err) throw err;
            var dbo = db.db("lianjiaSpider");
            dbo
              .collection("position")
              .find({})
              .toArray(function(err, result) {
                // 返回集合中所有数据
                if (err) throw err;
                res.status(200).json({
                  errCode: "0",
                  data: {
                    list: result
                  }
                });
                db.close();
              });
          }
        );
      }
    }, 2000);
  },
  "POST /api/house/getData": (req, res) => {
    setTimeout(() => {
      if (req.query.type === "error") {
        res.status(200).json({
          errCode: "-1",
          errMsg: "连接数据库错误啦",
          data: ""
        });
      } else {
        var colName = "tianhe";
        switch (req.body.position) {
          case "天河":
            colName = "tianhe";
            break;
          case "越秀":
            colName = "yuexiu";
            break;
          case "荔湾":
            colName = "liwan";
            break;
          case "海珠":
            colName = "haizhu";
            break;
          case "番禺":
            colName = "panyu";
            break;
          case "白云":
            colName = "baiyun";
            break;
          case "黄埔":
            colName = "huangpugz";
            break;
          case "从化":
            colName = "conghua";
            break;
          case "增城":
            colName = "zengcheng";
            break;
          case "花都":
            colName = "huadou";
            break;
          case "南沙":
            colName = "nansha";
            break;
          default:
            colName = "tianhe";
            break;
        }
        //从数据库取出数据
        MongoClient.connect(
          urldb,
          function(err, db) {
            if (err) throw err;
            var dbo = db.db("lianjiaSpider");
            dbo
              .collection(colName)
              .find({})
              .toArray(function(err, result) {
                // 返回集合中所有数据
                if (err) throw err;
                res.status(200).json({
                  errCode: "0",
                  data: {
                    houses: result,
                    houseNum: result.length
                  }
                });
                db.close();
              });
          }
        );
      }
    }, 2000);
  },
  "POST /api/house/getChartData": (req, res) => {
    setTimeout(() => {
      if (req.query.type === "error") {
        res.status(200).json({
          errCode: "-1",
          errMsg: "连接数据库错误啦",
          data: ""
        });
      } else {
        var colName = "tianhe";
        switch (req.body.position) {
          case "天河":
            colName = "tianhe";
            break;
          case "越秀":
            colName = "yuexiu";
            break;
          case "荔湾":
            colName = "liwan";
            break;
          case "海珠":
            colName = "haizhu";
            break;
          case "番禺":
            colName = "panyu";
            break;
          case "白云":
            colName = "baiyun";
            break;
          case "黄埔":
            colName = "huangpugz";
            break;
          case "从化":
            colName = "conghua";
            break;
          case "增城":
            colName = "zengcheng";
            break;
          case "花都":
            colName = "huadou";
            break;
          case "南沙":
            colName = "nansha";
            break;
          default:
            colName = "tianhe";
            break;
        }

        //从数据库取出数据
        MongoClient.connect(
          urldb,
          function(err, db) {
            if (err) throw err;
            var dbo = db.db("lianjiaSpider");
            dbo
              .collection(colName)
              .find({})
              .toArray(function(err, result) {
                // 返回集合中所有数据
                if (err) throw err;
                res.status(200).json({
                  errCode: "0",
                  data: [
                    Avg(result.map(item => item.unitPrice)),
                    Avg(result.map(item => item.listedPrice)),
                    Avg(result.map(item => item.totalPrice)),
                    DealChartData(result),
                    DealChartData1(result),
                    DealColumnData(result)
                  ]
                });
                db.close();
              });
          }
        );
      }
    }, 2000);
  }
};
module.exports = mock;
