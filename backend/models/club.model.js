import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";


import Equipe from "./equipe.model.js";
class Club extends Model{
    
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
    tableName:"club"
})

// Association 

export default Club;