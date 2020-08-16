var express = require("express");
var router = express.Router();

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "relay17",
  database: "ilovedschool",
});
connection.connect();

router.get("/", function (req, res, next) {
  console.log(res);
  connection.query("SELECT * from students", (error, rows, fields) => {
    if (error) throw error;
    res.json(rows);
  });
});

// 해당 유저 데이터 출력
router.get("/:name", function (req, res, next) {
  let user = [];
  connection.query("SELECT * from students", (error, rows, fields) => {
    user = rows.find((u) => u.name === req.params.name);
    console.log(user);
    res.json(user);
  });
});

// 같은 학교 유저들 데이터 출력
router.get("/:name/friends", function (req, res, next) {
  // 게시물 작성자 이름 받아서
  let name = req.params.name;
  console.log(name);
  let friends = [];
  // 작성자와 같은 학교인 회원들 리스트 return
  const sql = `SELECT name FROM students WHERE school = (SELECT school FROM students WHERE name = "${name}");`;
  connection.query(sql, (error, posts) => {
    if (error) {
      // console.log(err);
      res.json({ success: false, error });
    } else {
      posts.forEach((v) => {
        if (v.name !== name) friends.push(v.name);
      });
    }
    // console.log(list);
    res.json({ success: true, friends });
  });
});

// // 해당 학교 유저들 데이터 출력
// router.get("/:school", function (req, res, next) {
//   let user = [];
//   connection.query("SELECT * from students", (error, rows, fields) => {
//     user = rows.find((u) => u.school === req.params.school);
//     res.json(user);
//   });
// });

// user 데이터 DB에 삽입
router.post("/insert", function (req, res, next) {
  let sql = "INSERT INTO students VALUES (?,?,?,?)";
  let name = req.body.name;
  let school = req.body.school;
  let favors = req.body.favors;
  let graduatedYear = req.body.graduatedYear;
  console.log(req.body);
  console.log(req.graduatedYear);
  let params = [name, school, favors, graduatedYear];
  connection.query(sql, params, (error, rows, fields) => {
    res.send(rows);
  });
});

module.exports = router;
