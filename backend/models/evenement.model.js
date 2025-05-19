import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
class Evenement extends Model{
   
}
Evenement.init({
    nom:{
        type : DataTypes.STRING,
        allowNull: false
    },
    type:{
        type : DataTypes.STRING,
        allowNull: false
    },
    date:{
        type : DataTypes.DATE,
        allowNull : false
    },
    adversaire:{
        type : DataTypes.STRING,
        allowNull : false
    },
    score:{
        type : DataTypes.INTEGER,
        allowNull : false
    }
    
},
{
    sequelize,
    tableName:"evenement",
    timestamps:false

})


export default Evenement;