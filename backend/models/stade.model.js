import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
class Stade extends Model{}

Stade.init({
    nom:{
        type : DataTypes.STRING,
        allowNull:false
    },
    lieu:{
        type : DataTypes.STRING,
        allowNull:false
    },
    nombre_de_tribunes:{
        type:DataTypes.DOUBLE,
        allowNull:false
    }
},{
    sequelize,
    tableName:"stade",
    timestamps:false

})
export default Stade;