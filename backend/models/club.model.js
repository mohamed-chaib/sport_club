import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";


import Equipe from "./equipe.model.js";
import Equipe from "./equipe.model.js";

class Club extends Model {
  static async ajouterEquipe(req, res) {
    try {
      const { nom, despline, id_club } = req.body;

      // Find the club by ID
      const club = await Club.findByPk(id_club);
      if (!club) {
        return res.status(404).json({ message: "Club not found" });
      }

      // Create the equipe and associate it with the club
      const equipe = await Equipe.create({
        nom,
        despline,
        id_club: club.id, // Make sure Equipe model has this field
      });

      // Send success response
      return res.status(201).json({
        message: "Equipe added successfully",
        equipe,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while adding the equipe",
        error: error.message,
      });
    }
  }
}




Club.init({
    nom:{
        type : DataTypes.STRING,
        defaultValue : "",
        allowNull: false
    },
    ville:{
        type : DataTypes.STRING,
        defaultValue : "",
        allowNull : false
    },
},{
    sequelize,
    tableName:"club",
    timestamps:false
})

// Association 

export default Club;