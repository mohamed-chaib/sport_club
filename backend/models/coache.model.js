import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import Member from "./membre.model.js";

class Coache extends Member{}

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
        type : DataTypes.ENUM('coach_principale','coach_gardian'),
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