import { DataTypes, Model } from "sequelize";

import sequelize from "../config/db.js";



import Club from "./club.model.js";
class Equipe extends Model{
    static associate(medels){
        Equipe.belongsTo(models.Club ,{foreignKey :'id_club'})
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
    tableName:"equipe"
})
// Association 
export default Equipe;