import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import Evenement from "./evenement.model.js";
class Tournoi extends Evenement{}
Tournoi.init({
    tournoi_id:{
        type : DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model :Evenement,
            key : 'id'
        }
    },
    nom:{
        type : DataTypes.STRING,
        allowNull: false
    },
    tour:{
        type : DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    tableName : 'tournoi',
    timestamps:false

})


export default Tournoi;