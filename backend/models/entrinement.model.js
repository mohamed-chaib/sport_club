import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
class Entrinement extends Model{
    static async getAllEntrinement(req,res){
        try {
            const entrinements = await Entrinement.findAll({          
            })
            return res.status(200).json(entrinements)
          } catch (error) {
            return res.status(400).json({message:"error : "+error.message})

          }
    }

}

Entrinement.init({
    lieu:{
        type : DataTypes.STRING,
        allowNull: false
    },
    type:{
        type : DataTypes.ENUM('Physique','Technique'),
        allowNull : false
    },
    time:{
        type : DataTypes.DATE,
        allowNull : false
    }
},{
    sequelize,
    tableName:"entrinement",
    timestamps:false

})
export default Entrinement;