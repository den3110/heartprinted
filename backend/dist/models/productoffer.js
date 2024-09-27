'use strict';

module.exports = function (sequelize, DataTypes) {
  var ProductOffer = sequelize.define('ProductOffer', {
    productId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    discount_per: DataTypes.STRING,
    discount_price: DataTypes.FLOAT,
    qty: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    net_price: DataTypes.FLOAT
  }, {});
  ProductOffer.associate = function (models) {
    // associations can be defined here
    models.ProductOffer.belongsTo(models.product, {
      foreignKey: 'productId'
    });
  };
  return ProductOffer;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwiUHJvZHVjdE9mZmVyIiwiZGVmaW5lIiwicHJvZHVjdElkIiwiSU5URUdFUiIsImltYWdlIiwiU1RSSU5HIiwiZGlzY291bnRfcGVyIiwiZGlzY291bnRfcHJpY2UiLCJGTE9BVCIsInF0eSIsInRvdGFsIiwibmV0X3ByaWNlIiwiYXNzb2NpYXRlIiwibW9kZWxzIiwiYmVsb25nc1RvIiwicHJvZHVjdCIsImZvcmVpZ25LZXkiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL3Byb2R1Y3RvZmZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSA9PiB7XHJcbiAgY29uc3QgUHJvZHVjdE9mZmVyID0gc2VxdWVsaXplLmRlZmluZSgnUHJvZHVjdE9mZmVyJywge1xyXG4gICAgcHJvZHVjdElkOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgIGltYWdlOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgZGlzY291bnRfcGVyOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgZGlzY291bnRfcHJpY2U6IERhdGFUeXBlcy5GTE9BVCxcclxuICAgIHF0eTogRGF0YVR5cGVzLklOVEVHRVIsXHJcbiAgICB0b3RhbDogRGF0YVR5cGVzLkZMT0FULFxyXG4gICAgbmV0X3ByaWNlOiBEYXRhVHlwZXMuRkxPQVRcclxuICB9LCB7fSk7XHJcbiAgUHJvZHVjdE9mZmVyLmFzc29jaWF0ZSA9IGZ1bmN0aW9uKG1vZGVscykge1xyXG4gICAgLy8gYXNzb2NpYXRpb25zIGNhbiBiZSBkZWZpbmVkIGhlcmVcclxuICAgIG1vZGVscy5Qcm9kdWN0T2ZmZXIuYmVsb25nc1RvKG1vZGVscy5wcm9kdWN0LCB7IGZvcmVpZ25LZXk6ICdwcm9kdWN0SWQnIH0pO1xyXG5cclxuICB9O1xyXG4gIHJldHVybiBQcm9kdWN0T2ZmZXI7XHJcbn07Il0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZOztBQUNaQSxNQUFNLENBQUNDLE9BQU8sR0FBRyxVQUFDQyxTQUFTLEVBQUVDLFNBQVMsRUFBSztFQUN6QyxJQUFNQyxZQUFZLEdBQUdGLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLGNBQWMsRUFBRTtJQUNwREMsU0FBUyxFQUFFSCxTQUFTLENBQUNJLE9BQU87SUFDNUJDLEtBQUssRUFBRUwsU0FBUyxDQUFDTSxNQUFNO0lBQ3ZCQyxZQUFZLEVBQUVQLFNBQVMsQ0FBQ00sTUFBTTtJQUM5QkUsY0FBYyxFQUFFUixTQUFTLENBQUNTLEtBQUs7SUFDL0JDLEdBQUcsRUFBRVYsU0FBUyxDQUFDSSxPQUFPO0lBQ3RCTyxLQUFLLEVBQUVYLFNBQVMsQ0FBQ1MsS0FBSztJQUN0QkcsU0FBUyxFQUFFWixTQUFTLENBQUNTO0VBQ3ZCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNOUixZQUFZLENBQUNZLFNBQVMsR0FBRyxVQUFTQyxNQUFNLEVBQUU7SUFDeEM7SUFDQUEsTUFBTSxDQUFDYixZQUFZLENBQUNjLFNBQVMsQ0FBQ0QsTUFBTSxDQUFDRSxPQUFPLEVBQUU7TUFBRUMsVUFBVSxFQUFFO0lBQVksQ0FBQyxDQUFDO0VBRTVFLENBQUM7RUFDRCxPQUFPaEIsWUFBWTtBQUNyQixDQUFDIiwiaWdub3JlTGlzdCI6W119