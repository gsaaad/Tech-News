// we are making a User Model

// Model and DataTypes from sequelize which create a model, when you add a variable, use DataTypes to input its prototype, data
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// create User Model
class User extends Model {
  // method for user to check password
  checkPassword(loginPw) {
    // ! Remember: user has properties username, email, password!
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// define table columns/data and configuration

User.init(
  {
    // !Table Columns/data

    id: {
      // use the special sequelize datatypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's 'NOT NULL' option
      allowNull: false,
      // instruct that this is the primary key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true,
    },
    // Define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //   there cannot be any duplicate email values in this table
      unique: true,
      // if allownull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least 4 characters!!!
        len: [4],
      },
    },
  },

  // !Table configuration options go here   (https://sequelize.org/v5/manual/models-definition.html#configuration)

  //   pass in our imported sequelize connection (the direction connection to our database)
  {
    hooks: {
      // before creating, hash the password with 10 rounds and return
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // before updating PUT user, hash password
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    // don't automateically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // no pluralize name of database,
    freezeTableName: true,
    // use underscores instead of camel-casing (ie. comment_text and not commentText)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "user",
  }
);

module.exports = User;
