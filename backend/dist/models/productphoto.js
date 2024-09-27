'use strict';

module.exports = function (sequelize, DataTypes) {
  var productphoto = sequelize.define('productphoto', {
    productId: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING
  }, {});
  productphoto.associate = function (models) {
    // associations can be defined here
    models.productphoto.belongsTo(models.product, {
      foreignKey: 'productId'
    });
  };
  return productphoto;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwicHJvZHVjdHBob3RvIiwiZGVmaW5lIiwicHJvZHVjdElkIiwiSU5URUdFUiIsImltZ1VybCIsIlNUUklORyIsImFzc29jaWF0ZSIsIm1vZGVscyIsImJlbG9uZ3NUbyIsInByb2R1Y3QiLCJmb3JlaWduS2V5Il0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9wcm9kdWN0cGhvdG8uanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIERhdGFUeXBlcykgPT4ge1xyXG4gIGNvbnN0IHByb2R1Y3RwaG90byA9IHNlcXVlbGl6ZS5kZWZpbmUoJ3Byb2R1Y3RwaG90bycsIHtcclxuICAgIHByb2R1Y3RJZDogRGF0YVR5cGVzLklOVEVHRVIsXHJcbiAgICBpbWdVcmw6IERhdGFUeXBlcy5TVFJJTkdcclxuICB9LCB7fSk7XHJcbiAgcHJvZHVjdHBob3RvLmFzc29jaWF0ZSA9IGZ1bmN0aW9uKG1vZGVscykge1xyXG4gICAgLy8gYXNzb2NpYXRpb25zIGNhbiBiZSBkZWZpbmVkIGhlcmVcclxuICAgIG1vZGVscy5wcm9kdWN0cGhvdG8uYmVsb25nc1RvKG1vZGVscy5wcm9kdWN0LCB7IGZvcmVpZ25LZXk6ICdwcm9kdWN0SWQnIH0pO1xyXG5cclxuICB9O1xyXG4gIHJldHVybiBwcm9kdWN0cGhvdG87XHJcbn07Il0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZOztBQUNaQSxNQUFNLENBQUNDLE9BQU8sR0FBRyxVQUFDQyxTQUFTLEVBQUVDLFNBQVMsRUFBSztFQUN6QyxJQUFNQyxZQUFZLEdBQUdGLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLGNBQWMsRUFBRTtJQUNwREMsU0FBUyxFQUFFSCxTQUFTLENBQUNJLE9BQU87SUFDNUJDLE1BQU0sRUFBRUwsU0FBUyxDQUFDTTtFQUNwQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDTkwsWUFBWSxDQUFDTSxTQUFTLEdBQUcsVUFBU0MsTUFBTSxFQUFFO0lBQ3hDO0lBQ0FBLE1BQU0sQ0FBQ1AsWUFBWSxDQUFDUSxTQUFTLENBQUNELE1BQU0sQ0FBQ0UsT0FBTyxFQUFFO01BQUVDLFVBQVUsRUFBRTtJQUFZLENBQUMsQ0FBQztFQUU1RSxDQUFDO0VBQ0QsT0FBT1YsWUFBWTtBQUNyQixDQUFDIiwiaWdub3JlTGlzdCI6W119