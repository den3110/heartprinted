"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("dotenv/config");
var _models = require("./models");
var _api = require("./api");
var _config2 = _interopRequireDefault(require("./config"));
var _app = _interopRequireDefault(require("./app"));
require("./errors");
var _scheduler = _interopRequireDefault(require("./scheduler"));
var _path = _interopRequireDefault(require("path"));
var _cors = _interopRequireDefault(require("cors"));
var _cronjob = _interopRequireDefault(require("./cronjob"));
var _sequelize = require("sequelize");
// import kue from './kue';

global.appRoot = _path["default"].resolve(__dirname);
var PORT = _config2["default"].app.port;
var app = _app["default"].setup(_config2["default"]);

/*cors handling*/
app.use((0, _cors["default"])({
  origin: true,
  credentials: true
}));
app.options('*', (0, _cors["default"])());

/* Route handling */
app.use('/api', _api.restRouter);
// app.use('/', webRouter);

app.use(function (error, req, res, next) {
  if (!(error instanceof RequestError)) {
    error = new RequestError('Some Error Occurred', 500, error.message);
  }
  error.status = error.status || 500;
  res.status(error.status);
  var contype = req.headers['content-type'];
  var json = !(!contype || contype.indexOf('application/json') !== 0);
  if (json) {
    return res.json({
      errors: error.errorList
    });
  } else {
    res.render(error.status.toString(), {
      layout: null
    });
  }
});

// kue.init();
/* Database Connection */
// await Sequelize..sync({ force: true });
_models.db.sequelize.authenticate().then(function () {
  console.log('Nice! Database looks fine');
  _scheduler["default"].init();
})["catch"](function (err) {
  console.log(err, "Something went wrong with the Database Update!");
});
_cronjob["default"].start();

/* Start Listening service */
app.listen(5000, function () {
  console.log("Server is running at PORT http://localhost:".concat(5000));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwiX21vZGVscyIsIl9hcGkiLCJfY29uZmlnMiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfYXBwIiwiX3NjaGVkdWxlciIsIl9wYXRoIiwiX2NvcnMiLCJfY3JvbmpvYiIsIl9zZXF1ZWxpemUiLCJnbG9iYWwiLCJhcHBSb290IiwicGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJQT1JUIiwiY29uZmlnIiwiYXBwIiwicG9ydCIsImFwcE1hbmFnZXIiLCJzZXR1cCIsInVzZSIsImNvcnMiLCJvcmlnaW4iLCJjcmVkZW50aWFscyIsIm9wdGlvbnMiLCJyZXN0Um91dGVyIiwiZXJyb3IiLCJyZXEiLCJyZXMiLCJuZXh0IiwiUmVxdWVzdEVycm9yIiwibWVzc2FnZSIsInN0YXR1cyIsImNvbnR5cGUiLCJoZWFkZXJzIiwianNvbiIsImluZGV4T2YiLCJlcnJvcnMiLCJlcnJvckxpc3QiLCJyZW5kZXIiLCJ0b1N0cmluZyIsImxheW91dCIsImRiIiwic2VxdWVsaXplIiwiYXV0aGVudGljYXRlIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJzY2hlZHVsZXIiLCJpbml0IiwiZXJyIiwiY2hlY2tFeHBpcmVkVm91Y2hlcnMiLCJzdGFydCIsImxpc3RlbiIsImNvbmNhdCJdLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2RvdGVudi9jb25maWcnO1xyXG5pbXBvcnQgeyBkYiB9IGZyb20gJy4vbW9kZWxzJztcclxuaW1wb3J0IHsgcmVzdFJvdXRlciB9IGZyb20gJy4vYXBpJztcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XHJcbmltcG9ydCBhcHBNYW5hZ2VyIGZyb20gJy4vYXBwJztcclxuLy8gaW1wb3J0IGt1ZSBmcm9tICcuL2t1ZSc7XHJcbmltcG9ydCAnLi9lcnJvcnMnO1xyXG5pbXBvcnQgc2NoZWR1bGVyIGZyb20gJy4vc2NoZWR1bGVyJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xyXG5pbXBvcnQgY2hlY2tFeHBpcmVkVm91Y2hlcnMgZnJvbSAnLi9jcm9uam9iJztcclxuaW1wb3J0IHsgU2VxdWVsaXplIH0gZnJvbSAnc2VxdWVsaXplJztcclxuZ2xvYmFsLmFwcFJvb3QgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lKTtcclxuXHJcbmNvbnN0IFBPUlQgPSBjb25maWcuYXBwLnBvcnQ7XHJcbmNvbnN0IGFwcCA9IGFwcE1hbmFnZXIuc2V0dXAoY29uZmlnKTtcclxuXHJcbi8qY29ycyBoYW5kbGluZyovXHJcbmFwcC51c2UoY29ycyh7XHJcblx0b3JpZ2luOnRydWUsXHJcbiAgICBjcmVkZW50aWFsczp0cnVlXHJcbn0pKTtcclxuYXBwLm9wdGlvbnMoJyonLCBjb3JzKCkpO1xyXG5cclxuLyogUm91dGUgaGFuZGxpbmcgKi9cclxuYXBwLnVzZSgnL2FwaScsIHJlc3RSb3V0ZXIpO1xyXG4vLyBhcHAudXNlKCcvJywgd2ViUm91dGVyKTtcclxuXHJcbmFwcC51c2UoKGVycm9yLCByZXEsIHJlcywgbmV4dCkgPT4ge1xyXG5cdGlmICghKGVycm9yIGluc3RhbmNlb2YgUmVxdWVzdEVycm9yKSkge1xyXG5cdFx0ZXJyb3IgPSBuZXcgUmVxdWVzdEVycm9yKCdTb21lIEVycm9yIE9jY3VycmVkJywgNTAwLCBlcnJvci5tZXNzYWdlKTtcclxuICAgIH1cclxuXHRcdGVycm9yLnN0YXR1cyA9IGVycm9yLnN0YXR1cyB8fCA1MDA7XHJcblx0cmVzLnN0YXR1cyhlcnJvci5zdGF0dXMpO1xyXG5cdGxldCBjb250eXBlID0gcmVxLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddO1xyXG5cdHZhciBqc29uID0gISghY29udHlwZSB8fCBjb250eXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL2pzb24nKSAhPT0gMCk7XHJcblx0aWYgKGpzb24pIHtcclxuXHRcdHJldHVybiByZXMuanNvbih7IGVycm9yczogZXJyb3IuZXJyb3JMaXN0IH0pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXMucmVuZGVyKGVycm9yLnN0YXR1cy50b1N0cmluZygpLCB7bGF5b3V0OiBudWxsfSlcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8ga3VlLmluaXQoKTtcclxuLyogRGF0YWJhc2UgQ29ubmVjdGlvbiAqL1xyXG4vLyBhd2FpdCBTZXF1ZWxpemUuLnN5bmMoeyBmb3JjZTogdHJ1ZSB9KTtcclxuZGIuc2VxdWVsaXplLmF1dGhlbnRpY2F0ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cdGNvbnNvbGUubG9nKCdOaWNlISBEYXRhYmFzZSBsb29rcyBmaW5lJyk7XHJcblx0c2NoZWR1bGVyLmluaXQoKTtcclxufSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG5cdGNvbnNvbGUubG9nKGVyciwgXCJTb21ldGhpbmcgd2VudCB3cm9uZyB3aXRoIHRoZSBEYXRhYmFzZSBVcGRhdGUhXCIpXHJcbn0pO1xyXG5cclxuY2hlY2tFeHBpcmVkVm91Y2hlcnMuc3RhcnQoKVxyXG5cclxuLyogU3RhcnQgTGlzdGVuaW5nIHNlcnZpY2UgKi9cclxuYXBwLmxpc3Rlbig1MDAwLCAoKSA9PiB7XHJcblx0Y29uc29sZS5sb2coYFNlcnZlciBpcyBydW5uaW5nIGF0IFBPUlQgaHR0cDovL2xvY2FsaG9zdDokezUwMDB9YCk7XHJcbn0pOyJdLCJtYXBwaW5ncyI6Ijs7O0FBQUFBLE9BQUE7QUFDQSxJQUFBQyxPQUFBLEdBQUFELE9BQUE7QUFDQSxJQUFBRSxJQUFBLEdBQUFGLE9BQUE7QUFDQSxJQUFBRyxRQUFBLEdBQUFDLHNCQUFBLENBQUFKLE9BQUE7QUFDQSxJQUFBSyxJQUFBLEdBQUFELHNCQUFBLENBQUFKLE9BQUE7QUFFQUEsT0FBQTtBQUNBLElBQUFNLFVBQUEsR0FBQUYsc0JBQUEsQ0FBQUosT0FBQTtBQUNBLElBQUFPLEtBQUEsR0FBQUgsc0JBQUEsQ0FBQUosT0FBQTtBQUNBLElBQUFRLEtBQUEsR0FBQUosc0JBQUEsQ0FBQUosT0FBQTtBQUNBLElB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