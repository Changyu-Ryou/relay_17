var express = require('express');
var router = express.Router();
const path = require('path');

const { PythonShell } = require('python-shell');//for chatbot.py
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'relay17',
  database: 'ilovedschool'
});
connection.connect();
// chatbot test
router.get("/:msg/:school", function (req, res, next) {
  var options = {
    scriptPath: path.join(__dirname, "../"),
    args: [req.params.msg]
  };
  PythonShell.run("chatbot.py", options, function (err, data) {
    if(!data) {
      res.send('모르겠어요');
      return;
    }
    if (data[0] === "장학금") {
      const univ = data[1];
      res.send(univ + "의 장학금 정보");
    } else if (data[0] === "동창") {
      let user = [];
      connection.query('SELECT * from students', (error, rows, fields) => {
        if (error) throw error;
        user = rows.filter(u => u.school === req.params.school);
        // res.json(user);
        res.send(usersToMessage(user));
      });
    }else if (data[0] === "안녕") {
      res.send("안녕하세요. 반갑습니다.")
    } else {
      res.send('알 수 없는 내용');
    }
  });
});

router.get("/:msg", function (req, res, next) {
  var options = {
    scriptPath: path.join(__dirname, "../"),
    args: [req.params.msg]
  };
  PythonShell.run("chatbot.py", options, function (err, data) {
    
    if(!data) {
      res.send('모르겠어요');
      return;
    }
    console.log(data);
    if (data[0] === "장학금") {
      const univ = data[1];
      res.send(univ + "의 장학금 정보");
    } else if (data[0] === "동창") {
      connection.query('SELECT * from students', (error, rows, fields) => {
        if (error) throw error;
        if (data.length > 1) {
          user = rows.filter(u => u.school === data[1]);
          res.send(usersToMessage(user));

        } else {
          // res.json(rows);
          res.send(usersToMessage(rows));
        }
      });
    }else if (data[0] === "안녕") {
      res.send("안녕하세요. 반갑습니다.")
    } else {
      res.send('알 수 없는 내용');
    }
  });
});

const usersToMessage = (rows) => {
  let string = "동창찾기 결과 : \n";
  for (const r of rows) {
    string += r.school + " " + r.name + ", ";
    // string += r;
  }
  return string;
}


module.exports = router;
