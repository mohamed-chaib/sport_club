import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import Member from "./membre.model.js";
import Joueur from "./joueur.model.js";
import DossierMedical from "./dossierMedical.model.js";
class Staff extends Member {
  static async ajouterDossierMedical(req, res) {
    try {
      const { poids, taile, nationalite, Etat, id_joueur } = req.body;

      // Find the club by ID
      const joueur = await Joueur.findByPk(id_joueur);
      if (!joueur) {
        return res.status(404).json({ message: "joueur not found" });
      }
      const doosierMedicalIsExiste = await DossierMedical.findOne({where:{id_joueur :id_joueur }})
      if (doosierMedicalIsExiste) {
        return res.status(404).json({ message: "Dossier is Already Existe" });
      }
      // Create the equipe and associate it with the club
      const dossierMedical = await DossierMedical.create({
        poids,
        taile,
        nationalite,
        Etat,
        id_joueur
      });

      // Send success response
      return res.status(201).json({
        message: "Dossier added successfully",
        dossierMedical,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "error : " + error.message });
    }
  }
  static async getAllDossierMedical(req,res){
    try {
        const dossierMedical = await DossierMedical.findAll({          
        })
        return res.status(200).json(dossierMedical)
      } catch (error) {
      }
}
}

Staff.init(
  {
    staff_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Member,
        key: "id",
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_rec: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "staff",
    timestamps: false,
  }
);
export default Staff;
