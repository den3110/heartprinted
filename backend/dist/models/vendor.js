'use strict';

module.exports = function (sequelize, DataTypes) {
  var vendor = sequelize.define('vendor', {
    storename: DataTypes.STRING,
    status: DataTypes.INTEGER,
    shopaddress: DataTypes.TEXT,
    shopdesc: DataTypes.TEXT,
    ownername: DataTypes.STRING,
    owneraddress: DataTypes.TEXT,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.TEXT,
    areaId: DataTypes.INTEGER,
    accountNo: DataTypes.STRING,
    accountHolderName: DataTypes.STRING,
    bankName: DataTypes.STRING,
    IFSC: DataTypes.STRING,
    branch: DataTypes.STRING,
    adharCardNo: DataTypes.INTEGER,
    panCardNo: DataTypes.STRING,
    GSTNo: DataTypes.STRING
  }, {});
  vendor.associate = function (models) {
    // associations can be defined here
    models.vendor.belongsTo(models.area, {
      foreignKey: 'areaId'
    });
    models.vendor.hasMany(models.vendor_product, {
      foreignKey: 'supplierId'
    });
  };
  return vendor;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwidmVuZG9yIiwiZGVmaW5lIiwic3RvcmVuYW1lIiwiU1RSSU5HIiwic3RhdHVzIiwiSU5URUdFUiIsInNob3BhZGRyZXNzIiwiVEVYVCIsInNob3BkZXNjIiwib3duZXJuYW1lIiwib3duZXJhZGRyZXNzIiwiZW1haWwiLCJwYXNzd29yZCIsInBob25lIiwiYXJlYUlkIiwiYWNjb3VudE5vIiwiYWNjb3VudEhvbGRlck5hbWUiLCJiYW5rTmFtZSIsIklGU0MiLCJicmFuY2giLCJhZGhhckNhcmRObyIsInBhbkNhcmRObyIsIkdTVE5vIiwiYXNzb2NpYXRlIiwibW9kZWxzIiwiYmVsb25nc1RvIiwiYXJlYSIsImZvcmVpZ25LZXkiLCJoYXNNYW55IiwidmVuZG9yX3Byb2R1Y3QiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL3ZlbmRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSA9PiB7XHJcbiAgY29uc3QgdmVuZG9yID0gc2VxdWVsaXplLmRlZmluZSgndmVuZG9yJywge1xyXG4gICAgc3RvcmVuYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgc3RhdHVzOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgIHNob3BhZGRyZXNzOiBEYXRhVHlwZXMuVEVYVCxcclxuICAgIHNob3BkZXNjOiBEYXRhVHlwZXMuVEVYVCxcclxuICAgIG93bmVybmFtZTogRGF0YVR5cGVzLlNUUklORyxcclxuICAgIG93bmVyYWRkcmVzczogRGF0YVR5cGVzLlRFWFQsXHJcbiAgICBlbWFpbDogRGF0YVR5cGVzLlNUUklORyxcclxuICAgIHBhc3N3b3JkOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgcGhvbmU6IERhdGFUeXBlcy5URVhULFxyXG4gICAgYXJlYUlkOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgIGFjY291bnRObzogRGF0YVR5cGVzLlNUUklORyxcclxuICAgIGFjY291bnRIb2xkZXJOYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgYmFua05hbWU6IERhdGFUeXBlcy5TVFJJTkcsXHJcbiAgICBJRlNDOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgYnJhbmNoOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgYWRoYXJDYXJkTm86IERhdGFUeXBlcy5JTlRFR0VSLFxyXG4gICAgcGFuQ2FyZE5vOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgR1NUTm86IERhdGFUeXBlcy5TVFJJTkdcclxuICB9LCB7fSk7XHJcbiAgdmVuZG9yLmFzc29jaWF0ZSA9IGZ1bmN0aW9uKG1vZGVscykge1xyXG4gICAgLy8gYXNzb2NpYXRpb25zIGNhbiBiZSBkZWZpbmVkIGhlcmVcclxuICAgIG1vZGVscy52ZW5kb3IuYmVsb25nc1RvKG1vZGVscy5hcmVhLCB7IGZvcmVpZ25LZXk6ICdhcmVhSWQnIH0pO1xyXG4gICAgbW9kZWxzLnZlbmRvci5oYXNNYW55KG1vZGVscy52ZW5kb3JfcHJvZHVjdCwgeyBmb3JlaWduS2V5OiAnc3VwcGxpZXJJZCcgfSk7XHJcblxyXG4gIH07XHJcbiAgcmV0dXJuIHZlbmRvcjtcclxufTsiXSwibWFwcGluZ3MiOiJBQUFBLFlBQVk7O0FBQ1pBLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHLFVBQUNDLFNBQVMsRUFBRUMsU0FBUyxFQUFLO0VBQ3pDLElBQU1DLE1BQU0sR0FBR0YsU0FBUyxDQUFDRyxNQUFNLENBQUMsUUFBUSxFQUFFO0lBQ3hDQyxTQUFTLEVBQUVILFNBQVMsQ0FBQ0ksTUFBTTtJQUMzQkMsTUFBTSxFQUFFTCxTQUFTLENBQUNNLE9BQU87SUFDekJDLFdBQVcsRUFBRVAsU0FBUyxDQUFDUSxJQUFJO0lBQzNCQyxRQUFRLEVBQUVULFNBQVMsQ0FBQ1EsSUFBSTtJQUN4QkUsU0FBUyxFQUFFVixTQUFTLENBQUNJLE1BQU07SUFDM0JPLFlBQVksRUFBRVgsU0FBUyxDQUFDUSxJQUFJO0lBQzVCSSxLQUFLLEVBQUVaLFNBQVMsQ0FBQ0ksTUFBTTtJQUN2QlMsUUFBUSxFQUFFYixTQUFTLENBQUNJLE1BQU07SUFDMUJVLEtBQUssRUFBRWQsU0FBUyxDQUFDUSxJQUFJO0lBQ3JCTyxNQUFNLEVBQUVmLFNBQVMsQ0FBQ00sT0FBTztJQUN6QlUsU0FBUyxFQUFFaEIsU0FBUyxDQUFDSSxNQUFNO0lBQzNCYSxpQkFBaUIsRUFBRWpCLFNBQVMsQ0FBQ0ksTUFBTTtJQUNuQ2MsUUFBUSxFQUFFbEIsU0FBUyxDQUFDSSxNQUFNO0lBQzFCZSxJQUFJLEVBQUVuQixTQUFTLENBQUNJLE1BQU07SUFDdEJnQixNQUFNLEVBQUVwQixTQUFTLENBQUNJLE1BQU07SUFDeEJpQixXQUFXLEVBQUVyQixTQUFTLENBQUNNLE9BQU87SUFDOUJnQixTQUFTLEVBQUV0QixTQUFTLENBQUNJLE1BQU07SUFDM0JtQixLQUFLLEVBQUV2QixTQUFTLENBQUNJO0VBQ25CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNOSCxNQUFNLENBQUN1QixTQUFTLEdBQUcsVUFBU0MsTUFBTSxFQUFFO0lBQ2xDO0lBQ0FBLE1BQU0sQ0FBQ3hCLE1BQU0sQ0FBQ3lCLFNBQVMsQ0FBQ0QsTUFBTSxDQUFDRSxJQUFJLEVBQUU7TUFBRUMsVUFBVSxFQUFFO0lBQVMsQ0FBQyxDQUFDO0lBQzlESCxNQUFNLENBQUN4QixNQUFNLENBQUM0QixPQUFPLENBQUNKLE1BQU0sQ0FBQ0ssY0FBYyxFQUFFO01BQUVGLFVBQVUsRUFBRTtJQUFhLENBQUMsQ0FBQztFQUU1RSxDQUFDO0VBQ0QsT0FBTzNCLE1BQU07QUFDZixDQUFDIiwiaWdub3JlTGlzdCI6W119