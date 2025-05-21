import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
class Evenement extends Model{
    
}
Evenement.init({
    
    type:{
        type : DataTypes.ENUM('Tournoi,Match'),
        allowNull: false
    },
    date:{
        type : DataTypes.DATEONLY,
        allowNull : false
    },
    adversaire:{
        type : DataTypes.STRING,
        allowNull : false
    },
    score:{
        type : DataTypes.STRING,
        allowNull : false
    }
    
},
{
    sequelize,
    tableName:"evenement",
    timestamps:false

})


export default Evenement;