"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  /**
   * Stores the name of Application which can be used 
   * throughout the application. 
   */
  name: process.env.APP_NAME || "ProjectName",
  /**
   * Specifies the log level which will be used
   * while setting up project Log level
   */
  log: process.env.APP_LOG || "dev",
  /**
   * Stores the port number on which the application will
   * listen to the requests
   */
  port: process.env.APP_PORT || 800,
  /**
   * Stores the secret text which will be used while generating 
   * hash keys
   */
  secret: process.env.APP_SECRET || 'NodeJSProject',
  /**
   * Stores the secret text which will be used while generating 
   * hash keys
   */
  url: process.env.APP_URL || 'http://localhost',
  /**
   * Stores if server is Secure or not for Secure flag in cookies
   */
  secure: process.env.APP_SECURE == 'true' || false,
  /**
  * aws secret key 
  */

  AWS_ACCESS_KEY: 'AKIAJPLB4D32RF',
  AWS_SECRET_KEY: 'Mgo5LVpWKjnEape3j764IZ5H1IyBHDOBbhMuI',
  AWS_BUCKET: 'myproductbucet',
  AWS_REGION: 'us-east-1'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJuYW1lIiwicHJvY2VzcyIsImVudiIsIkFQUF9OQU1FIiwibG9nIiwiQVBQX0xPRyIsInBvcnQiLCJBUFBfUE9SVCIsInNlY3JldCIsIkFQUF9TRUNSRVQiLCJ1cmwiLCJBUFBfVVJMIiwic2VjdXJlIiwiQVBQX1NFQ1VSRSIsIkFXU19BQ0NFU1NfS0VZIiwiQVdTX1NFQ1JFVF9LRVkiLCJBV1NfQlVDS0VUIiwiQVdTX1JFR0lPTiJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyB0aGUgbmFtZSBvZiBBcHBsaWNhdGlvbiB3aGljaCBjYW4gYmUgdXNlZCBcclxuICAgICAqIHRocm91Z2hvdXQgdGhlIGFwcGxpY2F0aW9uLiBcclxuICAgICAqL1xyXG4gICAgbmFtZSA6IHByb2Nlc3MuZW52LkFQUF9OQU1FIHx8IFwiUHJvamVjdE5hbWVcIixcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGxvZyBsZXZlbCB3aGljaCB3aWxsIGJlIHVzZWRcclxuICAgICAqIHdoaWxlIHNldHRpbmcgdXAgcHJvamVjdCBMb2cgbGV2ZWxcclxuICAgICAqL1xyXG4gICAgbG9nICA6IHByb2Nlc3MuZW52LkFQUF9MT0cgfHwgXCJkZXZcIixcclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIHRoZSBwb3J0IG51bWJlciBvbiB3aGljaCB0aGUgYXBwbGljYXRpb24gd2lsbFxyXG4gICAgICogbGlzdGVuIHRvIHRoZSByZXF1ZXN0c1xyXG4gICAgICovXHJcbiAgICBwb3J0IDogcHJvY2Vzcy5lbnYuQVBQX1BPUlQgfHwgODAwLFxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgdGhlIHNlY3JldCB0ZXh0IHdoaWNoIHdpbGwgYmUgdXNlZCB3aGlsZSBnZW5lcmF0aW5nIFxyXG4gICAgICogaGFzaCBrZXlzXHJcbiAgICAgKi9cclxuICAgIHNlY3JldCA6IHByb2Nlc3MuZW52LkFQUF9TRUNSRVQgfHwgJ05vZGVKU1Byb2plY3QnLFxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgdGhlIHNlY3JldCB0ZXh0IHdoaWNoIHdpbGwgYmUgdXNlZCB3aGlsZSBnZW5lcmF0aW5nIFxyXG4gICAgICogaGFzaCBrZXlzXHJcbiAgICAgKi9cclxuICAgIHVybCA6IHByb2Nlc3MuZW52LkFQUF9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnLFxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgaWYgc2VydmVyIGlzIFNlY3VyZSBvciBub3QgZm9yIFNlY3VyZSBmbGFnIGluIGNvb2tpZXNcclxuICAgICAqL1xyXG4gICAgc2VjdXJlIDogKHByb2Nlc3MuZW52LkFQUF9TRUNVUkUgPT0gJ3RydWUnKSB8fCBmYWxzZSxcclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBhd3Mgc2VjcmV0IGtleSBcclxuICAgICAqL1xyXG5cclxuICAgIEFXU19BQ0NFU1NfS0VZOiAnQUtJQUpQTEI0RDMyUkYnLFxyXG5cclxuICAgIEFXU19TRUNSRVRfS0VZOiAnTWdvNUxWcFdLam5FYXBlM2o3NjRJWjVIMUl5QkhET0JiaE11SScsXHJcblxyXG4gICAgQVdTX0JVQ0tFVDogJ215cHJvZHVjdGJ1Y2V0JyxcclxuXHJcbiAgICBBV1NfUkVHSU9OOiAndXMtZWFzdC0xJ1xyXG5cclxuXHJcbn0iXSwibWFwcGluZ3MiOiI7Ozs7OztvQ0FBZTtFQUVYO0FBQ0o7QUFDQTtBQUNBO0VBQ0lBLElBQUksRUFBR0MsT0FBTyxDQUFDQyxHQUFHLENBQUNDLFFBQVEsSUFBSSxhQUFhO0VBRzVDO0FBQ0o7QUFDQTtBQUNBO0VBQ0lDLEdBQUcsRUFBSUgsT0FBTyxDQUFDQyxHQUFHLENBQUNHLE9BQU8sSUFBSSxLQUFLO0VBR25DO0FBQ0o7QUFDQTtBQUNBO0VBQ0lDLElBQUksRUFBR0wsT0FBTyxDQUFDQyxHQUFHLENBQUNLLFFBQVEsSUFBSSxHQUFHO0VBR2xDO0FBQ0o7QUFDQTtBQUNBO0VBQ0lDLE1BQU0sRUFBR1AsT0FBTyxDQUFDQyxHQUFHLENBQUNPLFVBQVUsSUFBSSxlQUFlO0VBR2xEO0FBQ0o7QUFDQTtBQUNBO0VBQ0lDLEdBQUcsRUFBR1QsT0FBTyxDQUFDQyxHQUFHLENBQUNTLE9BQU8sSUFBSSxrQkFBa0I7RUFHL0M7QUFDSjtBQUNBO0VBQ0lDLE1BQU0sRUFBSVgsT0FBTyxDQUFDQyxHQUFHLENBQUNXLFVBQVUsSUFBSSxNQUFNLElBQUssS0FBSztFQUVuRDtBQUNMO0FBQ0E7O0VBRUlDLGNBQWMsRUFBRSxnQkFBZ0I7RUFFaENDLGNBQWMsRUFBRSx1Q0FBdUM7RUFFdkRDLFVBQVUsRUFBRSxnQkFBZ0I7RUFFNUJDLFVBQVUsRUFBRTtBQUdoQixDQUFDIiwiaWdub3JlTGlzdCI6W119