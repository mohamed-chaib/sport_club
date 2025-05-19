import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import Member from "./membre.model.js";

class Manager extends Member{}
Manager.init({
    manager_id:{
        type : DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model :Member,
            key : 'id'
        }
    }
},{
    sequelize,
    tableName : 'manager',
    timestamps:false
})


export default Manager;