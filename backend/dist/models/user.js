'use strict';

module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    verify: DataTypes.BOOLEAN,
    password: DataTypes.STRING
  }, {});
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwidXNlciIsImRlZmluZSIsImZpcnN0TmFtZSIsIlNUUklORyIsImxhc3ROYW1lIiwiYWRkcmVzcyIsImVtYWlsIiwicGhvbmUiLCJyb2xlIiwidmVyaWZ5IiwiQk9PTEVBTiIsInBhc3N3b3JkIiwiYXNzb2NpYXRlIiwibW9kZWxzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy91c2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCBEYXRhVHlwZXMpID0+IHtcclxuICBjb25zdCB1c2VyID0gc2VxdWVsaXplLmRlZmluZSgndXNlcicsIHtcclxuICAgIGZpcnN0TmFtZTogRGF0YVR5cGVzLlNUUklORyxcclxuICAgIGxhc3ROYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgYWRkcmVzczogRGF0YVR5cGVzLlNUUklORyxcclxuICAgIGVtYWlsOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgcGhvbmU6IERhdGFUeXBlcy5TVFJJTkcsXHJcbiAgICByb2xlOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgdmVyaWZ5OiBEYXRhVHlwZXMuQk9PTEVBTixcclxuICAgIHBhc3N3b3JkOiBEYXRhVHlwZXMuU1RSSU5HXHJcbiAgfSwge30pO1xyXG4gIHVzZXIuYXNzb2NpYXRlID0gZnVuY3Rpb24obW9kZWxzKSB7XHJcbiAgICAvLyBhc3NvY2lhdGlvbnMgY2FuIGJlIGRlZmluZWQgaGVyZVxyXG4gIH07XHJcbiAgcmV0dXJuIHVzZXI7XHJcbn07Il0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZOztBQUNaQSxNQUFNLENBQUNDLE9BQU8sR0FBRyxVQUFDQyxTQUFTLEVBQUVDLFNBQVMsRUFBSztFQUN6QyxJQUFNQyxJQUFJLEdBQUdGLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLE1BQU0sRUFBRTtJQUNwQ0MsU0FBUyxFQUFFSCxTQUFTLENBQUNJLE1BQU07SUFDM0JDLFFBQVEsRUFBRUwsU0FBUyxDQUFDSSxNQUFNO0lBQzFCRSxPQUFPLEVBQUVOLFNBQVMsQ0FBQ0ksTUFBTTtJQUN6QkcsS0FBSyxFQUFFUCxTQUFTLENBQUNJLE1BQU07SUFDdkJJLEtBQUssRUFBRVIsU0FBUyxDQUFDSSxNQUFNO0lBQ3ZCSyxJQUFJLEVBQUVULFNBQVMsQ0FBQ0ksTUFBTTtJQUN0Qk0sTUFBTSxFQUFFVixTQUFTLENBQUNXLE9BQU87SUFDekJDLFFBQVEsRUFBRVosU0FBUyxDQUFDSTtFQUN0QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDTkgsSUFBSSxDQUFDWSxTQUFTLEdBQUcsVUFBU0MsTUFBTSxFQUFFO0lBQ2hDO0VBQUEsQ0FDRDtFQUNELE9BQU9iLElBQUk7QUFDYixDQUFDIiwiaWdub3JlTGlzdCI6W119