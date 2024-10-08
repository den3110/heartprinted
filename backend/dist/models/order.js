'use strict';

module.exports = function (sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    custId: DataTypes.INTEGER,
    number: DataTypes.STRING,
    paymentmethod: DataTypes.STRING,
    deliverydate: DataTypes.DATE,
    grandtotal: DataTypes.INTEGER,
    status: DataTypes.ENUM('processing', 'shipping', 'delieverd', 'cancel'),
    voucherId: DataTypes.INTEGER,
    deliveryFee: DataTypes.INTEGER,
    reason: DataTypes.STRING
  }, {});
  Order.associate = function (models) {
    // associations can be defined here
    models.Order.hasMany(models.Address, {
      foreignKey: 'orderId'
    });
    models.Order.hasMany(models.Cart, {
      foreignKey: 'orderId'
    });

    // models.Order.hasMany(models.payment, { foreignKey: 'orderCreationId' });  
  };
  return Order;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwiT3JkZXIiLCJkZWZpbmUiLCJjdXN0SWQiLCJJTlRFR0VSIiwibnVtYmVyIiwiU1RSSU5HIiwicGF5bWVudG1ldGhvZCIsImRlbGl2ZXJ5ZGF0ZSIsIkRBVEUiLCJncmFuZHRvdGFsIiwic3RhdHVzIiwiRU5VTSIsInZvdWNoZXJJZCIsImRlbGl2ZXJ5RmVlIiwicmVhc29uIiwiYXNzb2NpYXRlIiwibW9kZWxzIiwiaGFzTWFueSIsIkFkZHJlc3MiLCJmb3JlaWduS2V5IiwiQ2FydCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvb3JkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIERhdGFUeXBlcykgPT4ge1xyXG4gIGNvbnN0IE9yZGVyID0gc2VxdWVsaXplLmRlZmluZSgnT3JkZXInLCB7XHJcbiAgICBjdXN0SWQ6IERhdGFUeXBlcy5JTlRFR0VSLFxyXG4gICAgbnVtYmVyOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgcGF5bWVudG1ldGhvZDogRGF0YVR5cGVzLlNUUklORyxcclxuICAgIGRlbGl2ZXJ5ZGF0ZTogRGF0YVR5cGVzLkRBVEUsXHJcbiAgICBncmFuZHRvdGFsOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgIHN0YXR1czogRGF0YVR5cGVzLkVOVU0oJ3Byb2Nlc3NpbmcnLCdzaGlwcGluZycsJ2RlbGlldmVyZCcsJ2NhbmNlbCcpLFxyXG4gICAgdm91Y2hlcklkOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgIGRlbGl2ZXJ5RmVlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgIHJlYXNvbjogRGF0YVR5cGVzLlNUUklOR1xyXG4gIH0sIHt9KTtcclxuICBPcmRlci5hc3NvY2lhdGUgPSBmdW5jdGlvbihtb2RlbHMpIHtcclxuICAgIC8vIGFzc29jaWF0aW9ucyBjYW4gYmUgZGVmaW5lZCBoZXJlXHJcbiAgICBtb2RlbHMuT3JkZXIuaGFzTWFueShtb2RlbHMuQWRkcmVzcywgeyBmb3JlaWduS2V5OiAnb3JkZXJJZCcgfSk7XHJcbiAgICBtb2RlbHMuT3JkZXIuaGFzTWFueShtb2RlbHMuQ2FydCwgeyBmb3JlaWduS2V5OiAnb3JkZXJJZCcgfSk7XHJcblxyXG4gICAgLy8gbW9kZWxzLk9yZGVyLmhhc01hbnkobW9kZWxzLnBheW1lbnQsIHsgZm9yZWlnbktleTogJ29yZGVyQ3JlYXRpb25JZCcgfSk7ICBcclxuXHJcbiAgfTtcclxuICByZXR1cm4gT3JkZXI7XHJcbn07Il0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZOztBQUNaQSxNQUFNLENBQUNDLE9BQU8sR0FBRyxVQUFDQyxTQUFTLEVBQUVDLFNBQVMsRUFBSztFQUN6QyxJQUFNQyxLQUFLLEdBQUdGLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLE9BQU8sRUFBRTtJQUN0Q0MsTUFBTSxFQUFFSCxTQUFTLENBQUNJLE9BQU87SUFDekJDLE1BQU0sRUFBRUwsU0FBUyxDQUFDTSxNQUFNO0lBQ3hCQyxhQUFhLEVBQUVQLFNBQVMsQ0FBQ00sTUFBTTtJQUMvQkUsWUFBWSxFQUFFUixTQUFTLENBQUNTLElBQUk7SUFDNUJDLFVBQVUsRUFBRVYsU0FBUyxDQUFDSSxPQUFPO0lBQzdCTyxNQUFNLEVBQUVYLFNBQVMsQ0FBQ1ksSUFBSSxDQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsV0FBVyxFQUFDLFFBQVEsQ0FBQztJQUNwRUMsU0FBUyxFQUFFYixTQUFTLENBQUNJLE9BQU87SUFDNUJVLFdBQVcsRUFBRWQsU0FBUyxDQUFDSSxPQUFPO0lBQzlCVyxNQUFNLEVBQUVmLFNBQVMsQ0FBQ007RUFDcEIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ05MLEtBQUssQ0FBQ2UsU0FBUyxHQUFHLFVBQVNDLE1BQU0sRUFBRTtJQUNqQztJQUNBQSxNQUFNLENBQUNoQixLQUFLLENBQUNpQixPQUFPLENBQUNELE1BQU0sQ0FBQ0UsT0FBTyxFQUFFO01BQUVDLFVBQVUsRUFBRTtJQUFVLENBQUMsQ0FBQztJQUMvREgsTUFBTSxDQUFDaEIsS0FBSyxDQUFDaUIsT0FBTyxDQUFDRCxNQUFNLENBQUNJLElBQUksRUFBRTtNQUFFRCxVQUFVLEVBQUU7SUFBVSxDQUFDLENBQUM7O0lBRTVEO0VBRUYsQ0FBQztFQUNELE9BQU9uQixLQUFLO0FBQ2QsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==