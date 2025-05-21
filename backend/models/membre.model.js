// member.model.js
import sequelize from "../config/db.js";
import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
// Base model class (won't create a table)
class Member extends Model {
}
Member.init(
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    ,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_picteure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "member",
    timestamps:false,
    hooks: {
      beforeCreate: async function (member, options) {
        if (member.password) {
          const salt = await bcrypt.genSalt(10);
          member.password = await bcrypt.hash(member.password, salt);
        }
      },
    },
  }
);

export default Member;
timestamps:false
