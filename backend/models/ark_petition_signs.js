'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ark_petition_signs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ark_petition_signs.init({
    platform: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    time_played: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ark_petition_signs',
  });
  return ark_petition_signs;
};