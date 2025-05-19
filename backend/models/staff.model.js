import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import Member from "./membre.model.js";
class Staff extends  Member 
{}

Staff.init({
    staff_id:{
        type : DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model :Member,
            key : 'id'
        }
    },
    type:{
        type : DataTypes.STRING,
        allowNull: false
    },
    date_rec:{
        type : DataTypes.DATEONLY,
        allowNull : false
    }
},{
    sequelize,
    tableName:"staff",
    timestamps :false
})
export default Staff;