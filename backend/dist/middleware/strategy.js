"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localStrategy = exports.jwtStrategy = exports.customerStrategy = void 0;
var _passport = _interopRequireDefault(require("passport"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("../config"));
var JWTSign = function JWTSign(iss, user, date) {
  return _jsonwebtoken["default"].sign({
    iss: iss,
    sub: user.id,
    iam: user.type,
    iat: date.getTime(),
    exp: new Date().setMinutes(date.getMinutes() + 30)
  }, _config["default"].app.secret);
};
var jwtStrategy = exports.jwtStrategy = function jwtStrategy(req, res, next) {
  _passport["default"].authenticate('user-jwt', {
    session: false
  }, function (err, user, info) {
    var contype = req.headers['content-type'];
    var json = !(!contype || contype.indexOf('application/json') !== 0);
    if (err && err == 'expired') {
      return json ? res.status(500).json({
        errors: ['Session is expired']
      }) : res.redirect('/auth/login');
    }
    if (err && err == 'invalid') {
      return json ? res.status(500).json({
        errors: ['Invalid token recieved']
      }) : res.redirect('/logout');
    }
    if (err && err == 'user') {
      return json ? res.status(500).json({
        errors: ['Invalid user recieved']
      }) : res.redirect('/logout');
    }
    if (err && Object.keys(err).length) {
      return res.status(500).json({
        errors: [err]
      });
    }
    if (err) {
      return res.status(500).json({
        errors: ['Invalid user recieved']
      });
    }
    if (!user) {
      return json ? res.status(500).json({
        errors: ['Invalid user recieved']
      }) : res.redirect('/logout');
    }
    req.user = user;
    next();
  })(req, res, next);
};
var localStrategy = exports.localStrategy = function localStrategy(req, res, next) {
  _passport["default"].authenticate('user-local', {
    session: false
  }, function (err, user, info) {
    console.log(err);
    if (err && err == 'invalid') {
      return res.status(500).json({
        errors: ['Email Id not verified']
      });
    }
    if (err && err == 'attempt') {
      return res.status(500).json({
        errors: ['Too many invalid attempts. Please reset your password.']
      });
    }
    if (err && err.startsWith('attempt:')) {
      return res.status(500).json({
        errors: ['Invalid Credentials (' + err.split(':')[1] + ' Attempt(s) Left)']
      });
    }
    if (err) {
      return res.status(500).json({
        errors: [err]
      });
    }
    if (!user) {
      return res.status(500).json({
        errors: ['Invalid Credentials']
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
var customerStrategy = exports.customerStrategy = function customerStrategy(req, res, next) {
  _passport["default"].authenticate('customer-local', {
    session: false
  }, function (err, user, info) {
    if (err && err == 'invalid') {
      return res.status(500).json({
        errors: ['Email Id not verified']
      });
    }
    if (err && err == 'attempt') {
      return res.status(500).json({
        errors: ['Too many invalid attempts. Please reset your password.']
      });
    }
    if (err && err.startsWith('attempt:')) {
      return res.status(500).json({
        errors: ['Invalid Credentials (' + err.split(':')[1] + ' Attempt(s) Left)']
      });
    }
    if (err) {
      return res.status(500).json({
        errors: [err]
      });
    }
    if (!user) {
      return res.status(500).json({
        errors: ['Invalid Credentials']
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcGFzc3BvcnQiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfY29uZmlnIiwiSldUU2lnbiIsImlzcyIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsInN1YiIsImlkIiwiaWFtIiwidHlwZSIsImlhdCIsImdldFRpbWUiLCJleHAiLCJEYXRlIiwic2V0TWludXRlcyIsImdldE1pbnV0ZXMiLCJjb25maWciLCJhcHAiLCJzZWNyZXQiLCJqd3RTdHJhdGVneSIsImV4cG9ydHMiLCJyZXEiLCJyZXMiLCJuZXh0IiwicGFzc3BvcnQiLCJhdXRoZW50aWNhdGUiLCJzZXNzaW9uIiwiZXJyIiwiaW5mbyIsImNvbnR5cGUiLCJoZWFkZXJzIiwianNvbiIsImluZGV4T2YiLCJzdGF0dXMiLCJlcnJvcnMiLCJyZWRpcmVjdCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJsb2NhbFN0cmF0ZWd5IiwiY29uc29sZSIsImxvZyIsInN0YXJ0c1dpdGgiLCJzcGxpdCIsImN1c3RvbWVyU3RyYXRlZ3kiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZS9zdHJhdGVneS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGFzc3BvcnQgZnJvbSAncGFzc3BvcnQnO1xyXG5pbXBvcnQgSldUIGZyb20gJ2pzb253ZWJ0b2tlbic7XHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcclxuXHJcbmNvbnN0IEpXVFNpZ24gPSBmdW5jdGlvbihpc3MsIHVzZXIsIGRhdGUpe1xyXG4gICAgcmV0dXJuIEpXVC5zaWduKHtcclxuICAgICAgICBpc3MgOiBpc3MsXHJcbiAgICAgICAgc3ViIDogdXNlci5pZCxcclxuICAgICAgICBpYW0gOiB1c2VyLnR5cGUsXHJcbiAgICAgICAgaWF0IDogZGF0ZS5nZXRUaW1lKCksXHJcbiAgICAgICAgZXhwIDogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApXHJcbiAgICB9LCBjb25maWcuYXBwLnNlY3JldCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBqd3RTdHJhdGVneSA9IChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgcGFzc3BvcnQuYXV0aGVudGljYXRlKCd1c2VyLWp3dCcsIHtzZXNzaW9uOiBmYWxzZX0sIChlcnIsIHVzZXIsIGluZm8pID0+IHsgXHJcbiAgICAgICAgbGV0IGNvbnR5cGUgPSByZXEuaGVhZGVyc1snY29udGVudC10eXBlJ107XHJcbiAgICAgICAgdmFyIGpzb24gPSAhKCFjb250eXBlIHx8IGNvbnR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpICE9PSAwKTtcclxuICAgICAgICBpZiAoZXJyICYmIGVyciA9PSAnZXhwaXJlZCcpeyByZXR1cm4ganNvbj9yZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydTZXNzaW9uIGlzIGV4cGlyZWQnXX0pOnJlcy5yZWRpcmVjdCgnL2F1dGgvbG9naW4nKTsgfVxyXG4gICAgICAgIGlmIChlcnIgJiYgZXJyID09ICdpbnZhbGlkJyl7IHJldHVybiBqc29uP3Jlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbJ0ludmFsaWQgdG9rZW4gcmVjaWV2ZWQnXX0pOnJlcy5yZWRpcmVjdCgnL2xvZ291dCcpOyB9XHJcbiAgICAgICAgaWYgKGVyciAmJiBlcnIgPT0gJ3VzZXInKXsgcmV0dXJuIGpzb24/cmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsnSW52YWxpZCB1c2VyIHJlY2lldmVkJ119KTpyZXMucmVkaXJlY3QoJy9sb2dvdXQnKTsgfVxyXG4gICAgICAgIGlmIChlcnIgJiYgT2JqZWN0LmtleXMoZXJyKS5sZW5ndGgpIHsgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbIGVyciBdfSk7IH1cclxuICAgICAgICBpZiAoZXJyKSB7IHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWyAnSW52YWxpZCB1c2VyIHJlY2lldmVkJyBdfSk7IH1cclxuICAgICAgICBpZiAoIXVzZXIpIHsgcmV0dXJuIGpzb24/cmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsnSW52YWxpZCB1c2VyIHJlY2lldmVkJ119KTpyZXMucmVkaXJlY3QoJy9sb2dvdXQnKTsgfVxyXG4gICAgICAgIHJlcS51c2VyID0gdXNlcjtcclxuICAgICAgICBuZXh0KCk7XHJcbiAgICB9KShyZXEsIHJlcywgbmV4dCk7XHJcbn07XHJcblxyXG5leHBvcnQgdmFyIGxvY2FsU3RyYXRlZ3kgPSAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgndXNlci1sb2NhbCcsIHtzZXNzaW9uOiBmYWxzZX0sIChlcnIsIHVzZXIsIGluZm8pID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgaWYgKGVyciAmJiBlcnIgPT0gJ2ludmFsaWQnKSB7IHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydFbWFpbCBJZCBub3QgdmVyaWZpZWQnXX0pOyB9XHJcbiAgICAgICAgaWYgKGVyciAmJiBlcnIgPT0gJ2F0dGVtcHQnKSB7IHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydUb28gbWFueSBpbnZhbGlkIGF0dGVtcHRzLiBQbGVhc2UgcmVzZXQgeW91ciBwYXNzd29yZC4nXX0pOyB9XHJcbiAgICAgICAgaWYgKGVyciAmJiBlcnIuc3RhcnRzV2l0aCgnYXR0ZW1wdDonKSkgeyByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsnSW52YWxpZCBDcmVkZW50aWFscyAoJyArIGVyci5zcGxpdCgnOicpWzFdKycgQXR0ZW1wdChzKSBMZWZ0KSddfSk7IH1cclxuICAgICAgICBpZiAoZXJyKSB7IHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWyBlcnIgXX0pOyB9XHJcbiAgICAgICAgaWYgKCF1c2VyKSB7IHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydJbnZhbGlkIENyZWRlbnRpYWxzJ119KTsgfVxyXG4gICAgICAgIHJlcS51c2VyID0gdXNlcjtcclxuICAgICAgICBuZXh0KCk7XHJcbiAgICB9KShyZXEsIHJlcywgbmV4dCk7XHJcbn07XHJcblxyXG5leHBvcnQgdmFyIGN1c3RvbWVyU3RyYXRlZ3kgPSAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnY3VzdG9tZXItbG9jYWwnLCB7c2Vzc2lvbjogZmFsc2V9LCAoZXJyLCB1c2VyLCBpbmZvKSA9PiB7XHJcbiAgICAgICAgaWYgKGVyciAmJiBlcnIgPT0gJ2ludmFsaWQnKSB7IHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydFbWFpbCBJZCBub3QgdmVyaWZpZWQnXX0pOyB9XHJcbiAgICAgICAgaWYgKGVyciAmJiBlcnIgPT0gJ2F0dGVtcHQnKSB7IHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydUb28gbWFueSBpbnZhbGlkIGF0dGVtcHRzLiBQbGVhc2UgcmVzZXQgeW91ciBwYXNzd29yZC4nXX0pOyB9XHJcbiAgICAgICAgaWYgKGVyciAmJiBlcnIuc3RhcnRzV2l0aCgnYXR0ZW1wdDonKSkgeyByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsnSW52YWxpZCBDcmVkZW50aWFscyAoJyArIGVyci5zcGxpdCgnOicpWzFdKycgQXR0ZW1wdChzKSBMZWZ0KSddfSk7IH1cclxuICAgICAgICBpZiAoZXJyKSB7IHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWyBlcnIgXX0pOyB9XHJcbiAgICAgICAgaWYgKCF1c2VyKSB7IHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWydJbnZhbGlkIENyZWRlbnRpYWxzJ119KTsgfVxyXG4gICAgICAgIHJlcS51c2VyID0gdXNlcjtcclxuICAgICAgICBuZXh0KCk7XHJcbiAgICB9KShyZXEsIHJlcywgbmV4dCk7XHJcbn07Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBQUEsU0FBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsYUFBQSxHQUFBRixzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUUsT0FBQSxHQUFBSCxzQkFBQSxDQUFBQyxPQUFBO0FBRUEsSUFBTUcsT0FBTyxHQUFHLFNBQVZBLE9BQU9BLENBQVlDLEdBQUcsRUFBRUMsSUFBSSxFQUFFQyxJQUFJLEVBQUM7RUFDckMsT0FBT0Msd0JBQUcsQ0FBQ0MsSUFBSSxDQUFDO0lBQ1pKLEdBQUcsRUFBR0EsR0FBRztJQUNUSyxHQUFHLEVBQUdKLElBQUksQ0FBQ0ssRUFBRTtJQUNiQyxHQUFHLEVBQUdOLElBQUksQ0FBQ08sSUFBSTtJQUNmQyxHQUFHLEVBQUdQLElBQUksQ0FBQ1EsT0FBTyxDQUFDLENBQUM7SUFDcEJDLEdBQUcsRUFBRyxJQUFJQyxJQUFJLENBQUMsQ0FBQyxDQUFDQyxVQUFVLENBQUNYLElBQUksQ0FBQ1ksVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFO0VBQ3RELENBQUMsRUFBRUMsa0JBQU0sQ0FBQ0MsR0FBRyxDQUFDQyxNQUFNLENBQUM7QUFDekIsQ0FBQztBQUVNLElBQU1DLFdBQVcsR0FBQUMsT0FBQSxDQUFBRCxXQUFBLEdBQUcsU0FBZEEsV0FBV0EsQ0FBSUUsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBSztFQUMzQ0Msb0JBQVEsQ0FBQ0MsWUFBWSxDQUFDLFVBQVUsRUFBRTtJQUFDQyxPQUFPLEVBQUU7RUFBSyxDQUFDLEVBQUUsVUFBQ0MsR0FBRyxFQUFFekIsSUFBSSxFQUFFMEIsSUFBSSxFQUFLO0lBQ3JFLElBQUlDLE9BQU8sR0FBR1IsR0FBRyxDQUFDUyxPQUFPLENBQUMsY0FBYyxDQUFDO0lBQ3pDLElBQUlDLElBQUksR0FBRyxFQUFFLENBQUNGLE9BQU8sSUFBSUEsT0FBTyxD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