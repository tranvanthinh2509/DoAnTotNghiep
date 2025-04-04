"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImageProperty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ImageProperty.init(
    {
      image: DataTypes.STRING,
      idProperty: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ImageProperty",
    }
  );
  return ImageProperty;
};
