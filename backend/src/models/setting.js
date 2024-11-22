'use strict';
module.exports = (sequelize, DataTypes) => {
  const setting = sequelize.define('setting', {
    mode_payment: DataTypes.BOOLEAN,
    client_key_demo: DataTypes.STRING,
    secret_key_demo: DataTypes.STRING,
    client_key_live: DataTypes.STRING,
    secret_key_live: DataTypes.STRING,
  }, {});
  return setting;
};