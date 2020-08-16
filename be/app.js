var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var chatbotRouter = require("./routes/chatbot");
var boardRouter = require("./routes/board");
var faceRouter = require("./routes/face");

var app = express();
const cors = require("cors");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.set("etag", false);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/build")));
app.use(cors());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/chatbot", chatbotRouter);
app.use("/board", boardRouter);
app.use("/face", faceRouter);

app.post("/postTest", function (req, res) {
  console.log(req.body);
  res.json({ ok: true });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
module.exports = app;
