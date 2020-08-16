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

router.post("/", function (req, res, next) {
  let sql =
    "INSERT INTO board(title, content, user, image) VALUES (?, ?, ?, ?)";

  let params = [
    req.body.title,
    req.body.content,
    req.body.user,
    req.body.image,
  ];

  connection.query(sql, params, (error, rows, fields) => {
    if (error) res.send({ success: false, error });
    else res.send({ success: true });
  });
});

router.get("/list", (req, res) => {
  const sql = `SELECT b.user, b.title, b.date FROM board as b LIMIT 50`; //user랑 제목이랑 date만 50개까지만 불러옴
  connection.query(sql, (error, results, fields) => {
    if (error) {
      // console.log(err);
      // db error
      return res.json({
        success: false,
        status: 400,
        error: "db_error",
      });
    }
    const boardlist = results;
    return res.json({ success: true, boardlist });
  });
});

router.get("/:id", (req, res) => {
  const sql = `SELECT * FROM board WHERE id = ${req.params.id}`;
  connection.query(sql, (error, rows) => {
    if (error) res.json({ success: false });
    else res.json({ success: true, content: rows[0] });
  });
});

router.post("/tags", (req, res) => {
  const sql =
    "INSERT INTO tags(board_id, student_name, x, y, width, height) VALUES (?, ?, ?, ?, ?, ?)";
  const data = req.body;
  const params = [
    data.board_id,
    data.student_name,
    data.x,
    data.y,
    data.width,
    data.height,
  ];
  connection.query(sql, params, (error, rows, fields) => {
    if (error) res.json({ success: false, error });
    else res.json({ success: true });
  });
});

router.get("/tags/:board_id", function (req, res, next) {
  const board_id = req.params.board_id;
  connection.query(
    `SELECT student_name, x, y, width, height FROM tags WHERE board_id = ${board_id}`,
    (error, rows, fields) => {
      if (error) res.json({ success: false, error });
      else res.json({ success: true, tags: rows });
    }
  );
});

module.exports = router;
