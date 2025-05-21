import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import Member from "./membre.model.js";
import Entrinement from "./entrinement.model.js";

class Coache extends Member{
    static async planifierEntrinement(req, res) {
        try {
          const id_coache = req.member?.id;
          const {lieu,type,time} = req.body;
          const entrinement = await Entrinement.create(
            {
                lieu,
                type,
                time,
                id_coach:id_coache
            }
          );
          res.status(200).json({
            entrinement: {
              id: entrinement.id,
              lieu:entrinement.lieu,
              type: entrinement.type,
              id_coache: entrinement.id_coach,
            }

          });
        } catch (error) {
          console.error("Error in organiserMatch:", error);
          return res
            .status(500)
            .json({
              message: "Erreur lors de l'organisation du match.",
              error: error.message,
            });
        }
      }
}

Coache.init({
    coache_id:{
        type : DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model :Member,
            key : 'id'
        }
    },
    licence:{
        type : DataTypes.STRING,
        allowNull: false
    },
    type_coach:{
        type : DataTypes.ENUM('Principal','Gardien'),
        allowNull : false
    },
    date_rec:{
        type : DataTypes.DATEONLY,
        allowNull : false
    }
},{
    sequelize,
    tableName:"coache",
    timestamps:false
})
export default Coache;