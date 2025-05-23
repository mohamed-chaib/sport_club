import { DataTypes, Model } from "sequelize";

import sequelize from "../config/db.js";



import Club from "./club.model.js";
class Equipe extends Model{
    static associate(medels){
        Equipe.belongsTo(models.Club ,{foreignKey :'id_club'})
    }
    static async getAllEquipes (req,res){
        try {
            const equipes = await Equipe.findAll({})
            return res.status(200).json(equipes)
          } catch (error) {
            return res.status(400).json({message:"error : "+error.message})

          }
    }
}

Equipe.init({
    nom:{
        type : DataTypes.STRING,
        allowNull : false
    },
    despline:{
        type : DataTypes.STRING,
        allowNull:false
    },
},{
    sequelize,
    tableName:"equipe",
    timestamps:false

})
// Association 
export default Equipe;