'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmailAuthToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmailAuthToken.init({
    userId: DataTypes.INTEGER,
    credentials: {
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue("credentials"));
      },
      set: function (value) {
        return this.setDataValue("credentials", JSON.stringify(value));
      }
    }
  }, {
    sequelize,
    modelName: 'EmailAuthToken',
  });
  return EmailAuthToken;
};