// joueur.model.js
import { DataTypes, Model, where } from "sequelize";
import sequelize from "../config/db.js";
import Member from "./membre.model.js";
import Coache from "./coache.model.js";
import Staff from "./staff.model.js";
import Manager from "./manager.model.js";

class Joueur extends Member {
  
}

// Add Joueur-specific fields
Joueur.init(
  {
    joueur_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Member,
        key: "id",
      },
    },
    post: {
      type: DataTypes.STRING,
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    date_rec: {
      type: DataTypes.DATEONLY,
      unique: true,
    },
    // Other specific fields
  },
  {
    sequelize,
    tableName: "joueur",
    timestamps:false
  }
);

export default Joueur;
